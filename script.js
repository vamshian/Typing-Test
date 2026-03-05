const words = [
    "html", "css", "javascript", "coding",
    "developer", "keyboard", "project",
    "design", "react", "python"
];

const game = document.getElementById("game");
const input = document.getElementById("input");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");

let score = 0;
let lives = 5;
let activeWords = [];

function createWord() {
    const wordText = words[Math.floor(Math.random() * words.length)];
    const word = document.createElement("div");
    word.classList.add("word");
    word.innerText = wordText;

    word.style.left = Math.random() * 500 + "px";
    word.style.top = "0px";

    game.appendChild(word);

    activeWords.push(word);
}

function moveWords() {
    activeWords.forEach((word, index) => {
        let top = parseInt(word.style.top);
        word.style.top = top + 2 + "px";

        if (top > 380) {
            game.removeChild(word);
            activeWords.splice(index, 1);
            lives--;
            livesEl.innerText = lives;

            if (lives === 0) {
                alert("Game Over! Final Score: " + score);
                location.reload();
            }
        }
    });
}

input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        const typed = input.value.trim();
        activeWords.forEach((word, index) => {
            if (word.innerText === typed) {
                game.removeChild(word);
                activeWords.splice(index, 1);
                score++;
                scoreEl.innerText = score;
            }
        });
        input.value = "";
    }
});

setInterval(createWord, 2000); // new word every 2 seconds
setInterval(moveWords, 30);    // move words smoothly
