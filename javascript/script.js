/* -- Live Preview JS -- */
const nameInput = document.getElementById("character-name");
const raceSelect = document.getElementById("character-race");
const classSelect = document.getElementById("character-class");

const previewName = document.getElementById("preview-name");
const previewType = document.getElementById("preview-type");

function updateNamePreview() {
  const characterName = nameInput.value.trim();

  if (characterName === "") {
    previewName.textContent = "Unnamed Hero";
  } else {
    previewName.textContent = characterName;
  }
}

function updateTypePreview() {
  const race = raceSelect.value;
  const characterClass = classSelect.value;

  if (race === "" && characterClass === "") {
    previewType.textContent = "Not Selected";
  } else if (race !== "" && characterClass === "") {
    previewType.textContent = race;
  } else if (race === "" && characterClass !== "") {
    previewType.textContent = characterClass;
  } else {
    previewType.textContent = race + " " + characterClass;
  }
}

nameInput.addEventListener("input", updateNamePreview);
raceSelect.addEventListener("change", updateTypePreview);
classSelect.addEventListener("change", updateTypePreview);
