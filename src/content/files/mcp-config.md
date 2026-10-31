---
title: "MCP SERVER CONFIG TEMPLATE"
category: AGENTS
date: 2026-10-17
version: '1.0'
format: TXT
size: "1.8 KB"
license: CC0-1.0
sha256: 70d2f023a6d725a6b18ce540c8a30f489c9db2026f8fed1fe91cc48bac28db21
file: /files/agents/mcp-config.txt
source: "https://modelcontextprotocol.io/"
tags: ["MCP","AI","CONFIG"]
summary: "Client configuration for Model Context Protocol servers: stdio, HTTP, mixed, and security notes."
---
A starting point for connecting tools and data sources to an AI client over MCP. Includes local stdio servers, remote HTTP servers, and the security rules that matter when an agent can execute tools.

## USE

- Replace every placeholder and use environment variables for tokens.
- Grant the minimum filesystem scope; prefer read-only servers.
- Review third-party servers before running them.

## NOTES

- MCP server configuration is code execution; treat it like installing software.
- The exact schema varies slightly by client.

## SOURCE

https://modelcontextprotocol.io/
