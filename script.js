
// Select DOM elements
const urlInput = document.getElementById("urlInput");
const submitBtn = document.getElementById("submitBtn");
const shortUrlInput = document.getElementById("shortUrlInput");
const copyButton = document.getElementById("copyButton");
const errorMessage = document.getElementById("errorMessage");
const toast = new bootstrap.Toast(document.getElementById("liveToast"));
const messageHead = document.getElementById("message-head");
const messageBody = document.getElementById("message-body");
const icon = document.getElementById("icon");

// TinyURL API Endpoint
const API_URL = "https://api.tinyurl.com/create";
const API_TOKEN = "NlKajQoqp0ehuOnAQlXP0iPu91JIlvHlhMFy6w6KfHItKyOWR0oab8h02eeO";

// Event listener for the 'Short it!' button
submitBtn.addEventListener("click", async () => {
  const longUrl = urlInput.value.trim();

  // Validate input
  if (!longUrl) {
    showError("Please enter the URL.");
    return;
  }

  // Call the API to shorten the URL
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({
        url: longUrl,
        domain: "tinyurl.com",
      }),
    });

    const result = await response.json();

    if (response.ok && result.data) {
      const shortUrl = result.data.tiny_url;
      shortUrlInput.value = shortUrl;
      shortUrlInput.disabled = false;
      showToast("Success", "URL shortened successfully!", "success"); // Show success toast
    } else {
      throw new Error(result.errors ? result.errors[0].message : "Something went wrong");
    }
  } catch (error) {
    showToast("Error", error.message, "danger"); // Show error toast
  }
});

// Function to show error messages
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
  setTimeout(() => {
    errorMessage.style.display = "none";
  }, 3000);
}

// Function to copy shortened URL to clipboard
copyButton.addEventListener("click", () => {
  if (!shortUrlInput.value) return;

  navigator.clipboard.writeText(shortUrlInput.value).then(() => {
    showToast("Copied!", "Shortened URL copied to clipboard.", "info");
  });
});

// Function to show a toast message
function showToast(title, message, type) {
  messageHead.textContent = title;
  messageBody.textContent = message;

  // Clear existing background color classes but keep rounded and spacing
  icon.className = "rounded me-2";

  // Add the correct background color based on the toast type
  switch (type) {
    case "success":
      icon.classList.add("bg-success");
      break;
    case "danger":
      icon.classList.add("bg-danger");
      break;
    case "info":
      icon.classList.add("bg-info");
      break;
    default:
      icon.classList.add("bg-secondary");
  }

  // Show the toast
  toast.show();
}



// -------------------------------
const darkModeButton = document.getElementById("darkModeButton");
const body = document.body;

// Toggle dark mode on button click
darkModeButton.addEventListener("click", () => {
  const isDarkMode = body.classList.toggle("dark-mode");

  // Save the theme preference in localStorage
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
});

// Load saved theme on page load
(function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
  }
})();


