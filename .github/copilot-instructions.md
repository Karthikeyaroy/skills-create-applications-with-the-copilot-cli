# Copilot repository instructions

This file provides repository-level instructions for GitHub Copilot agents and helps enable Copilot usage in this repository.

Guidance
- Agents may read repository files to assist with code tasks.
- To restrict access, use the `/add-dir <directory>` command to add allowed directories.

Recommended actions
- Run `/add-dir .` to grant agents access to the repository root if needed.

Maintainers
- If changes are required, open a PR and request review from repository maintainers.

Allowed directories
- .

MCP Tools
- GitHub MCP tools are enabled for use by Copilot agents in this repository session. Use caution when granting tool access; prefer restricting directories when possible.

Recommended next steps
- Run `/add-dir .` to explicitly register the repository root as allowed for agent access (or use `/add-dir <path>` to restrict to specific folders).
