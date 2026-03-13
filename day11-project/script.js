async function fetchProfile() {
  const username = document.getElementById("username").value.trim();
  const errorEl = document.getElementById("error");
  const profileEl = document.getElementById("profile");

  errorEl.textContent = "";
  profileEl.innerHTML = "";

  if (!username) {
    errorEl.textContent = "Please enter a username!";
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error("User not found!");
    }

    const data = await response.json();

    profileEl.innerHTML = `
      <img src="${data.avatar_url}" alt="avatar">
      <h3>${data.name || "No Name Available"}</h3>
      <p>@${data.login}</p>
      <p>Followers: ${data.followers}</p>
      <p>Following: ${data.following}</p>
      <a href="${data.html_url}" target="_blank">Visit Profile</a>
    `;
  } catch (err) {
    errorEl.textContent = err.message;
  }
}