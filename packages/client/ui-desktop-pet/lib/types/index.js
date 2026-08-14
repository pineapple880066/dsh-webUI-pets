/** Desktop pet Host half: settings registration for the Web UI browser half. */
import z from '@deepseek-ai/schemastery';
import { installSettingsSection, settingsNamespace } from '@deepseek-ai/dsh-settings';
/** Loader-visible plugin identity. */
export const name = 'dsh-desktop-pet';
/** Settings namespace consumed by the browser card and overlay gate. */
export const DESKTOP_PET_SETTINGS_NAMESPACE = settingsNamespace('dsh-desktop-pet');
/** The setting has a default so a fresh install starts visible. */
export const Config = z.object({
    enabled: z.boolean().default(true),
});
export const inject = ['settings'];
/** Register the durable settings namespace; browser changes are read live. */
export function apply(ctx, config) {
    const entry = { enabled: config.enabled ?? true };
    installSettingsSection(ctx, DESKTOP_PET_SETTINGS_NAMESPACE, Config, entry, {
        setSource: () => { },
        onChange: () => { },
    });
}
//# sourceMappingURL=index.js.map