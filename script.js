/************************************
 * 1) NEW WORDS (answers & clues)   *
 * 2) UPDATED LYRICS                *
 * 3) UPDATED REPLACE REGEX         *
 ************************************/

// 1) NEW WORDS/CLUES based on the parentheses in the new lyrics
const words = [
  { answer: "SOLID", clue: "Firm and stable in shape; describing the ones the artist talks to" },
  { answer: "COPY", clue: "To reproduce or imitate text, images, or style" },
  { answer: "BARK", clue: "A dog's vocal sound; also another word for tree trunk" },
  { answer: "MACHINA", clue: "Latin for 'machine'; movie title 'ex _______'" },
  { answer: "THOT", clue: "Slang term for someone considered promiscuous" },
  { answer: "ANGINA", clue: "Chest pain due to reduced blood flow to the heart" },
  { answer: "PREPOSTEROUS", clue: "Contrary to reason or common sense; utterly absurd" },
  { answer: "PRIVATE", clue: "Not publicly known or for public viewing" },
  { answer: "ADONIS", clue: "A very handsome young man, from Greek mythology" },
  { answer: "GOODMUSIC", clue: "A record label founded by Kanye West, NO SPACES (Push & ___)" },
  { answer: "PEN", clue: "A common instrument used for writing or drawing" },
  { answer: "WRITE", clue: "To form letters or words on a surface" },
  { answer: "MAINE", clue: "A state in the New England region of the USA" },
  { answer: "COOPERFLAGG", clue: "A reference to an event or name 'Cooper Flagg' to be waved" },
  { answer: "PRINCESS", clue: "Daughter of a monarch; female royal" },
  { answer: "PEACH", clue: "A soft, juicy fruit with fuzzy skin" },
  { answer: "BLUE", clue: "A color; can also refer to feeling sad or 'blew' money" },
  { answer: "DOG", clue: "A domestic animal considered 'man's best friend'" },
  { answer: "MALE", clue: "Belonging to or characteristic of men" },
  { answer: "STEVE", clue: "A common male first name, Ex: _____ JOBS or SCUBBA _____" }
];

// 2) UPDATED LYRICS
const originalLyrics = `
I only talk to the (solid) ones <br><br>
That’s usually the thugs you corporate niggas monotonous <br><br>
You hate when you mocking us and paste when (copy) us <br><br>
Either way its Liph at the top of the tree that you (bark)ing up <br><br>
I down played her crazy dog my ex was a (machina) <br><br>
I couldn’t see the bot in her or the Blueface (thot) in her <br><br>
She gave me the (angina), but the stress never stopping us <br><br>
One of the few lessons that you’ll learn when you walk with us <br><br>
So please don’t go moving (preposterous) <br><br>
I did enough damage showing the public the (private) us <br><br>
A nigga was popping up I got sick of the hiding cause <br><br>
Immigration made my parents keep a nigga (Adonis) tucked <br><br>
But now we worldwide with gold trophies on top of us <br><br>
All it took was a Push and (Good Music) to pop us up <br><br>
Like, don’t talk to my man like that, I like it when you like that <br><br>
If it’s beef then its beef, ima fight back <br><br>
Niggas say we (pen) pals but never (write) back <br><br>
You ain’t like that, you don’t know what to do with that <br><br>
Pop up at your (Maine) event, have you waving the (Cooper Flagg) <br><br>
Point your wife out like who is that? <br><br>
Your (princess) was throwing me the (peach) and I blew her back <br><br>
And she got you out here shopping, you ain’t have a clue and you blew (blue) a bag <br><br>
Guess you ain’t see the (dog) in her my nigga you’re too attached, I’m gone <br><br>

(Male) time nigga, (Steve) ass niggas, she call me for male time <br><br>

Wave that Cooper Flagg nigga
`;

// 3) REPLACE PARENTHESES WITH INPUT BOXES
const lyricsElement = document.getElementById("lyrics");
const lyricsWithInputs = originalLyrics.replace(/\((.*?)\)/g, (match, p1) => {
  return `<input type="text" class="input-box" data-answer="${p1.toUpperCase()}" maxlength="${p1.length}" />`;
});
// Display the lyrics with input boxes
lyricsElement.innerHTML = lyricsWithInputs;

/* SLIDE-OUT PANEL TOGGLE */
const cluesToggle = document.getElementById("clues-toggle");
const cluesPanel = document.getElementById("clues-panel");

cluesToggle.addEventListener("click", () => {
  cluesPanel.classList.toggle("open");
});

// Render the clues in the #clues container
function renderClues() {
  const cluesContainer = document.getElementById("clues");
  words.forEach((word, index) => {
    const clueElement = document.createElement("div");
    clueElement.className = "clue";
    clueElement.innerHTML = `<strong>${index + 1}.</strong> ${word.clue}`;
    cluesContainer.appendChild(clueElement);

    // Attach input-box event listener for each word in order
    const inputBox = document.querySelectorAll(".input-box")[index];
    inputBox.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        checkAnswer(inputBox, word.answer);
      }
    });
  });
}

// Check the user's answer
function checkAnswer(input, correctAnswer) {
  const userAnswer = input.value.toUpperCase();
  const messageElement = document.getElementById("message");
  
  if (userAnswer === correctAnswer) {
    // Correct
    input.value = correctAnswer;
    input.classList.add("correct");
    highlightLyrics(correctAnswer);
    messageElement.textContent = "";
    checkCompletion();
  } else {
    // Incorrect
    input.value = "";
    input.classList.add("wrong");
    setTimeout(() => {
      input.classList.remove("wrong");
    }, 1000);
    messageElement.textContent = "WRONG ANSWER! TRY AGAIN.";
  }
}

// Highlight identical answers in the lyrics
function highlightLyrics(answer) {
  const inputs = document.querySelectorAll(".input-box");
  inputs.forEach(box => {
    if (box.dataset.answer === answer) {
      box.classList.add("correct");
    }
  });
}

// Check if puzzle is complete
function checkCompletion() {
  const inputs = document.querySelectorAll(".input-box");
  const allFilled = Array.from(inputs).every(input => 
    input.value === input.dataset.answer
  );
  
  if (allFilled) {
    displayCompletionMessage();
  }
}

// Display puzzle completion message & link
function displayCompletionMessage() {
  const messageElement = document.getElementById("message");
  messageElement.textContent = "CONGRATULATIONS! YOU'VE COMPLETED THE PUZZLE!";
  
  const linkContainer = document.getElementById("link-container");
  linkContainer.innerHTML = 
    '<a class="link" href="https://your-album-link.com">CONTINUE LISTENING TO THE ALBUM!</a>';
  linkContainer.style.display = "block";
}

// Render the clues upon load
renderClues();
