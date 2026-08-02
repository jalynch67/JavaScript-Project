/* -- Live Preview JS -- */
const nameInput = document.getElementById("character-name");
const raceSelect = document.getElementById("character-race");
const classSelect = document.getElementById("character-class");
const weaponSelect = document.getElementById("character-weapon");
const playstyleOptions = document.querySelectorAll("input[name='playstyle']");

const previewName = document.getElementById("preview-name");
const previewType = document.getElementById("preview-type");
const previewWeapon = document.getElementById("preview-weapon");
const previewPlaystyle = document.getElementById("preview-playstyle");
const previewStats = document.getElementById("preview-stats");
const classDetails = document.getElementById("class-details");
const previewAbilities = document.getElementById("preview-abilities");
const abilityButtons = document.querySelectorAll("#ability-list button");

/* Class stats */
const classStats = {
  Warrior: {
    description:
      "A strong front-line fighter who relies on strength and defense.",
    strength: 9,
    magic: 2,
    agility: 5,
    defense: 8,
    weapons: "Sword, Axe, Shield",
  },

  Mage: {
    description:
      "A spellcaster who uses powerful magic but has a lower defense.",
    strength: 2,
    magic: 10,
    agility: 4,
    defense: 3,
    weapons: "Staff, Wand, Spellbook",
  },
  Rogue: {
    description:
      "A quick and stealthy fighter who focuses on agility and surprise attacks.",
    strength: 4,
    magic: 3,
    agility: 10,
    defense: 5,
    weapons: "Dagger, Short Sword, Bow",
  },
  Ranger: {
    description:
      "A balanced ranged fighter with good agility and steady defense.",
    strength: 5,
    magic: 4,
    agility: 8,
    defense: 6,
    weapons: "Bow, Crossbow, Twin Blades",
  },
};

let selectedAbilities = [];

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

/* Stats Preview Function */
function updateStatsPreview() {
  const characterClass = classSelect.value;
  if (characterClass === "") {
    previewStats.innerHTML = `
    <li>Strength: 0</li>
    <li>Magic: 0</li>
    <li>Agility: 0</li>
    <li>Defense: 0</li>
`;
  } else {
    const stats = classStats[characterClass];
    previewStats.innerHTML = `
  <li>Strength: ${stats.strength}</li>
  <li>Magic: ${stats.magic}</li>
  <li>Agility: ${stats.agility}</li>
  <li>Defense: ${stats.defense}</li>
  `;
  }
}

/* Class details preview function */
function updateClassDetails() {
  const characterClass = classSelect.value;
  if (characterClass === "") {
    classDetails.innerHTML =
      "<p>Select a class in the builder to view more information here</p>";
  } else {
    const selectedClass = classStats[characterClass];

    classDetails.innerHTML = `
  <h3>${characterClass}</h3>
  <p>${selectedClass.description}</p>
  <p><strong>Recommended weapons: </strong>${selectedClass.weapons}</p>  
  `;
  }
}

/*Abilities preview function */
function updateAbilitiesPreview() {
  if (selectedAbilities.length === 0) {
    previewAbilities.textContent = "None Selected";
  } else {
    previewAbilities.textContent = selectedAbilities.join(", ");
  }
}

function handleAbilityClick(event) {
  const abilityName = event.target.dataset.ability;
  if (selectedAbilities.includes(abilityName)) {
    selectedAbilities = selectedAbilities.filter(function (ability) {
      return ability !== abilityName;
    });
  } else {
    selectedAbilities.push(abilityName);
  }
  updateAbilitiesPreview();
}

nameInput.addEventListener("input", updateNamePreview);
raceSelect.addEventListener("change", updateTypePreview);
classSelect.addEventListener("change", function () {
  updateTypePreview();
  updateStatsPreview();
  updateClassDetails();
});
weaponSelect.addEventListener("change", updateWeaponPreview);

/*Event listeners*/
for (let i = 0; i < playstyleOptions.length; i++) {
  playstyleOptions[i].addEventListener("change", updatePlaystylePreview);
}

for (let i = 0; i < abilityButtons.length; i++) {
  abilityButtons[i].addEventListener("click", handleAbilityClick);
}

console.log("JavaScript is running");
