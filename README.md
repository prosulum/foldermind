# foldermind

**Your AI forgets your business. foldermind gives it a map it can't lose.**

One command builds a plain-text workspace any AI that can read files can use: Claude, Codex, Gemini, Cursor, or whatever ships next month. Your business facts, routing and memory live in files you own.

The AI tool is the part you rent. The folder is the part you keep.

*Formerly `claude-code-ultimate-optimal-framework`. Same tool, now AI-agnostic.*

[![npm version](https://img.shields.io/npm/v/foldermind.svg)](https://www.npmjs.com/package/foldermind)
[![downloads](https://img.shields.io/npm/dm/foldermind.svg)](https://www.npmjs.com/package/foldermind)
[![node](https://img.shields.io/node/v/foldermind.svg)](https://nodejs.org)
[![license](https://img.shields.io/npm/l/foldermind.svg)](./LICENSE)
[![platform](https://img.shields.io/badge/platform-macOS%20%7C%20Linux%20%7C%20Windows-4c9)](#windows)

```bash
npx foldermind
```

That's the whole install. No global package, no config file to hand-write. Works on macOS, Linux and Windows.

Prefer to install it once? Then the command is just `foldermind`:

```bash
npm install -g foldermind
foldermind --help
```

---

## Not technical? Let your AI set it up

Open an AI tool that can work with files on your computer (for example Claude Code, Codex, Gemini CLI, or Cursor) and paste this:

```
Set up an AI workspace for my business using foldermind (https://www.npmjs.com/package/foldermind).

1. Ask me which folder to use. Suggest a new, empty folder. Never use my home folder.
2. Run: npx foldermind@2 --example-config
   Ask me, one question at a time and in plain English, for what it needs: my business name, what we do, our departments, and our products or services. Save my answers as foldermind.json outside that folder.
3. Preview first: npx foldermind@2 --config foldermind.json --dry-run --output <that folder>
   Show me the list of files it will create. If it says any file would be overwritten, stop and ask me.
4. Once I say yes, run: npx foldermind@2 --config foldermind.json --output <that folder>
   Never add --yes or --force. If it refuses because files already exist, stop and ask me.
5. Ask me where my team keeps its SOPs (for example Google Drive) and list them in company/sop-sources.md.
6. Tell me in plain English what you created and what to do next.
```

Your team's SOPs stay where your people already work (for example Google Docs). foldermind is the AI's workspace: it records where those SOPs live, and your AI reads them from there.

---

## Why your AI keeps getting it wrong

You explain your business. It forgets. Next chat, you start from zero.

It reads the wrong files, misses the ones that matter, and burns tokens wading through everything else.

Your instruction file grew into a wall of text nobody reads.

Then the tool updates, and the setup you finally got working stops working.

Every one of those has the same cause: the AI has no map of your business.

## What foldermind does

- **One map, any AI.** `AGENTS.md` is the map, the shared file name many AI agents look for. `CLAUDE.md` and `GEMINI.md` are one-line pointers to it for tools that look for their own name, so every tool lands in the same place.
- **The AI reads only what the job needs.** A router sends each task to one folder and lists what to skip, so the workspace can grow without every task reading all of it.
- **It remembers by writing things down.** Say "our brand voice is warm but direct" and it files that where every future task will find it.
- **It survives tool changes.** It's plain text. Switch AI tools and point the new one at the same folder.
- **Your SOPs stay where your team works.** foldermind records where they live (for example Google Docs), and your AI reads them from there.

It builds all of this from a few questions about your business.

---

## Quick start

Run it with `npx` (nothing to install first):

```bash
npx foldermind                      # interactive setup, current folder
npx foldermind --output ./my-team   # ...or into a specific folder
```

Or with the global install:

```bash
foldermind                      # interactive setup in the current folder
foldermind --output ./my-team   # ...or into a specific folder
```

The setup asks for:

- Company name, description, tagline, website, and industry
- Which departments you have (pick from a list, or add your own)
- Products and services
- VPS or always-on local machine (optional)
- Where to create the workspace

Then it writes the folder tree below, customized with your answers.

---

## What you get

```text
your-workspace/
├── AGENTS.md                 # Master map, always loaded
├── CLAUDE.md, GEMINI.md      # One-line pointers to AGENTS.md
├── CONTEXT.md                # Task router: where to go for each job
├── PROJECT-REGISTRY.md       # Index of active projects
├── company/                  # Brand voice, products, where your SOPs live
├── departments/              # One workspace per department
├── products/                 # One workspace per product
├── projects/                 # Time-bounded work (auto-created)
└── _system/                  # Infrastructure docs + project templates
```

Each department, product, company, and `_system` workspace gets its own `CONTEXT.md` that scopes what the AI loads for tasks in that folder.

---

## How it works

### Three-layer routing

The point of the structure is a chain of maps, each one smaller and more specific than the last.

| Layer | File | Job | Target size |
|-------|------|-----|-------------|
| 1 | `AGENTS.md` | Always loaded. The map of the whole workspace. | ≤ 200 lines |
| 2 | `CONTEXT.md` | Routes a task to the right folder. | 30–50 lines |
| 3 | `<folder>/CONTEXT.md` | Scoped instructions for that folder only. | 25–80 lines |

The AI reads layer 1, jumps to the one layer-3 file the task needs, and ignores the rest.

### A "Skip These" column, not just a "Load" column

Each workspace `CONTEXT.md` says what to load *and what to skip*. Telling the AI to skip the other departments' files is what keeps token usage flat as the workspace grows. That column is the mechanism, not a suggestion.

### Self-updating

Paste or speak an unstructured thought and your AI routes it to the right file:

- *"Our brand voice is warm but direct."* updates `company/voice-brand.md`
- *"We're launching a service called X."* updates `company/products.md`
- *"We need an onboarding process."* drafts the SOP in `projects/` for your team's SOP library (for example Google Docs) and, once you move it there, records where it lives in `company/sop-sources.md`

The routing table that makes this work ships inside the generated `AGENTS.md`.

### Auto-scaffolding new projects

Say `"New project: [describe it]"` and your AI infers the type (business initiative, VA workflow, or product build), copies the matching template from `_system/templates/`, and registers the project in `PROJECT-REGISTRY.md`.

---

## CLI reference

```text
foldermind [command] [options]
```

| Option | Short | What it does |
|--------|-------|--------------|
| `--output <dir>` | `-o` | Where to create the workspace (default: current folder) |
| `--config <file>` | | Build from a JSON file instead of prompting (non-interactive) |
| `--dry-run` | | Print the exact files that would be written, write nothing |
| `--force` | `-f` | Overwrite an existing workspace without asking |
| `--yes` | `-y` | Assume "yes" to confirmations, including overwriting existing files (same as `--force`) |
| `--example-config` | | Print a starter config file and exit |
| `--version` | `-v` | Print the version |
| `--help` | `-h` | Show help |

Preview before you write:

```bash
foldermind --dry-run --output ./my-team
```

If the target folder already contains any file the tool would write (for example `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, or anything under `company/`), the tool asks before overwriting (interactive) or stops and tells you to pass `--force` (with `--config` or without a terminal). Your edited files are safe by default. `--force` and `--yes` both skip this check, so preview with `--dry-run` first.

---

## Non-interactive / CI use

Generate a config, edit it, then build with no prompts. This is the path for scripts, CI jobs, and any terminal without interactive input.

```bash
foldermind --example-config > workspace.json
# edit workspace.json
foldermind --config workspace.json --output ./my-team
```

`workspace.json` looks like this:

```json
{
  "company": {
    "name": "Acme Robotics",
    "description": "We build warehouse automation robots.",
    "tagline": "Ship faster.",
    "website": "https://example.com",
    "industry": "Robotics"
  },
  "departments": ["marketing", "sales", "engineering"],
  "products": [
    { "name": "PickBot 3000", "description": "Autonomous picking robot." }
  ],
  "infra": {
    "hasVps": false,
    "vpsHost": "",
    "vpsSshAlias": "",
    "hasLocalServer": false,
    "localServerName": ""
  },
  "outputDir": "."
}
```

With `--config`, the CLI never prompts, even in a terminal. If the target folder already contains workspace files, it stops with an error unless you pass `--force` or `--yes`.

---

## Windows

The tool runs on Windows the same as on macOS and Linux, via `npx foldermind`, or as `foldermind` after `npm install -g`.

**PowerShell or Command Prompt:**

```powershell
foldermind --output .\my-team
```

**Windows paths** work as arguments:

```powershell
foldermind --output C:\Users\you\ai-workspaces\acme
```

A few Windows notes:

- **Windows Terminal** (or the VS Code terminal) gives you the nicest output. On the older `cmd.exe` console, decorative check marks and arrows fall back to plain characters automatically, so you will never see garbled symbols.
- Line endings in the generated files are LF, which Git and every editor on Windows handle fine.

---

## Requirements

- **Node.js 18.3 or newer** (Node 20+ recommended). Check with `node --version`.
- **An AI tool that works with files in a folder** to use the workspace (for example Claude Code, Codex, Gemini CLI, or Cursor).

---

## What it reads, writes and connects to

For anyone checking foldermind before it runs on a work computer (an IT provider, for example). This describes version 2.0.0; the code is in [`src/`](./src).

- **Writes:** plain-text Markdown files and empty folders, only inside the `--output` folder (the current folder if you don't pass one). Folder names that come from your answers (departments, products, a server name) are reduced to lowercase letters, numbers and hyphens, so an answer can't point a path outside that folder. `--dry-run` writes nothing, and `--example-config` only prints to the screen.
- **Reads:** the `--config` file you name, whether its own files already exist in the output folder (so it can stop before overwriting), and its own `package.json` for `--version`. Nothing else on the computer.
- **Connects to:** nothing. foldermind's code makes no network calls, collects no usage data and starts no other programs. The one download is `npx` fetching foldermind and its three dependencies ([`@inquirer/prompts`](https://www.npmjs.com/package/@inquirer/prompts), [`chalk`](https://www.npmjs.com/package/chalk), [`fs-extra`](https://www.npmjs.com/package/fs-extra)) from the npm registry. Pin a version (`npx foldermind@2.0.0`) to run exactly the code you reviewed.

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `foldermind: command not found` | Use `npx foldermind`, or install it globally first: `npm install -g foldermind`. |
| It refuses to run and mentions `--force` | A workspace already exists in that folder. Pass `--force` to overwrite, or pick a new `--output` folder. |
| It exits saying interactive setup needs a terminal | You are in a non-interactive shell. Use `--config` (see [Non-interactive use](#non-interactive--ci-use)). |
| Symbols look odd in an old console | Switch to Windows Terminal, or ignore it: the fallback characters are still readable. |

---

## Contributing

Issues and pull requests are welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) for local setup, the project layout, and the release steps. Run `npm test` before opening a PR.

---

## License

[MIT](./LICENSE) © ProSulum
