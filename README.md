# URBNWEAR — E-Commerce Website Template

A modern fashion and streetwear e-commerce template built with HTML, TailwindCSS, CSS, and JavaScript.  
Perfect for clothing brands, small business owners, or creators who need a clean and responsive online store layout.

---

## 📌 Demo
Live Demo: https://github.com/MARYAMTEE/urbnwear


---

## 📁 Folder Structure

│── index.html # Home page
│── product.html # Product details page
│── checkout.html # Checkout page UI
│── /css
│   ├── output.css # TailwindCSS
    └── style.css # Main stylesheet for the homepage
│── /js
│   ├── main.js # General interactivity
    ├──product.js # product page logic
│   └── checkout.js # Cart slide/checkout logic
│── /images # Product & UI images
│── data.json # contains all the product information
│── README.md # Documentation
│── LICENSE.txt # License


---

**Function of `data.json`:**  
The `data.json` file contains all the **product information**, including:

- Product names  
- Prices  
- Images  
- Descriptions  
- Any other details displayed on the product or homepage  

It is loaded dynamically by JavaScript (`product.js` and `main.js`) to populate the **product grids and detail pages**, making the template scalable and easier to manage.

---

> **NOTE:** All images in this template must be replaced. They were sourced from Pinterest and do not belong to me. Replace them with your own licensed images.

---

## ✨ Features

### **🎨 Modern & Clean UI**
A polished fashion-inspired interface suitable for trendy brands.

### **⚡ Fully Responsive**
Works smoothly on mobile, tablet, and desktop.

### **🛒 Product Details Page**
- Image preview  
- Details section  
- Price  
- Description  
- Add-to-cart button  

### **🛍️ Cart Slide/Drawer**
Smooth slide-in cart experience using JavaScript.

### **💳 Checkout Page UI**
A clean, user-friendly checkout layout for any business.

### **🔧 Easy to Customize**
- Utility classes with TailwindCSS
- Reusable components
- Simple file structure

---

## 🛠️ Tech Stack

- **HTML5**
- **TailwindCSS**
- **CSS3**
- **Vanilla JavaScript**
- **Responsive Flexbox/Grid Layouts**

---

## 🚀 How to Use

### **1. Download or Clone**
```bash
git clone https://github.com/MARYAMTEE/urbnwear.git

## **2. Open in Your Browser**

Just open index.html to start using the template.

## **3. Customize**

# Update:

Colors
Fonts
Images
Product data
Tailwind or custom CSS

## **📝 Customization Guide**
Colors
Edit via style.css or Tailwind utility classes.
Images
Replace images inside /images.
Texts & Content
Update the HTML sections such as:
Hero section
Trending products
Product descriptions
JavaScript
Located in /js folder for interactions.

## **📄 License**

**This template is licensed under the MIT License.**
**You are free to use it for personal or commercial projects.**

**💼 Ideal For**

Fashion brands
Online stores
UI/UX designers
Web developers
Business mockups
Portfolio projects

## **🤝 Contributing**

Contributions, issues, and suggestions are welcome!

## **📬 Contact**

## **For support or customizations:**
Email: ayorindemaryam078@gmail.com
GitHub: https://github.com/MARYAMTEE

### **🔧 Tailwind Setup & Build Instructions

This project uses Tailwind CSS compiled through the official Tailwind CLI.

📁 Tailwind Configuration

All breakpoints are stored in:

# **tailwind.config.js

All custom colors are stored in:
# **style.css

Fonts are stored in the html head:
# Fonts

You can edit this file to:

Add custom colors
Add fonts
Extend spacing
Configure screens
Enable plugins

### **⚙️ TailwindCSS Build Instructions

If you want to edit Tailwind classes or customize the config, follow these steps:

1. Install Tailwind CLI (if not installed)

# **npm install -D tailwindcss


2. Tailwind Config (optional customization file)
Create it only if you want custom colors, fonts, spacing, etc.

## **npx tailwindcss init


This will generate:

## **tailwind.config.js


3. Build Tailwind CSS
Generate output.css from your style.css using:

### **npx @tailwindcss/cli -i ./css/style.css -o ./css/output.css --watch


-i → input file

-o → output file

--watch → rebuild automatically when editing


### **Mobile Breakpoints Summary

Here is a simple Tailwind breakpoint summary for users customizing the template:

| Breakpoint           | Prefix        | Width       |
| -------------------- | ------------- | ----------- |
| **Mobile (default)** | *(no prefix)* | 0px → 639px |
| **Tablet**           | `sm:`         | ≥ 640px     |
| **Medium Devices**   | `md:`         | ≥ 768px     |
| **Large Devices**    | `lg:`         | ≥ 1024px    |
| **Extra Large**      | `xl:`         | ≥ 1280px    |
| **2XL**              | `2xl:`        | ≥ 1536px    |