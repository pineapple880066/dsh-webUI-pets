import { DesktopPetOverlay } from "./DesktopPet.js";
import { DesktopPetSettingsCard } from "./DesktopPetSettingsCard.js";
import { DesktopPetSettingsController } from "./settings-controller.js";
/** Browser services used by the overlay, settings mirror, and plugin card. */
export const inject = ['slots', 'settingsScope'];
/** Register the overlay and its settings card without rebuilding the host. */
export function apply(ctx) {
    const scope = ctx.settingsScope.bind({ namespace: 'dsh-desktop-pet' });
    const controller = new DesktopPetSettingsController(scope);
    ctx.effect(() => async () => { await controller.dispose(); }, 'dsh-desktop-pet: settings controller');
    ctx.slots.inject('shell.overlay', () => ctx.slots.register({
        name: 'shell.overlay',
        id: 'dsh-desktop-pet',
        order: 60,
        inject: () => controller.inject(),
    }, DesktopPetOverlay));
    ctx.slots.inject('plugins.item', () => ctx.slots.register({
        name: 'plugins.item',
        id: 'dsh-desktop-pet',
        order: 50,
        label: '桌宠 / Desktop pets',
        inject: () => controller.inject(),
    }, DesktopPetSettingsCard));
}
//# sourceMappingURL=index.js.map