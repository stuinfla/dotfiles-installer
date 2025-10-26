#!/bin/bash
# ═══════════════════════════════════════════════════════════════════
# SYNC TO DOTFILES - Copy production files to dotfiles repo
# ═══════════════════════════════════════════════════════════════════

set -e

INSTALLER_DIR="/Users/stuartkerr/Code/dotfiles-installer-1"
DOTFILES_DIR="/Users/stuartkerr/Code/dotfiles"

echo "════════════════════════════════════════════════════════════════════"
echo "  📦 Syncing Production Files to Dotfiles Repo"
echo "════════════════════════════════════════════════════════════════════"
echo ""

# Check both repos exist
if [ ! -d "$INSTALLER_DIR" ]; then
    echo "❌ ERROR: Installer directory not found: $INSTALLER_DIR"
    exit 1
fi

if [ ! -d "$DOTFILES_DIR" ]; then
    echo "❌ ERROR: Dotfiles directory not found: $DOTFILES_DIR"
    exit 1
fi

# Copy production files
echo "📋 Copying production files..."
echo ""

cp "$INSTALLER_DIR/.bashrc" "$DOTFILES_DIR/"
echo "  ✅ .bashrc"

cp "$INSTALLER_DIR/.bash_profile" "$DOTFILES_DIR/"
echo "  ✅ .bash_profile"

cp "$INSTALLER_DIR/.claude.json" "$DOTFILES_DIR/"
echo "  ✅ .claude.json"

cp -r "$INSTALLER_DIR/.devcontainer" "$DOTFILES_DIR/"
echo "  ✅ .devcontainer/"

cp -r "$INSTALLER_DIR/.config" "$DOTFILES_DIR/"
echo "  ✅ .config/"

mkdir -p "$DOTFILES_DIR/scripts"
cp "$INSTALLER_DIR/scripts/auto-update.sh" "$DOTFILES_DIR/scripts/"
cp "$INSTALLER_DIR/scripts/auto-git-save.sh" "$DOTFILES_DIR/scripts/"
echo "  ✅ scripts/"

cp "$INSTALLER_DIR/install.sh" "$DOTFILES_DIR/"
echo "  ✅ install.sh"

echo ""
echo "════════════════════════════════════════════════════════════════════"
echo "  📊 Git Status in Dotfiles Repo"
echo "════════════════════════════════════════════════════════════════════"
echo ""

cd "$DOTFILES_DIR"
git status

echo ""
echo "════════════════════════════════════════════════════════════════════"
echo "  🚀 Next Steps"
echo "════════════════════════════════════════════════════════════════════"
echo ""
echo "Review the changes above, then:"
echo ""
echo "  cd $DOTFILES_DIR"
echo "  git add -A"
echo "  git commit -m \"Sync from dotfiles-installer\""
echo "  git push origin main"
echo ""
