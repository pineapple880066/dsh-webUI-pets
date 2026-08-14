# DSH 桌宠

面向 DeepSeek Harness Web UI 的四个 Codex 风格桌宠（`dsh-plugin`）：Doki、赤花小友、蓝缎小友和深海小友。

插件位于 [`packages/client/ui-desktop-pet`](packages/client/ui-desktop-pet)，注册到 `shell.overlay` 槽位，支持拖拽、缩小和 12 帧组图动画。点击 `↻` 可以循环切换桌宠，选择和位置会保存到浏览器本地存储。

## 接入 dsh

将 `packages/client/ui-desktop-pet` 复制到 dsh 源码仓库，按照插件 README 把它加入客户端 TypeScript solution、Web bundle 依赖和 Web composition patch，即可启用。

## 素材

四套透明组图根据用户提供的角色参考图生成。重新分发角色素材前，请确认相应的二创和分发授权。

## 许可证

插件源代码采用 MIT 许可证。角色素材仍受其参考图相关权利约束，应在获得适当许可后再分发。
