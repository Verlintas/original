# Original

`https://original.wales` — 白底红字、以文字为主的资料存放 / 展示 / 分发站点。

- 技术：Astro（纯静态输出，无客户端 JavaScript），无外部字体、无追踪
- 部署：GitHub Actions 构建 → GitHub Pages 托管
- 设计规则（详见站内 COLOPHON 页）：
  - 只允许白色与红系颜色（`#cc0000` / `#7d0000` / `#a80000` / `#f0d2d2` / `#fdf5f5`）
  - 标志为红色空心圆 ◯，直径等于相邻大写字母的帽高（`1cap`），圆底对齐基线
  - 格式：`◯ TITLE`（◯ 后一个空格）；文件标题、小节标题全大写；站名 `Original` 保持首字母大写

## 本地开发

```sh
npm install          # 国内网络慢可加 --registry=https://registry.npmmirror.com
npm run dev          # 本地预览 http://localhost:4321
npm run build        # 构建到 dist/
npm run preview      # 预览构建产物
```

## 目录结构

```
src/
  content.config.ts        内容集合定义（files / notes 的字段结构）
  content/files/*.md       每个资料 = 一个 md（frontmatter 存元数据）
  content/notes/*.md       每篇随笔 = 一个 md
  data/links.ts            LINKS 页的外链清单
  components/              Circle(◯) / BaseLayout / Header / Footer / FileEntry
  pages/                   所有页面（index、files、notes、links、about、colophon、404、rss）
  styles/global.css        全部样式与色板（改颜色只需改这里的 CSS 变量）
public/
  CNAME                    自定义域名（original.wales）
  files/                   随仓库分发的小文件
  favicon.svg / robots.txt
.github/workflows/deploy.yml  推送到 main 自动构建并部署
```

## 新增一份资料

1. 在 `src/content/files/` 新建 `my-file.md`，frontmatter 示例：

```yaml
---
title: MY FILE TITLE        # 全大写
category: DOCUMENTS         # DOCUMENTS / TOOLS / MEDIA / ARCHIVE
date: 2026-10-16
version: '1.0'
format: PDF
size: 1.2 MB
license: CC BY 4.0
sha256: <可选，文件校验值>
file: /files/my-file.pdf    # 小文件：把文件放进 public/files/ 并填这里
external: https://...       # 大文件：传到 GitHub Releases 后填下载链接（可与 file 二选一或都填）
summary: 一句话摘要，会显示在列表和 RSS 里。
---
正文写 Markdown，会渲染到详情页。
```

2. 小文件：把文件本体放进 `public/files/`（单文件建议 < 20 MB）。
3. 大文件：在 GitHub 仓库 Releases 里上传，把下载地址填进 `external`。
4. 提交并推送到 `main`，Actions 自动构建部署，列表 / 首页 / RSS 全部自动更新。

校验值获取：`shasum -a 256 文件名`。

## 部署与 DNS

仓库推送到 GitHub 后：

1. 仓库 Settings → Pages → Source 选 **GitHub Actions**。
2. Custom domain 填 `original.wales`（仓库里已有 `public/CNAME`，二者保持一致）。
3. 到域名商（Spaceship）DNS 设置：
   - 根域名 `original.wales` 的 A 记录改为 GitHub Pages 的四个地址（删掉现有停放记录）：
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - （可选）`www` 的 CNAME 指向 `verlintas.github.io`
4. DNS 生效后（几分钟到 24 小时），回 Pages 设置勾选 **Enforce HTTPS**。

## 现有占位内容

第一版刻意填满了占位结构，方便查看版式；后续按需增删：

- 10 份占位资料（4 份带真实小文件可实际下载，6 份指向 Releases 的占位外链）
- 3 篇占位随笔、6 条外链收藏
- 所有标注 *Placeholder* 的下载链接在发布真实文件前都可以删除或替换
