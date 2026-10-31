---
title: "TOOL DEFINITION TEMPLATE"
category: AGENTS
date: 2026-10-17
version: '1.0'
format: TXT
size: "2.6 KB"
license: CC0-1.0
sha256: 3a5b3a4e35e9bf595272147a7deceffad8b88f65b5a3df406c992830f35f15b3
file: /files/agents/tool-definition.txt
source: "https://platform.openai.com/docs/guides/function-calling"
tags: ["AI","TOOLING","JSON SCHEMA"]
summary: "Tool JSON definitions for OpenAI function calling and Anthropic tool use, with a review checklist."
---
A template for describing a tool to an AI model: name, description, typed parameters, required fields, and strict validation. Includes both the OpenAI function-calling shape and the Anthropic input_schema shape.

## USE

- Write the description for a careful engineer who cannot see the implementation.
- Use enums, types, and additionalProperties: false.
- Test the tool against malformed arguments.

## NOTES

- The description is the model's documentation; vague descriptions cause wrong calls.
- Never expose secrets or unbounded data in tool results.

## SOURCE

https://platform.openai.com/docs/guides/function-calling
