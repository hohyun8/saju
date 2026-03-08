# CLAUDE.md — AI Assistant Guide for `saju`

This file provides context and conventions for AI assistants (e.g., Claude Code) working in this repository.

---

## Repository Overview

**Name:** saju
**Status:** New / empty repository — no source code committed yet.
**Purpose:** TBD (fill in once the project direction is established).

> Update this section once the project's purpose, tech stack, and architecture are defined.

---

## Branch Conventions

| Purpose | Pattern |
|---|---|
| Feature work | `feat/<short-description>` |
| Bug fixes | `fix/<short-description>` |
| AI-assisted sessions | `claude/<task-id>` |
| Hotfixes | `hotfix/<short-description>` |

- Default/main branch: `main`
- All changes go through pull requests; direct pushes to `main` are discouraged.
- Commit messages should follow [Conventional Commits](https://www.conventionalcommits.org/):
  ```
  <type>(optional scope): <short summary>

  <optional body>
  ```
  Common types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `ci`.

---

## Development Workflow

Since the repository is empty, follow these steps when initializing the project:

1. Decide on the tech stack and record it here.
2. Initialize the project (e.g., `npm init`, `poetry init`, `cargo init`).
3. Commit the bootstrapped project as the first commit on `main`.
4. Open feature branches for all subsequent work.

### Local Setup (to be filled in)

```bash
# Clone
git clone <remote-url>
cd saju

# Install dependencies (update this once the stack is chosen)
# npm install  OR  pip install -e .  OR  cargo build  etc.

# Run tests
# (add test command here)

# Run the application
# (add run command here)
```

---

## Project Structure (placeholder)

```
saju/
├── CLAUDE.md          # This file
├── README.md          # Human-facing project documentation
├── src/               # Application source code
├── tests/             # Automated tests
└── docs/              # Extended documentation
```

Update this tree as directories and files are added.

---

## Testing

- Write tests for all non-trivial logic.
- Aim for meaningful coverage; 100 % is not required but critical paths must be tested.
- Run the full test suite before committing.
- Test command: _(add once a framework is chosen)_

---

## Code Quality

- Enforce a linter and formatter appropriate for the chosen language.
- Configuration files (`.eslintrc`, `pyproject.toml`, `.prettierrc`, etc.) should live at the repo root.
- CI should fail on lint errors.

---

## Environment Variables

- Never commit secrets or credentials.
- Use a `.env.example` file to document required variables.
- The actual `.env` file must be listed in `.gitignore`.

---

## AI Assistant Instructions

When working in this repository as an AI assistant:

1. **Read before writing.** Always read existing files before modifying them.
2. **Minimal changes.** Only change what is necessary to complete the task.
3. **No speculative additions.** Do not add features, refactors, or comments beyond what is requested.
4. **Commit on the correct branch.** Use the `claude/<task-id>` branch pattern; never push directly to `main`.
5. **Clear commit messages.** Follow the Conventional Commits format above.
6. **Security first.** Never introduce SQL injection, XSS, command injection, or other OWASP Top 10 vulnerabilities.
7. **Update this file** whenever significant architectural decisions are made or conventions change.

---

## Updating This File

Keep CLAUDE.md current as the project evolves:

- After choosing the tech stack, fill in the "Local Setup" section.
- After establishing directory structure, update the "Project Structure" section.
- After adding CI/CD, document the pipeline here.
- After adding a database, document schema and migration commands.
