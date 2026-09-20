import type { SnapshotStore } from '@deepseek-ai/dsh-client-store'
import { createSnapshotStore } from '@deepseek-ai/dsh-client-store'
import type { SettingsScope } from '@deepseek-ai/dsh-client-ui-settings/client'

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
  private saveTask: Promise<void> | undefined
  private readonly store: SnapshotStore<DesktopPetSettingsState>
  private readonly unsubscribe: () => void

  constructor(private readonly scope: SettingsScope<DesktopPetSettings>) {
    this.store = createSnapshotStore(this.snapshot())
    this.unsubscribe = scope.subscribe(() => { this.publish() })
  }

  async dispose(): Promise<void> {
    this.unsubscribe()
    await this.saveTask
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
    try {
      await this.scope.set('enabled', value)
      const accepted = this.scope.getSnapshot().value?.enabled ?? true
      if (accepted === value) this.draftEnabled = undefined
      else this.failed = true
    } catch {
      this.failed = true
    } finally {
      this.saving = false
      this.publish()
    }
  }

  inject(): DesktopPetSettingsFace {
    return {
      hooks: { desktopPetSettings: this.store },
      editEnabled: (value) => {
        this.draftEnabled = value
        this.failed = false
        this.publish()
      },
      save: () => {
        const task = this.saveSettings()
        this.saveTask = task
        void task
      },
      discard: () => {
        this.draftEnabled = undefined
        this.failed = false
        this.publish()
      },
    }
  }
}
