# Validation Guide

How to safely validate changes before merging to main.

## 🎯 Quick Reference

### Local Validation (Before Pushing)

```bash
# Run full validation locally
npm run validate

# If it passes, you're good to push!
```

### Remote Validation (After Pushing)

1. Push to feature branch
2. GitHub Actions runs automatically
3. Check status on GitHub (Actions tab or PR checks)
4. Merge when green ✅

---

## 📋 Complete Validation Workflow

### Step 1: Create Feature Branch

```bash
git checkout -b feature/update-resume
```

### Step 2: Make Your Changes

```bash
vim resume.md
# or edit components, styles, etc.
```

### Step 3: Test Locally

```bash
# Quick test in dev mode
npm run dev
# Visit http://localhost:5173

# Full validation (same as CI)
npm run validate
```

**What `validate` does:**
- ✅ Parses `resume.md` → JSON
- ✅ Generates `resume.pdf`
- ✅ Builds site with Vite
- ✅ Verifies all assets compile

### Step 4: Preview Production Build

```bash
npm run preview
# Visit http://localhost:4173
# Test in both light and dark mode
# Check mobile responsiveness
```

### Step 5: Commit and Push

```bash
git add .
git commit -m "Update resume with new project"
git push origin feature/update-resume
```

### Step 6: Check GitHub Actions

Two ways to monitor:

**Option A - Actions Tab:**
1. Go to repo on GitHub
2. Click **Actions** tab
3. See your workflow running
4. Click on the run to see logs

**Option B - Pull Request:**
1. Create PR from your branch → main
2. See status checks at the bottom
3. 🟡 Yellow = Running
4. ✅ Green = Passed
5. ❌ Red = Failed (click for logs)

### Step 7: Merge When Green

```bash
# Option 1: Merge via GitHub UI
# Click "Merge pull request" when checks pass

# Option 2: Merge via CLI (if no PR required)
git checkout main
git merge feature/update-resume
git push origin main
```

---

## 🚨 What Gets Validated

### ✅ Checks That Run

1. **Resume Parsing**
   - `resume.md` syntax is valid
   - All required sections present
   - JSON generation succeeds

2. **PDF Generation**
   - Pandoc can process markdown
   - LaTeX compilation succeeds
   - PDF created successfully

3. **Build Process**
   - All React components compile
   - No TypeScript/JSX errors
   - CSS is valid
   - Assets are bundled correctly

4. **Output Verification**
   - `dist/` folder created
   - `dist/index.html` exists
   - `dist/resume.pdf` exists
   - All assets copied to `dist/`

### ❌ Common Failures & Fixes

**Resume parsing error:**
```bash
# Check resume.md syntax
npm run parse-resume
# Fix any reported errors in resume.md
```

**Build fails:**
```bash
# Check for syntax errors
npm run build
# Look for red error messages
# Fix the reported file/line
```

**PDF generation fails (local only):**
```bash
# Install Pandoc
brew install pandoc basictex  # macOS
sudo apt-get install pandoc texlive-xetex  # Linux

# Try again
npm run generate-resume-pdf
```

---

## 🔧 Advanced: Local Pre-Push Hook

Want automatic validation before every push? Create a git hook:

```bash
# Create the hook file
cat > .git/hooks/pre-push << 'EOF'
#!/bin/bash
echo "🔍 Running pre-push validation..."
npm run validate

if [ $? -ne 0 ]; then
  echo "❌ Validation failed! Push aborted."
  echo "Fix errors and try again."
  exit 1
fi

echo "✅ All checks passed!"
exit 0
EOF

# Make it executable
chmod +x .git/hooks/pre-push
```

Now validation runs automatically before every push!

**Bypass if needed:**
```bash
git push --no-verify  # Skip validation (use sparingly!)
```

---

## 📊 Validation Status Badges

Add to your README to show build status:

```markdown
[![validate-commit](https://github.com/cjlludwig/cjlludwig.github.io/actions/workflows/validate-commit.yml/badge.svg)](https://github.com/cjlludwig/cjlludwig.github.io/actions/workflows/validate-commit.yml)
```

---

## 🎓 Best Practices

1. **Always validate locally first**
   - Faster feedback
   - Saves CI minutes
   - Catches issues early

2. **Use feature branches**
   - Never commit directly to main
   - Easier to test and rollback
   - Better git history

3. **Test the preview build**
   - Dev mode ≠ production
   - Always run `npm run preview`
   - Check both themes (light/dark)

4. **Review the diff**
   - Check what changed in `dist/`
   - Verify resume.pdf was updated
   - Ensure no unintended changes

5. **Small, focused commits**
   - Easier to review
   - Faster to validate
   - Simpler to debug

---

## 🆘 Troubleshooting

### Validation passes locally but fails on GitHub

**Likely causes:**
- Different Node versions
- Missing environment variables
- File path issues (case sensitivity)
- Git ignored files not committed

**Solution:**
```bash
# Check Node version matches CI
node --version  # Should be 22.x

# Ensure all files are committed
git status

# Try clean install
rm -rf node_modules package-lock.json
npm install
npm run validate
```

### PDF generation works on CI but not locally

**Likely cause:** Pandoc not installed locally

**Solution:**
```bash
# macOS
brew install pandoc basictex

# Linux
sudo apt-get install pandoc texlive-xetex texlive-fonts-recommended

# Windows
# Download from https://pandoc.org/installing.html
```

### Validation is too slow

**Options:**
1. Skip PDF locally: Edit `generate-resume-pdf` to just echo
2. Use faster CI: Upgrade to GitHub Actions paid tier
3. Cache dependencies: Already using `cache: 'npm'`
4. Skip validation: Use `--no-verify` (not recommended)

---

## 📞 Need Help?

- Check [GitHub Actions logs](https://github.com/cjlludwig/cjlludwig.github.io/actions)
- Review [README.md](../README.md) troubleshooting
- See [GUIDE.md](GUIDE.md) for detailed docs

