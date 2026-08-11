const characterForm = document.getElementById("character-form");
const nameInput = document.getElementById("character-name");
const raceSelect = document.getElementById("character-race");
const classSelect = document.getElementById("character-class");
const weaponSelect = document.getElementById("character-weapon");
const backgroundInput = document.getElementById("character-background");
const playstyleOptions = document.querySelectorAll("input[name='playstyle']");
const formMessage = document.getElementById("form-message");

const previewName = document.getElementById("preview-name");
const previewType = document.getElementById("preview-type");
const previewWeapon = document.getElementById("preview-weapon");
const previewPlaystyle = document.getElementById("preview-playstyle");
const previewStats = document.getElementById("preview-stats");
const previewAbilities = document.getElementById("preview-abilities");
const classDetails = document.getElementById("class-details");
const abilityButtons = document.querySelectorAll("#ability-list button");
const savedCharactersList = document.getElementById("saved-characters-list");
const heroClassButtons = document.querySelectorAll(
  "#hero-class-buttons button",
);
const heroClassPreview = document.getElementById("hero-class-preview");
const heroSelectorCount = document.querySelector(".hero-selector-count");

const featureButtons = document.querySelectorAll(".feature-option");
const featurePreview = document.getElementById("feature-preview");
const stepButtons = document.querySelectorAll(".step-button");
const stepPreview = document.getElementById("step-preview");

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

/* Feature preview data */
const featureInfo = {
  class: {
    label: "Class Selection",
    title: "Choose how your hero fights",
    description:
      "Pick Warrior, Mage, Rogue or Ranger. Each class has its own stats, description and recommended weapons.",
    exampleName: "Warrior",
    exampleValue: "Strength 9",
  },
  stats: {
    label: "Dynamic Stats",
    title: "See the build change instantly",
    description:
      "Strength, magic, agility and defense update when a different class is selected.",
    exampleName: "Mage",
    exampleValue: "Magic 10",
  },
  abilities: {
    label: "Ability Selection",
    title: "Add skills to the build",
    description:
      "Choose abilities such as Fireball, Shadow Step and Stone Guard. Click an ability again to remove it.",
    exampleName: "Selected",
    exampleValue: "Up to you",
  },
  preview: {
    label: "Live Character Card",
    title: "Watch the hero take shape",
    description:
      "The character name, class, weapon, playstyle, stats and abilities appear together in the live preview.",
    exampleName: "Updates",
    exampleValue: "No refresh",
  },
};

/* how it works data */
const stepInfo = {
  details: {
    number: "Step 1",
    title: "Start with the basics",
    description:
      "Give the character a name, choose a race and write a short background.",
  },
  class: {
    number: "Step 2",
    title: "Choose a class",
    description:
      "Pick a class to generate the character stats and recommended weapons.",
  },
  abilities: {
    number: "Step 3",
    title: "Add special abilities",
    description:
      "Select the skills that best match the character and chosen playstyle.",
  },
  save: {
    number: "Step 4",
    title: "Create the finished hero",
    description:
      "Submit the completed build and add the character to the saved characters section.",
  },
};

/* Selected ability data */
let selectedAbilities = [];

/* name preview fcuntion */
function updateNamePreview() {
  const characterName = nameInput.value.trim();

  if (characterName === "") {
    previewName.textContent = "Unnamed Hero";
  } else {
    previewName.textContent = characterName;
  }
}

/* Race and class preview function */
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

/* Hero class preview function */
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

/* Feature preview function */
function updateFeaturePreview(event) {
  const selectedButton = event.currentTarget;
  const selectedFeature = selectedButton.dataset.feature;
  const feature = featureInfo[selectedFeature];

  for (let i = 0; i < featureButtons.length; i++) {
    featureButtons[i].classList.remove("selected");
  }

  selectedButton.classList.add("selected");

  featurePreview.innerHTML = `
    <p class="feature-preview-label">${feature.label}</p>
    <h3>${feature.title}</h3>
    <p>${feature.description}</p>
    <div class="feature-preview-example">
      <span>${feature.exampleName}</span>
      <strong>${feature.exampleValue}</strong>
    </div>
  `;
}

/* How it works prevuew function */
function updateStepPreview(event) {
  const selectedButton = event.currentTarget;
  const selectedStep = selectedButton.dataset.step;
  const step = stepInfo[selectedStep];

  for (let i = 0; i < stepButtons.length; i++) {
    stepButtons[i].classList.remove("selected");
  }

  selectedButton.classList.add("selected");

  stepPreview.innerHTML = `
    <span class="step-preview-number">${step.number}</span>
    <div>
      <h3>${step.title}</h3>
      <p>${step.description}</p>
    </div>
  `;
}

/* Form validation function */
function validateCharacterForm() {
  const selectedPlaystyle = document.querySelector(
    "input[name='playstyle']:checked",
  );

  if (nameInput.value.trim() === "") {
    formMessage.textContent = "Enter a name for your character.";
    return false;
  }

  if (raceSelect.value === "") {
    formMessage.textContent = "Choose a race for your character.";
    raceSelect.focus();
    return false;
  }

  if (classSelect.value === "") {
    formMessage.textContent = "Choose a class for your character.";
    classSelect.focus();
    return false;
  }

  if (weaponSelect.value === "") {
    formMessage.textContent = "Choose a weapon for your character.";
    weaponSelect.focus();
    return false;
  }

  if (selectedPlaystyle === null) {
    formMessage.textContent = "Choose a playstyle for your character.";
    return false;
  }

  formMessage.textContent = "";
  return true;
}

/* Create character object function */
function createCharacterForm() {
  const selectedPlaystyle = document.querySelector(
    "input[name='playstyle']:checked",
  );
  const selectedClass = classStats[classSelect.value];
  return {
    name: nameInput.value.trim(),
    race: raceSelect.value,
    characterClass: classSelect.value,
    weapon: weaponSelect.value,
    playstyle: selectedPlaystyle.value,
    background: backgroundInput.value.trim(),
    abilites: selectedAbilities.slice(),
    stats: {
      strenght: selectedClass.strength,
      magic: selectedClass.magic,
      agility: selectedClass.agility,
      defense: selectedClass.defense,
    },
  };
}

/* Saved character function */
function addSavedCharacter(character) {
  const emptyMessage = savedCharactersList.querySelector("p");
  if (emptyMessage !== null && savedCharactersList.children.length === 1) {
    savedCharactersList.innerHTML = "";
  }
  const characterCard = document.createElement("article");
  characterCard.classList.add("saved-character-card");

  const abilityText =
    character.abilities.length === 0
      ? "None selected"
      : character.abilties.join(", ");

  const backgroundText =
    character.background === "" ? "No background added." : character.background;
  characterCard.innerHTML = `
  <h3>${character.name}</h3>
  <p><strong>Race / Class:</strong> ${character.race} ${character.characterClass}</p>
  <p><strong>Weapon:</strong> ${character.weapon}</p>
  <p><strong>Playstyle:</strong> ${character.playstyle}
  <p><strong>Abilities:</strong> ${character.abilites}</p>
  <p><strong>Background:</strong> ${backgroundText}</p>
  <ul>
      <li>Strength: ${character.stats.strength}</li>
      <li>Magic: ${character.stats.magic}</li>
      <li>Agility: ${character.stats.agility}</li>
      <li>Defense: ${character.stats.defense}</li>
    </ul>
  `;

  savedCharactersList.appendChild(characterCard);
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

/* Feature & how it works EL */
for (let i = 0; i < featureButtons.length; i++) {
  featureButtons[i].addEventListener("click", updateFeaturePreview);
}

for (let i = 0; i < stepButtons.length; i++) {
  stepButtons[i].addEventListener("click", updateStepPreview);
}

console.log("JavaScript is running");
