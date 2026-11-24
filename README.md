# 🎂 Yashika's Birthday Website

A beautiful, animated single-page birthday website for Yashika, ready to deploy on **GitHub Pages**.

---

## 📁 Folder Structure

```
yashika-birthday/
├── index.html          ← main page
├── style.css           ← all styles & animations
├── script.js           ← interactions, gallery, notifications
├── assets/
│   ├── photos/         ← put your 14 photos here
│   │   ├── photo1.jpg
│   │   ├── photo2.jpg
│   │   └── ... (up to photo14.jpg)
│   └── card.pdf        ← put your birthday card PDF here
└── README.md
```

---

## ✅ Setup Checklist

### Step 1 — Add Your Photos
- Place your **13–14 photos** inside `assets/photos/`
- Name them `photo1.jpg`, `photo2.jpg`, … `photo14.jpg`  
  _(or update the `PHOTOS` array in `script.js` with your actual filenames)_

### Step 2 — Add the Birthday Card PDF
- Rename your PDF to `card.pdf` and place it inside `assets/`
- The "Download Your Card" button will automatically use it

### Step 3 — Add the Flashback Video
- Rename your video file to **`flashback.mp4`** and place it inside `assets/`
- That's it! ✅ The "Watch Flashback" button will play it directly in the browser.
- 18 MB is well within GitHub's 100 MB per-file limit, so no worries.

> **Tip:** `.mp4` (H.264) works in all browsers. If your file is `.mov` or another format, free tools like [HandBrake](https://handbrake.fr/) can convert it to `.mp4` in seconds.

---

### Step 4 — Set Up the Silent "Explore" Notification
When Yashika clicks **Explore**, you'll get an email silently (she won't know).

1. Go to **https://formspree.io** → Sign up for free  
   _(use your email: dchauda7@gmail.com)_
2. Click **"+ New Form"** → name it "Birthday Notify"
3. Copy the **endpoint URL** (looks like `https://formspree.io/f/abcdefgh`)
4. Open `script.js` and replace:
   ```js
   const FORMSPREE_URL = "https://formspree.io/f/YOUR_FORM_ID";
   ```
5. Done! You'll receive an email every time she clicks Explore 🎉

---

## 🚀 Deploy to GitHub Pages

1. Create a new **GitHub repository** (e.g., `yashika-birthday`)
2. Upload all files (maintain the same folder structure)
3. Go to **Settings → Pages**
4. Under "Source" → select **"Deploy from a branch"** → choose `main` → folder `/root`
5. Click **Save**
6. Your site will be live at:  
   `https://YOUR_GITHUB_USERNAME.github.io/yashika-birthday/`

---

## 🎨 Customisation Tips

| What to change | Where |
|---|---|
| Number of photos | Edit the `PHOTOS` array in `script.js` |
| Photo captions | Change `const CAPTION` in `script.js` |
| Poem / message | Edit the `<p class="poem">` block in `index.html` |
| Colour palette | Edit `:root` variables in `style.css` |
| Button labels | Edit the button text in `index.html` |

---

Made with 💕 for Yashika
