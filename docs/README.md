# Documentation

Complete documentation for Connor Ludwig's professional portfolio website.

## 📚 Documentation Files

### [GUIDE.md](GUIDE.md) - Complete Development Guide
Comprehensive guide covering all aspects of development, customization, and maintenance.

**Topics covered:**
- Project overview and core principles
- Content management with `resume.md`
- Component architecture
- Styling standards and design system
- Icon and image management
- Build and deployment
- Common tasks and workflows
- Performance guidelines
- SEO and metadata
- Troubleshooting

### [VALIDATION_GUIDE.md](VALIDATION_GUIDE.md) - Validation Workflow
How to validate changes before deploying to production.

**Topics covered:**
- Local validation with `npm run validate`
- Remote validation with GitHub Actions
- Complete validation workflow
- What gets validated
- Common failures and fixes
- Pre-push hooks setup
- Best practices
- Troubleshooting validation issues

### [BRANCH_PROTECTION.md](BRANCH_PROTECTION.md) - Branch Protection Setup
How to set up GitHub branch protection to enforce validation.

**Topics covered:**
- GitHub UI setup instructions
- Required status checks configuration
- Pull request requirements
- Testing workflow
- Emergency override procedures

## 🚀 Quick Links

### For Development
- **Getting Started**: See main [README.md](../README.md)
- **Making Changes**: [GUIDE.md](GUIDE.md) → Common Tasks
- **Testing Changes**: [VALIDATION_GUIDE.md](VALIDATION_GUIDE.md)
- **Deploying**: [GUIDE.md](GUIDE.md) → Deployment

### For Content Updates
- **Update Resume**: Edit `resume.md`, run `npm run dev`
- **Add Project**: [GUIDE.md](GUIDE.md) → Add New Section
- **Change Colors**: [GUIDE.md](GUIDE.md) → Update Color Scheme
- **Update PDF**: Automatic on every build!

### For Troubleshooting
- **Build Issues**: [GUIDE.md](GUIDE.md) → Troubleshooting
- **Validation Issues**: [VALIDATION_GUIDE.md](VALIDATION_GUIDE.md) → Troubleshooting
- **Content Not Updating**: [GUIDE.md](GUIDE.md) → Common Tasks

## 🎯 Workflow Summary

```bash
# 1. Make changes
vim resume.md

# 2. Validate locally
npm run validate

# 3. Preview
npm run preview

# 4. Push to feature branch
git checkout -b feature/my-changes
git push origin feature/my-changes

# 5. Create PR and wait for validation

# 6. Merge when green ✅
```

## 📖 Documentation Standards

All documentation follows these principles:

- **Clear and Concise**: Easy to understand, no jargon
- **Actionable**: Practical examples and commands
- **Up-to-Date**: Reflects current codebase
- **Comprehensive**: Covers common and edge cases
- **Well-Organized**: Logical structure with clear sections

## 🤝 Contributing to Docs

Found a mistake or want to improve the docs?

1. Edit the relevant file
2. Follow the same format and style
3. Test any code examples
4. Submit via pull request

## 📞 Need Help?

If you can't find what you're looking for:

1. Check the [main README](../README.md)
2. Search the [GUIDE.md](GUIDE.md)
3. Review [VALIDATION_GUIDE.md](VALIDATION_GUIDE.md) for CI/CD questions
4. Check GitHub Issues
5. Review the code - it's well-commented!

---

**Last Updated**: November 2024

