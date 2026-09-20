import type { InjectFace, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-plugin-manager/client'
import type { DesktopPetSettingsFace } from './settings-controller.ts'
import css from './DesktopPetSettingsCard.module.css'

type DesktopPetSettingsCardProps =
  PropsRuntime<'plugins.item'>
  & InjectFace<DesktopPetSettingsFace>

/** Bilingual settings card for the master desktop-pet switch. */
export function DesktopPetSettingsCard(props: DesktopPetSettingsCardProps) {
  const state = props.useDesktopPetSettings(snapshot => snapshot)
  if (props.view === 'summary') return '类似 Codex 的 Web UI 桌宠 / Codex-style Web UI desktop companions'
  if (!state.available) return <p className={css.failed}>设置暂不可用 / Settings unavailable.</p>
  const disabled = !state.writable || state.saving
  return (
    <div className={css.card}>
      <div className={css.header}>
        <div>
          <strong>桌宠 / Desktop pets</strong>
          <p>类似 Codex 的 Web UI 桌宠 / Codex-style Web UI desktop companions</p>
        </div>
        {state.dirty ? <span className={css.pending}>未保存 / Unsaved</span> : null}
      </div>
      <label className={css.toggle}>
        <input
          type="checkbox"
          checked={state.draftEnabled}
          disabled={disabled}
          onChange={(event) => { props.editEnabled(event.target.checked) }}
        />
        <span>启用桌宠 / Enable desktop pets</span>
      </label>
      {state.failed ? <p className={css.failed}>保存失败，请重试 / Save failed; please try again.</p> : null}
      <div className={css.actions}>
        <button type="button" disabled={!state.dirty || disabled} onClick={props.discard}>
          放弃修改 / Discard
        </button>
        <button type="button" disabled={!state.dirty || disabled} onClick={props.save}>
          {state.saving ? '保存中… / Saving…' : '保存 / Save'}
        </button>
      </div>
    </div>
  )
}
