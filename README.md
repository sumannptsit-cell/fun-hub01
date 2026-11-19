# 🎮 Fun-Hub — Instant Entertainment Capstone

A playground built with Node.js, Express, and Axios that pulls non-authenticated entertainment content directly from multiple public APIs, giving users access to jokes, trivia quizzes, and activities.

Created as an Express/Axios Capstone Project by **Suman Grng**.

---

## 🚀 Features & Modules

- **😆 Joke Hub**: Fetches random jokes from `JokeAPI`. Supports both single and two-part setups, with elegant categorization tags.
- **🧠 Trivia Hub**: Pulls dynamic, shuffling multiple-choice trivia from the `Open Trivia Database (OTDB)`. Includes interactive answers with instant visual feedback and score indicators.
- **🏃 Boredom Buster**: Pulls activities to kill boredom from a live API, featuring a resilient **Local Fallback Database** that triggers seamlessly when external APIs are offline or time out.

---

## 🛠️ Project Structure
```text
fun-hub01/
├── node_modules/             # Dependency files (node-modules)
├── public/                   # Static directory
│   └── style.css             # Dark visual dashboard styles
├── views/                    # EJS layout folder
│   └── index.ejs             # Central user UI rendering Engine
├── .gitignore                # Folder exclusions for Git (.git, node_modules)
├── app.js                    # Core server router and Axios gateway
├── package-lock.json         
├── package.json              # Project package index and watcher script config
└── README.md