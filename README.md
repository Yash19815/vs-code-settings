# VS Code Minimal Theme Customization

A personal VS Code customization pack focused on a minimal, distraction-free editor UI.

This repo combines:
- Custom VS Code settings
- Custom injected CSS
- Custom injected JavaScript
- Language icon assets (SVG) for dynamic watermark mode
- Geist Mono font family files (OTF)

## Goal

Create a clean coding environment with:
- Minimal chrome and panel noise
- Styled command palette with blur/backdrop
- Better typography in editor/sidebar
- Dynamic empty-editor watermark that changes by last active language
- Terminal-first workflow

## Project Structure

- settings.json
- vscode-css.css
- vscode-script.js
- assets/
  - C.svg
  - cpp.svg
  - css.svg
  - html.svg
  - java.svg
  - javascript.svg
  - json.svg
  - md.svg
  - python.svg
  - react.svg
  - sql.svg
  - ts.svg
  - otf/
    - Geist-Black.otf
    - Geist-BlackItalic.otf
    - Geist-Bold.otf
    - Geist-BoldItalic.otf
    - Geist-ExtraBold.otf
    - Geist-ExtraBoldItalic.otf
    - Geist-ExtraLight.otf
    - Geist-ExtraLightItalic.otf
    - Geist-Italic.otf
    - Geist-Light.otf
    - Geist-LightItalic.otf
    - Geist-Medium.otf
    - Geist-MediumItalic.otf
    - Geist-Regular.otf
    - Geist-SemiBold.otf
    - Geist-SemiBoldItalic.otf
    - Geist-Thin.otf
    - Geist-ThinItalic.otf

## Features

### 1) Editor and Typographic Feel

From settings.json:
- Font family: JetBrains Mono / Fira Code fallback stack
- Font ligatures enabled
- Smooth caret animation + smooth scrolling
- Minimap enabled
- No current-line highlight
- Bracket pair colorization enabled
- Reduced visual guide noise (indent guides and bracket guides off)

From vscode-css.css:
- Comments styled in italic with a custom color and font family
- Subtle top shadow on editor canvas for depth
- Current inline find match set to a pure black background

### 2) Explorer and Sidebar Minimalism

- Sidebar gets a soft shadow depth effect
- Selected file row has custom background + top/bottom borders
- Explorer chevron icon is hidden
- Explorer action buttons are hidden
- Sidebar labels use Geist Mono styling
- Sidebar header title is uppercase, compact, and color-accented

### 3) Command Palette Glass Effect

CSS + JS combo behavior:
- Command palette is centered vertically
- Rounded corners + gradient background + blur
- Injected full-screen backdrop layer when palette opens
- ESC or click cleanup removes the overlay
- Sticky widgets are temporarily hidden while palette is active

### 4) Terminal-First Minimal Panel

- Panel tab/title strip is hidden (Problems/Output/Debug Console/Terminal/Ports bar)
- Keeps terminal area visually clean
- Adds small top breathing space to terminal container
- Removes panel borders/shadows

Keyboard shortcuts called out in CSS comments:
- Ctrl+` toggles terminal panel
- Ctrl+Shift+` creates new terminal
- Ctrl+Shift+5 splits terminal
- Ctrl+Shift+M opens Problems
- Ctrl+Shift+U opens Output
- Ctrl+Shift+Y opens Debug Console

### 5) Dynamic Watermark Language Icon

In vscode-script.js:
- Detects active tab language by class suffix -lang-file-icon
- Stores last detected language id
- Applies corresponding icon to empty-editor watermark (.editor-group-watermark .letterpress)
- Polls every 700ms to survive DOM replacements
- Has a default generic code icon fallback

Supported icon mappings include:
- python
- javascript
- typescript
- javascriptreact
- typescriptreact
- html
- css
- json
- cpp
- c
- java
- sql
- markdown
- default fallback

## Color Palette Used

Primary colors found in settings/CSS/JS:
- #16181d: terminal background and panel border
- #008c7d: comment color
- #4f5971: selected explorer row background
- #727b90: selected explorer row border
- #bc9abc: sidebar title accent and scrollbar color
- #3c3c50 and #2a2b38: command palette/tooltip gradient stops
- #5D6E7A: default watermark icon stroke
- #000000: current find match and several SVG icon fills
- #ffffff: selected row text and sidebar labels

Opacity and blur accents:
- rgba(0, 0, 0, .75), .45, .35, .25, .15
- Backdrop blur usage at 3px and 8px in key UI overlays

## Asset Notes (What Each File Contains)

### Root files
- settings.json: full VS Code behavior/theme + extension import paths
- vscode-css.css: visual UI overrides for editor/workbench components
- vscode-script.js: runtime DOM behavior (command palette overlay + dynamic watermark)

### assets/*.svg
All SVG files are language icons intended for watermark/icon usage. Primary metadata detected:
- C.svg: viewBox 0 0 38.000089 42.000031, primary #283593
- cpp.svg: viewBox 0 0 32 32, primary #00599C
- css.svg: viewBox 0 0 512 512, primary #000000
- html.svg: viewBox -1 0 20 20, primary #000000
- java.svg: viewBox 0 0 512 512, primary #000000
- javascript.svg: viewBox 0 0 20 20, primary #000000
- json.svg: viewBox 0 0 32 32, primary #000000
- md.svg: viewBox 0 0 24 24, primary #000000
- python.svg: viewBox 0 0 20 20, primary #000000
- react.svg: viewBox 0 0 16 16, primary #000000
- sql.svg: viewBox 0 0 32 32, primary #000000
- ts.svg: viewBox 0 0 16 16, primary #000000

### assets/otf/*.otf
Geist family files included for local typography installation/use.

## Exact Setup (Windows)

Follow these steps to reproduce this theme exactly.

### Step 1: Keep this folder path or update imports

Current imports in settings.json expect:

D:/DATA/Documents(old)/projects/vs-code/

If you move the project, update the two file:// import paths inside settings.json.

### Step 2: Install the required VS Code extension

Install:
- Custom CSS and JS Loader

Common extension id:
- be5invis.vscode-custom-css

### Step 3: Install fonts (recommended)

To match sidebar CSS font usage and fallback behavior:
- Install Geist OTF fonts from assets/otf (double-click each .otf and click Install)
- Keep JetBrains Mono and/or Fira Code installed for editor and terminal font stack

### Step 4: Apply settings.json

Copy this repo's settings.json content into your VS Code User Settings (JSON), or merge carefully.

Important keys for this repo:
- workbench.colorTheme
- workbench.colorCustomizations
- editor.* typography and motion settings
- vscode_custom_css.imports
- vscode_custom_css.policy

### Step 5: Enable CSS/JS injection

In VS Code Command Palette:
- Run: Enable Custom CSS and JS

Then reload VS Code when prompted.

### Step 6: If injection fails

- Close VS Code completely
- Reopen VS Code as Administrator
- Run Enable Custom CSS and JS again
- Reload

### Step 7: Re-enable after VS Code updates

After many VS Code updates, injected changes may be reset.
If that happens, run:
- Enable Custom CSS and JS

again and reload.

## Verify It Worked

Quick checks:
- Command palette has a glass/blur visual style
- Explorer selected row has custom blue-gray background and borders
- Panel top tab strip is hidden in terminal area
- Empty editor watermark icon changes by last edited language

## Optional Tweaks

- Restore panel tabs: remove or comment the panel-hiding rule block in vscode-css.css
- Change watermark icon size: edit .editor-group-watermark .letterpress width/height in vscode-css.css
- Add more language icons: extend LANGUAGE_ICONS in vscode-script.js using language ids
- Tune palette blur intensity: adjust #command-blur background and backdrop-filter values

## Troubleshooting

- If styles do not apply, verify file:// import paths are valid and use forward slashes.
- If only some styles apply, make sure there are no conflicting custom CSS extensions.
- If watermark does not switch icons, confirm active tab has a language class and mapping exists in LANGUAGE_ICONS.

## License

Personal customization repo. Add a license section if you want to distribute/reuse publicly.
