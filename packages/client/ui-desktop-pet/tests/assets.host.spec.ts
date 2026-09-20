import type { IncomingMessage, ServerResponse } from 'node:http'
import { describe, expect, it } from 'vitest'
import { DESKTOP_PET_ASSET_ROUTE, serveDesktopPetAsset } from '../src/assets.ts'

type FakeResponse = {
  statusCode: number
  headers: Record<string, string | number>
  body?: Buffer
  writeHead: (statusCode: number, headers?: Record<string, string | number>) => void
  end: (body?: Buffer) => void
}

function fakeResponse(): FakeResponse {
  return {
    statusCode: 0,
    headers: {},
    writeHead(statusCode, headers = {}) {
      this.statusCode = statusCode
      this.headers = headers
    },
    end(body) {
      this.body = body
    },
  }
}

describe('desktop pet asset route', () => {
  it('serves an allowlisted sprite sheet', async () => {
    const response = fakeResponse()
    await serveDesktopPetAsset(
      { method: 'GET', url: `${DESKTOP_PET_ASSET_ROUTE}/doki-sprite.png` } as IncomingMessage,
      response as unknown as ServerResponse,
    )

    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toBe('image/png')
    expect(response.body?.byteLength).toBeGreaterThan(0)
  })

  it('does not expose arbitrary files or methods', async () => {
    const missing = fakeResponse()
    await serveDesktopPetAsset(
      { method: 'GET', url: `${DESKTOP_PET_ASSET_ROUTE}/package.json` } as IncomingMessage,
      missing as unknown as ServerResponse,
    )
    expect(missing.statusCode).toBe(404)

    const method = fakeResponse()
    await serveDesktopPetAsset(
      { method: 'POST', url: `${DESKTOP_PET_ASSET_ROUTE}/doki-sprite.png` } as IncomingMessage,
      method as unknown as ServerResponse,
    )
    expect(method.statusCode).toBe(405)
  })
})
