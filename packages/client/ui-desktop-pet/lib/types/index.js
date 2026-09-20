/** Desktop pet Host half: settings registration and package-owned assets. */
import z from '@deepseek-ai/schemastery';
import { DESKTOP_PET_ASSET_ROUTE, serveDesktopPetAsset } from "./assets.js";
/** Loader-visible plugin identity. */
export const name = 'dsh-desktop-pet';
/** Settings namespace consumed by the browser card and overlay gate. */
export const DESKTOP_PET_SETTINGS_NAMESPACE = 'dsh-desktop-pet';
/** The setting has a default so a fresh install starts visible. */
export const Config = z.object({
    enabled: z.boolean().default(true),
});
export const inject = ['settings', 'webServer'];
/** Register the durable settings namespace; browser changes are read live. */
export function apply(ctx, config) {
    const entry = { enabled: config.enabled ?? true };
    ctx.settings.register(DESKTOP_PET_SETTINGS_NAMESPACE, Config, { base: entry });
    ctx.effect(() => ctx.webServer.register({
        kind: 'prefix',
        path: DESKTOP_PET_ASSET_ROUTE,
        handler: serveDesktopPetAsset,
    }), 'dsh-desktop-pet: sprite assets');
}
//# sourceMappingURL=index.js.map