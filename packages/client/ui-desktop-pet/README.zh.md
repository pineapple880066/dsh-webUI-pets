# @deepseek-ai/dsh-client-ui-desktop-pet

[English](README.md) | 中文

一个类似 Codex 桌宠的 DeepSeek Harness Web UI 小伙伴。插件注册到可叠加的 `shell.overlay` 槽位，悬浮在三栏界面上方，不会替换现有页面。

## 功能

- 内置四个可切换的桌宠：Doki、赤花小友、蓝缎小友和深海小友；每个角色都有一张 12 帧组图。
- 每张组图包含待机、眨眼、开心、工作、思考、睡觉、惊讶、挥手、庆祝、注意、疲惫和鞠躬姿势。
- 根据当前会话的运行、等待确认、完成和空闲状态切换姿势。
- 点击 `↻` 可以更换桌宠，选择会保存到浏览器本地存储。
- 拖动桌宠即可移动位置，并保存到 `localStorage`。
- `−` 按钮可以把桌宠缩小成角落里的小伙伴。
- PNG 素材通过 `/plugins/<package>/assets/` 客户端插件路由提供。

素材由用户提供的角色参考图生成，发布到公共仓库前请确认相应的二创和分发授权。

构建客户端 bundle 后，把 `@deepseek-ai/dsh-client-ui-desktop-pet` 挂载到 Web 组合中即可；当前仓库的 Web bundle 默认已启用它。

## Model Experience

None, as the desktop pet renders browser viewing state; it does not add prompt text, tools, or session events.

#### KV Cache effect

None; this package neither assembles nor sends a provider request.

## Known Limitations and Deferred Work

- **仅支持 Web 视图**——当前实现悬浮在 dsh Web 页面内；原生置顶窗口需要额外的桌面端宿主集成。
- **活动状态较粗**——桌宠读取会话列表的运行／等待确认／完成摘要，不解析具体工具名或 token 事件。
- **单一素材路由**——包内素材只通过客户端模块路由提供，不构成通用静态文件服务。
