# @dsh-external/dsh-webui-pets

English | 中文翻译见本文末尾 | [Standalone repository / 独立仓库主页](../../../README.md)

A small Codex-style companion for the DeepSeek Harness Web UI. The plugin registers into the additive shell.overlay slot, so it floats above the three-column shell without replacing any existing surface.

## Features

- Four switchable pets are bundled: Doki, Crimson Flower, Blue Ribbon, and Deep Sea; each has its own 12-frame sprite sheet.
- Each sheet includes idle, blink, happy, working, thinking, sleeping, surprised, waving, celebrating, attention, tired, and bow poses.
- Changes pose from the current session summary: working, waiting for confirmation, completed, or idle.
- The ↻ button cycles pets and persists the selection in browser local storage.
- Drag anywhere on the pet to reposition it; the position is persisted in localStorage.
- The − button minimizes the pet into a small corner companion.
- The PNG asset is served by the client-module route at /plugins/<package>/assets/.
- `Settings → Plugins → Plugin configuration` contains an `Enable desktop pets` switch; changing it persists through the DSH settings service and hot-updates the overlay.

## Pet artwork specification

Use a transparent RGBA PNG sprite sheet sized 1448 × 1086 pixels for a new pet. It must contain a 4 × 3 grid of 362 × 362 pixel frames in the documented pose order. Use a lowercase kebab-case filename ending in -sprite.png and keep each pose inside its own cell.

See the complete bilingual guide at [docs/pet-artwork-spec.md](../../../docs/pet-artwork-spec.md).

The four character sprites were generated from user-provided reference images. Confirm derivative-work and redistribution rights before publishing them publicly.

Install it into the Web profile with `dsh plugin --profile web add link:/absolute/path/to/packages/client/ui-desktop-pet`. The package declares its own `dsh.bundle.patch` and `dsh.client` entry. Then use `Settings → Plugins → Plugin configuration` to enable or disable the pets. No source copy or full dsh rebuild is required.

## Model Experience

None, as the desktop pet renders browser viewing state; it does not add prompt text, tools, or session events.

#### KV Cache effect

None; this package neither assembles nor sends a provider request.

## Known Limitations and Deferred Work

- **Web-surface companion only** — the current implementation floats inside the dsh Web viewport; a native always-on-top window would require a separate desktop host integration.
- **Coarse activity states** — the pet reads the session list's running/pending/completed summary and does not inspect individual tool names or token events.
- **One asset route** — package assets are served only through the client-module route and are not exposed as a general static-file service.

---

## 中文翻译

这是一个面向 DeepSeek Harness Web UI 的、类似 Codex 的桌宠悬浮插件。插件注册到可叠加的 shell.overlay 槽位，悬浮在三栏界面上方，不会替换现有页面。

## 功能

- 内置四个可切换的桌宠：Doki、赤花小友、蓝缎小友和深海小友；每个角色都有一张 12 帧组图。
- 每张组图包含待机、眨眼、开心、工作、思考、睡觉、惊讶、挥手、庆祝、注意、疲惫和鞠躬姿势。
- 根据当前会话的运行、等待确认、完成和空闲状态切换姿势。
- 点击 ↻ 可以更换桌宠，选择会保存到浏览器本地存储。
- 拖动桌宠即可移动位置，并保存到 localStorage。
- − 按钮可以把桌宠缩小成角落里的小伙伴。
- PNG 素材通过 /plugins/<package>/assets/ 客户端插件路由提供。

## 桌宠图片制作规范

新增桌宠使用透明背景的 RGBA PNG 组图，尺寸为 1448 × 1086 像素，包含按规范顺序排列的 4 × 3 帧，每帧 362 × 362 像素。文件名使用小写 kebab-case，并以 -sprite.png 结尾；每个姿势都要放在自己的单元格内。

完整的中英文制作说明见 [docs/pet-artwork-spec.md](../../../docs/pet-artwork-spec.md)。

素材由用户提供的角色参考图生成，发布到公共仓库前请确认相应的二创和分发授权。

使用 `dsh plugin --profile web add link:/absolute/path/to/packages/client/ui-desktop-pet` 安装即可。包内已经声明自己的 `dsh.bundle.patch` 和 `dsh.client` 入口；然后在 `设置 → 插件 → 插件配置` 中启用或关闭桌宠。不需要复制源码，也不需要重新构建整个 dsh。

## 模型体验

无。桌宠只展示浏览器侧的查看状态，不会增加 prompt 文本、工具或会话事件。

#### KV Cache 影响

无。本包既不组装也不发送 provider 请求。

## 已知限制与后续工作

- **仅支持 Web 视图**——当前实现悬浮在 dsh Web 页面内；原生置顶窗口需要额外的桌面端宿主集成。
- **活动状态较粗**——桌宠读取会话列表的运行／等待确认／完成摘要，不解析具体工具名或 token 事件。
- **单一素材路由**——包内素材只通过客户端模块路由提供，不构成通用静态文件服务。
