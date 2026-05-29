document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("question-form");
  const historyDiv = document.getElementById("history");
  const askBtn = document.getElementById("ask-btn");
  const spinner = document.getElementById("spinner");
  const btnText = document.getElementById("btn-text");

  const createBubble = (type, html) => {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${type}`;
    bubble.innerHTML = html;
    return bubble;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const textarea = form.querySelector("textarea");
    const question = textarea.value.trim();
    if (!question) return;

    spinner.classList.remove("d-none");
    btnText.textContent = "Thinking...";
    askBtn.disabled = true;

    const csrfToken = form.querySelector('input[name="csrfmiddlewaretoken"]').value;
    try {
      const resp = await fetch(form.action || "/ask/", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrfToken,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ question_text: question }),
      });
      const data = await resp.json();
      if (resp.ok) {
        const botBubble = createBubble("bot", `<strong>VoltieAI:</strong> ${data.answer.replace(/\n/g, "<br />")}`);
        const userBubble = createBubble("user", `<strong>You:</strong> ${data.question}`);
        historyDiv.append(botBubble, userBubble);
        textarea.value = "";
      } else {
        alert(data.error || "Failed to get answer.");
      }
    } catch (err) {
      alert("Network error: " + err.message);
    } finally {
      spinner.classList.add("d-none");
      btnText.textContent = "Ask";
      askBtn.disabled = false;
    }
  });
});
