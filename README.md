# Mini Social Feed

A simple mini social feed app built with **HTML, CSS, and JavaScript** using a local **JSON Server** as a REST API.  
You can create posts, view a feed, and leave comments on each post.

---

## Features

- Create new posts (author, avatar URL, title, description)
- Display posts in a feed
- Open a single post page with comments
- Add and delete comments
- Delete posts

---

## 🧰 Tech Stack

- **HTML5**
- **CSS3**
- **JavaScript (Vanilla)**
- **JSON Server** (REST API)

---

## Project Structure

```
/project
  /js
    post.js        
    create.js      
    comments.js    
  /style
    base.css
    post.css
    create.css
    comments.css
  post.html
  create.html
  comments.html
  db.json
```

---

## How to Run

### 1) Install JSON Server
```
npm install -g json-server
```

### 2) Start the API
From the project root:
```
json-server --watch db.json --port 3003
```

### 3) Open the HTML files
Use Live Server or open directly:

- `post.html` – main feed
- `create.html` – create post
- `comments.html?id=POST_ID` – post details + comments

---

## API Endpoints (JSON Server)

- `GET /posts`
- `POST /posts`
- `DELETE /posts/:id`

- `GET /comments?postId=POST_ID`
- `POST /comments`
- `DELETE /comments/:id`

---

## Notes

- `postId` in comments is stored as a **string**, so it must match the `posts.id`.

---

Created as a learning project for practicing DOM manipulation, REST APIs, and JSON Server.
