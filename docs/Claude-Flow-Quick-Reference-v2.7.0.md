# Claude Flow v2.7.0-alpha.10 - Quick Reference

**Official Repository**: https://github.com/ruvnet/claude-flow
**Latest Release**: v2.7.0-alpha.10
**Last Updated**: 2025-10-25

---

## What's New in v2.7.0

### Major Changes from v2.5.0
- **🎯 25 Specialized Skills** (organized natural language activation)
- **💾 ReasoningBank Memory System** (SQLite-based, 2-3ms query latency)
- **🧠 Hive-Mind Intelligence** (queen-led AI coordination)
- **🛠️ 100 MCP Tools** (up from 87)
- **🤖 64 Specialized Agents** (self-organizing with fault tolerance)
- **⚡ Performance**: 84.8% SWE-Bench solve rate, 32.3% token reduction, 2.8-4.4x speed improvement

### v2.7.0-alpha.10 Critical Fixes
- ✅ Fixed semantic search functionality
- ✅ Resolved stale compiled code in dist-cjs/
- ✅ No API keys required for embeddings (1024-dimensional deterministic vectors)
- ✅ Improved Node.js backend reliability

---

## Installation

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm 9+
- **Claude Code must be installed first**: `npm install -g @anthropic-ai/claude-code`

### Quick Setup (Recommended)
```bash
# Initialize Claude Flow (always use @alpha for latest features)
npx claude-flow@alpha init --force

# Check available commands
npx claude-flow@alpha --help

# Check version
npx claude-flow@alpha --version
```

### Global Installation (Optional)
```bash
npm install -g claude-flow@alpha
```

---

## Core Architecture

### 25 Specialized Skills (Natural Language Activation)

**Development & Methodology (3)**
- SPARC development workflow
- Vibe coding techniques
- Multi-agent coordination

**Intelligence & Memory (6)**
- ReasoningBank persistent storage
- Semantic search (hash-based embeddings)
- Context preservation
- Knowledge retrieval
- Pattern learning
- Session management

**Swarm Coordination (3)**
- Mesh topology
- Hierarchical coordination
- Ring/star patterns

**GitHub Integration (5)**
- Repository analysis
- PR management
- Issue tracking
- Release coordination
- Workflow automation

**Automation & Quality (4)**
- Performance monitoring
- Security scanning
- Code quality analysis
- Test automation

**Flow Nexus Platform (3)**
- Enterprise orchestration
- Distributed swarm intelligence
- RAG integration

### ReasoningBank Memory System

**Storage**: SQLite database at `.swarm/memory.db`
**Performance**: 2-3ms query latency
**Embeddings**: Hash-based, no API keys required
**Features**: Namespace isolation, semantic search, persistent context

```bash
# Store memory with namespace
npx claude-flow@alpha memory store api_key "REST API configuration" \
  --namespace backend --reasoningbank

# Query with semantic search
npx claude-flow@alpha memory query "API config" \
  --namespace backend --reasoningbank

# List all memories in namespace
npx claude-flow@alpha memory list --namespace backend
```

### Hive-Mind Intelligence

**Queen-Led Coordination**: Central orchestrator with specialized worker agents
**Self-Organizing**: Agents adapt to task requirements dynamically
**Fault Tolerance**: Automatic recovery and load balancing

```bash
# Spawn hive-mind for focused development
npx claude-flow@alpha hive-mind spawn "build REST API with authentication" --claude

# Multi-feature project with coordination
npx claude-flow@alpha hive-mind spawn "build enterprise system" \
  --project-name "enterprise-platform" --claude
```

---

## Common Workflows

### Quick Single Feature
```bash
# For focused development tasks
npx claude-flow@alpha hive-mind spawn "implement user authentication" --claude
```

### Multi-Feature Project
```bash
# Initialize with namespace isolation
npx claude-flow@alpha init --force --project-name "my-app" --namespace frontend

# Work on different domains separately
npx claude-flow@alpha swarm "build UI components" --namespace frontend --claude
npx claude-flow@alpha swarm "build API endpoints" --namespace backend --claude
```

### Research Session
```bash
# Combine researcher and analyst agents
npx claude-flow@alpha swarm "research best authentication patterns" \
  --agents researcher,analyst --claude
```

### Performance Analysis
```bash
# Run benchmarks and analyze bottlenecks
npx claude-flow@alpha benchmark run --type performance
npx claude-flow@alpha bottleneck analyze --component api
```

---

## Key MCP Tools

### Core Orchestration
- `swarm_init` - Initialize swarm with topology
- `agent_spawn` - Create specialized agents
- `task_orchestrate` - Distribute tasks across agents

### Memory Operations
- `mcp__claude-flow__memory_usage` - Store/retrieve/manage memory
- `mcp__claude-flow__memory_search` - Semantic search with patterns

### GitHub Automation
- `github_repo_analyze` - Repository analysis (code quality, performance, security)
- `github_pr_manage` - Pull request management (review, merge, close)
- `github_issue_track` - Issue tracking and triage
- `github_release_coord` - Release coordination
- `github_workflow_auto` - Workflow automation
- `github_code_review` - Automated code review

### Performance & Analysis
- `benchmark_run` - Execute performance benchmarks
- `performance_report` - Generate reports with real-time metrics
- `bottleneck_analyze` - Identify performance bottlenecks
- `token_usage` - Analyze token consumption
- `metrics_collect` - System metrics collection

### Neural Functions
- `neural_status` - Get neural agent status and metrics
- `neural_train` - Train neural agents with sample tasks
- `neural_patterns` - Cognitive pattern information
- `neural_predict` - Make AI predictions
- `neural_compress` - Compress neural models

---

## Configuration Options

### Initialization Flags
```bash
npx claude-flow@alpha init \
  --force                    # Overwrite existing configuration
  --project-name "my-app"    # Label for multi-feature projects
  --namespace "frontend"     # Domain-specific memory isolation
  --topology mesh            # Network architecture (mesh|hierarchical|ring|star)
  --max-agents 8             # Limit concurrent worker agents
```

### Swarm Configuration
```bash
npx claude-flow@alpha swarm "task description" \
  --claude                   # Use Claude Code integration
  --agents researcher,coder  # Specify agent types
  --topology hierarchical    # Coordination pattern
  --max-agents 5             # Concurrent agent limit
```

---

## Performance Metrics

- **SWE-Bench Solve Rate**: 84.8%
- **Token Reduction**: 32.3% average
- **Speed Improvement**: 2.8-4.4x through parallel coordination
- **Query Latency**: 2-3ms for semantic search
- **Embedding Generation**: Deterministic hash-based (no API calls)

---

## Migration from v2.5.0

### Breaking Changes
1. **Installation Method**: Now strongly recommends NPX with @alpha tag
2. **Memory System**: ReasoningBank replaces previous memory architecture
3. **Skills vs Agents**: 25 organized skills + 64 specialized agents (clearer separation)
4. **Embeddings**: No longer requires API keys for semantic search

### What to Update
```bash
# Old v2.5.0 approach
npm install -g claude-flow
claude-flow init

# New v2.7.0 approach
npx claude-flow@alpha init --force
npx claude-flow@alpha --help
```

### Memory Migration
If you have existing memory from v2.5.0, the new ReasoningBank system will initialize fresh. Consider re-storing critical context using namespace isolation for better organization.

---

## Best Practices

### 1. Always Use @alpha Tag
```bash
# ✅ Correct - gets latest features
npx claude-flow@alpha init --force

# ❌ Outdated - may use older version
npx claude-flow init
```

### 2. Namespace Isolation for Multi-Domain Projects
```bash
# Separate frontend and backend memory spaces
npx claude-flow@alpha memory store ui_state "component config" --namespace frontend
npx claude-flow@alpha memory store db_config "connection string" --namespace backend
```

### 3. Project Naming for Complex Work
```bash
# Single feature - no project name needed
npx claude-flow@alpha hive-mind spawn "add authentication" --claude

# Multi-feature - use project name
npx claude-flow@alpha init --project-name "enterprise-crm" --force
```

### 4. Leverage ReasoningBank for Context
```bash
# Store architectural decisions
npx claude-flow@alpha memory store architecture "microservices pattern with event-driven communication" \
  --namespace design --reasoningbank

# Query later with semantic search
npx claude-flow@alpha memory query "architecture pattern" --namespace design
```

---

## Troubleshooting

### Semantic Search Not Working
**Fixed in v2.7.0-alpha.10** - Ensure you're using the latest alpha version:
```bash
npx claude-flow@alpha --version  # Should show 2.7.0-alpha.10 or newer
```

### Memory Not Persisting
Check that `.swarm/memory.db` exists and has write permissions:
```bash
ls -la .swarm/memory.db
```

### Agent Coordination Issues
Verify Claude Code is installed and accessible:
```bash
claude --version  # Should show Claude Code version
```

---

## Additional Resources

- **GitHub Repository**: https://github.com/ruvnet/claude-flow
- **Issue Tracker**: https://github.com/ruvnet/claude-flow/issues
- **Discussions**: https://github.com/ruvnet/claude-flow/discussions

---

## Quick Command Reference

```bash
# Initialize project
npx claude-flow@alpha init --force

# View help
npx claude-flow@alpha --help

# Check version
npx claude-flow@alpha --version

# Execute task with swarm
npx claude-flow@alpha swarm "task description" --claude

# Spawn hive-mind for focused work
npx claude-flow@alpha hive-mind spawn "feature description" --claude

# Memory operations
npx claude-flow@alpha memory store key "value" --namespace ns --reasoningbank
npx claude-flow@alpha memory query "search term" --namespace ns
npx claude-flow@alpha memory list --namespace ns

# Performance monitoring
npx claude-flow@alpha benchmark run
npx claude-flow@alpha performance report

# GitHub operations (via MCP tools in Claude Code)
# Use within Claude Code session for GitHub integration
```

---

**Note**: This quick reference is maintained separately from the full comprehensive guide. For detailed tutorials, architecture deep-dives, and advanced usage patterns, refer to the official GitHub repository.

**Archived Guide**: Previous v2.5.0 comprehensive guide preserved as `Claude-Flow-Complete-Guide-v2.5.0-ARCHIVED.docx`
