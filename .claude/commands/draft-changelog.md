# Draft Changelog

Generate a developer changelog for `CHANGELOG.md` following [Keep a Changelog](https://keepachangelog.com/) format.

Arguments: `$ARGUMENTS` — time range (e.g. "3 days", "1 week", "today"). Default "3 days".

---

## Process

### 1. Gather Information

```bash
# Get commits in time range
git log main --since="$ARGUMENTS ago" --format="%ad %h %s%n%b" --date=short --no-merges

# Or for master branch
git log master --since="$ARGUMENTS ago" --format="%ad %h %s%n%b" --date=short --no-merges
```

Read:
- `CHANGELOG.md` — current version, existing format
- `package.json` — current version number

### 2. Categorize Changes

Group commits by type using conventional commit prefixes:

| Category | Prefixes | Description |
|----------|----------|-------------|
| **Added** | `feat:` | New features, components, hooks, exports |
| **Changed** | `refactor:`, `perf:` | Breaking changes, API changes, improvements |
| **Deprecated** | — | Features to be removed in future |
| **Removed** | — | Removed features or exports |
| **Fixed** | `fix:` | Bug fixes |
| **Security** | `security:` | Security patches |
| **Documentation** | `docs:` | README, JSDoc, examples |
| **Chores** | `chore:`, `ci:`, `build:` | Dependencies, CI, tooling |
| **Tests** | `test:` | Test additions or fixes |

### 3. Format Entries

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- **scope:** Description of feature ([commit](url))

### Changed
- **scope:** Description of change ([commit](url))

### Fixed
- **scope:** Description of fix ([commit](url))

### Documentation
- **scope:** Description ([commit](url))

### Chores
- **scope:** Description ([commit](url))
```

Rules:
- Scope in bold (component/hook/config name)
- Present tense verbs (add, fix, remove, update)
- Under 100 characters per entry
- Include commit hash links
- Technical language OK (this is for developers)
- Include ALL changes (features, fixes, docs, chores, tests)

### 4. Determine Version Bump

Follow [Semantic Versioning](https://semver.org/):
- **MAJOR** (X.0.0): Breaking API changes
- **MINOR** (0.X.0): New features, backward compatible
- **PATCH** (0.0.X): Bug fixes, docs, chores

### 5. Present Draft

Show the proposed CHANGELOG.md section and ask:
- Version number correct?
- Any entries to add/remove?
- Wording changes?

---

## Final Steps (after approval)

1. Prepend new version section to `CHANGELOG.md`
2. Update version in `package.json`
3. Present changes for final confirmation before writing
