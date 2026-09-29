const messageList = document.getElementById("message-list");
const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const statusRow = document.getElementById("status-row");
const errorBanner = document.getElementById("error-banner");

function scrollToLatest() {
  messageList.scrollTop = messageList.scrollHeight;
}

function setLoading(isLoading) {
  statusRow.hidden = !isLoading;
  sendButton.disabled = isLoading;
  messageInput.disabled = isLoading;
}

function showError(message) {
  errorBanner.hidden = false;
  errorBanner.textContent = message;
}

function clearError() {
  errorBanner.hidden = true;
  errorBanner.textContent = "";
}

function addMessage(role, text) {
  const wrapper = document.createElement("div");
  wrapper.className = `message ${role}`;

  const meta = document.createElement("div");
  meta.className = "message-meta";
  meta.textContent = role === "user" ? "You" : "CrestLine Assist";

  const bubble = document.createElement("div");
  bubble.className = "message-bubble";
  bubble.textContent = text;

  wrapper.append(meta, bubble);
  messageList.appendChild(wrapper);
  scrollToLatest();
}

async function sendMessage(text) {
  clearError();
  addMessage("user", text);
  setLoading(true);

  try {
    const response = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    addMessage("assistant", data.response || "No response was returned.");
  } catch (error) {
    showError(
      "Sorry, CrestLine Assist could not complete that request. Please try again in a moment."
    );
    console.error(error);
  } finally {
    setLoading(false);
    messageInput.focus();
    scrollToLatest();
  }
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = messageInput.value.trim();
  if (!text) {
    return;
  }
  messageInput.value = "";
  sendMessage(text);
});

messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    chatForm.requestSubmit();
  }
});

scrollToLatest();
