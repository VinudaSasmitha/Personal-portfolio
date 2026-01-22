// Typing Effect - Initial Draft (WIP)
const typingText = document.querySelector(".typing-text");
const words = ["Web Developer", "Problem Solver", "Innovation Enthusiast"];
let wordIndex = 0;
let charIndex = 0;

function type() {
    const currentWord = words[wordIndex];


    typingText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;


    if (charIndex === currentWord.length) {
        wordIndex++;
        charIndex = 0;

        // Simple logic to loop back
        if (wordIndex === words.length) {
            wordIndex = 0;
        }
    }

    setTimeout(type, 200);
}

document.addEventListener('DOMContentLoaded', type);