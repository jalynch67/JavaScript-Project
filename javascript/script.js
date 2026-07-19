/* -- Live Preview JS -- */
/* -- START: Character Name change update -- */
const nameInput = document.getElementById("character-name");
const previewName = document.getElementById("preview-name");

function updateNamePreview() {
  const characterName = nameInput.value.trim();

  if (characterName === "") {
    previewName.textContent = "Unnamed Hero";
  } else {
    previewName.textContent = characterName;
  }
}

nameInput.addEventListener("input", updateNamePreview);
/* -- END: Character Name change update -- */
