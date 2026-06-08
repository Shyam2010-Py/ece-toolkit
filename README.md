# ⚡ ECE Toolkit v1

A clean, fast, and mobile-friendly web toolkit built for **Diploma & B.Tech ECE students**, electronics hobbyists, and ESP32 beginners. Includes **Ohm's Law**, **Resistor Color Code**, **Unit Converter**, and **Attendance Calculator** — all in one beautiful dark-themed page.

> Created with ❤ by **Shyam** · Diploma ECE Student

## 🌐 Live Demo

https://shyam2010-py.github.io/ece-toolkit/

---

## 💡 Why I Built This

As a Diploma ECE student, I often needed quick access to
electronics calculators and attendance calculations.

Instead of using multiple websites and apps, I created
ECE Toolkit to keep everything in one place.

---

## ✨ Features

| # | Tool | What it does |
|---|------|--------------|
| 1 | **Ohm's Law Calculator** | Enter any 2 of `V`, `I`, `R` → instantly calculate the third. Validated inputs with proper units. |
| 2 | **Resistor Color Code** | 4-band resistor decoder with live color preview, resistance value & tolerance display. |
| 3 | **Electronics Unit Converter** | Convert Voltage, Current, Resistance & Frequency (μA↔mA↔A, Ω↔kΩ↔MΩ, Hz↔kHz↔MHz, etc.). |
| 4 | **Attendance Calculator** | Computes % attendance, classes you can still miss, and classes needed to hit 75%. |

---

### Design Highlights
- 🌑 **Dark blue theme** (easy on the eyes during night study sessions)
- 📱 **Mobile-first responsive** layout — works on any device
- ⚡ **Zero dependencies** — pure HTML, CSS & vanilla JavaScript
- 🚀 **Fast loading** — no build tools, no frameworks
- 🎨 **Modern card layout** with rounded corners and smooth animations
- ♿ Accessible labels, keyboard-friendly inputs, smooth scrolling

---

## 📁 Folder Structure

```
ece-toolkit-v1/
│
├── index.html      ← Main HTML page (structure & content)
├── style.css       ← All styling (dark theme, layout, animations)
├── script.js       ← All logic (calculators & interactivity)
└── README.md       ← You are here 😊
```

That's it. **Only 4 files. No `node_modules`, no build step, no backend.**

---

## 🚀 How to Run Locally

You have **two easy options** — pick whichever is easiest for you:

### Option 1 · Just double-click (easiest)
1. Download / clone this folder.
2. Open the `ece-toolkit-v1` folder.
3. **Double-click `index.html`** → it opens in your default browser. Done. ✅

> Works completely **offline**. No internet needed after download.

### Option 2 · Use VS Code "Live Server"
1. Open the folder in **VS Code**.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` → **"Open with Live Server"**.

This adds auto-reload when you edit files.

---

## 🛠️ Tech Stack

- **HTML5** — semantic structure
- **CSS3** — custom properties, grid, flexbox, animations
- **Vanilla JavaScript** — no frameworks, no jQuery
- **Google Fonts** — Inter & JetBrains Mono

No build tools. No dependencies. Just open `index.html`. ⚡

---

## 📚 Formulas Used

### Ohm's Law
```
V = I × R
```
Enter any 2 values → 3rd is calculated automatically.

### Resistor Color Code (4-band)
```
Value = (Digit1 × 10 + Digit2) × Multiplier
Tolerance = based on the 4th band color
```

### Unit Conversions
All conversions are done by converting to a **base unit** first, then to the target unit:
```
value_in_base = value × from_factor
result = value_in_base / to_factor
```

### Attendance
```
percentage = (attended / total) × 100
can_miss   = floor(attended / 0.75) - total
need_to_attend = ceil(3 × total - 4 × attended)
```

---

## 🎯 Target Users

- 🎓 **Diploma ECE Students** — quick lab & exam helpers
- 🎓 **B.Tech ECE Students** — fast references during assignments
- 🔧 **Electronics Hobbyists** — handy bench calculators
- 🤖 **ESP32 Beginners** — quick Ohm's law + resistor lookups

---

## 🚀 Roadmap

- [x] Ohm's Law Calculator
- [x] Resistor Color Code Calculator
- [x] Unit Converter
- [x] Attendance Calculator
- [ ] GPA Calculator
- [ ] LED Resistor Calculator
- [ ] ESP32 Reference Guide
- [ ] Sensor Reference Guide

---

## 📜 License

Free to use, share, and modify for educational purposes. Give a ⭐ if it helped you!

---

> Built with passion by **Shyam** — a fellow ECE student. 🤝
