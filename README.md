# 🔗 MongoDB URL Shortener

A full-stack URL Shortener web application built with Node.js, Express, MongoDB, and EJS. It allows users to convert long web URLs into compact short links and automatically redirects visitors when accessed.

---

## ✨ Features

- ✂️ **Instant URL Shortening:** Easily generate compact, unique URLs from long web links.
- 🔄 **Automatic Redirection:** Seamlessly redirects short links to their original destinations.
- 📊 **Click Counter:** Automatically tracks how many times each shortened link has been clicked.
- 🗄️ **MongoDB Persistence:** Saves all mapped URLs and analytics securely in a MongoDB database.
- 🖥️ **Dynamic Frontend:** Powered by EJS templates for real-time rendering without complex frontend frameworks.

---

## 🛠️ Tech Stack

- **Server Environment:** Node.js
- **Web Framework:** Express.js
- **Database:** MongoDB
- **ODM Library:** Mongoose
- **Templating Engine:** EJS (Embedded JavaScript)
- **ID Generator:** `shortid` / `nanoid`

---

## 📁 Project Structure

```text
MongoDB-Url-shortener/
├── models/          # Mongoose database schemas (e.g., ShortUrl model)
├── views/           # EJS template files (e.g., index.ejs)
├── public/          # Static files (CSS styles, JS, images)
├── server.js        # Express app entry point & route definitions
├── package.json     # Project dependencies and scripts
└── .env             # Environment variables (DB connection URI, PORT)
