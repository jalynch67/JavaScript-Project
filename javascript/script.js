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
const previewAbilities = document.getElementById("preview-abilities");
const classDetails = document.getElementById("class-details");
const abilityButtons = document.querySelectorAll("#ability-list button");
const heroClassButtons = document.querySelectorAll(
  "#hero-class-buttons button",
);
const heroClassPreview = document.getElementById("hero-class-preview");
const heroSelectorCount = document.querySelector(".hero-selector-count");

/* Class data */
const classStats = {
  Warrior: {
    description:
      "A strong front-line fighter who relies on strength and defense.",
    strength: 9,
    magic: 2,
    agility: 5,
    defense: 8,
    weapons: "Sword, Axe, Shield",
    mainStat: "Strength",
    image: "images/warrior.png",
  },
  Mage: {
    description:
      "A spellcaster who uses powerful magic but has a lower defense.",
    strength: 2,
    magic: 10,
    agility: 4,
    defense: 3,
    weapons: "Staff, Wand, Spellbook",
    mainStat: "Magic",
    image: "images/mage.png",
  },
  Rogue: {
    description:
      "A quick and stealthy fighter who focuses on agility and surprise attacks.",
    strength: 4,
    magic: 3,
    agility: 10,
    defense: 5,
    weapons: "Dagger, Short Sword, Bow",
    mainStat: "Agility",
    image: "images/rogue.png",
  },
  Ranger: {
    description:
      "A balanced ranged fighter with good agility and steady defense.",
    strength: 5,
    magic: 4,
    agility: 8,
    defense: 6,
    weapons: "Bow, Crossbow, Twin Blades",
    mainStat: "Agility",
    image: "images/ranger.png",
  },
};

/* Selected ability data */
let selectedAbilities = [];

/* name preview */
function updateNamePreview() {
  const characterName = nameInput.value.trim();

  if (characterName === "") {
    previewName.textContent = "Unnamed Hero";
  } else {
    previewName.textContent = characterName;
  }
}

/* Race preview */
function updateTypePreview() {
  const race = raceSelect.value;
  const characterClass = classSelect.value;

  if (race === "" && characterClass === "") {
    previewType.textContent = "Not selected";
  } else if (race !== "" && characterClass === "") {
    previewType.textContent = race;
  } else if (race === "" && characterClass !== "") {
    previewType.textContent = characterClass;
  } else {
    previewType.textContent = race + " " + characterClass;
  }
}

/* Weapon preview */
function updateWeaponPreview() {
  const weapon = weaponSelect.value;

  if (weapon === "") {
    previewWeapon.textContent = "Not selected";
  } else {
    previewWeapon.textContent = weapon;
  }
}

/* Playstyle preview */
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

/* Stats Preview */
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

/* Class details preview */
function updateClassDetails() {
  const characterClass = classSelect.value;
  if (characterClass === "") {
    classDetails.innerHTML =
      "<p>Select a class in the builder to view more information here.</p>";
  } else {
    const selectedClass = classStats[characterClass];
    classDetails.innerHTML = `
      <h3>${characterClass}</h3>
      <p>${selectedClass.description}</p>
      <p><strong>Recommended weapons: </strong>${selectedClass.weapons}</p>
    `;
  }
}

/* Hero section */
function updateHeroClassPreview(event) {
  const selectedButton = event.currentTarget;
  const selectedClassName = selectedButton.dataset.heroClass;
  const selectedClass = classStats[selectedClassName];

  for (let i = 0; i < heroClassButtons.length; i++) {
    heroClassButtons[i].classList.remove("selected");
  }

  selectedButton.classList.add("selected");

  const selectedClassNumber =
    Array.from(heroClassButtons).indexOf(selectedButton) + 1;

  heroSelectorCount.textContent =
    "0" + selectedClassNumber + " / 0" + heroClassButtons.length;

  heroClassPreview.innerHTML = `
    <div class="hero-class-text">
      <p class="class-role">${selectedClass.mainStat} specialist</p>
      <h4>${selectedClassName}</h4>
      <p>${selectedClass.description}</p>

      <div class="class-facts">
        <p>
          <span>Main stat</span>
          <strong>${selectedClass.mainStat}</strong>
        </p>
        <p>
          <span>Weapons</span>
          <strong>${selectedClass.weapons}</strong>
        </p>
      </div>
    </div>

    <div class="hero-class-image-wrap">
      <img
        id="hero-class-image"
        src="${selectedClass.image}"
        alt="${selectedClassName} class portrait"
      >
    </div>
  `;
}

/* Abilities preview */
function updateAbilitiesPreview() {
  if (selectedAbilities.length === 0) {
    previewAbilities.textContent = "None selected";
  } else {
    previewAbilities.textContent = selectedAbilities.join(", ");
  }
}

/* Ability BTN */
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

/* Main Form EL */
nameInput.addEventListener("input", updateNamePreview);
raceSelect.addEventListener("change", updateTypePreview);
weaponSelect.addEventListener("change", updateWeaponPreview);

classSelect.addEventListener("change", function () {
  updateTypePreview();
  updateStatsPreview();
  updateClassDetails();
});

/* Playstyle EL */
for (let i = 0; i < playstyleOptions.length; i++) {
  playstyleOptions[i].addEventListener("change", updatePlaystylePreview);
}

/* Ability BTN EL */
for (let i = 0; i < abilityButtons.length; i++) {
  abilityButtons[i].addEventListener("click", handleAbilityClick);
}

/* Hero Section BTN EL */
for (let i = 0; i < heroClassButtons.length; i++) {
  heroClassButtons[i].addEventListener("click", updateHeroClassPreview);
}

console.log("JavaScript is running");
