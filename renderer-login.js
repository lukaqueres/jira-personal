document.querySelector("#jira-authorize").addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(document.querySelector("#jira-authorize"));
    const result = await window.authorize.login(data);
})