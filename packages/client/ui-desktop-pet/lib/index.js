import z from "@deepseek-ai/schemastery";
import { installSettingsSection, settingsNamespace } from "@deepseek-ai/dsh-settings";
//#region lib/types/index.js
/** Desktop pet Host half: settings registration for the Web UI browser half. */
/** Loader-visible plugin identity. */
const name = "dsh-desktop-pet";
/** Settings namespace consumed by the browser card and overlay gate. */
const DESKTOP_PET_SETTINGS_NAMESPACE = settingsNamespace("dsh-desktop-pet");
/** The setting has a default so a fresh install starts visible. */
const Config = z.object({ enabled: z.boolean().default(true) });
const inject = ["settings"];
/** Register the durable settings namespace; browser changes are read live. */
function apply(ctx, config) {
	installSettingsSection(ctx, DESKTOP_PET_SETTINGS_NAMESPACE, Config, { enabled: config.enabled ?? true }, {
		setSource: () => {},
		onChange: () => {}
	});
}
//#endregion
export { Config, DESKTOP_PET_SETTINGS_NAMESPACE, apply, inject, name };
