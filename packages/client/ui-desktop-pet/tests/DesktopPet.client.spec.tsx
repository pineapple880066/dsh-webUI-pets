// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import type { SessionListState } from '@deepseek-ai/dsh-client-runtime/client'
import { DesktopPet } from '../src/client/DesktopPet.tsx'

type DesktopPetProps = Parameters<typeof DesktopPet>[0]

const state = {
  ids: [],
  byId: {},
  current: undefined,
  phase: 'ready',
  subagentsByParent: {},
  jobsBySession: {},
  currentAddress: undefined,
} as SessionListState

const useSessions = ((selector: (value: SessionListState) => unknown) => selector(state)) as DesktopPetProps['useSessions']
const useWorkspaces = (() => undefined) as DesktopPetProps['useWorkspaces']

describe('DesktopPet', () => {
  afterEach(() => {
    cleanup()
  })

  beforeEach(() => {
    window.localStorage.clear()
  })

  it('renders the idle pose and can be minimized', () => {
    render(<DesktopPet useSessions={useSessions} useWorkspaces={useWorkspaces} />)

    expect(screen.getByRole('img', { name: 'Doki 随时待命' })).toBeTruthy()
    const toggle = screen.getByRole('button', { name: '缩小桌宠' })
    fireEvent.click(toggle)
    expect(screen.getByRole('button', { name: '展开桌宠' })).toBeTruthy()
  })

  it('cycles through the three bundled pets', () => {
    render(<DesktopPet useSessions={useSessions} useWorkspaces={useWorkspaces} />)

    const switcher = screen.getByRole('button', { name: '更换桌宠' })
    fireEvent.click(switcher)
    expect(screen.getByRole('img', { name: '赤花小友 随时待命' })).toBeTruthy()
    fireEvent.click(switcher)
    expect(screen.getByRole('img', { name: '蓝缎小友 随时待命' })).toBeTruthy()
    fireEvent.click(switcher)
    expect(screen.getByRole('img', { name: '深海小友 随时待命' })).toBeTruthy()
  })
})
