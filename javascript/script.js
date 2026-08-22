/* Page Element Selections */
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
const abilityMessage = document.getElementById("ability-message");
const savedCharactersList = document.getElementById("saved-characters-list");

const heroClassButtons = document.querySelectorAll(
  "#hero-class-buttons button",
);
const heroClassPreview = document.getElementById("hero-class-preview");
const heroSelectorCount = document.querySelector(".hero-selector-count");
const pageSections = document.querySelectorAll(".page-section");
const progressLinks = document.querySelectorAll(".progress-link");
const progressFill = document.getElementById("progress-fill");
const generateIdeaButton = document.getElementById("generate-idea-button");
const useIdeaButton = document.getElementById("use-idea-button");
const ideaResult = document.getElementById("idea-result");

const builderAvatar = document.getElementById("builder-avatar");
const avatarHelp = document.getElementById("avatar-help");
const weaponShowcaseName = document.getElementById("weapon-showcase-name");

/* Class Data */
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

/* Character Idea Data */
const ideaRaces = ["Human", "Elf", "Dwarf", "Orc"];
const ideaClasses = ["Warrior", "Mage", "Rogue", "Ranger"];
const ideaWeapons = ["Sword", "Axe", "Staff", "Bow", "Dagger"];
const ideaPlaystyles = ["Balanced", "Aggressive", "Defensive", "Magical"];

let currentIdea = null;

/* Selected Ability Data */
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

/* Race and Class Preview Function */
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

/* Class Details Preview Function */
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

/* Builder Avatar Function */
function updateBuilderAvatar() {
  const characterClass = classSelect.value;

  if (characterClass === "") {
    builderAvatar.src = "images/warrior.png";
    builderAvatar.alt = "Character avatar placeholder";
    avatarHelp.textContent = "Choose a class";
  } else {
    builderAvatar.src = classStats[characterClass].image;
    builderAvatar.alt = characterClass + " character avatar";
    avatarHelp.textContent = characterClass;
  }
}

/* Weapon Showcase Function */
function updateWeaponShowcase() {
  const weapon = weaponSelect.value;

  if (weapon === "") {
    weaponShowcaseName.textContent = "Choose a weapon";
  } else {
    weaponShowcaseName.textContent = weapon;
  }
}

/* Hero Class Preview Function */
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
      <h3>${selectedClassName}</h3>
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

    <img
      class="hero-class-image"
      src="${selectedClass.image}"
      alt="${selectedClassName} class portrait"
    >
  `;
}

/* Abilities Preview Function */
function updateAbilitiesPreview() {
  if (selectedAbilities.length === 0) {
    previewAbilities.textContent = "None selected";
  } else {
    previewAbilities.textContent = selectedAbilities.join(", ");
  }
}

/* Ability Button Click Function */
function handleAbilityClick(event) {
  const selectedButton = event.currentTarget;
  const abilityName = selectedButton.dataset.ability;

  if (selectedAbilities.includes(abilityName)) {
    selectedAbilities = selectedAbilities.filter(function (ability) {
      return ability !== abilityName;
    });
    selectedButton.classList.remove("selected");
    formMessage.textContent = "";
  } else {
    if (selectedAbilities.length >= 3) {
      abilityMessage.textContent = "You can only select 3 abilities.";

      return;
    }
    selectedAbilities.push(abilityName);
    selectedButton.classList.add("selected");
    abilityMessage.textContent = "";
  }

  updateAbilitiesPreview();
}

/* Page Progress Function */
function updatePageProgress() {
  const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progressAmount =
    pageHeight > 0 ? (window.scrollY / pageHeight) * 100 : 0;

  progressFill.style.height = progressAmount + "%";

  let currentSection = pageSections[0].id;

  for (let i = 0; i < pageSections.length; i++) {
    if (window.scrollY >= pageSections[i].offsetTop - 170) {
      currentSection = pageSections[i].id;
    }
  }

  for (let i = 0; i < progressLinks.length; i++) {
    progressLinks[i].classList.remove("active");

    if (progressLinks[i].dataset.section === currentSection) {
      progressLinks[i].classList.add("active");
    }
  }
}

/* Random Item Function */
function getRandomItem(items) {
  const randomNumber = Math.floor(Math.random() * items.length);
  return items[randomNumber];
}

/* Character Idea Generator Function */
function generateCharacterIdea() {
  currentIdea = {
    race: getRandomItem(ideaRaces),
    characterClass: getRandomItem(ideaClasses),
    weapon: getRandomItem(ideaWeapons),
    playstyle: getRandomItem(ideaPlaystyles),
  };

  const selectedClass = classStats[currentIdea.characterClass];

  ideaResult.innerHTML = `
    <img
      src="${selectedClass.image}"
      alt="${currentIdea.characterClass} class avatar"
    >

    <div>
      <h4>${currentIdea.race} ${currentIdea.characterClass}</h4>

      <div class="idea-details">
        <p>
          <strong>Race</strong>
          ${currentIdea.race}
        </p>

        <p>
          <strong>Class</strong>
          ${currentIdea.characterClass}
        </p>

        <p>
          <strong>Weapon</strong>
          ${currentIdea.weapon}
        </p>

        <p>
          <strong>Playstyle</strong>
          ${currentIdea.playstyle}
        </p>
      </div>
    </div>
  `;

  useIdeaButton.disabled = false;
}

/* Use Character Idea Function */
function useCharacterIdea() {
  if (currentIdea === null) {
    return;
  }

  raceSelect.value = currentIdea.race;
  classSelect.value = currentIdea.characterClass;
  weaponSelect.value = currentIdea.weapon;

  for (let i = 0; i < playstyleOptions.length; i++) {
    if (playstyleOptions[i].value === currentIdea.playstyle) {
      playstyleOptions[i].checked = true;
    }
  }

  updateTypePreview();
  updateWeaponPreview();
  updatePlaystylePreview();
  updateStatsPreview();
  updateClassDetails();
  updateBuilderAvatar();
  updateWeaponShowcase();

  document.getElementById("builder").scrollIntoView({
    behavior: "smooth",
  });
}

/* Form Validation Function */
function validateCharacterForm() {
  const selectedPlaystyle = document.querySelector(
    "input[name='playstyle']:checked",
  );

  if (nameInput.value.trim() === "") {
    formMessage.textContent = "Enter a name for your character.";
    nameInput.focus();
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

/* Create Character Object Function */
function createCharacterFromForm() {
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
    abilities: selectedAbilities.slice(),
    stats: {
      strength: selectedClass.strength,
      magic: selectedClass.magic,
      agility: selectedClass.agility,
      defense: selectedClass.defense,
    },
  };
}

/* Saved Character Card Function */
function addSavedCharacter(character) {
  const emptyMessage = savedCharactersList.querySelector(".empty-message");

  if (emptyMessage !== null) {
    savedCharactersList.innerHTML = "";
  }

  const characterCard = document.createElement("article");
  characterCard.classList.add("saved-character-card");

  const abilityText =
    character.abilities.length === 0
      ? "None selected"
      : character.abilities.join(", ");

  const backgroundText =
    character.background === "" ? "No background added." : character.background;

  const characterImage = classStats[character.characterClass].image;

  characterCard.innerHTML = `
    <div class="saved-character-image">
      <img
        src="${characterImage}"
        alt="${character.characterClass} class avatar"
      >
    </div>

    <div class="saved-character-details">
      <h3>${character.name}</h3>

      <p>
        <strong>Race / Class:</strong>
        ${character.race} ${character.characterClass}
      </p>

      <p>
        <strong>Weapon:</strong>
        ${character.weapon}
      </p>

      <p>
        <strong>Playstyle:</strong>
        ${character.playstyle}
      </p>

      <p>
        <strong>Abilities:</strong>
        ${abilityText}
      </p>

      <p>
        <strong>Background:</strong>
        ${backgroundText}
      </p>

      <ul>
        <li>Strength: ${character.stats.strength}</li>
        <li>Magic: ${character.stats.magic}</li>
        <li>Agility: ${character.stats.agility}</li>
        <li>Defense: ${character.stats.defense}</li>
      </ul>

      <button type="button" class="delete-character-btn">
        Delete
      </button>
    </div>
  `;

  const deleteButton = characterCard.querySelector(".delete-character-btn");

  deleteButton.addEventListener("click", function () {
    characterCard.remove();

    if (savedCharactersList.children.length === 0) {
      savedCharactersList.innerHTML = `
        <div class="empty-message">
          <h3>No characters saved yet</h3>
          <p>Use the builder to create your first character.</p>
        </div>
      `;
    }
  });

  savedCharactersList.appendChild(characterCard);
}

/* Reset Builder Preview Function */
function resetBuilderPreview() {
  selectedAbilities = [];

  previewName.textContent = "Unnamed Hero";
  previewType.textContent = "Not selected";
  previewWeapon.textContent = "Not selected";
  previewPlaystyle.textContent = "Not selected";
  previewAbilities.textContent = "None selected";
  abilityMessage.textContent = "";

  previewStats.innerHTML = `
    <li>Strength: 0</li>
    <li>Magic: 0</li>
    <li>Agility: 0</li>
    <li>Defense: 0</li>
  `;

  classDetails.innerHTML =
    "<p>Select a class in the builder to view more information here.</p>";

  updateBuilderAvatar();
  updateWeaponShowcase();

  for (let i = 0; i < abilityButtons.length; i++) {
    abilityButtons[i].classList.remove("selected");
  }
}

/* Character Form Submit Function */
function handleCharacterSubmit(event) {
  event.preventDefault();

  if (validateCharacterForm() === false) {
    return;
  }

  const character = createCharacterFromForm();
  addSavedCharacter(character);

  formMessage.textContent = character.name + " has been created.";
  characterForm.reset();
  resetBuilderPreview();

  document.getElementById("saved-characters").scrollIntoView({
    behavior: "smooth",
  });
}

/* Character Form Reset Function */
function handleCharacterReset() {
  window.setTimeout(function () {
    formMessage.textContent = "";
    resetBuilderPreview();
  }, 0);
}

/* Main Form Event Listener */
nameInput.addEventListener("input", updateNamePreview);
raceSelect.addEventListener("change", updateTypePreview);
weaponSelect.addEventListener("change", function () {
  updateWeaponPreview();
  updateWeaponShowcase();
});

classSelect.addEventListener("change", function () {
  updateTypePreview();
  updateStatsPreview();
  updateClassDetails();
  updateBuilderAvatar();
});

characterForm.addEventListener("submit", handleCharacterSubmit);
characterForm.addEventListener("reset", handleCharacterReset);

/* Playstyle Event Listener */
for (let i = 0; i < playstyleOptions.length; i++) {
  playstyleOptions[i].addEventListener("change", updatePlaystylePreview);
}

/* Ability Button Event Listener */
for (let i = 0; i < abilityButtons.length; i++) {
  abilityButtons[i].addEventListener("click", handleAbilityClick);
}

/* Hero Class Event Listener */
for (let i = 0; i < heroClassButtons.length; i++) {
  heroClassButtons[i].addEventListener("click", updateHeroClassPreview);
}

/* Character Idea Event Listener */
generateIdeaButton.addEventListener("click", generateCharacterIdea);
useIdeaButton.addEventListener("click", useCharacterIdea);

/* Page Progress Event Listener */
window.addEventListener("scroll", updatePageProgress);
window.addEventListener("resize", updatePageProgress);

/* Initial Page Progress Update */
updatePageProgress();
