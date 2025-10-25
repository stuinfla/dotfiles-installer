# Dotfiles Installer

Automated installation and configuration tools for [Stuart's dotfiles](https://github.com/stuinfla/dotfiles-clean).

## 🚀 Quick Start

```bash
# Clone this repo
git clone https://github.com/stuinfla/dotfiles-installer.git
cd dotfiles-installer

# Run automated installation
./install.sh

# Or run manual installation with validation
./manual-install.sh
```

## 📦 What This Does

The installer automates:

1. **Clones dotfiles repo** - Fetches clean configuration from [dotfiles-clean](https://github.com/stuinfla/dotfiles-clean)
2. **Backs up existing configs** - Saves your current dotfiles to `~/.dotfiles.backup`
3. **Installs configurations** - Copies all dotfiles to appropriate locations
4. **Sets up MCP servers** - Configures Claude Flow, Sequential Thinking, Context7
5. **Validates installation** - Runs health checks and verification
6. **Configures VS Code** - Installs recommended extensions
7. **Sets up devcontainer** - Configures GitHub Codespaces support

## 📚 Scripts

### Installation Scripts
- **`install.sh`** - Main automated installer with full validation
- **`manual-install.sh`** - Manual installation with step-by-step prompts
- **`add-devcontainer.sh`** - Add devcontainer configuration to existing repo
- **`check-dotfiles-config.sh`** - Validate dotfiles configuration
- **`health-check.sh`** - Comprehensive system health check

### Utility Scripts
- **`scripts/cleanup-vscode-state.sh`** - Clean VS Code state and caches
- **`scripts/reset-kombai.sh`** - Reset Kombai extension settings

## 🛠️ Manual Installation

If you prefer manual control:

```bash
# 1. Clone dotfiles repo
git clone https://github.com/stuinfla/dotfiles-clean.git ~/dotfiles

# 2. Backup existing dotfiles
mkdir -p ~/.dotfiles.backup
cp ~/.bash_profile ~/.dotfiles.backup/ 2>/dev/null || true
cp ~/.bashrc ~/.dotfiles.backup/ 2>/dev/null || true
cp ~/.claude.json ~/.dotfiles.backup/ 2>/dev/null || true

# 3. Copy new dotfiles
cp ~/dotfiles/.bash_profile ~/
cp ~/dotfiles/.bashrc ~/
cp ~/dotfiles/.claude.json ~/
cp -r ~/dotfiles/.devcontainer ~/
cp -r ~/dotfiles/.vscode ~/
cp -r ~/dotfiles/.claude ~/

# 4. Install MCP servers
claude mcp add claude-flow npx claude-flow@alpha mcp start
claude mcp add sequential npx @modelcontextprotocol/server-sequential-thinking
claude mcp add context7 npx @upstash/context7-mcp

# 5. Reload shell
source ~/.bash_profile
```

## 📖 Documentation

Comprehensive guides in the `docs/` directory:

- **[SETUP-GUIDE.md](docs/SETUP-GUIDE.md)** - Detailed setup instructions
- **[TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)** - Common issues and solutions
- **[USAGE_GUIDE.md](docs/USAGE_GUIDE.md)** - Using the dotfiles after installation
- **[INSTALLATION_MANIFEST.md](docs/INSTALLATION_MANIFEST.md)** - Complete installation details
- **[Claude-Flow-Complete-Guide-v2.7.0.md](docs/Claude-Flow-Complete-Guide-v2.7.0-alpha.10.md)** - Claude Flow documentation
- **[Claude-Flow-Quick-Reference-v2.7.0.md](docs/Claude-Flow-Quick-Reference-v2.7.0.md)** - Quick reference guide

## 🎯 Features

### SuperClaude Framework
The installer sets up the complete SuperClaude AI framework:
- 11 specialized domain personas (Architect, Frontend, Backend, Security, etc.)
- Intelligent routing and orchestration
- MCP server integration (Claude Flow, Sequential, Context7)
- Automated hooks for code formatting and quality
- Neural training patterns for continuous improvement

### Claude Code Integration
- Pre-configured MCP servers for enhanced AI capabilities
- SPARC methodology support for systematic development
- Automated code formatting and quality checks
- Session management and persistence
- Cross-session memory and context

### Development Environment
- GitHub Codespaces ready with devcontainer
- VS Code extensions auto-installation
- Bash configuration with helpful aliases
- Git workflow optimizations

## 🔧 Advanced Options

### Environment Variables
```bash
# Customize installation
export DOTFILES_REPO="https://github.com/stuinfla/dotfiles-clean.git"
export DOTFILES_DIR="$HOME/dotfiles"
export BACKUP_DIR="$HOME/.dotfiles.backup"

# Run installer with custom settings
./install.sh
```

### Installation Flags
```bash
# Skip specific steps
./install.sh --skip-mcp        # Skip MCP server installation
./install.sh --skip-backup     # Skip backup creation
./install.sh --skip-validation # Skip validation checks

# Dry run (show what would be done)
./install.sh --dry-run
```

## 🧪 Validation

Run comprehensive validation after installation:

```bash
# Full health check
./health-check.sh

# Configuration validation
./check-dotfiles-config.sh

# MCP server status
claude mcp list
```

## 🔗 Related Resources

- **[dotfiles-clean](https://github.com/stuinfla/dotfiles-clean)** - Clean configuration files
- **[Claude Code](https://github.com/anthropics/claude-code)** - Anthropic's official CLI
- **[Claude Flow](https://github.com/ruvnet/claude-flow)** - Multi-agent orchestration
- **[Sequential Thinking](https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking)** - Structured reasoning
- **[Context7](https://github.com/upstash/context7-mcp)** - Documentation lookup

## 📄 License

Personal automation tools - use at your own discretion.

## 🤝 Contributing

Issues and pull requests welcome! Please ensure:
- Scripts are POSIX-compliant
- Documentation is updated
- Validation tests pass
- Changes are backwards-compatible

## 💡 Support

For issues or questions:
- Check [TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)
- Review [SETUP-GUIDE.md](docs/SETUP-GUIDE.md)
- Open an issue on GitHub
