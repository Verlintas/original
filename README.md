# Original

`https://original.wales` — A cornerstone for files, references, and tools.

中文名「基石」：站点全英文，不在页面展示；定位是长期、稳定的基础站点。

- 技术：Astro（静态输出），零客户端框架；STATUS/UNIVERSE/CLI 使用原生 JS
- 风格：白底红字；现代无衬线、全宽网格、卡片与 pill 导航；◯ 标志直径 = 相邻大写字母帽高
- 例外：CLI 是独立的全屏窗口，黑底红字
- 部署：GitHub Actions 构建 → GitHub Pages 托管（自定义域名，强制 HTTPS）

## 页面

| 路径 | 说明 |
|---|---|
| `/` | MAIN：hero + 统计 + 文件 + 工具 + 状态 + 关于摘要 |
| `/status/` | STATUS：GitHub 平台状态、站点可达性、GitHub 项目动态、外链 |
| `/files/` | FILES：许可证原文、版权头、政策/治理模板（44 份；类别 chips + 标签 + 全文检索） |
| `/files/<slug>/` | 文件详情：摘要、元数据、标签、SHA-256、下载 |
| `/universe/` | UNIVERSE：工具索引（每个工具独立子页面） |
| `/universe/checksum/` | SHA-256 校验器 |
| `/universe/json/` | JSON 校验/格式化/压缩 |
| `/universe/license-compare/` | 16 种许可证特征比较（权限/条件/限制） |
| `/about/` | ABOUT：站点、维护者、文件维护方式、FAQ |
| `/cli/` | CLI：全屏终端（隐藏页，不在导航中；页脚与 ABOUT 有人类入口） |
| `/404.html` | 自定义报错页（显示请求路径；`noindex`） |
| `/index.json` | 全站机器可读索引（文件、链接、区块、工具） |
| `/search.json` | 全文搜索索引 |
| `/llms.txt` | llms.txt 标准描述，供 AI Agent 读取 |
| `/rss.xml` | 文件更新订阅 |

隐藏页：`/cli/` 与 404 页不进入导航，且被排除在 sitemap 之外；CLI 页额外标记 `noindex`。

## FILES 内容库

当前 44 份，全部为 TXT，带真实大小与 SHA-256：

- **LICENSES（16）**：MIT、Apache-2.0、GPL-2.0、GPL-3.0、LGPL-3.0、AGPL-3.0、MPL-2.0、EPL-2.0、EUPL-1.2、ISC、0BSD、Zlib、BSL-1.0、BSD-3-Clause、Unlicense、CC0-1.0
- **HEADERS（8）**：MIT、Apache、GPL、LGPL、AGPL、MPL、SPDX、短标识符合集
- **POLICIES（10）**：网站/App 隐私政策、Cookie 政策、服务条款、EULA、可接受使用政策、无障碍声明、DMCA 通知、开源声明、security.txt
- **GOVERNANCE（10）**：Contributor Covenant 行为准则、DCO 1.1、贡献指南、安全政策、个人 CLA、项目治理、AI 贡献政策、Issue/PR 模板、代码评审政策、发布政策

检索与分类：

- 搜索框：匹配标题、摘要、标签
- 类别 chips：All / Licenses / Headers / Policies / Governance（数量实时更新）
- 标签下拉：PERMISSIVE、COPYLEFT、WEAK COPYLEFT、PUBLIC DOMAIN、PRIVACY、TERMS、SECURITY、ACCESSIBILITY 等
- URL 可分享：`/files/?q=privacy`、`/files/?category=LICENSES&tag=COPYLEFT`
- 详情页的类别与每个标签都可点击回到筛选结果

## UNIVERSE 工具

每个工具独立页面，索引数据在 `src/data/tools.ts`（首页、UNIVERSE、CLI、`index.json` 共用）：

- **CHECKSUM**：Web Crypto 计算 SHA-256，本地处理
- **JSON**：校验、格式化、压缩
- **LICENSE COMPARE**：16 种许可证的特征矩阵；数据来自 [Choose a License](https://choosealicense.com/appendix/)，默认选 5 种，可切换任意组合；“Only differences” 隐藏相同项；选择状态写入 `?licenses=`，可分享/可被脚本读取

新增工具：在 `src/pages/universe/` 建子页面，并在 `src/data/tools.ts` 增加条目（name/url/description）即可同步到首页、索引与机器接口。

## 本地开发

```sh
npm install          # 国内网络慢可加 --registry=https://registry.npmmirror.com
npm run dev          # http://localhost:4321
npm run build        # 构建到 dist/
npm run preview      # 预览构建产物
```

## 新增一个文件

1. 把文件本体放进 `public/files/<category>/<name>.<ext>`（建议单文件 < 20 MB；大文件放 GitHub Releases 并填 `external`）。
2. 在 `src/content/files/` 新建同名条目的 Markdown（slug 即文件名，不要带点号）：

```yaml
---
title: MY TEMPLATE              # 站点上全大写显示
category: POLICIES              # LICENSES / HEADERS / POLICIES / GOVERNANCE
date: 2026-10-17
version: '1.0'
format: TXT
size: 3.5 KB                    # 写实际大小
license: CC0-1.0                # 许可证原文可写 CANONICAL TEXT
sha256: <shasum -a 256 文件>
file: /files/policies/my-template.txt
source: https://example.com/original-source   # 可选：来源
tags: [PRIVACY, GDPR]                         # 用于 FILES 筛选与 CLI files <tag>
summary: 一句话摘要，用于列表、RSS、CLI、llms.txt。
---

正文：使用说明、注意事项、来源链接。
```

3. 提交并推送 `main`，Actions 自动构建部署；首页、FILES、RSS、CLI、`index.json`、`search.json`、`llms.txt` 全部自动更新。

校验值：`shasum -a 256 文件名`；大小：`wc -c 文件名`。

## STATUS 页

- 每次打开页面在浏览器端实时检查：
  - GitHub 平台状态（`githubstatus.com` API，含 API/Actions/Pages/Git Operations 组件）
  - 站点可达性（`src/data/sites.ts` 中配置，`no-cors` 请求，显示延迟）
  - GitHub 项目动态（`api.github.com`，未认证请求限 60 次/小时/IP；展示最近 8 个仓库）
  - 外链列表（`src/data/links.ts`，含邮箱与 GitHub）
- 无需构建期任务；点 `[ REFRESH ]` 重新检查。无 JS 时降级为静态链接。

## CLI 与 AI Agent

独立全屏窗口，黑底红字；`exit` 或 `Esc` 返回站点。

```
help [command]           ls [-l] [path]        cd <path>           pwd
tree                     files [category|tag]  cat <file>          read <file>
head <file> [n]          tail <file> [n]       search <term>       verify <file>
download <file>          open <section|file|url>                   status
links                    tools                 contact             stats
about                    date                  whoami              source
history                  clear                 exit                echo <text>
```

- 虚拟文件系统（`cd` / `ls` / `pwd` / `tree`）、Tab 补全、历史记录（↑/↓）、Ctrl+L 清屏
- `files <category|tag>` 可按类别或标签筛选（如 `files COPYLEFT`）；`cat` 显示标签
- `search` 使用 `/search.json`（构建时生成的全文索引，同时匹配标题/摘要/标签）；`verify` 在浏览器端下载文件并比对 SHA-256
- 任意命令加 `--json` 输出机器可读结果，例如 `/cli/?cmd=cat%20mit-license%20--json`
- 直接执行：`/cli/?cmd=ls`；多条命令用 `%3B` 分隔，如 `?cmd=cd%20files%3Bls%20-l`
- 机器索引：`/index.json`（相对路径 + `site` + `generated` + 每文件 `bytes` + `tools`）
- 站点描述与命令列表：`/llms.txt`

## 联系与版权

- 邮箱：`contact@original.wales`（**需在域名邮箱或转发服务中配置后才会收信**）
- GitHub：`https://github.com/Verlintas`
- 版权：`© Verlintas`；favicon 为透明背景的红色空心圆

## 内容来源

- **16 份许可证原文**均取自 SPDX License List（`spdx/license-list-data`），未改写正文
- **Contributor Covenant 2.1** 取自 contributor-covenant.org（CC BY 4.0）；**DCO 1.1** 取自 developercertificate.org（逐字复制）
- **许可证对比数据**取自 Choose a License（GitHub 官方项目）
- **版权头**依据 Apache License 附录、MPL Exhibit A、GNU How-To、SPDX/REUSE 规范整理
- **政策/合规模板**参考：
  - 隐私：GDPR Art.13–14、ICO、CCPA/CPRA、Google Play 隐私政策与数据安全要求
  - Cookie：ICO cookies 指南、ePrivacy Directive
  - 条款/EULA：EU Consumer Rights Directive、Apple/Google 商店条款
  - 可接受使用：UK Computer Misuse Act、CFAA
  - 无障碍：W3C WCAG 2.2 / WAI 声明指南、EU Web Accessibility Directive
  - DMCA：17 U.S.C. §512、U.S. Copyright Office
  - 开源声明：SPDX、REUSE、Apache NOTICE、CycloneDX
  - security.txt：RFC 9116
  - 贡献/治理：Open Source Guides、GitHub Docs、Google Code Review、Semantic Versioning、Keep a Changelog
- 所有模板均标注 “not legal advice”；使用前请自行审查

## 部署（已完成）

- 仓库：`Verlintas/original`（公开）
- Pages：Source = GitHub Actions；Custom domain = `original.wales`；Enforce HTTPS 已开启
- DNS（Spaceship）：`@` 的 4 条 A 记录指向 GitHub Pages IP；`verlintas.dev` 不受影响
- 推送到 `main` 即自动部署；证书由 GitHub 自动签发/续期
