import type { SettingsScope, SnapshotStore } from '@deepseek-ai/dsh-client-runtime/client'
import { createSnapshotStore } from '@deepseek-ai/dsh-client-runtime/client'

export interface DesktopPetSettings {
  enabled?: boolean
}

export interface DesktopPetSettingsState {
  available: boolean
  writable: boolean
  enabled: boolean
  draftEnabled: boolean
  dirty: boolean
  saving: boolean
  failed: boolean
}

export interface DesktopPetSettingsFace {
  hooks: {
    desktopPetSettings: SnapshotStore<DesktopPetSettingsState>
  }
  editEnabled: (value: boolean) => void
  save: () => void
  discard: () => void
}

/** Small staged form used by the plugin card and the overlay gate. */
export class DesktopPetSettingsController {
  private draftEnabled: boolean | undefined
  private saving = false
  private failed = false
  private readonly store: SnapshotStore<DesktopPetSettingsState>
  private readonly unsubscribe: () => void

  constructor(private readonly scope: SettingsScope<DesktopPetSettings>) {
    this.store = createSnapshotStore(this.snapshot())
    this.unsubscribe = scope.subscribe(() => { this.publish() })
  }

  dispose(): void {
    this.unsubscribe()
  }

  private snapshot(): DesktopPetSettingsState {
    const snapshot = this.scope.getSnapshot()
    const enabled = snapshot.value?.enabled ?? true
    const draftEnabled = this.draftEnabled ?? enabled
    return {
      available: snapshot.status === 'ready',
      writable: snapshot.writable,
      enabled,
      draftEnabled,
      dirty: this.draftEnabled !== undefined && this.draftEnabled !== enabled,
      saving: this.saving,
      failed: this.failed,
    }
  }

  private publish(): void {
    this.store.set(this.snapshot())
  }

  private async saveSettings(): Promise<void> {
    const value = this.draftEnabled
    if (value === undefined || this.saving || !this.snapshot().writable) return
    this.saving = true
    this.failed = false
    this.publish()
    await this.scope.set('enabled', value)
    const accepted = this.scope.getSnapshot().value?.enabled ?? true
    this.saving = false
    if (accepted === value) this.draftEnabled = undefined
    else this.failed = true
    this.publish()
  }

  inject(): DesktopPetSettingsFace {
    return {
      hooks: { desktopPetSettings: this.store },
      editEnabled: (value) => {
        this.draftEnabled = value
        this.failed = false
        this.publish()
      },
      save: () => { void this.saveSettings() },
      discard: () => {
        this.draftEnabled = undefined
        this.failed = false
        this.publish()
      },
    }
  }
}
