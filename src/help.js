import fs from 'fs-extra';

const PKG_URL = new URL('../package.json', import.meta.url);

/** Read the package version straight from package.json so --version never drifts. */
export async function getVersion() {
  const pkg = await fs.readJson(PKG_URL);
  return pkg.version;
}

export const HELP = `
  foldermind  (formerly claude-code-ultimate-optimal-framework)

  Give any AI a map of your business: an AI workspace with routing,
  memory, and a self-updating architecture, in one command.

  USAGE
    npx foldermind [command] [options]
    foldermind [command] [options]      (after: npm install -g foldermind)

  COMMANDS
    init                 Create a workspace (default; runs the interactive setup)

  OPTIONS
    -o, --output <dir>   Where to create the workspace (default: current directory)
        --config <file>  Build from a JSON config instead of prompting
                         (non-interactive; ideal for CI and scripting)
        --dry-run        Show what would be created without writing anything
    -f, --force          Overwrite an existing workspace without asking
    -y, --yes            Skip confirmation prompts (assume "yes"; overwrites like --force)
        --example-config Print an example --config JSON file and exit
    -v, --version        Print the version and exit
    -h, --help           Show this help and exit

  EXAMPLES
    # Interactive setup in the current directory
    foldermind

    # Interactive setup into a specific folder
    foldermind --output ./my-workspace

    # Preview without writing
    foldermind --dry-run --output ./my-workspace

    # Non-interactive (CI / scripting)
    foldermind --example-config > workspace.json   # then edit it
    foldermind --config workspace.json --output ./my-workspace

  Docs: https://github.com/prosulum/foldermind
`;
