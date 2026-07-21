/* -- Live Preview JS -- */
const nameInput = document.getElementById("character-name");
const raceSelect = document.getElementById("character-race");
const classSelect = document.getElementById("character-class");
const weaponSelect = document.getElementById("character-weapon");

const previewName = document.getElementById("preview-name");
const previewType = document.getElementById("preview-type");
const previewWeapon = document.getElementById("preview-weapon");
const previewPlaystyle = document.getElementById("preview-playstyle");

/* Class stats */
const classStats = {
  Warrior: {
    strength: 9,
    magic: 2,
    agility: 5,
    defense: 8,
  },

  Mage: {
    strength: 2,
    magic: 10,
    agility: 4,
    defense: 3,
  },
  Rogue: {
    strength: 4,
    magic: 3,
    agility: 10,
    defense: 5,
  },
  Ranger: {
    strength: 5,
    magic: 4,
    agility: 8,
    defense: 6,
  },
};

/* Name Preview Function */
function updateNamePreview() {
  const characterName = nameInput.value.trim();

  if (characterName === "") {
    previewName.textContent = "Unnamed Hero";
  } else {
    previewName.textContent = characterName;
  }
}

/* Type Preview Function */
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

/* Weapon Preview Function */
function updateWeaponPreview() {
  const weapon = weaponSelect.value;

  if (weapon === "") {
    previewWeapon.textContent = "Not selected";
  } else {
    previewWeapon.textContent = weapon;
  }
}

/* Playstyle Preview Function */
function updatePlaystylePreview() {
  const selectedPlaystyle = document.querySelector(
    "input[name='playstyle']:checked",
  );
  if (selectedPlaystyle === null) {
    previewPlaystyle.textContent = "Not selected";
  } else {
    previewPlaystyle.textContent = selectedPlaystyle.value;
  }
}

nameInput.addEventListener("input", updateNamePreview);
raceSelect.addEventListener("change", updateTypePreview);
classSelect.addEventListener("change", updateTypePreview);
weaponSelect.addEventListener("change", updateWeaponPreview);

const playstyleOptions = document.querySelectorAll("input[name='playstyle']");

for (let i = 0; i < playstyleOptions.length; i++) {
  playstyleOptions[i].addEventListener("change", updatePlaystylePreview);
}
