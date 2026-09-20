import { createSnapshotStore } from '@deepseek-ai/dsh-client-store';
/** Small staged form used by the plugin card and the overlay gate. */
export class DesktopPetSettingsController {
    scope;
    draftEnabled;
    saving = false;
    failed = false;
    saveTask;
    store;
    unsubscribe;
    constructor(scope) {
        this.scope = scope;
        this.store = createSnapshotStore(this.snapshot());
        this.unsubscribe = scope.subscribe(() => { this.publish(); });
    }
    async dispose() {
        this.unsubscribe();
        await this.saveTask;
    }
    snapshot() {
        const snapshot = this.scope.getSnapshot();
        const enabled = snapshot.value?.enabled ?? true;
        const draftEnabled = this.draftEnabled ?? enabled;
        return {
            available: snapshot.status === 'ready',
            writable: snapshot.writable,
            enabled,
            draftEnabled,
            dirty: this.draftEnabled !== undefined && this.draftEnabled !== enabled,
            saving: this.saving,
            failed: this.failed,
        };
    }
    publish() {
        this.store.set(this.snapshot());
    }
    async saveSettings() {
        const value = this.draftEnabled;
        if (value === undefined || this.saving || !this.snapshot().writable)
            return;
        this.saving = true;
        this.failed = false;
        this.publish();
        try {
            await this.scope.set('enabled', value);
            const accepted = this.scope.getSnapshot().value?.enabled ?? true;
            if (accepted === value)
                this.draftEnabled = undefined;
            else
                this.failed = true;
        }
        catch {
            this.failed = true;
        }
        finally {
            this.saving = false;
            this.publish();
        }
    }
    inject() {
        return {
            hooks: { desktopPetSettings: this.store },
            editEnabled: (value) => {
                this.draftEnabled = value;
                this.failed = false;
                this.publish();
            },
            save: () => {
                const task = this.saveSettings();
                this.saveTask = task;
                void task;
            },
            discard: () => {
                this.draftEnabled = undefined;
                this.failed = false;
                this.publish();
            },
        };
    }
}
//# sourceMappingURL=settings-controller.js.map