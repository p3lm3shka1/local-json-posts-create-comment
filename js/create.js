const POSTS_API = "http://localhost:3003/posts";

const form = document.getElementById("create-post-form");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const imageUrl = document.getElementById("imageUrl").value;
  const authorName = document.getElementById("authorName").value;
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  if (!imageUrl || !authorName || !title || !description) {
    alert("Užpildykite visus laukus.");
    return;
  }

  try {
    await fetch(POSTS_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageUrl,
        author: authorName,
        title,
        description,
        createdAt: new Date(),
      }),
    });

    window.location.href = "./post.html";
  } catch (error) {
    console.error(error);
  }
});
