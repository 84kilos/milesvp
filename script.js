const button = document.getElementById("copyBtn");
const text = document.getElementById("textToCopy");
const modal = document.getElementById("copyModal");

function fallbackCopy(value) {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";

  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch (error) {
    copied = false;
  }

  document.body.removeChild(textarea);
  return copied;
}

async function copyEmail(value) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(value);
    return true;
  }

  return fallbackCopy(value);
}

function showCopyModal(message) {
  if (!modal) return;

  const textNode = modal.querySelector("p");
  if (textNode) {
    textNode.textContent = message;
  }

  modal.classList.add("show");
  setTimeout(() => {
    modal.classList.remove("show");
  }, 1500);
}

if (button && text) {
  button.addEventListener("click", async (event) => {
    event.preventDefault();

    const value = text.textContent.trim();
    if (!value) {
      showCopyModal("No text to copy");
      return;
    }

    try {
      const copied = await copyEmail(value);
      showCopyModal(copied ? "Text Copied" : "Copy failed");
    } catch (error) {
      console.error("Copy failed:", error);
      showCopyModal("Copy failed");
    }
  });
}
