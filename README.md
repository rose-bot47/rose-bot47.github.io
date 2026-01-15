# Rose Davison - Portfolio Website

A clean, professional portfolio showcasing mechanical engineering projects with a focus on robotics, exoskeletons, and embedded systems.

## 🚀 Quick Start - GitHub Pages Hosting

### Option 1: Using GitHub's Web Interface (Easiest)

1. **Create Repository**
   - Go to [github.com/new](https://github.com/new)
   - Name it `yourusername.github.io` (replace with your actual username)
   - Keep it public
   - Don't initialize with README (we have files already)
   - Click "Create repository"

2. **Upload Files**
   - Click "uploading an existing file"
   - Drag and drop ALL files from this folder (including the `images` folder)
   - Commit directly to main branch

3. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: main, / (root)
   - Save

4. **Done!** Your site will be live at `https://yourusername.github.io` within a few minutes.

### Option 2: Using Git Command Line

```bash
# Navigate to this folder
cd portfolio

# Initialize git repo
git init
git add .
git commit -m "Initial portfolio upload"

# Add your GitHub remote (replace USERNAME)
git remote add origin https://github.com/USERNAME/USERNAME.github.io.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Then enable GitHub Pages in repository Settings → Pages.

---

## ✏️ Customization Checklist

Before deploying, update these items in `index.html`:

### Contact Links (search for "yourusername")
- [ ] GitHub URL: `https://github.com/yourusername`
- [ ] LinkedIn URL: `https://linkedin.com/in/yourusername`
- [ ] Email address: `your.email@example.com`

### Optional Customizations
- Update project descriptions if needed
- Add/remove projects
- Modify colors in `styles.css` (`:root` section)

---

## 📁 File Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # Smooth scroll & animations
├── README.md           # This file
└── images/
    ├── profile.png     # Your headshot
    ├── exo-linear.jpg  # Linear actuator exoskeleton
    ├── exo-cable.jpg   # Cable-driven prototype
    ├── exo-passive.jpg # Wearable leg brace
    ├── exo-arm.jpg     # Articulated arm linkage
    ├── robot-vex.jpg   # VEX Robot #104
    ├── robot-gear.jpg  # Custom gear robot
    ├── robot-259.jpg   # Robot #259
    ├── tracker-case.jpg    # IMU tracker enclosure
    └── tracker-internals.jpg # Tracker electronics
```

---

## 🎨 Design Notes

- **Typography**: Instrument Serif (display) + DM Sans (body)
- **Color Palette**: Deep blue-black background with blue accent (#3b82f6)
- **Mobile Responsive**: Tested down to 320px width
- **Performance**: Pure CSS animations, no frameworks required

---

## 📝 Adding to Job Applications

When linking your portfolio:
- **Full URL**: `https://yourusername.github.io`
- **Shortened**: Consider using a link shortener or custom domain

For the Apptronik application field "Please provide a portfolio or Github":
```
Portfolio: https://yourusername.github.io
GitHub: https://github.com/yourusername
```

---

Built with 💜 for the future of robotics.
