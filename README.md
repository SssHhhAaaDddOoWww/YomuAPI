 YomuAPI

A Japanese learning API built with Node.js, Express, and MongoDB — designed to serve words, kanji, and stories for language learning apps.

 Features
	•	📖 Dictionary API — Search for Japanese words by kanji, meaning, or reading.
	•	漢字 Kanji API — Get kanji details including readings, meanings, stroke count, and JLPT level.
	•	 Story API  — Retrieve Japanese stories for reading practice.
	•	 Random Endpoint — Fetch random words for quick quizzes or practice sessions.
	•	 Pagination Support — Efficiently load large datasets page by page.
	•	 Redis Caching (optional) — Improve performance for repeated queries.

	
EndPoints : 
/v1/words | Get paginated list of dictionary words,
query params : page & limit
/v1/words?page=1&limit=10 (default)
 ex : GET https://yomuapi.onrender.com/v1/words?page=1&limit=10

 Search Words: 
/v1/words/search | get list of words matching with the query,
query params : q,        (q = jp || en ) 
/v1/words/search?q={query}
ex: GET https://yomuapi.onrender.com/v1/words/search?q=日本,

get random : 
/v1/words/random | Get  list of random words,
GET /v1/words/random
ex: GET https://yomuapi.onrender.com/v1/words/random

response :
{
      "kanji": [],
      "readings": [],
      "_id": "68fddbf8a706efd151229a70",
      "id": "1006500",
      "meanings": [
        "petty",
        "small-minded",
        "stingy",
        "cheap",
        "mean",
        "crafty",
        "sly",
        "poor (performance, etc.)",
        "bad",
        "unskilled"
      ]
    },



/v1/kanji  | Get paginated list of kanji characters. |
query params : page & limit
/v1/words?page=1&limit=10 (default)
 ex : GET https://yomuapi.onrender.com/v1/kanji?page=2&limit=10

 Search Words: 
/v1/kanji | get list of kanji matching with the query,
query params : q,        (q = jp || en ) 
/v1/kanji/search?q={query}
ex: GET https://yomuapi.onrender.com/v1/kanji/search?q=日本,

get random : 
/v1/kanji/random | Get  list of random words,
GET /v1/kanji/random
ex: GET https://yomuapi.onrender.com/v1/kanji/random


response :
 { 
  "_id": "6905ab2b8db9ff5896028ad5",
      "kanji": "愛",
      "grade": 4,
      "stroke_count": 13,
      "jlpt": 2,
      "freq": 640,
      "meanings": [
        "love",
        "affection",
        "favourite",
        "amour",
        "favori",
        "amor",
        "afecto",
        "favorito",
        "afeição"
      ],
      "nanori": [
        "あ",
        "あし",
        "え",
        "かな",
        "なる",
        "めぐ",
        "めぐみ",
        "よし",
        "ちか"
      ]
    },
    {
      "readings": {
        "on": [
          "イ",
          "シ"
        ],
        "kun": [
          "yi2",
          "i",
          "sa",
          "이",
          "사",
          "Di",
          "Tự",
          "あめ",
          "やしな.う"
        ]
      },






 /v1/stories  | Get paginated list of short stories. |
query params : page & limit
/v1/words?page=1&limit=10 (default)
 ex : GET https://yomuapi.onrender.com/v1/stories?page=2&limit=10

 Search Words: 
/v1/stories | get list of kanji matching with the query,
query params : q,        (q = jp || en ) 
/v1/stories/search?q={query}
ex: GET https://yomuapi.onrender.com/v1/stories/search?q=日本,
 

response: 
 ` { 
      "_id": "6905f544352aec059f6d5ddd", 
      "title_jp": "Japanese painting like Western painting", 
      "title_romaji": "Western painting noyauna Japanese painting", 
      "author_romaji": "", 
      "text_jp": "  I went to an exhibition at Chuo Bijutsusha. When I went there, I saw more than 70 paintings lined up in three rooms. That is all Japanese painting. However, it is not ....." 
    }, 





 ____________________________________________________________________________________________________________________________________________________________________________________________

Made by Dishant.
	



  

