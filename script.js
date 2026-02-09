const button = document.getElementById("copyBtn");
const text = document.getElementById("textToCopy");
const modal = document.getElementById("copyModal");

button.addEventListener("click", () => {
  navigator.clipboard.writeText(text.innerText)
    .then(() => {
      setTimeout(() => {}, 1500);
    })
    .catch(err => {
      console.error("Failed to copy text: ", err);});
});

button.addEventListener("click", () => {
  // Copy text to clipboard
  navigator.clipboard.writeText(text.innerText).then(() => {
    
    // Show modal
    modal.classList.add("show");

    // Hide modal after 1.5 seconds
    setTimeout(() => {
      modal.classList.remove("show");
    }, 1500);
    
  }).catch(err => {
    console.error("Copy failed:", err);
  });
});
