import { readFile } from 'node:fs/promises'
import type { IncomingMessage, ServerResponse } from 'node:http'

export const DESKTOP_PET_ASSET_ROUTE = '/plugins/@dsh-external/dsh-webui-pets/assets'

const ASSET_NAMES = new Set([
  'black-maid-sprite.png',
  'blue-mermaid-sprite.png',
  'blue-ribbon-sprite.png',
  'crimson-hat-sprite.png',
  'doki-sprite.png',
  'frost-crown-sprite.png',
  'mint-gamer-sprite.png',
])
const ASSET_ROOT = new URL('../assets/', import.meta.url)

/** Serve only the package's allowlisted PNG sprite sheets. */
export async function serveDesktopPetAsset(
  request: IncomingMessage,
  response: ServerResponse,
): Promise<void> {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { allow: 'GET, HEAD' })
    response.end()
    return
  }

  const pathname = new URL(request.url ?? '/', 'http://dsh-desktop-pet.local').pathname
  if (!pathname.startsWith(`${DESKTOP_PET_ASSET_ROUTE}/`)) {
    response.writeHead(404)
    response.end()
    return
  }
  const assetName = decodeURIComponent(pathname.slice(DESKTOP_PET_ASSET_ROUTE.length + 1))
  if (!ASSET_NAMES.has(assetName) || assetName.includes('/')) {
    response.writeHead(404)
    response.end()
    return
  }

  try {
    const body = await readFile(new URL(assetName, ASSET_ROOT))
    response.writeHead(200, {
      'cache-control': 'public, max-age=31536000, immutable',
      'content-length': body.byteLength,
      'content-type': 'image/png',
    })
    if (request.method === 'HEAD') response.end()
    else response.end(body)
  } catch {
    response.writeHead(404)
    response.end()
  }
}
