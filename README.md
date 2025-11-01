🈶 YomuAPI

A Japanese learning API built with Node.js, Express, and MongoDB — designed to serve words, kanji, and stories for language learning apps.

🚀 Features
	•	📖 Dictionary API — Search for Japanese words by kanji, meaning, or reading.
	•	漢字 Kanji API — Get kanji details including readings, meanings, stroke count, and JLPT level.
	•	📚 Story API (coming soon) — Retrieve Japanese stories for reading practice.
	•	🎲 Random Endpoint — Fetch random words for quick quizzes or practice sessions.
	•	⚡ Pagination Support — Efficiently load large datasets page by page.
	•	🧠 Redis Caching (optional) — Improve performance for repeated queries.


🛠️ Tech Stack
	•	Node.js + Express — Server and routing
	•	MongoDB — Data storage
	•	Mongoose — Schema modeling
	•	Redis (optional) — Caching layer
	•	TypeScript — Type safety and cleaner development




  

YomuAPI/
│
├── src/
│   ├── db/
│   │   └── schema/
│   │       ├── dictionary.js
│   │       └── kanji.js
│   ├── routes/
│   │   ├── words.ts
│   │   └── kanji.ts
│   ├── data/
│   │   └── (JSON, CSV, converter scripts)
│   ├── server.ts
│
├── .env
├── .gitignore
├── package.json
└── README.md
