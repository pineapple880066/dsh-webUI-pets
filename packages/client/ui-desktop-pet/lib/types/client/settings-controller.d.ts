import type { SnapshotStore } from '@deepseek-ai/dsh-client-store';
import type { SettingsScope } from '@deepseek-ai/dsh-client-ui-settings/client';
export interface DesktopPetSettings {
    enabled?: boolean;
}
export interface DesktopPetSettingsState {
    available: boolean;
    writable: boolean;
    enabled: boolean;
    draftEnabled: boolean;
    dirty: boolean;
    saving: boolean;
    failed: boolean;
}
export interface DesktopPetSettingsFace {
    hooks: {
        desktopPetSettings: SnapshotStore<DesktopPetSettingsState>;
    };
    editEnabled: (value: boolean) => void;
    save: () => void;
    discard: () => void;
}
/** Small staged form used by the plugin card and the overlay gate. */
export declare class DesktopPetSettingsController {
    private readonly scope;
    private draftEnabled;
    private saving;
    private failed;
    private saveTask;
    private readonly store;
    private readonly unsubscribe;
    constructor(scope: SettingsScope<DesktopPetSettings>);
    dispose(): Promise<void>;
    private snapshot;
    private publish;
    private saveSettings;
    inject(): DesktopPetSettingsFace;
}
//# sourceMappingURL=settings-controller.d.ts.map