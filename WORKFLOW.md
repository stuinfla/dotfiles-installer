# Two-Repo Workflow: How to Use This Architecture Correctly

## 📂 Repository Structure

```
dotfiles-installer-1/          ← Working/Testing Directory (LOCAL)
├── install.sh                 Make changes here
├── .bashrc                    Test here
├── scripts/                   Develop here
├── test-*.js                  Test scripts (not synced)
└── sync-to-dotfiles.sh        🔧 Atomic sync script

dotfiles/                      ← Production Repository (GITHUB)
├── install.sh                 GitHub Codespaces uses this
├── .bashrc                    Don't edit directly!
└── scripts/                   Synced from installer repo
```

## ⚠️ The Problem This Solves

**Before**: Files in dotfiles repo had different timestamps (2 days ago, yesterday, 4 minutes ago)
- Confusing: Which version is current?
- Unreliable: Piecemeal updates missed files
- Debugging nightmare: Can't reproduce exact state

**After**: All files synced atomically with identical timestamps
- Clear: One snapshot, one moment in time
- Reliable: Complete sync every time
- Reproducible: GitHub Codespaces uses exact snapshot

## ✅ Correct Workflow

### 1. Make Changes in `dotfiles-installer-1`

```bash
cd /Users/stuartkerr/Code/dotfiles-installer-1

# Edit files
vim install.sh
vim .bashrc
vim scripts/auto-update.sh

# Test locally if needed
./install.sh
```

### 2. Run Atomic Sync to `dotfiles`

```bash
./sync-to-dotfiles.sh

# This will:
# ✅ Wipe dotfiles repo (except .git)
# ✅ Copy ALL files from installer
# ✅ Verify all files have same timestamp
# ✅ Show git status
```

### 3. Review Changes

The sync script shows you what changed:

```bash
Untracked files:
  new-script.sh

Changes not staged for commit:
  modified:   install.sh
  modified:   .bashrc
```

### 4. Commit and Push

```bash
cd /Users/stuartkerr/Code/dotfiles

git add -A
git commit -m "ATOMIC SYNC: Brief description of changes"
git push origin main
```

### 5. Test in Fresh Codespace

```bash
cd /Users/stuartkerr/Code/dotfiles-installer-1
node watch-codespace-creation.js

# Creates fresh codespace
# Takes screenshots every 10 seconds
# Monitors installation progress
# Saves evidence to playwright-screenshots/
```

## 🚫 What NOT to Do

### ❌ Don't Edit Dotfiles Repo Directly

```bash
# BAD - Don't do this!
cd /Users/stuartkerr/Code/dotfiles
vim install.sh  # ❌ Will be overwritten by next sync!
```

**Why**: Next sync will wipe and overwrite your changes.

**Instead**: Edit in `dotfiles-installer-1`, then sync.

### ❌ Don't Manually Copy Files

```bash
# BAD - Don't do this!
cp install.sh /Users/stuartkerr/Code/dotfiles/
cp .bashrc /Users/stuartkerr/Code/dotfiles/
```

**Why**: Results in files with different timestamps (the original problem!).

**Instead**: Use `./sync-to-dotfiles.sh` for atomic sync.

### ❌ Don't Commit Dotfiles-Installer to GitHub

The `dotfiles-installer-1` directory is a LOCAL working directory only.
It's not meant to be a GitHub repo.

**Why**: GitHub Codespaces uses the `dotfiles` repo, not this one.

## 🎯 Quick Reference

| Action | Command |
|--------|---------|
| Make changes | Edit files in `dotfiles-installer-1/` |
| Sync to production | `./sync-to-dotfiles.sh` |
| Commit changes | `cd dotfiles && git add -A && git commit && git push` |
| Test changes | `node watch-codespace-creation.js` |

## 🔍 Verify Sync Worked

After syncing, check that all files have the same timestamp:

```bash
cd /Users/stuartkerr/Code/dotfiles
find . -maxdepth 2 -type f ! -path "./.git/*" -exec stat -f "%Sm %N" -t "%Y-%m-%d %H:%M" {} \; | sort

# Should show:
# 2025-10-27 12:21 ./install.sh
# 2025-10-27 12:21 ./.bashrc
# 2025-10-27 12:21 ./scripts/auto-update.sh
# ... (all same timestamp!)
```

## 🔄 Complete Example Workflow

```bash
# 1. Make changes
cd /Users/stuartkerr/Code/dotfiles-installer-1
vim install.sh  # Fix bug

# 2. Atomic sync
./sync-to-dotfiles.sh

# Output:
# ✅ Perfect! All files have identical timestamp: 2025-10-27 12:30

# 3. Commit and push
cd /Users/stuartkerr/Code/dotfiles
git add -A
git commit -m "ATOMIC SYNC: Fix installation bug"
git push origin main

# 4. Test in fresh codespace
cd /Users/stuartkerr/Code/dotfiles-installer-1
node watch-codespace-creation.js

# 5. Review screenshots
ls -ltr playwright-screenshots/watch-*.png | tail -20
```

## 💡 Pro Tips

### Safety Check

The sync script warns you if dotfiles repo has uncommitted changes:

```bash
⚠️  WARNING: Dotfiles repo has uncommitted changes!
Wipe anyway? This will DELETE uncommitted changes! (yes/no):
```

Always commit or stash changes before syncing!

### Dry Run

Want to see what will be copied without actually syncing?

```bash
cd /Users/stuartkerr/Code/dotfiles-installer-1
# Preview what will be synced:
ls -la | grep -E "^\." | grep -v ".git\|.swarm\|.claude-flow"
ls -la | grep -v "test\|node_modules\|screenshots\|docs"
```

### Verify on GitHub

After pushing, verify on GitHub:

```bash
gh api 'repos/stuinfla/dotfiles/commits?per_page=1' --jq '.[0] | {
  commit: .sha[0:7],
  message: .commit.message | split("\n")[0],
  date: .commit.author.date
}'
```

## 🐛 Troubleshooting

### Files Still Have Different Timestamps

Check if you edited dotfiles directly:

```bash
cd /Users/stuartkerr/Code/dotfiles
git log --oneline -5
```

Look for commits NOT labeled "ATOMIC SYNC" - those are manual edits that broke synchronization.

**Fix**: Run atomic sync again to restore proper state.

### Sync Script Fails

```bash
❌ ERROR: Dotfiles directory not found
```

Check that both repos exist:

```bash
ls -la /Users/stuartkerr/Code/dotfiles-installer-1/.git
ls -la /Users/stuartkerr/Code/dotfiles/.git
```

### GitHub Codespaces Using Old Version

GitHub caches the dotfiles repo. After pushing:

1. Wait 1-2 minutes for cache to clear
2. Delete old codespaces
3. Create fresh codespace to test

## 📚 Why This Architecture?

**Alternative**: Just use one repo and test on branches

**Why We Use Two Repos**:
1. Keep test files separate (test-*.js, screenshots, docs)
2. dotfiles repo stays clean - only production files
3. Can test locally in installer repo without polluting production
4. Clear separation: development (installer) vs production (dotfiles)

**Trade-off**: Need to remember to sync after changes

**Mitigation**: Atomic sync script makes it safe and reliable
