# Branch Protection Setup

To require validation before merging to main:

## GitHub UI Setup

1. Go to your repo → **Settings** → **Branches**
2. Click **Add branch protection rule**
3. Configure:
   - **Branch name pattern**: `main`
   - ✅ **Require status checks to pass before merging**
   - ✅ **Require branches to be up to date before merging**
   - Search and select: `build-and-validate-commit`
   - ✅ **Require pull request before merging** (optional but recommended)
   - ✅ **Require approvals**: 0 (for solo projects) or 1+ (for teams)
4. Click **Create** or **Save changes**

## What This Does

- 🚫 **Blocks direct pushes to main**
- ✅ **Requires pull requests**
- ✅ **Requires validation workflow to pass**
- ✅ **Prevents broken code from reaching production**

## Workflow

```bash
# Create feature branch
git checkout -b feature/my-changes

# Make changes and push
git push origin feature/my-changes

# Create PR on GitHub
# Wait for validation to pass ✅
# Merge when green!
```

## Testing Locally Before Push

```bash
# Full validation locally
npm run build

# Check the output
ls -lh dist/

# Preview the built site
npm run preview
# Visit http://localhost:4173
```

## Emergency Override

If you need to bypass protection (use sparingly):
- Repo Settings → Branches → Edit rule
- Temporarily disable or delete rule
- Push changes
- Re-enable protection

