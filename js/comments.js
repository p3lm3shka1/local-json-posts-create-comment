const POSTS_API = "http://localhost:3003/posts";
const COMMENTS_API = "http://localhost:3003/comments";

const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

const postContent = document.getElementById("post-content");
const commentsList = document.getElementById("comments-list");
const commentForm = document.getElementById("comment-form");

async function getPost() {
  try {
    const res = await fetch(`${POSTS_API}/${postId}`);
    const post = await res.json();

    postContent.innerHTML = `
      <div class="post-detail">
        <div class="post-detail-header">
          <img class="post-detail-avatar" src="${post.imageUrl || ""}" alt="avatar" />
          <div class="post-detail-author">${post.author || "Unknown"}</div>
        </div>
        <div class="post-detail-title">${post.title || ""}</div>
        <div class="post-detail-body">${post.description || ""}</div>
        <div class="post-card-date">${new Date(post.createdAt).toLocaleString()}</div>
      </div>
    `;
  } catch (error) {
    console.error(error);
  }
}

console.log("postId:", postId);

async function getComments() {
  try {
    const res = await fetch(`${COMMENTS_API}?postId=${postId}`);
    const comments = await res.json();
    console.log("comments:", comments);
    commentsList.innerHTML = "";

    comments.forEach((comment) => {
      commentsList.innerHTML += `
        <div class="comment-item">
        <button class="comment-delete-btn" data-id="${comment.id}">Delete</button>
          <div class="comment-author">${comment.author}</div>
          <div class="comment-text">${comment.text}</div>
          <div class="comment-date">${new Date(comment.createdAt).toLocaleString()}</div>
        </div>
      `;
    });
  } catch (error) {
    console.error(error);
  }
}

commentForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const author = commentForm.author.value;
  const text = commentForm.text.value;

  try {
    await fetch(COMMENTS_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        author,
        text,
        postId: postId,
        createdAt: new Date(),
      }),
    });

    console.log("postId:", postId);

    commentForm.reset();
    getComments();
  } catch (error) {
    console.error(error);
  }
});

commentsList.addEventListener("click", async (e) => {
  if (e.target.classList.contains("comment-delete-btn")) {
    const id = e.target.dataset.id;

    await fetch(`${COMMENTS_API}/${id}`, { method: "DELETE" });
    getComments();
  }
});

getPost();
getComments();
