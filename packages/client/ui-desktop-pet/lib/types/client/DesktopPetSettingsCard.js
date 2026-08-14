import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from './DesktopPetSettingsCard.module.css';
/** Bilingual settings card for the master desktop-pet switch. */
export function DesktopPetSettingsCard(props) {
    const state = props.useDesktopPetSettings(snapshot => snapshot);
    if (!state.available)
        return null;
    const disabled = !state.writable || state.saving;
    return (_jsxs("li", { className: css.card, children: [_jsxs("div", { className: css.header, children: [_jsxs("div", { children: [_jsx("strong", { children: "\u684C\u5BA0 / Desktop pets" }), _jsx("p", { children: "\u7C7B\u4F3C Codex \u7684 Web UI \u684C\u5BA0 / Codex-style Web UI desktop companions" })] }), state.dirty ? _jsx("span", { className: css.pending, children: "\u672A\u4FDD\u5B58 / Unsaved" }) : null] }), _jsxs("label", { className: css.toggle, children: [_jsx("input", { type: "checkbox", checked: state.draftEnabled, disabled: disabled, onChange: (event) => { props.editEnabled(event.target.checked); } }), _jsx("span", { children: "\u542F\u7528\u684C\u5BA0 / Enable desktop pets" })] }), state.failed ? _jsx("p", { className: css.failed, children: "\u4FDD\u5B58\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5 / Save failed; please try again." }) : null, _jsxs("div", { className: css.actions, children: [_jsx("button", { type: "button", disabled: !state.dirty || disabled, onClick: props.discard, children: "\u653E\u5F03\u4FEE\u6539 / Discard" }), _jsx("button", { type: "button", disabled: !state.dirty || disabled, onClick: props.save, children: state.saving ? '保存中… / Saving…' : '保存 / Save' })] })] }));
}
//# sourceMappingURL=DesktopPetSettingsCard.js.map