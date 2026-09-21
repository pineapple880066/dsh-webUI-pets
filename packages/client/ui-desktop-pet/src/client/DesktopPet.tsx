import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react'
import type { InjectFace, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-session/client'
import css from './DesktopPet.module.css'
import type { DesktopPetSettingsFace } from './settings-controller.ts'

type PetMode = 'idle' | 'working' | 'attention' | 'done'
type PetId =
  | 'doki'
  | 'crimson-hat'
  | 'blue-ribbon'
  | 'blue-mermaid'
  | 'black-maid'
  | 'frost-crown'
  | 'mint-gamer'
type Position = { left: number; top: number }
type PetDefinition = {
  id: PetId
  spriteUrl: string
  labels: Record<PetMode, string>
}

type DesktopPetProps = PropsRuntime<'shell.overlay'>
type DesktopPetOverlayProps = PropsRuntime<'shell.overlay'> & InjectFace<DesktopPetSettingsFace>

const POSITION_KEY = 'dsh.desktop-pet.position'
const PET_KEY = 'dsh.desktop-pet.pet'
const IDLE_FRAMES = [0, 1]
const FRAMES: Record<PetMode, readonly number[]> = {
  idle: IDLE_FRAMES,
  working: [3],
  attention: [6],
  done: [9],
}
const DSH_PLUGIN_ASSETS = '/plugins/@dsh-external/dsh-webui-pets/assets'
const DEFAULT_PET: PetDefinition = {
  id: 'doki',
  spriteUrl: `${DSH_PLUGIN_ASSETS}/doki-sprite.png`,
  labels: {
    idle: 'Doki 随时待命',
    working: 'Doki 正在努力工作',
    attention: 'Doki 在等你确认',
    done: 'Doki 说：完成啦！',
  },
}
const PETS: readonly PetDefinition[] = [
  DEFAULT_PET,
  {
    id: 'crimson-hat',
    spriteUrl: `${DSH_PLUGIN_ASSETS}/crimson-hat-sprite.png`,
    labels: {
      idle: '赤花小友 随时待命',
      working: '赤花小友 正在努力工作',
      attention: '赤花小友 在等你确认',
      done: '赤花小友 说：完成啦！',
    },
  },
  {
    id: 'blue-ribbon',
    spriteUrl: `${DSH_PLUGIN_ASSETS}/blue-ribbon-sprite.png`,
    labels: {
      idle: '蓝缎小友 随时待命',
      working: '蓝缎小友 正在努力工作',
      attention: '蓝缎小友 在等你确认',
      done: '蓝缎小友 说：完成啦！',
    },
  },
  {
    id: 'blue-mermaid',
    spriteUrl: `${DSH_PLUGIN_ASSETS}/blue-mermaid-sprite.png`,
    labels: {
      idle: '深海小友 随时待命',
      working: '深海小友 正在努力工作',
      attention: '深海小友 在等你确认',
      done: '深海小友 说：完成啦！',
    },
  },
  {
    id: 'black-maid',
    spriteUrl: `${DSH_PLUGIN_ASSETS}/black-maid-sprite.png`,
    labels: {
      idle: '黑蔷薇女仆 随时待命',
      working: '黑蔷薇女仆 正在努力工作',
      attention: '黑蔷薇女仆 在等你确认',
      done: '黑蔷薇女仆 说：完成啦！',
    },
  },
  {
    id: 'frost-crown',
    spriteUrl: `${DSH_PLUGIN_ASSETS}/frost-crown-sprite.png`,
    labels: {
      idle: '霜冠小友 随时待命',
      working: '霜冠小友 正在努力工作',
      attention: '霜冠小友 在等你确认',
      done: '霜冠小友 说：完成啦！',
    },
  },
  {
    id: 'mint-gamer',
    spriteUrl: `${DSH_PLUGIN_ASSETS}/mint-gamer-sprite.png`,
    labels: {
      idle: '薄荷电玩小友 随时待命',
      working: '薄荷电玩小友 正在努力工作',
      attention: '薄荷电玩小友 在等你确认',
      done: '薄荷电玩小友 说：完成啦！',
    },
  },
]

function isPetId(value: string): value is PetId {
  return PETS.some(pet => pet.id === value)
}

function readPetId(): PetId {
  try {
    const value = window.localStorage.getItem(PET_KEY)
    return value !== null && isPetId(value) ? value : DEFAULT_PET.id
  } catch {
    return DEFAULT_PET.id
  }
}

function writePetId(petId: PetId): void {
  try {
    window.localStorage.setItem(PET_KEY, petId)
  } catch {
    // Storage is optional; the selected pet still works for this mount.
  }
}

function readPosition(): Position | null {
  try {
    const raw = window.localStorage.getItem(POSITION_KEY)
    if (raw === null) return null
    const value = JSON.parse(raw) as Partial<Position>
    return typeof value.left === 'number' && typeof value.top === 'number'
      ? { left: value.left, top: value.top }
      : null
  } catch {
    return null
  }
}

function writePosition(position: Position): void {
  try {
    window.localStorage.setItem(POSITION_KEY, JSON.stringify(position))
  } catch {
    // Storage is optional; dragging still works when the browser blocks it.
  }
}

function modeFromSession(running: boolean | undefined, pending: boolean, completed: boolean): PetMode {
  if (pending) return 'attention'
  if (running) return 'working'
  if (completed) return 'done'
  return 'idle'
}

function framePosition(frame: number): string {
  const column = frame % 4
  const row = Math.floor(frame / 4)
  return `${column * 100 / 3}% ${row * 100 / 2}%`
}

/**
 * Frame-wide draggable companion. It reads only the global session summary;
 * all presentation state remains local to the component and disappears with
 * the overlay registration.
 */
export function DesktopPet({ useSessions, useSessionStatus }: DesktopPetProps) {
  const currentSession = useSessions((state) => Object.values(state.byId)
    .find(session => (session.retainedBy.mainView ?? 0) > 0))
  const currentStatus = useSessionStatus((statuses) =>
    currentSession === undefined ? undefined : statuses.get(currentSession.id))
  const mode = modeFromSession(
    currentStatus?.running,
    currentStatus?.pendingInteraction !== undefined,
    currentStatus?.completionUnread === true,
  )
  const sessionTitle = currentSession?.displayTitle
  const [frameIndex, setFrameIndex] = useState(0)
  const [petId, setPetId] = useState<PetId>(readPetId)
  const [minimized, setMinimized] = useState(false)
  const [position, setPosition] = useState<Position | null>(readPosition)
  const [dragging, setDragging] = useState(false)
  const drag = useRef<{ offsetX: number; offsetY: number; moved: boolean } | null>(null)
  const pet = PETS.find(value => value.id === petId) ?? DEFAULT_PET

  useEffect(() => {
    setFrameIndex(0)
    const frames = FRAMES[mode]
    if (frames.length < 2) return
    const timer = window.setInterval(() => {
      setFrameIndex(value => (value + 1) % frames.length)
    }, 2200)
    return () => { window.clearInterval(timer) }
  }, [mode])

  const currentFrame = FRAMES[mode][frameIndex] ?? 0
  const spriteStyle = {
    '--dsh-desktop-pet-sprite': `url(${pet.spriteUrl})`,
    backgroundPosition: framePosition(currentFrame),
  } as CSSProperties
  const status = pet.labels[mode]

  const onNextPet = (): void => {
    const currentIndex = PETS.findIndex(value => value.id === pet.id)
    const next = PETS[(currentIndex + 1) % PETS.length] ?? DEFAULT_PET
    setPetId(next.id)
    writePetId(next.id)
  }

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>): void => {
    if ((event.target as HTMLElement).closest('button')) return
    const rect = event.currentTarget.getBoundingClientRect()
    drag.current = {
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
      moved: false,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    setDragging(true)
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>): void => {
    const active = drag.current
    if (active === null) return
    const rect = event.currentTarget.getBoundingClientRect()
    active.moved = active.moved || Math.abs(event.movementX) > 1 || Math.abs(event.movementY) > 1
    const left = Math.max(8, Math.min(window.innerWidth - rect.width - 8, event.clientX - active.offsetX))
    const top = Math.max(8, Math.min(window.innerHeight - rect.height - 8, event.clientY - active.offsetY))
    setPosition({ left, top })
  }

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>): void => {
    const active = drag.current
    drag.current = null
    setDragging(false)
    if (active !== null && !active.moved) return
    if (active !== null) {
      const rect = event.currentTarget.getBoundingClientRect()
      const next = {
        left: Math.max(8, Math.min(window.innerWidth - rect.width - 8, rect.left)),
        top: Math.max(8, Math.min(window.innerHeight - rect.height - 8, rect.top)),
      }
      setPosition(next)
      writePosition(next)
    }
  }

  const style = position === null
    ? undefined
    : { left: position.left, top: position.top, right: 'auto', bottom: 'auto' }

  return (
    <div
      className={css.root}
      data-dragging={dragging || undefined}
      data-minimized={minimized || undefined}
      data-pet-id={pet.id}
      style={style}
      aria-label={`${status}${sessionTitle === undefined ? '' : `：${sessionTitle}`}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <button
        type="button"
        className={`${css.actionButton} ${css.switcher}`}
        aria-label="更换桌宠"
        onClick={onNextPet}
      >
        ↻
      </button>
      <button
        type="button"
        className={`${css.actionButton} ${css.minimize}`}
        aria-label={minimized ? '展开桌宠' : '缩小桌宠'}
        onClick={() => { setMinimized(value => !value) }}
      >
        {minimized ? '+' : '−'}
      </button>
      <div
        className={css.sprite}
        role="img"
        aria-label={status}
        style={spriteStyle}
      />
      {!minimized && (
        <div className={css.bubble} aria-live="polite">
          <strong>{status}</strong>
          <span>拖我到喜欢的位置</span>
        </div>
      )}
    </div>
  )
}

/** Overlay wrapper that reacts to the live Plugins page setting. */
export function DesktopPetOverlay(props: DesktopPetOverlayProps) {
  const enabled = props.useDesktopPetSettings(snapshot => snapshot.enabled)
  return enabled ? <DesktopPet {...props} /> : null
}
