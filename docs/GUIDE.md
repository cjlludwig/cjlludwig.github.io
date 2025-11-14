# Complete Portfolio Guide

> Comprehensive documentation for your professional portfolio website

## Table of Contents

1. [Quick Start](#quick-start)
2. [Features Overview](#features-overview)
3. [Content Management](#content-management)
4. [Icons & Branding](#icons--branding)
5. [Deployment](#deployment)
6. [Customization](#customization)
7. [Troubleshooting](#troubleshooting)
8. [Technical Reference](#technical-reference)

---

## Quick Start

### First Time Setup

```bash
# Install dependencies
npm install

# Generate icons and parse resume
npm run setup

# Start development server
npm run dev
```

Visit http://localhost:5173 to see your site!

### Deploy to Production

```bash
npm run deploy
```

Your site will be live at: `https://cjlludwig.github.io`

---

## Features Overview

### ✨ What's Included

- **🔄 Automated Content Pipeline** - Edit `resume.md`, content updates automatically
- **🎨 Professional Icons** - Custom favicon and social sharing images
- **🌓 Dark Mode** - System-aware with manual toggle
- **📱 Fully Responsive** - Mobile, tablet, desktop optimized
- **🔍 SEO Optimized** - Rich meta tags and structured data
- **🤖 ATS-Friendly** - Keyword optimization for recruiters
- **📄 Downloadable Resume** - PDF available for download
- **🚀 PWA Ready** - Add to home screen capability

### 🎨 Professional Branding

#### Custom Favicon
- Professional "CL" monogram with gradient
- Multiple formats (SVG, PNG) and sizes
- Shows in browser tabs across all devices

#### Social Sharing Images
- **Open Graph** (1200x630) - Facebook, LinkedIn, Slack
- **Twitter Card** (1200x600) - Twitter/X
- Branded design with name, title, and tagline

#### PWA Features
- Web manifest for mobile installation
- Theme colors for light/dark mode
- Professional app icons

---

## Content Management

### Single Source of Truth: resume.md

All website content is automatically pulled from `resume.md` during the build process.

### Quick Update Workflow

```bash
# 1. Edit your resume
vim resume.md

# 2. Preview changes
npm run dev

# 3. Deploy
npm run deploy
```

### What Updates Automatically

✅ Personal information (name, title, location, links)  
✅ Professional summary  
✅ Work experience (all positions)  
✅ Projects (descriptions + tech stacks)  
✅ Technical skills (all categories)  
✅ Certifications & awards  
✅ Education details

### Resume.md Format

#### Header Section
```markdown
# Your Name
**Your Title**
Location
[Website](url) | [GitHub](url) | [LinkedIn](url)
```

#### Professional Experience
```markdown
### **Job Title**
**Company Name – Location**
*MM/YYYY – MM/YYYY*

- Achievement 1
- Achievement 2
```

#### Projects
```markdown
### **Project Name**
*MM/YYYY – Present*

Project description here.
**Stack:** Tech1, Tech2, Tech3
```

#### Skills
```markdown
**Category Name:** Skill1, Skill2, Skill3
```

#### Certifications & Awards
```markdown
- **Certification Name** (Certified)
- **Award Name** (Year)
```

### Manual Updates Required

Some elements require manual updates:

1. **About Section Metrics** - Edit `src/components/About.jsx`
2. **ATS Keywords** - Edit `src/components/Skills.jsx`
3. **SEO Meta Tags** - Edit `index.html`
4. **Resume PDF** - Update `public/resume.pdf`

---

## Icons & Branding

### Generated Icons

All icons are auto-generated from `public/favicon.svg`:

```bash
npm run generate-icons
```

**Created files:**
- `favicon.svg` (754 B) - Source file
- `favicon-16x16.png` (638 B) - Browser tab
- `favicon-32x32.png` (1.3 KB) - Browser tab
- `apple-touch-icon.png` (9.8 KB) - iOS home screen
- `android-chrome-192x192.png` (11 KB) - Android
- `android-chrome-512x512.png` (35 KB) - Android
- `og-image.png` (107 KB) - Social sharing
- `twitter-card.png` (104 KB) - Twitter card
- `site.webmanifest` (683 B) - PWA config

### Customizing Icons

#### Change Logo Design
1. Edit `public/favicon.svg`
2. Run `npm run generate-icons`
3. Deploy with `npm run deploy`

#### Change Colors
Update in:
- `public/favicon.svg` - Favicon colors
- `scripts/generate-social-image.js` - Social card colors
- `index.html` - Theme colors

#### Customize Social Cards
Edit `scripts/generate-social-image.js`:
- Update text, layout, colors, fonts
- Run `npm run generate-icons` to regenerate

### Testing Social Cards

**Facebook/LinkedIn Debugger**  
https://developers.facebook.com/tools/debug/

**Twitter Card Validator**  
https://cards-dev.twitter.com/validator

**Generic Preview**  
https://www.opengraph.xyz/

---

## Deployment

### GitHub Pages Setup

#### First Time Configuration

1. **Ensure Git Remote**
   ```bash
   git remote -v
   # Should show your GitHub repository
   ```

2. **Deploy**
   ```bash
   npm run deploy
   ```

3. **Configure GitHub Pages**
   - Go to repository Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `gh-pages`
   - Save

4. **Access Your Site**
   `https://cjlludwig.github.io`

### Updating Your Site

```bash
# Make changes to resume.md or components
# Then deploy:
npm run deploy
```

The deploy command automatically:
1. Parses `resume.md`
2. Builds the production version
3. Deploys to GitHub Pages

### Custom Domain (Optional)

1. **Add CNAME file**
   ```bash
   echo "yourdomain.com" > public/CNAME
   ```

2. **Configure DNS**
   Add A records pointing to GitHub Pages IPs:
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153

3. **Update package.json**
   ```json
   "homepage": "https://yourdomain.com"
   ```

4. **Deploy and configure on GitHub**
   - Deploy: `npm run deploy`
   - Settings → Pages → Custom domain
   - Enable "Enforce HTTPS"

---

## Customization

### Styling

All styles are in `src/App.css` using CSS variables.

#### Color Scheme
```css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --text-primary: #1a1a1a;
  --accent-primary: #2563eb;
  /* ... more variables */
}

.dark {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --text-primary: #f1f5f9;
  --accent-primary: #3b82f6;
  /* ... dark mode colors */
}
```

#### Spacing & Typography
```css
:root {
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  --spacing-2xl: 4rem;
  
  --font-sans: -apple-system, BlinkMacSystemFont, ...;
  --font-mono: 'SF Mono', 'Monaco', ...;
}
```

### Component Structure

```
src/components/
├── About.jsx           - Summary + key metrics
├── Certifications.jsx  - Certs and awards
├── Education.jsx       - Education info
├── Experience.jsx      - Work history
├── Hero.jsx            - Name, title, links
├── Projects.jsx        - Key projects
└── Skills.jsx          - Technical skills
```

Each component imports from `src/data/resume-data.json` (auto-generated).

### Adding Custom Sections

1. Create new component in `src/components/`
2. Import resume data if needed
3. Add to `src/App.jsx`
4. Style in `src/App.css`

---

## Troubleshooting

### Content Not Updating

**Solution:**
```bash
# Manually parse resume
npm run parse-resume

# Check generated data
cat src/data/resume-data.json

# Clear build and rebuild
rm -rf dist/
npm run build
```

### Icons Not Showing

**Solution:**
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache
- Check console for 404 errors
- Verify files exist: `ls -la public/*.png public/*.svg`

### Social Cards Not Updating

**Solution:**
- Use platform debugger tools to force refresh
- Clear cache and re-scrape
- Verify absolute URLs in meta tags
- Check images are publicly accessible

### Build Fails

**Solution:**
```bash
# Check for Node.js errors
npm run parse-resume

# Verify JSON is valid
node -e "require('./src/data/resume-data.json')"

# Reinstall dependencies
rm -rf node_modules/
npm install
```

### Dark Mode Not Working

**Solution:**
- Check browser localStorage is enabled
- Not in incognito/private mode
- Check browser console for errors

### Deploy Fails

**Solution:**
- Verify git remote is configured
- Check GitHub repository exists
- Ensure you have push permissions
- Check network connection

---

## Technical Reference

### Available Commands

```bash
npm run setup          # First-time setup (icons + parse)
npm run dev            # Development server with hot reload
npm run build          # Production build
npm run preview        # Preview production build
npm run deploy         # Deploy to GitHub Pages
npm run parse-resume   # Parse resume.md to JSON
npm run generate-icons # Generate all icons and images
```

### Build Process

```
1. npm run parse-resume
   → Reads resume.md
   → Generates src/data/resume-data.json

2. vite build
   → Compiles React components
   → Bundles assets
   → Outputs to dist/

3. gh-pages -d dist
   → Pushes dist/ to gh-pages branch
   → Triggers GitHub Pages deployment
```

### Project Structure

```
professional/
├── public/               # Static assets
│   ├── favicon.svg       # Source favicon
│   ├── *.png            # Generated icons
│   ├── og-image.png     # Social sharing
│   ├── twitter-card.png # Twitter card
│   ├── site.webmanifest # PWA config
│   └── resume.pdf       # Downloadable resume
├── scripts/
│   ├── parse-resume.js           # MD → JSON parser
│   ├── generate-icons.js         # Icon generator
│   └── generate-social-image.js  # Social card generator
├── src/
│   ├── components/      # React components
│   ├── data/
│   │   └── resume-data.json  # Auto-generated
│   ├── App.css          # Styles with CSS variables
│   ├── App.jsx          # Main component
│   └── main.jsx         # Entry point
├── docs/
│   └── GUIDE.md         # This file
├── resume.md            # SINGLE SOURCE OF TRUTH
├── index.html           # HTML template
├── vite.config.js       # Vite config
└── package.json         # Dependencies & scripts
```

### Dependencies

**Runtime:**
- react ^19.2.0
- react-dom ^19.2.0
- react-icons ^5.5.0

**Dev:**
- vite ^7.2.2
- @vitejs/plugin-react ^5.1.1
- gh-pages ^6.3.0
- sharp (for icon generation)

### Performance Metrics

**Build Output:**
- HTML: ~5 KB (gzipped: 1.5 KB)
- CSS: ~11 KB (gzipped: 2.4 KB)
- JS: ~215 KB (gzipped: 68 KB)

**Expected Lighthouse Scores:**
- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

### Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- iOS Safari 12+
- Android Chrome 90+

### SEO Features

**Meta Tags:**
- Title, description, keywords
- Open Graph (Facebook, LinkedIn)
- Twitter Cards
- Canonical URL
- Robots instructions

**Structured Data:**
- JSON-LD Person schema
- Professional details
- Social profiles
- Education history

**ATS Optimization:**
- Hidden keyword section
- Semantic HTML
- Accessible content
- Clean structure

---

## Example Workflows

### Workflow 1: Update Job Title

```bash
# 1. Edit resume.md
vim resume.md
# Change: **Senior Staff Software Engineer**
# To: **Principal Staff Software Engineer**

# 2. Preview
npm run dev

# 3. Deploy
npm run deploy
```

**Updates automatically:**
- Hero title
- Social sharing images (regenerated)
- SEO meta tags

### Workflow 2: Add New Project

```bash
# 1. Edit resume.md under ## Key Projects
### **New Amazing Project**
*MM/YYYY – Present*

Description of the project.
**Stack:** React, Node.js, AWS, PostgreSQL

# 2. Deploy
npm run deploy
```

**Result:** New project card appears on site

### Workflow 3: Rebrand Colors

```bash
# 1. Edit public/favicon.svg (change gradient colors)
# 2. Edit scripts/generate-social-image.js (update colors)
# 3. Edit src/App.css (update CSS variables)

# 4. Regenerate icons
npm run generate-icons

# 5. Deploy
npm run deploy
```

**Result:** Complete brand color update across all assets

### Workflow 4: Add New Skill Category

```bash
# 1. Edit resume.md
**Database Systems:** PostgreSQL, MongoDB, Redis, Cassandra

# 2. Deploy
npm run deploy
```

**Result:** New skill category card appears automatically

---

## Best Practices

### Content

✅ Keep resume.md formatted consistently  
✅ Use quantified achievements (numbers, percentages)  
✅ Update regularly with latest accomplishments  
✅ Test locally before deploying  
✅ Keep resume.pdf in sync with resume.md  

### Performance

✅ Icons are cached by browsers  
✅ Use SVG when possible (smallest)  
✅ Social images only load when shared  
✅ Lazy load images if adding more  

### SEO

✅ Update meta tags when changing jobs  
✅ Add relevant keywords to resume.md  
✅ Test social cards after major updates  
✅ Keep structured data current  

### Maintenance

✅ Commit resume.md changes to git  
✅ Backup resume.md separately  
✅ Review build output for errors  
✅ Test across browsers periodically  

---

## Support & Resources

### Documentation
- This guide covers everything comprehensively
- Check README.md for quick reference
- Review code comments for implementation details

### Testing Tools
- **Lighthouse**: Chrome DevTools → Lighthouse
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **Open Graph Checker**: https://www.opengraph.xyz/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **Facebook Debugger**: https://developers.facebook.com/tools/debug/

### External Resources
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)
- [GitHub Pages Docs](https://docs.github.com/pages)
- [Open Graph Protocol](https://ogp.me/)
- [Web App Manifest](https://web.dev/add-manifest/)

---

## Conclusion

Your portfolio is a modern, production-ready website featuring:

✅ Automated content management  
✅ Professional branding and icons  
✅ Social sharing optimization  
✅ Dark mode support  
✅ Responsive design  
✅ SEO optimization  
✅ PWA capabilities  
✅ One-command deployment  

**To get started**: `npm run setup && npm run dev`  
**To deploy**: `npm run deploy`

Your professional portfolio is ready to make a great first impression! 🚀

---

*Last Updated: November 2024*  
*Version: 1.0*  
*Status: Production Ready ✅*

