# Connor Ludwig - Professional Portfolio

[![deploy-page](https://github.com/cjlludwig/cjlludwig.github.io/actions/workflows/deploy-page.yml/badge.svg?branch=main&event=push)](https://github.com/cjlludwig/cjlludwig.github.io/actions/workflows/deploy-page.yml)

A modern, single-page portfolio website built with React and Vite. Features automated content management, professional branding, dark mode, and full responsiveness.

**Live at:** [https://cjlludwig.github.io](https://cjlludwig.github.io)

## ✨ Features

- **🔄 Automated Content** - Single source of truth from `resume.md`
- **📄 Auto-Generated PDF** - Resume PDF regenerated on every build
- **🎨 Professional Icons** - Custom favicon and social sharing images
- **🌓 Dark Mode** - System-aware with manual toggle
- **📱 Fully Responsive** - Mobile, tablet, desktop optimized
- **🔍 SEO Optimized** - Rich meta tags and structured data
- **🤖 ATS-Friendly** - Keyword optimization for recruiters
- **🚀 Auto-Deploy** - GitHub Actions CI/CD on push to main
- **💫 PWA Ready** - Add to home screen capability

## 🚀 Quick Start

### Installation

```bash
# Clone and install
git clone https://github.com/cjlludwig/cjlludwig.github.io.git
cd cjlludwig.github.io
npm install

# First-time setup (generate icons and parse resume)
npm run setup

# Start development server
npm run dev
```

Visit http://localhost:5173

### Deploy to GitHub Pages

```bash
npm run deploy
```

Your site will be live at: `https://cjlludwig.github.io`

**Or push to main for automatic deployment via GitHub Actions!**

### Pre-Commit Hook

When you commit changes to `resume.md`, a git hook automatically:
- ✅ Parses resume.md → JSON
- ✅ Generates PDF (if Pandoc is installed)
- ✅ Stages the generated files

No manual PDF generation needed!

## 📝 Updating Content

All website content comes from `resume.md` - your single source of truth!

```bash
# 1. Edit resume.md with your latest info
vim resume.md

# 2. Preview changes (auto-generates JSON + PDF)
npm run dev

# 3. Deploy to production
npm run deploy
# OR push to main for auto-deploy
```

Content updates automatically include:
- Personal information (name, title, location, links)
- Professional summary
- Work experience
- Projects
- Technical skills
- Certifications & awards
- Education
- **PDF resume** (auto-generated)

## 📦 Available Commands

| Command | Description |
|---------|-------------|
| `npm run setup` | First-time setup (icons + parse resume) |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Build for production (generates JSON + PDF) |
| `npm run preview` | Preview production build |
| `npm run deploy` | Deploy to GitHub Pages manually |
| `npm run parse-resume` | Parse resume.md to JSON |
| `npm run generate-resume-pdf` | Generate PDF from resume.md |
| `npm run generate-icons` | Generate favicons and social images |

## 🔄 Automated Build Pipeline

```
resume.md (single source of truth)
    ↓
    [Pre-commit hook]
    ├─→ parse-resume.js → resume-data.json → Website content
    └─→ pandoc → resume.pdf → Downloadable PDF
        ↓
    [Committed to repo]
        ↓
    vite build → dist/ (on push to main)
        ↓
    GitHub Actions → gh-pages branch → Live site
```

**Note:** PDF generation happens automatically on commit via git hook (no CI overhead!)

## 🎨 Professional Branding

### Custom Icons
- Professional "CL" monogram favicon
- Multiple sizes for all devices and platforms
- Auto-generated from `public/favicon.svg`

### Social Sharing
- Open Graph images (1200x630) for Facebook, LinkedIn
- Twitter Card images (1200x600) for Twitter/X
- Branded design with name, title, and professional styling

### Test Your Social Cards
- **Facebook/LinkedIn**: https://developers.facebook.com/tools/debug/
- **Twitter**: https://cards-dev.twitter.com/validator

## 📂 Project Structure

```
cjlludwig.github.io/
├── .github/
│   └── workflows/
│       ├── deploy-page.yml       # Auto-deploy on push to main
│       └── validate-commit.yml   # Validate PRs
├── public/
│   ├── favicon.svg               # Source icon
│   ├── *.png                     # Generated icons
│   ├── og-image.png              # Social sharing image
│   └── resume.pdf                # Auto-generated PDF
├── src/
│   ├── components/               # React components
│   ├── data/
│   │   └── resume-data.json      # Auto-generated from resume.md
│   ├── App.css                   # Styles with dark mode
│   └── App.jsx                   # Main app component
├── scripts/
│   ├── parse-resume.js           # Markdown → JSON parser
│   ├── generate-icons.js         # Icon generator
│   └── generate-social-image.js  # Social card generator
├── docs/
│   └── GUIDE.md                  # Complete documentation
├── resume.md                     # 📝 SINGLE SOURCE OF TRUTH
└── package.json
```

## 🎯 Key Workflows

### Update Your Job Title
```bash
# Edit resume.md header
vim resume.md

# Push to main for auto-deploy
git add resume.md
git commit -m "Update job title"
git push origin main
```

### Add a New Project
```bash
# Add under ## Key Projects in resume.md
### **Project Name**
*MM/YYYY – Present*

Description here.
**Stack:** Tech1, Tech2, Tech3

# Deploy
npm run deploy
# OR push to main
```

### Change Brand Colors
```bash
# Edit public/favicon.svg
# Edit scripts/generate-social-image.js
# Edit src/App.css (CSS variables)
npm run generate-icons
npm run deploy
```

## 🌐 GitHub Pages Setup

### First Time

1. **Deploy**:
   ```bash
   npm run deploy
   ```

2. **Configure GitHub**:
   - Go to repo Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `gh-pages`
   - Save

3. **Access**: `https://cjlludwig.github.io`

### Automatic Deployment

Push to `main` branch and GitHub Actions will automatically:
- Install dependencies
- Install Pandoc (for PDF generation)
- Generate resume JSON + PDF
- Build the site
- Deploy to `gh-pages` branch

### Custom Domain (Optional)

```bash
# Add CNAME file
echo "yourdomain.com" > public/CNAME

# Update package.json
"homepage": "https://yourdomain.com"

# Deploy
npm run deploy
```

Configure DNS with A records to GitHub Pages IPs.

## 🎨 Customization

### Styling
All styles use CSS variables in `src/App.css`:

```css
:root {
  --accent-primary: #2563eb;  /* Change primary color */
  --spacing-md: 1.5rem;       /* Adjust spacing */
  --font-sans: ...;           /* Change fonts */
}
```

### Content Sections
Edit components in `src/components/`:
- `Hero.jsx` - Name, title, links
- `About.jsx` - Summary + metrics
- `Experience.jsx` - Work history
- `Skills.jsx` - Technical skills
- `Projects.jsx` - Key projects

### Manual Updates
- **About metrics**: Edit `src/components/About.jsx`
- **ATS keywords**: Edit `src/components/Skills.jsx`
- **Meta tags**: Edit `index.html`
- **Resume PDF styling**: Edit `generate-resume-pdf` script in `package.json`

## 🔧 Tech Stack

- **Frontend**: React 19.2.0
- **Build Tool**: Vite 7.2.2
- **Styling**: CSS with CSS Variables
- **Icons**: React Icons 5.5.0
- **Image Processing**: Sharp (dev)
- **PDF Generation**: Pandoc + XeLaTeX
- **Deployment**: GitHub Pages (gh-pages)
- **CI/CD**: GitHub Actions

## 📊 Performance

- **Build Size**: ~221 KB (~70 KB gzipped)
- **Lighthouse Score**: 95+ (all categories)
- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s

## 🐛 Troubleshooting

### Content not updating
```bash
npm run parse-resume
cat src/data/resume-data.json  # Verify data
```

### PDF not generating on commit
```bash
# Install Pandoc and LaTeX (required for local PDF generation)
brew install pandoc basictex  # macOS
# or
sudo apt-get install pandoc texlive-xetex  # Linux

# Test PDF generation manually
npm run generate-resume-pdf

# PDF is auto-generated by pre-commit hook when you commit resume.md changes
```

### Icons not showing
```bash
ls -la public/*.png  # Verify files exist
npm run generate-icons  # Regenerate
```

### Build fails
```bash
npm run parse-resume  # Check for errors
rm -rf node_modules/ && npm install  # Fresh install
```

### Social cards not refreshing
- Use platform debugger tools (links above)
- Force re-scrape with debugger
- Verify absolute URLs in meta tags

### GitHub Actions failing
- Check Actions tab for logs
- Ensure `gh-pages` branch exists
- Verify repo settings allow Actions

## 📚 Documentation

**Complete documentation available in [`docs/`](docs/) directory:**

- **[GUIDE.md](docs/GUIDE.md)** - Complete development guide, customization, and troubleshooting
- **[VALIDATION_GUIDE.md](docs/VALIDATION_GUIDE.md)** - How to validate changes before deploying
- **[BRANCH_PROTECTION.md](docs/BRANCH_PROTECTION.md)** - GitHub branch protection setup
- **[docs/README.md](docs/README.md)** - Documentation index and quick reference

## 🎉 What You Get

✅ **Automated content** from resume.md  
✅ **Auto-generated PDF** on every build  
✅ **Professional favicon** with "CL" monogram  
✅ **Social sharing images** for all platforms  
✅ **Dark mode** with smooth transitions  
✅ **Responsive design** for all devices  
✅ **SEO optimized** with structured data  
✅ **CI/CD pipeline** with GitHub Actions  
✅ **One-command deployment** to GitHub Pages  
✅ **PWA ready** for mobile installation  

## 📞 Support

- **Documentation**: [`docs/`](docs/) - Complete guides and references
- **Validation Help**: [`docs/VALIDATION_GUIDE.md`](docs/VALIDATION_GUIDE.md)
- **Issues**: Check GitHub Issues
- **React**: https://react.dev/
- **Vite**: https://vite.dev/
- **GitHub Pages**: https://docs.github.com/pages

## 📄 License

ISC

## 👤 Author

Connor Ludwig
- Website: [cjlludwig.github.io](https://cjlludwig.github.io)
- GitHub: [@cjlludwig](https://github.com/cjlludwig)
- LinkedIn: [connor-ludwig](https://linkedin.com/in/connor-ludwig)

---

**Ready to deploy?** Run `npm run deploy` or push to main! 🚀


