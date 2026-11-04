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
| `/status/` | STATUS：本站构建信息（提交、时间、语料哈希）、公共基础设施可达性、GitHub 项目动态、外链 |
| `/files/` | FILES：许可证、官方标准、gitignore 片段、版权头、政策/治理模板（86 份；类别 chips + 标签 + 元数据检索） |
| `/guides/` | GUIDES：10 篇面向所有人的 plain-language 指南 |
| `/guides/paths/` | 按受众组织的学习路径（创作者、站长、开发者、研究者、Agent） |
| `/guides/checklists/` | 站点上线、仓库、照片、无障碍、security.txt、许可证清单 |
| `/guides/letters/` | 数据请求、DMCA、无障碍反馈、安全报告等信件模板与填写器 |
| `/guides/directory/` | 公共来源目录（公共领域、标准、开放数据、无障碍、隐私、档案、独立网站） |
| `/guides/transparency/` | 编辑政策、来源验证、更正记录 |
| `/data/` | DATA：5 个公共数据集，JSON + CSV + 页面 |
| `/downloads/` | 全库 ZIP、按类别 ZIP、CSV/Markdown 目录 |
| `/contribute/` | 如何提交来源、纠错、翻译、镜像 |
| `/files/<slug>/` | 文件详情：摘要、全文预览、复制/引用、SHA-256 校验、相关文件、分类/标签页 |
| `/files/<slug>.md` | 文件的 Markdown 版本（元数据 + 正文 + 全文） |
| `/files/kits/` | KITS：可直接下载的 ZIP 套件（开源起步、Agent 仓库、网站政策、许可证包） |
| `/files/category/<name>/` | 静态分类页（LICENSES / STANDARDS / SNIPPETS / …） |
| `/files/tag/<tag>/` | 静态标签页 |
| `/files/recent/` | 全部文件，按更新时间倒序 |
| `/search/` | 全文搜索页（`?q=`），匹配标题、摘要、标签和正文 |
| `/universe/` | UNIVERSE：工具索引（每个工具独立子页面） |
| `/universe/checksum/` | SHA-256 校验器 |
| `/universe/json/` | JSON 校验/格式化/压缩 |
| `/universe/license-compare/` | 16 种常见许可证特征比较（权限/条件/限制） |
| `/universe/license-chooser/` | 4 个问题推荐 2–3 个许可证 |
| `/about/` | ABOUT：站点、维护者、文件维护方式、FAQ |
| `/privacy/` | 站点隐私说明 |
| `/security/` | 站点安全报告范围 |
| `/license/` | 站点版权与复用条款 |
| `/accessibility/` | 无障碍目标与已知限制 |
| `/cli/` | CLI：全屏终端（隐藏页；页脚与 ABOUT 有人类入口） |
| `/AGENTS.md` | Agent 入门：端点、保障、常用任务 |
| `/cli/manual.txt` | 完整 CLI / 静态 API 手册（面向 AI） |
| `/cli/commands.json` | 命令与端点清单（机器可读） |
| `/cli/manifest.tsv` | 文件清单（含校验值与下载地址） |
| `/cli/manifest-sha256.txt` | manifest.tsv 的 SHA-256 |
| `/kits/index.json` | KIT 清单（ZIP 地址、SHA-256、文件列表） |
| `/cli/context/<id>.txt` | 单文件上下文包（元数据+引用+相关+全文） |
| `/cli/cite/<id>.txt` | 单文件引用行 |
| `/cli/licenses.json` | 16 种常见许可证特征矩阵 |
| `/cli/resources.json` | 资源清单（按类别分组，含官方来源标记与校验值） |
| `/404.html` | 自定义报错页（显示请求路径；`noindex`） |
| `/index.json` | 全站机器可读索引（文件、指南、数据、链接、区块、工具、KIT、构建信息） |
| `/search.json` | 全文搜索索引（文件 + 指南） |
| `/llms-full.txt` | 全部文件与指南全文语料 |
| `/llms-small.txt` | 文件与指南的元数据语料 |
| `/feed.json` | JSON Feed 1.1（文件 + 指南） |
| `/opensearch.xml` | OpenSearch 搜索描述 |
| `/guides.json` | 指南元数据 |
| `/data/index.json` | 公共数据集索引 |
| `/downloads/index.json` | 下载包与校验值 |
| `/corrections.json` | 更正记录 |
| `/schemas/*.schema.json` | `index/resources/search/licenses/data` 的 JSON Schema |
| `/llms.txt` | llms.txt 标准描述，供 AI Agent 读取 |
| `/rss.xml` | 文件与指南更新订阅 |

隐藏页：`/cli/` 与 404 页不进入导航，且被排除在 sitemap 之外；CLI 页额外标记 `noindex`。GUIDES 与 DATA 已进入主导航。

## FILES 内容库

当前 86 份：85 份本地纯文本（带真实大小与 SHA-256）+ 1 份外链规范（SPDX 2.3.1）：

- **LICENSES（32）**：MIT、Apache-2.0、GPL-2.0、GPL-3.0、LGPL-3.0、AGPL-3.0、MPL-2.0、EPL-2.0、EUPL-1.2、ISC、0BSD、Zlib、BSL-1.0、BSD-3-Clause、Unlicense、CC0-1.0、Artistic-2.0、OSL-3.0、AFL-3.0、PostgreSQL、Python-2.0、MS-PL、MS-RL、ECL-2.0、UPL-1.0、NCSA，以及 CC BY / BY-SA / BY-NC / BY-ND / BY-NC-SA / BY-NC-ND 4.0
- **STANDARDS（12）**：RFC 2119、RFC 8174、RFC 8259（JSON）、RFC 4180（CSV）、RFC 9116（security.txt）、RFC 3339（时间戳）、RFC 3986（URI）、Semantic Versioning 2.0.0、Conventional Commits 1.0.0、Keep a Changelog 1.1.0、The Open Source Definition、SPDX Specification 2.3.1（外链）
- **SNIPPETS（10）**：GitHub 官方 .gitignore 模板（Node、Python、macOS、Go、Rust、Java、C、C++、Ruby、Terraform）
- **HEADERS（8）**：MIT、Apache、GPL、LGPL、AGPL、MPL、SPDX、短标识符合集
- **POLICIES（10）**：网站/App 隐私政策、Cookie 政策、服务条款、EULA、可接受使用政策、无障碍声明、DMCA 通知、开源声明、security.txt
- **GOVERNANCE（10）**：Contributor Covenant 行为准则、DCO 1.1、贡献指南、安全政策、个人 CLA、项目治理、AI 贡献政策、Issue/PR 模板、代码评审政策、发布政策
- **AGENTS（4）**：AGENTS.md 模板、MCP 配置模板、工具定义 JSON 模板、Agent 评测清单

公共层：

- **GUIDES（10）**：选许可证、理解许可证、隐私政策、无障碍声明、security.txt、验证下载、公共领域、CC 署名、安全报告、上线小站
- **DATA（5）**：HTTP 状态码（62）、MIME 类型（41）、文件签名（30）、ISO 4217 货币（162）、IANA 时区（418）
- **DOWNLOADS（8）**：全库 + 7 个分类 ZIP，带 catalog.csv / catalog.md / SHA-256
- **LETTERS（6）**：数据访问、数据删除、DMCA 删除、DMCA 反通知、无障碍反馈、安全报告
- **DIRECTORY（37）**：公共领域、标准、开放数据、无障碍、隐私安全、档案、独立网站

检索与分类：

- 元数据搜索框：匹配标题、摘要、标签；全文搜索用 `/search/`
- 类别 chips：All / Licenses / Standards / Snippets / Headers / Policies / Governance / Agents（数量实时更新）
- 标签下拉：PERMISSIVE、COPYLEFT、WEAK COPYLEFT、PUBLIC DOMAIN、PRIVACY、TERMS、SECURITY、ACCESSIBILITY、OFFICIAL 等
- URL 可分享：`/files/?q=privacy`、`/files/?category=LICENSES&tag=COPYLEFT`
- 静态分类页与标签页，便于引用和搜索引擎收录
- 详情页的类别与每个标签都可点击到对应静态页

## UNIVERSE 工具

每个工具独立页面，索引数据在 `src/data/tools.ts`（首页、UNIVERSE、CLI、`index.json` 共用）：

- **CHECKSUM**：Web Crypto 计算 SHA-256，本地处理
- **JSON**：校验、格式化、压缩
- **LICENSE COMPARE**：16 种常见许可证的特征矩阵；数据来自 [Choose a License](https://choosealicense.com/appendix/)，默认选 5 种，可切换任意组合；“Only differences” 隐藏相同项；选择状态写入 `?licenses=`，可分享/可被脚本读取。FILES 另收录 32 份许可证原文。
- **LICENSE CHOOSER**：4 个问题（copyleft 范围、专利授权、简洁度、公共领域）推荐 2–3 个许可证，并链接到全文与对比表。

新增工具：在 `src/pages/universe/` 建子页面，并在 `src/data/tools.ts` 增加条目（name/url/description）即可同步到首页、索引与机器接口。

## 本地开发

```sh
npm install          # 国内网络慢可加 --registry=https://registry.npmmirror.com
npm run dev          # 先生成 KIT ZIP，再启动 http://localhost:4321
npm run build        # 先重建 KIT、全库 ZIP、分类 ZIP 和目录，再构建 dist/
npm run preview      # 预览构建产物
```

## 新增一个文件

1. 把文件本体放进 `public/files/<category>/<name>.<ext>`（建议单文件 < 20 MB；大文件放 GitHub Releases 并填 `external`）。
2. 在 `src/content/files/` 新建同名条目的 Markdown（slug 即文件名，不要带点号）：

```yaml
---
title: MY TEMPLATE              # 站点上全大写显示
category: POLICIES              # LICENSES / STANDARDS / SNIPPETS / HEADERS / POLICIES / GOVERNANCE / AGENTS
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

3. 提交并推送 `main`，Actions 自动构建部署；首页、FILES、RSS、CLI、`index.json`、`search.json`、`llms.txt`、`llms-full.txt` 全部自动更新。KIT ZIP 在构建前由 `scripts/build-kits.mjs` 重建。

校验值：`shasum -a 256 文件名`；大小：`wc -c 文件名`。

## STATUS 页

- 构建卡片：最近构建时间、提交、构建日志、语料 SHA-256、总字节数、manifest 校验入口
- 每次打开页面在浏览器端实时检查：
  - GitHub 平台状态（`githubstatus.com` API，含 API/Actions/Pages/Git Operations 组件）
  - 公共基础设施可达性（`src/data/sites.ts`：本站、Wikipedia、Internet Archive、SPDX、Creative Commons、RFC Editor、OSI、W3C）
  - GitHub 项目动态（`api.github.com`，未认证请求限 60 次/小时/IP；展示最近 8 个仓库）
  - 外链列表（`src/data/links.ts`，含邮箱与 GitHub）
- 无需构建期任务；点 `[ REFRESH ]` 重新检查。无 JS 时降级为静态链接。

## CLI 与 AI Agent

独立全屏窗口，黑底红字；`exit` 或 `Esc` 返回站点。

```
help [command]           manual                agents                api
ls [-l] [path]           cd <path>             pwd                   tree
files [category|tag]     cat <file>            read <file>           context <file>
cite <file>              related <file>        search <term>         verify <file>
manifest                 sitemap               licenses [id]         resources [category]
kits                     guides                data                  downloads
compare <id...>          download <file>       open <section|file|url>
status                   links                 tools                 contact
stats                    about                 date                  whoami
source                   history               clear                 exit
echo <text>
```

- 虚拟文件系统（`cd` / `ls` / `pwd` / `tree`）、Tab 补全、历史记录（↑/↓）、Ctrl+L 清屏
- `files <category|tag>` 可按类别或标签筛选（如 `files COPYLEFT`）；`cat` 显示标签
- `search` 使用 `/search.json`（构建时生成的全文索引，同时匹配标题/摘要/标签）；`verify` 在浏览器端下载文件并比对 SHA-256
- 任意命令加 `--json` 输出机器可读结果，例如 `/cli/?cmd=cat%20mit-license%20--json`
- 直接执行（浏览器内）：`/cli/?cmd=ls`；多条命令用 `%3B` 分隔，如 `?cmd=cd%20files%3Bls%20-l`
- **`?cmd=` 依赖 JavaScript，不是机器接口**。Agent/脚本请用构建期生成的纯文本端点：
  - `/cli/help.txt`、`/cli/ls.txt`、`/cli/tree.txt`、`/cli/files.txt`、`/cli/files/agents.txt`
  - `/cli/files/{licenses,standards,snippets,headers,policies,governance,agents}.txt`
  - `/cli/cat/<id>.txt`（元数据+摘要）、`/cli/read/<id>.txt`（全文）
  - `/cli/context/<id>.txt`、`/cli/cite/<id>.txt`、`/cli/manifest.tsv`、`/cli/manifest-sha256.txt`、`/cli/sitemap.txt`
  - `/cli/tools.txt`、`/cli/links.txt`、`/cli/stats.txt`、`/cli/about.txt`
  - `/AGENTS.md`、`/cli/manual.txt`、`/cli/commands.json`、`/cli/licenses.json`、`/cli/resources.json`
  - `/llms.txt`、`/llms-small.txt`、`/llms-full.txt`、`/feed.json`、`/kits/index.json`
  - `/guides.json`、`/data/index.json`、`/downloads/index.json`、`/guides/directory.json`、`/guides/letters.json`、`/guides/checklists.json`、`/corrections.json`、`/opensearch.xml`
  - `/files/<id>.md`（单文件 Markdown）、`/schemas/*.schema.json`
- 机器索引：`/index.json`（`site` + `generated` + `build` + `bytes` + `tools` + `kits` + `guides` + `data` + `machine`）
- 全文索引：`/search.json`（约 840 KB，含外链条目的元数据）
- JSON/文本接口在 GitHub Pages 上自动带 `Access-Control-Allow-Origin: *`（Pages 对静态资源统一添加）
- 站点描述与机器端点目录：`/llms.txt`

## 联系与版权

- 邮箱：`contact@original.wales`（已通过 ImprovMX 转发至维护者邮箱；MX: `mx1/mx2.improvmx.com`）
- 安全报告：`security@original.wales`（同 ImprovMX 转发）；`/.well-known/security.txt`（RFC 9116）
- GitHub：`https://github.com/Verlintas`
- 版权：`© Verlintas`；favicon 为透明背景的红色空心圆

## 内容来源

- **32 份许可证原文**：SPDX License List（`spdx/license-list-data`）与 Creative Commons 官方 legalcode，未改写正文
- **Contributor Covenant 2.1** 取自 contributor-covenant.org（CC BY 4.0）；**DCO 1.1** 取自 developercertificate.org（逐字复制）
- **官方标准**：RFC Editor（RFC 2119/8174/8259/4180/9116/3339/3986）、semver.org、conventionalcommits.org、keepachangelog.com、Open Source Initiative（OSD）、SPDX Specification 2.3.1（外链）
- **gitignore 模板**：GitHub `github/gitignore`（CC0-1.0）
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
  - 数据：IANA HTTP 状态码、IANA 媒体类型、文件签名参考、Unicode CLDR / ECMA-402 Intl、IANA 时区数据库
  - 贡献/治理：Open Source Guides、GitHub Docs、Google Code Review
  - Agent 模板：AGENTS.md、Model Context Protocol、OpenAI function calling、Anthropic tool use、NIST AI RMF
- 所有模板均标注 “not legal advice”；使用前请自行审查

## 邮件

- 提供商：ImprovMX（免费转发，catch-all：`*@original.wales → 维护者邮箱`）
- MX：`10 mx1.improvmx.com`、`20 mx2.improvmx.com`
- 建议 SPF（尚未添加）：`v=spf1 include:spf.improvmx.com ~all`
- 已实测 `contact@` 与 `security@` 均可送达

## 部署（已完成）

- 仓库：`Verlintas/original`（公开）
- Pages：Source = GitHub Actions；Custom domain = `original.wales`；Enforce HTTPS 已开启
- DNS（Spaceship）：`@` 的 4 条 A 记录指向 GitHub Pages IP；`verlintas.dev` 不受影响
- 推送到 `main` 即自动部署；证书由 GitHub 自动签发/续期
