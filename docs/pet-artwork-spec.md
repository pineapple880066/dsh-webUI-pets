# Pet Artwork Specification / 桌宠图片制作规范

English version / 英文版

This document defines the image format and sprite-sheet layout required to add a desktop pet to DSH WebUI Pets.

## Required image format

| Item | Requirement |
| --- | --- |
| File type | PNG only for runtime assets |
| Color | RGBA, with an alpha channel |
| Background | Transparent; do not bake in a white or colored background |
| Canvas size | 1448 × 1086 pixels |
| Grid | 4 columns × 3 rows |
| Cell size | 362 × 362 pixels per frame |
| File size | Keep each file below 1 MB when possible |
| Content bounds | Keep the character inside its own cell; do not draw across grid lines |

The current CSS displays each sheet as a 4 × 3 background grid. A different canvas or grid size requires a matching change to the sprite sizing and frame-position code.

## Frame order

Frames are numbered from left to right, then top to bottom:

| Index | Recommended pose | Current runtime use |
| ---: | --- | --- |
| 0 | Idle | Idle animation |
| 1 | Blink | Idle animation |
| 2 | Happy | Reserved for future state animation |
| 3 | Working | Working state |
| 4 | Thinking | Reserved for future state animation |
| 5 | Sleeping | Reserved for future state animation |
| 6 | Attention / waiting for confirmation | Attention state |
| 7 | Waving | Reserved for future state animation |
| 8 | Celebrating | Reserved for future state animation |
| 9 | Done | Completed state |
| 10 | Tired | Reserved for future state animation |
| 11 | Bow | Reserved for future state animation |

The current component cycles frames 0 and 1 while idle, and selects frames 3, 6, and 9 for working, attention, and completed sessions. The other cells are still part of the asset contract and can be enabled by extending the state-to-frame mapping.

## Naming and placement

Use a lowercase kebab-case pet ID and match the filename:

    packages/client/ui-desktop-pet/assets/<pet-id>-sprite.png

Examples:

    doki-sprite.png
    crimson-hat-sprite.png
    blue-ribbon-sprite.png
    blue-mermaid-sprite.png

Keep the character scale, feet baseline, and visual center consistent across all 12 cells. A transparent inner margin of about 24 pixels is recommended so hair, accessories, and effects do not touch the cell edge.

## Adding a new pet

1. Prepare a 1448 × 1086 RGBA PNG with the 12 cells in the order above.
2. Add the file to packages/client/ui-desktop-pet/assets/.
3. Add the pet ID to the PetId type and add a matching entry to the PETS list in src/client/DesktopPet.tsx.
4. Add bilingual status labels for idle, working, attention, and done.
5. Run the client tests and confirm the new asset is served from the client-module asset route.

The runtime URL is:

    /plugins/@deepseek-ai/dsh-client-ui-desktop-pet/assets/<pet-id>-sprite.png

## Quality checklist

- The PNG opens with transparent pixels around the character.
- The image is exactly 1448 × 1086 pixels.
- Every cell is exactly 362 × 362 pixels.
- No pose crosses into a neighboring cell.
- All poses use a consistent scale and baseline.
- The file name matches the pet ID and uses the suffix -sprite.png.
- The asset is included by the package files configuration.

---

## 中文版

本文规定了为 DSH WebUI Pets 添加桌宠时所需的图片格式和组图布局。

## 图片格式要求

| 项目 | 要求 |
| --- | --- |
| 文件格式 | 运行时只使用 PNG |
| 颜色模式 | RGBA，必须带 Alpha 透明通道 |
| 背景 | 透明背景，不要把白色或其他颜色背景烘焙进图片 |
| 画布尺寸 | 1448 × 1086 像素 |
| 组图网格 | 4 列 × 3 行 |
| 单帧尺寸 | 每帧 362 × 362 像素 |
| 文件大小 | 尽量控制在 1 MB 以内 |
| 内容边界 | 角色必须在自己的单元格内，不能画到网格线外 |

当前 CSS 按 4 × 3 背景网格显示组图。如果修改画布尺寸或网格数量，需要同步修改精灵图尺寸和帧位置代码。

## 帧顺序

组图按照“从左到右、从上到下”的顺序编号：

| 编号 | 推荐姿势 | 当前运行时使用情况 |
| ---: | --- | --- |
| 0 | 待机 | 空闲动画 |
| 1 | 眨眼 | 空闲动画 |
| 2 | 开心 | 预留，后续状态动画可用 |
| 3 | 工作 | 工作状态 |
| 4 | 思考 | 预留，后续状态动画可用 |
| 5 | 睡觉 | 预留，后续状态动画可用 |
| 6 | 注意／等待确认 | 等待确认状态 |
| 7 | 挥手 | 预留，后续状态动画可用 |
| 8 | 庆祝 | 预留，后续状态动画可用 |
| 9 | 完成 | 完成状态 |
| 10 | 疲惫 | 预留，后续状态动画可用 |
| 11 | 鞠躬 | 预留，后续状态动画可用 |

当前组件在空闲时循环第 0、1 帧，在工作、等待确认和完成时分别使用第 3、6、9 帧。其余单元格仍属于素材规范的一部分，后续可以扩展状态到帧的映射。

## 命名和放置位置

使用小写 kebab-case 桌宠 ID，并让文件名与 ID 对应：

    packages/client/ui-desktop-pet/assets/<pet-id>-sprite.png

示例：

    doki-sprite.png
    crimson-hat-sprite.png
    blue-ribbon-sprite.png
    blue-mermaid-sprite.png

12 个单元格中的角色比例、脚部基线和视觉中心要保持一致。建议角色与单元格边缘保留约 24 像素的透明内边距，避免头发、配饰或特效贴到边缘。

## 添加新桌宠

1. 准备一张 1448 × 1086 的 RGBA PNG，并按上面的 12 帧顺序排列。
2. 将图片放入 packages/client/ui-desktop-pet/assets/。
3. 在 src/client/DesktopPet.tsx 的 PetId 类型中加入桌宠 ID，并在 PETS 列表中加入对应条目。
4. 为待机、工作、等待确认和完成状态添加中英双语提示文字。
5. 运行客户端测试，并确认新图片可以通过客户端插件素材路由访问。

运行时素材地址为：

    /plugins/@deepseek-ai/dsh-client-ui-desktop-pet/assets/<pet-id>-sprite.png

## 质量检查清单

- PNG 打开后，角色周围是透明像素。
- 图片尺寸准确为 1448 × 1086 像素。
- 每个单元格准确为 362 × 362 像素。
- 任何姿势都没有越过相邻单元格。
- 所有姿势的比例和脚部基线一致。
- 文件名与桌宠 ID 对应，并使用 -sprite.png 后缀。
- 图片会被 package.json 的 files 配置包含。
