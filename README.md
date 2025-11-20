AI Customer Support Dashboard

An AI-powered dashboard designed for companies to manage, categorize, and respond to customer messages efficiently.

✨ Features

🧠 AI Categorization

Upload customer messages (feedback, complaints, feature requests, praise, etc.) and let the AI automatically sort them into predefined categories.

💬 AI Reply Suggestions

For each individual message, you can ask the AI to generate a smart reply that you can edit or send back to the customer.

🗂️ Category-Based Message View

View all messages grouped by category for easy navigation.

🗑️ Auto-Delete After 30 Days

Messages are automatically removed after 30 days to keep the database clean.

📊 30-Day Analytics Dashboard

A beautiful analytics page that visualizes the number of messages received per category in the last 30 days — helping companies see trends over time.

🛠 Tech Stack

Frontend + Backend

Next.js 15 (App Router, Server Actions)
React 19
Tailwind CSS
Framer Motion (UI animations)
Recharts (analytics charts)
Lucide React (icons)

Database & ORM

Prisma 6
Neon (Serverless PostgreSQL)
pg PostgreSQL driver

Authentication

Clerk

AI

OpenRouter API (OpenAI-compatible)

Running the Project Locally

1. Clone the repo

git clone https://github.com/fevenbirhan/AI-Customer-Support-Dashboard.git
cd ai-customer-support-dashboard

2. Install dependencies

npm install

3. Run Prisma

npx prisma generate
npx prisma migrate deploy

4. Start the dev server

npm run dev