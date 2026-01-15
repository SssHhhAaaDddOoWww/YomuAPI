# YomuAPI
.

Words, Kanji, and Stories for language-learning apps.

Base URL:
https://yomuapi.onrender.com

Features:
- Dictionary (JP ↔ EN)
- Kanji data (readings, meanings, JLPT, strokes)
- Stories for reading practice
- Random endpoints
- Pagination
- Optional Redis caching

Words:
GET /v1/words?page=1&limit=10
GET /v1/words/search?q=日本
GET /v1/words/random

Kanji:
GET /v1/kanji?page=1&limit=10
GET /v1/kanji/search?q=愛
GET /v1/kanji/random

Stories:
GET /v1/stories?page=1&limit=10
GET /v1/stories/search?q=日本

Made by Dishant.
