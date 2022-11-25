const onCopy = async (e) => {
  const text = e.target.getAttribute('data-text')
  try {
    await navigator.clipboard.writeText(text);
    alert('copy success')
  } catch (error) {
    alert('copy failed')
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const domTitleCopy = document.querySelector(".copy-title");
  const domLinkCopy = document.querySelector(".copy-link");

  domTitleCopy.addEventListener("click", onCopy);
  domLinkCopy.addEventListener("click", onCopy);
});
