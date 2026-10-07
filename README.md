# Tanuja M C — Software Engineer Portfolio Website

This portfolio website is designed with a modern clean theme and a retro **Pixel-Art RPG HUD Skills Section**.

---

## 🚀 How to View Your Website Completely (With Full CSS, Icons & Audio)

Choose any of the simple options below:

### Option 1: Double-Click `start_website.bat` (Recommended for Windows)
1. In this folder (`c:\Users\lenovo\Desktop\tanuja`), double-click **`start_website.bat`** (or **`run.bat`**).
2. It automatically starts a local Python server and opens your website in your default browser at:
   👉 **`http://localhost:8080/`**
3. All CSS styles, animations, 10-segment stamina progress bars, pixel icons, and 8-bit sound effects will load 100% completely!

---

### Option 2: Double-Click `standalone_website.html` (Instant Zero-Setup View)
- Simply double-click **`standalone_website.html`**.
- This is a complete, self-contained standalone version with all CSS and JavaScript bundled directly inside the file.
- It is **guaranteed to always show full styling** even without running any web server or internet connection.

---

### Option 3: In VS Code (Press F5 or Click "Run and Debug")
1. Open this folder in VS Code.
2. Go to the **Run & Debug** tab (or press `F5`).
3. Select any of the pre-configured options:
   - **`1. Open in Chrome (Direct File - No Server Needed)`**
   - **`2. Open in Microsoft Edge (Direct File)`**
   - **`3. Open against localhost:8080 (Web Server)`**

---

### Option 4: Run in Terminal via Python
In your terminal (Command Prompt / PowerShell), run:
```bash
python server.py
```
Your browser will launch automatically. Press `Ctrl + C` in the terminal when you wish to stop the server.

---

## 📁 File Structure & Overview

| File | Purpose |
| :--- | :--- |
| **`index.html`** | Main modular website HTML file |
| **`style.css`** | Complete stylesheet with light/dark theme & pixel art design tokens |
| **`script.js`** | JavaScript engine (skills filtering, search, terminal inspector, 8-bit SFX, theme switcher) |
| **`standalone_website.html`** | All-in-one standalone HTML file with embedded CSS and JS (never misses CSS) |
| **`start_website.bat`** | 1-click Windows launcher that runs the server and opens the browser |
| **`run.bat`** | Quick alias for `start_website.bat` |
| **`server.py`** | Lightweight Python development server with proper MIME types and no-cache headers |
| **`.vscode/launch.json`** | VS Code F5 debug & launch configurations |
| **`.vscode/tasks.json`** | Automated background server task for VS Code |
| **`tanuja-profile.jpg`** | Profile photograph |
| **`portfolio.avif`** | Background hero visual |
| **`resume2.pdf`** | Downloadable resume |
