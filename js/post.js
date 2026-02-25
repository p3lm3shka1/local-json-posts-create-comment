const POSTS_API = "http://localhost:3003/posts";
const mainList = document.getElementById("mainList");

async function getPosts() {
  try {
    const response = await fetch(POSTS_API);
    const posts = await response.json();

    posts.forEach((post) => {
      mainList.innerHTML += `
        <div class="card">
        <div class="post-card" id="${post.id}">
        <button class="post-card-delete-btn" data-id="${post.id}">Ištrinti</button>
            <div class="post-card-header">
              <img class="post-card-avatar" src="${post.imageUrl || ""}" alt="avatar" />
              <div class="post-card-author">${post.author || "Unknown"}</div>
              </div>
            <div class="post-card-title">
             <a href="./comments.html?id=${post.id}">${post.title || ""}</a>
             </div>
             <a class="post-card-description" href="./comments.html?id=${post.id}">${post.description || ""}</a>
            <div class="post-card-date">${new Date(post.createdAt).toLocaleString()}</div>
          </div>
        </div>
        `;
    });
  } catch (error) {
    console.error(error);
  }
}

mainList.addEventListener("click", async (e) => {
  if (e.target.classList.contains("post-card-delete-btn")) {
    const id = e.target.dataset.id;

    await fetch(`${POSTS_API}/${id}`, { method: "DELETE" });
    getPosts();
  }
});

getPosts();
