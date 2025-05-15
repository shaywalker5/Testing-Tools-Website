# 🧪 Testing Tools Commerce Website with Playwright

This project uses [Playwright](https://playwright.dev/) to automate UI testing for a sample e-commerce website with intentional bugs:  
👉 [https://with-bugs.practicesoftwaretesting.com/#/](https://with-bugs.practicesoftwaretesting.com/#/)

## 💡 Purpose

This project was created to demonstrate end-to-end testing skills using Playwright. It simulates real-world testing of key user flows (like login, cart, checkout) on a deliberately buggy site to mimic QA scenarios I might face on the job.

## 🔍 What It Tests

- ✅ User login with valid/invalid credentials  
- ✅ Browsing and adding products to cart  
- ✅ Removing items from cart  
- ✅ Attempting checkout  
- ✅ UI elements (buttons, links, input fields)  
- ✅ Error handling and validation messages  

## 🛠 Tech Stack

- **Language**: JavaScript  
- **Framework**: Playwright  
- **Runner**: Playwright Test  
- **Reports**: HTML Test Report

## ▶️ How to Run It

1. Clone this repo:
   ```bash
   git clone https://github.com/shaywalker5/Testing-Tools-Website.git
   cd Testing-Tools-Website

2. Install Dependencies:
    ```bash
    npm install

3. Run tests:
    ```bash
    npx playwright test

4. Review Reports:
    ```bash
    npx playwright show-report

## 📌 Why This Project?

Bugs? I love catching them. This project let me practice real-world testing techniques with Playwright, and I’m excited to share it with anyone interested in how I approach quality assurance with purpose and detail.