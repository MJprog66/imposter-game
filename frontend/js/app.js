// ========================================
// HARDCODED CATEGORIES
// ========================================

const categories = defaultCategories;

// ========================================
// LOCAL STORAGE
// ========================================

const CUSTOM_CATEGORIES_KEY =
    "imposterGameCustomCategories";

// ========================================
// SELECTED CATEGORIES
// ========================================

let selectedCategories = [];

// ========================================
// HTML ELEMENTS
// ========================================

const categoryList =
    document.getElementById("categoryList");

const startGameButton =
    document.getElementById("startGameButton");

const createCategoryButton =
    document.getElementById("createCategoryButton");

const playerCountInput =
    document.getElementById("playerCount");

const imposterCountInput =
    document.getElementById("imposterCount");

// ========================================
// GAME SCREEN ELEMENTS
// ========================================

const gameScreen =
    document.getElementById("gameScreen");

const playerCard =
    document.getElementById("playerCard");

const playerNumber =
    document.getElementById("playerNumber");

const revealButton =
    document.getElementById("revealButton");

const secretWord =
    document.getElementById("secretWord");

const nextPlayerButton =
    document.getElementById("nextPlayerButton");

const startDiscussionButton =
    document.getElementById("startDiscussionButton");

// ========================================
// GAME SCREEN ELEMENTS
// ========================================
const discussionScreen =
    document.getElementById("discussionScreen");

const startingPlayer =
    document.getElementById("startingPlayer");

const revealDiscussionButton =
    document.getElementById(
        "revealDiscussionButton"
    );

const discussionResult =
    document.getElementById(
        "discussionResult"
    );

const discussionWord =
    document.getElementById(
        "discussionWord"
    );

const discussionImposters =
    document.getElementById(
        "discussionImposters"
    );

const newGameButton =
    document.getElementById(
        "newGameButton"
    );

const backToMainMenuButton =
    document.getElementById(
        "backToMainMenuButton"
    );

// ========================================
// SCREEN SWITCHING
// ========================================

function showMainMenu() {

    mainMenu.classList.remove("hidden");

    createCategoryScreen.classList.add("hidden");
}


function showCreateCategoryScreen() {

    mainMenu.classList.add("hidden");

    createCategoryScreen.classList.remove("hidden");
}

// ========================================
// CREATE CATEGORY ELEMENTS
// ========================================

const mainMenu =
    document.getElementById("mainMenu");

const createCategoryScreen =
    document.getElementById("createCategoryScreen");

const categoryTitleInput =
    document.getElementById("categoryTitleInput");

const wordInput =
    document.getElementById("wordInput");

const hintInput =
    document.getElementById("hintInput");

const addWordButton =
    document.getElementById("addWordButton");

const wordList =
    document.getElementById("wordList");

const saveCategoryButton =
    document.getElementById("saveCategoryButton");

const cancelCategoryButton =
    document.getElementById("cancelCategoryButton");


// ========================================
// NEW CATEGORY WORDS
// ========================================

let newCategoryWords = [];

let currentPlayer = 1;
let totalPlayers = 0;
let totalImposters = 0;

let secretWordValue = "";
let secretHintValue = "";
let imposterPlayers = [];

let wordRevealed = false;

// ========================================
// EDITING CATEGORY
// ========================================

let editingCategoryId = null;

// ========================================
// LOAD CUSTOM CATEGORIES
// ========================================

function loadCustomCategories() {

    const savedCategories =
        localStorage.getItem(
            CUSTOM_CATEGORIES_KEY
        );


    // Nothing has been saved yet

    if (savedCategories === null) {

        return;
    }


    try {

        const customCategories =
            JSON.parse(savedCategories);


        // Add saved categories to categories

        customCategories.forEach(
            function(category) {

                categories.push(category);

            }
        );

    } catch (error) {

        console.error(
            "Error loading custom categories:",
            error
        );

    }
}

// ========================================
// SAVE CUSTOM CATEGORIES
// ========================================

function saveCustomCategories() {

    // Get only custom categories

    const customCategories =
        categories.filter(
            function(category) {

                return category.id.startsWith(
                    "custom-"
                );

            }
        );


    // Convert to text and save

    localStorage.setItem(
        CUSTOM_CATEGORIES_KEY,
        JSON.stringify(customCategories)
    );
}

// ========================================
// DISPLAY CATEGORIES
// ========================================

function displayCategories() {

    // Clear existing category cards

    categoryList.innerHTML = "";


    // Loop through all categories

    categories.forEach(function(category) {

        // Create category card

        const card =
            document.createElement("div");

        card.classList.add(
            "category-card"
        );


        // ========================================
        // CATEGORY TITLE
        // ========================================

        const title =
            document.createElement("div");

        title.classList.add(
            "category-title"
        );

        title.textContent =
            category.title;


        // Add title to card

        card.appendChild(title);


        // ========================================
        // CHECK IF SELECTED
        // ========================================

        if (
            selectedCategories.includes(
                category.id
            )
        ) {

            card.classList.add(
                "selected"
            );

        }


        // ========================================
        // SELECT / UNSELECT CATEGORY
        // ========================================

        card.addEventListener(
            "click",
            function() {

                toggleCategory(
                    category.id,
                    card
                );

            }
        );


        // ========================================
        // EDIT / DELETE BUTTONS
        // CUSTOM CATEGORIES ONLY
        // ========================================

        if (
            category.id.startsWith(
                "custom-"
            )
        ) {

            const actions =
                document.createElement("div");

            actions.classList.add(
                "category-actions"
            );


            // ========================================
            // EDIT BUTTON
            // ========================================

            const editButton =
                document.createElement("button");

            editButton.textContent =
                "Edit";

            editButton.classList.add(
                "edit-category-button"
            );


            editButton.addEventListener(
                "click",
                function(event) {

                    // Prevent category selection

                    event.stopPropagation();

                    editCategory(
                        category.id
                    );

                }
            );


            // ========================================
            // DELETE BUTTON
            // ========================================

            const deleteButton =
                document.createElement("button");

            deleteButton.textContent =
                "Delete";

            deleteButton.classList.add(
                "delete-category-button"
            );


            deleteButton.addEventListener(
                "click",
                function(event) {

                    // Prevent category selection

                    event.stopPropagation();

                    deleteCategory(
                        category.id
                    );

                }
            );


            // Add buttons

            actions.appendChild(
                editButton
            );

            actions.appendChild(
                deleteButton
            );


            // Add actions to card

            card.appendChild(
                actions
            );

        }


        // Add card to category list

        categoryList.appendChild(
            card
        );

    });
}

// ========================================
// SELECT / UNSELECT CATEGORY
// ========================================

function toggleCategory(categoryId, card) {

    if (selectedCategories.includes(categoryId)) {

        // Remove category

        selectedCategories =
            selectedCategories.filter(function(id) {

                return id !== categoryId;

            });


        card.classList.remove("selected");

        } else {

        // Add category

        selectedCategories.push(
            categoryId
        );

        card.classList.add("selected");

    }


    console.log(
        "Selected categories:",
        selectedCategories
    );
}


// ========================================
// START GAME BUTTON
// ========================================

startGameButton.addEventListener(
    "click",
    function() {

        // Check categories

        if (selectedCategories.length === 0) {

            alert(
                "Please select at least one category."
            );

            return;
        }


        // Get player count

        const playerCount =
            Number(playerCountInput.value);


        // Get imposter count

        const imposterCount =
            Number(imposterCountInput.value);


        // Check players

        if (playerCount < 3) {

            alert(
                "There must be at least 3 players."
            );

            return;
        }


        // Check imposters

        if (imposterCount < 1) {

            alert(
                "There must be at least 1 imposter."
            );

            return;
        }


        // Imposters must be less than players

        if (imposterCount >= playerCount) {

            alert(
                "The number of imposters must be less than the number of players."
            );

            return;
        }


        // Show game settings in console

        console.log(
            "========== START GAME =========="
        );

        console.log(
            "Players:",
            playerCount
        );

        console.log(
            "Imposters:",
            imposterCount
        );

        console.log(
            "Selected categories:",
            selectedCategories
        );

        console.log(
            "================================"
        );

        startGame();

    }
);

// ========================================
// START GAME
// ========================================

function startGame() {

    // Get player settings

    totalPlayers =
        Number(playerCountInput.value);

    totalImposters =
        Number(imposterCountInput.value);


    // Get all words from selected categories

    let availableWords = [];

    selectedCategories.forEach(
        function(categoryId) {

            const category =
                categories.find(
                    function(category) {

                        return (
                            category.id ===
                            categoryId
                        );

                    }
                );


            if (category) {

                availableWords.push(
                    ...category.words
                );

            }

        }
    );


    // Make sure there are words

    if (availableWords.length === 0) {

        alert(
            "The selected categories have no words."
        );

        return;

    }


    // Pick a random word

    const randomIndex =
        Math.floor(
            Math.random() *
            availableWords.length
        );

    const selectedWord =
        availableWords[randomIndex];

    secretWordValue =
        selectedWord.word;

    secretHintValue =
        selectedWord.hint;


    // Reset game

    currentPlayer = 1;

    wordRevealed = false;


    // Create random imposters

    imposterPlayers = [];


    while (
        imposterPlayers.length <
        totalImposters
    ) {

        const randomPlayer =
            Math.floor(
                Math.random() *
                totalPlayers
            ) + 1;


        if (
            !imposterPlayers.includes(
                randomPlayer
            )
        ) {

            imposterPlayers.push(
                randomPlayer
            );

        }

    }


    console.log(
        "Secret word:",
        secretWordValue
    );

    console.log(
        "Imposters:",
        imposterPlayers
    );


    // Show first player

    showPlayerCard();


    // Switch screens

    mainMenu.classList.add(
        "hidden"
    );

    gameScreen.classList.remove(
        "hidden"
    );

}


/* ========================================
   SHOW PLAYER CARD
   ======================================== */

function showPlayerCard() {

    // Display the current player number
    playerNumber.textContent = "Player " + currentPlayer;

    // Hide the secret word
    secretWord.classList.add("hidden");

    // Reset the reveal state
    wordRevealed = false;

    // Show the Reveal button
    revealButton.classList.remove("hidden");

    // Hide the other buttons
    nextPlayerButton.classList.add("hidden");
    startDiscussionButton.classList.add("hidden");

    // Different colors for each player
    const playerColors = [
        ["#6c63ff", "#4834d4"], // Purple
        ["#ff6b6b", "#ee5253"], // Red
        ["#1dd1a1", "#10ac84"], // Green
        ["#feca57", "#ff9f43"], // Yellow and orange
        ["#54a0ff", "#2e86de"], // Blue
        ["#ff9ff3", "#f368e0"], // Pink
        ["#48dbfb", "#0abde3"], // Cyan
        ["#a29bfe", "#6c5ce7"]  // Lavender
    ];

    // Choose a color based on the player number
    const colorIndex = (currentPlayer - 1) % playerColors.length;
    const colors = playerColors[colorIndex];

    // Apply the colors to the card
    playerCard.style.background =
        `linear-gradient(145deg, ${colors[0]}, ${colors[1]})`;
}

// ========================================
// REVEAL SECRET WORD
// ========================================

revealButton.addEventListener(
    "click",
    function(event) {

        event.stopPropagation();

        if (!wordRevealed) {

            // Check if current player is an imposter

            if (
                imposterPlayers.includes(
                    currentPlayer
                )
            ) {

                secretWord.innerHTML =
                    "IMPOSTER<br><br>" +
                    "Hint: " +
                    secretHintValue;

            } else {

                // Normal player sees the actual word

                secretWord.textContent =
                    secretWordValue;

            }

            // Show the result

            secretWord.classList.remove(
                "hidden"
            );

            // Hide Reveal button

            revealButton.classList.add(
                "hidden"
            );

            wordRevealed = true;

        }

    }
);

// ========================================
// PLAYER CARD TAP
// ========================================

playerCard.addEventListener(
    "click",
    function() {

        // Only continue if the word is revealed

        if (!wordRevealed) {
            return;
        }

        // Hide the secret word or hint

        secretWord.classList.add("hidden");

        // Show the player number again

        playerNumber.textContent =
            "Player " + currentPlayer;

        // Allow the player to reveal the card again
        // only when the next card is shown

        wordRevealed = false;

        // Check if this is the final player

        if (currentPlayer < totalPlayers) {

            // More players remain

            nextPlayerButton.classList.remove(
                "hidden"
            );

            startDiscussionButton.classList.add(
                "hidden"
            );

        } else {

            // All players have finished

            nextPlayerButton.classList.add(
                "hidden"
            );

            startDiscussionButton.classList.remove(
                "hidden"
            );

        }

    }
);

// ========================================
// NEXT PLAYER
// ========================================

nextPlayerButton.addEventListener(
    "click",
    function() {

        if (currentPlayer < totalPlayers) {

            currentPlayer++;

            showPlayerCard();

        } else {

            // All players have finished

            nextPlayerButton.classList.add("hidden");

            startDiscussionButton.classList.remove("hidden");

        }

    }
);

// ========================================
// SHOW DISCUSSION SCREEN
// ========================================

function showDiscussionScreen() {

    // Hide the Game Screen

    gameScreen.classList.add(
        "hidden"
    );

    // Show the Discussion Screen

    discussionScreen.classList.remove(
        "hidden"
    );

    // Randomize who starts the discussion

    const randomPlayer =
        Math.floor(
            Math.random() *
            totalPlayers
        ) + 1;

    startingPlayer.textContent =
        "Player " +
        randomPlayer +
        " starts the discussion.";

    // Hide the result

    discussionResult.classList.add(
        "hidden"
    );

    // Show Reveal button

    revealDiscussionButton.classList.remove(
        "hidden"
    );

}

// ========================================
// START DISCUSSION
// ========================================

startDiscussionButton.addEventListener(
    "click",
    function() {

        showDiscussionScreen();

    }
);

// ========================================
// REVEAL DISCUSSION RESULT
// ========================================

revealDiscussionButton.addEventListener(
    "click",
    function() {

        // Show the secret word

        discussionWord.textContent =
            "Secret Word: " +
            secretWordValue;

        // Show the imposters

        discussionImposters.textContent =
            "Imposter(s): Player " +
            imposterPlayers.join(
                ", Player "
            );

        // Show the result

        discussionResult.classList.remove(
            "hidden"
        );

        // Hide Reveal button

        revealDiscussionButton.classList.add(
            "hidden"
        );

    }
);

// ========================================
// START NEW GAME
// ========================================

function startNewGame() {

    // Get all words from the selected categories

    let availableWords = [];

    selectedCategories.forEach(
        function(categoryId) {

            const category =
                categories.find(
                    function(category) {

                        return (
                            category.id ===
                            categoryId
                        );

                    }
                );

            if (category) {

                availableWords.push(
                    ...category.words
                );

            }

        }
    );


    // Make sure there are words available

    if (availableWords.length === 0) {

        alert(
            "The selected categories have no words."
        );

        return;

    }


    // Choose a new random word

    const randomIndex =
        Math.floor(
            Math.random() *
            availableWords.length
        );

    const selectedWord =
        availableWords[randomIndex];

    secretWordValue =
        selectedWord.word;

    secretHintValue =
        selectedWord.hint;


    // Reset player

    currentPlayer = 1;


    // Reset imposter list

    imposterPlayers = [];


    // Choose new random imposters

    while (
        imposterPlayers.length <
        totalImposters
    ) {

        const randomPlayer =
            Math.floor(
                Math.random() *
                totalPlayers
            ) + 1;


        if (
            !imposterPlayers.includes(
                randomPlayer
            )
        ) {

            imposterPlayers.push(
                randomPlayer
            );

        }

    }


    // Show the Game Screen

    discussionScreen.classList.add(
        "hidden"
    );

    gameScreen.classList.remove(
        "hidden"
    );


    // Show Player 1

    showPlayerCard();

}

// ========================================
// NEW GAME BUTTON
// ========================================

newGameButton.addEventListener(
    "click",
    function() {

        startNewGame();

    }
);

// ========================================
// OPEN CREATE CATEGORY SCREEN
// ========================================

createCategoryButton.addEventListener(
    "click",
    function() {

        // Clear editing mode
        editingCategoryId = null;

        // Clear category title
        categoryTitleInput.value = "";

        // Clear word input
        wordInput.value = "";

        // Clear old words
        newCategoryWords = [];

        // Display empty word list
        displayWords();

        // Show Create Category screen
        showCreateCategoryScreen();

        // Focus category title
        categoryTitleInput.focus();

    }
);


// ========================================
// ADD WORDS
// ========================================

addWordButton.addEventListener(
    "click",
    function() {

        addWords();

    }
);


// ========================================
// ADD WORD
// ========================================

function addWords() {

    const word =
        wordInput.value.trim();

    const hint =
        hintInput.value.trim();


    // Check word

    if (word === "") {

        alert(
            "Please enter a word."
        );

        wordInput.focus();

        return;
    }


    // Add word and optional hint

    newCategoryWords.push({

        word: word,

        hint: hint

    });


    // Clear inputs

    wordInput.value = "";

    hintInput.value = "";


    // Put cursor back on Word

    wordInput.focus();


    // Update word list

    displayWords();

}


// ========================================
// ENTER KEY
// ========================================

wordInput.addEventListener(
    "keydown",
    function(event) {

        // Enter WITHOUT Shift

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            // Prevent normal new line

            event.preventDefault();

            // Add the word(s)

            addWords();

        }

        // Shift + Enter
        // Do nothing.
        // The browser will create a new line.

    }
);

// ========================================
// DISPLAY WORDS
// ========================================

function displayWords() {

    wordList.innerHTML = "";


    newCategoryWords.forEach(
        function(wordData, index) {

            const wordItem =
                document.createElement("div");

            wordItem.classList.add(
                "word-item"
            );


            // ========================================
            // WORD INFORMATION
            // ========================================

            const wordInformation =
                document.createElement("div");

            wordInformation.classList.add(
                "word-information"
            );


            const wordText =
                document.createElement("strong");

            wordText.textContent =
                wordData.word;


            wordInformation.appendChild(
                wordText
            );


            // ========================================
            // OPTIONAL HINT
            // ========================================

            if (
                wordData.hint &&
                wordData.hint.trim() !== ""
            ) {

                const hintText =
                    document.createElement("small");

                hintText.textContent =
                    "    Hint: " +
                    wordData.hint;


                wordInformation.appendChild(
                    hintText
                );

            }


            // ========================================
            // EDIT BUTTON
            // ========================================

            const editButton =
                document.createElement("button");

            editButton.textContent =
                "Edit";


            editButton.addEventListener(
                "click",
                function() {

                    editWord(index);

                }
            );


            // ========================================
            // DELETE BUTTON
            // ========================================

            const deleteButton =
                document.createElement("button");

            deleteButton.textContent =
                "Delete";

            deleteButton.classList.add(
                "delete-word-button"
            );


            deleteButton.addEventListener(
                "click",
                function() {

                    deleteWord(index);

                }
            );


            // ========================================
            // ACTIONS
            // ========================================

            const wordActions =
                document.createElement("div");

            wordActions.classList.add(
                "word-actions"
            );


            wordActions.appendChild(
                editButton
            );

            wordActions.appendChild(
                deleteButton
            );


            // ========================================
            // ADD TO WORD ITEM
            // ========================================

            wordItem.appendChild(
                wordInformation
            );

            wordItem.appendChild(
                wordActions
            );


            wordList.appendChild(
                wordItem
            );

        }
    );

}


// ========================================
// EDIT WORD
// ========================================

function editWord(index) {

    // Get the selected word object

    const wordData =
        newCategoryWords[index];

    if (!wordData) {
        return;
    }


    // Put the existing word into the input

    wordInput.value =
        wordData.word;


    // Put the existing hint into the input

    hintInput.value =
        wordData.hint || "";


    // Remove the old word from the list

    newCategoryWords.splice(
        index,
        1
    );


    // Refresh the saved word list

    displayWords();


    // Focus the Word input

    wordInput.focus();

}


// ========================================
// DELETE WORD
// ========================================

function deleteWord(index) {

    // Ask for confirmation

    const confirmed =
        confirm(
            "Are you sure you want to delete this word?"
        );


    if (!confirmed) {

        return;
    }


    // Remove word

    newCategoryWords.splice(
        index,
        1
    );


    // Refresh list

    displayWords();
}

// ========================================
// EDIT CATEGORY
// ========================================

function editCategory(categoryId) {

    // Find the category

    const category =
        categories.find(
            function(category) {
                return category.id === categoryId;
            }
        );


    // Make sure the category exists

    if (!category) {

        return;

    }


    // Remember which category we're editing

    editingCategoryId =
        categoryId;


    // Put category title into input

    categoryTitleInput.value =
        category.title;


    // Copy the existing words

    newCategoryWords =
        [...category.words];


    // Display the existing words

    displayWords();


    // Open Create Category screen

    showCreateCategoryScreen();


    // Focus the title

    categoryTitleInput.focus();

}

// ========================================
// DELETE CATEGORY
// ========================================

function deleteCategory(categoryId) {

    // Find the category

    const category =
        categories.find(
            function(category) {
                return category.id === categoryId;
            }
        );


    // Make sure the category exists

    if (!category) {

        return;

    }


    // Ask for confirmation

    const confirmed =
        confirm(
            `Are you sure you want to delete "${category.title}"?`
        );


    // User cancelled

    if (!confirmed) {

        return;

    }


    // Remove category from categories

    const categoryIndex =
        categories.findIndex(
            function(category) {
                return category.id === categoryId;
            }
        );


    if (categoryIndex !== -1) {

        categories.splice(
            categoryIndex,
            1
        );

    }


    // Remove category from selected categories

    selectedCategories =
        selectedCategories.filter(
            function(id) {
                return id !== categoryId;
            }
        );


    // Save updated categories

    saveCustomCategories();


    // Refresh category cards

    displayCategories();


    // Show success message

    alert(
        "Category deleted successfully!"
    );

}

// ========================================
// CANCEL CATEGORY
// ========================================

cancelCategoryButton.addEventListener(
    "click",
    function() {

        showMainMenu();

    }
);


// ========================================
// SAVE CATEGORY
// ========================================

saveCategoryButton.addEventListener(
    "click",
    function() {

        // Get category title

        const title =
            categoryTitleInput.value.trim();


        // ========================================
        // VALIDATE TITLE
        // ========================================

        if (title === "") {

            alert(
                "Please enter a category title."
            );

            return;

        }


        // ========================================
        // VALIDATE WORDS
        // ========================================

        if (
            newCategoryWords.length === 0
        ) {

            alert(
                "Please add at least one word."
            );

            return;

        }


        // ========================================
        // EDIT EXISTING CATEGORY
        // ========================================

        if (
            editingCategoryId !== null
        ) {

            const category =
                categories.find(
                    function(category) {

                        return (
                            category.id ===
                            editingCategoryId
                        );

                    }
                );


            // Make sure category exists

            if (category) {

                // Update title

                category.title =
                    title;


                // Update words

                category.words =
                    [...newCategoryWords];


                // Save changes

                saveCustomCategories();


                // Clear editing mode

                editingCategoryId = null;


                // Update category cards

                displayCategories();


                // Return to Main Menu

                showMainMenu();


                alert(
                    "Category updated successfully!"
                );

            }

            return;

        }


        // ========================================
        // CREATE NEW CATEGORY
        // ========================================

        const newCategory = {

            id:
                "custom-" + Date.now(),

            title:
                title,

            words:
                [...newCategoryWords]

        };


        // Add category

        categories.push(
            newCategory
        );


        // Save custom categories

        saveCustomCategories();


        // Select new category

        selectedCategories.push(
            newCategory.id
        );


        // Update category cards

        displayCategories();


        // Return to Main Menu

        showMainMenu();


        // Success message

        alert(
            "Category saved successfully!"
        );

    }
);

// ========================================
// INITIALIZE APP
// ========================================

loadCustomCategories();

displayCategories();