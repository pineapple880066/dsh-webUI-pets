import type { Context as ClientContext } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-client-ui-layout/client'
import type {} from '@deepseek-ai/dsh-client-ui-plugin-manager/client'
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
import type {} from '@deepseek-ai/dsh-client-ui-session/client'
import type {} from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import { DesktopPetOverlay } from './DesktopPet.tsx'
import { DesktopPetSettingsCard } from './DesktopPetSettingsCard.tsx'
import { DesktopPetSettingsController, type DesktopPetSettings } from './settings-controller.ts'

/** Browser services used by the overlay, settings mirror, and plugin card. */
export const inject = ['slots', 'settingsScope']

/** Register the overlay and its settings card without rebuilding the host. */
export function apply(ctx: ClientContext): void {
  const scope = ctx.settingsScope.bind<DesktopPetSettings>({ namespace: 'dsh-desktop-pet' })
  const controller = new DesktopPetSettingsController(scope)
  ctx.effect(() => async () => { await controller.dispose() }, 'dsh-desktop-pet: settings controller')

  ctx.slots.inject('shell.overlay', () => ctx.slots.register({
    name: 'shell.overlay',
    id: 'dsh-desktop-pet',
    order: 60,
    inject: () => controller.inject(),
  }, DesktopPetOverlay))

  ctx.slots.inject('plugins.item', () => ctx.slots.register({
    name: 'plugins.item',
    id: 'dsh-desktop-pet',
    order: 50,
    label: '桌宠 / Desktop pets',
    inject: () => controller.inject(),
  }, DesktopPetSettingsCard))
}
