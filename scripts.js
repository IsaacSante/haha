// Setup before functions
let typingTimeout;
const typingDelay = 2000; 
let userEditableElement;
const followUpMessages = ["and I am from", "and I work in", "and no one gives a flying..."];
const instructionsElement = document.getElementById('instructions');

function updateInstructions(text) {
  instructionsElement.textContent = text;
}

function hideInstructions() {
  instructionsElement.style.opacity = '0';
}

function showInstructions() {
  instructionsElement.style.opacity = '1';
}

function focusLatestEditableSpan() {
    const editableSpans = document.querySelectorAll('[contenteditable="true"]');
    const latestSpan = editableSpans[editableSpans.length - 1];
    if (latestSpan) {
        latestSpan.focus();
    }
}

function setupEventListeners() {
    userEditableElement = document.getElementById('edit');
    userEditableElement.addEventListener('keyup', () => {
        clearTimeout(typingTimeout);
        if (userEditableElement.innerText) {
            updateInstructions("Loading response from haha ai");
            typingTimeout = setTimeout(() => addNextMessage(0), typingDelay);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    focusLatestEditableSpan();
    showInstructions();
});

function addNextMessage(index) {
    const contentElement = document.getElementById("content");
    contentElement.innerHTML += followUpMessages[index] + "&nbsp;";

    if (index < followUpMessages.length - 1) {
        // Create editable span for all but the last message
        const newEditableSpan = document.createElement('span');
        newEditableSpan.contentEditable = "true";
        newEditableSpan.setAttribute("contenteditable", "true");
        newEditableSpan.setAttribute("id", `edit${index + 1}`);
        contentElement.appendChild(newEditableSpan);
        
        newEditableSpan.addEventListener('keyup', () => {
            clearTimeout(typingTimeout);
            if (newEditableSpan.innerText) {
                updateInstructions("Loading response from haha ai");
                typingTimeout = setTimeout(() => addNextMessage(index + 1), typingDelay);
            }
        });
        focusLatestEditableSpan();
        updateInstructions("Start typing");
    } else {
        // This is the last message, add the final text after a delay
        const finalDelay = 1000;
        setTimeout(() => {
            hideInstructions();
            setTimeout(addFinalText, 300); // Hide instructions before showing final text
        }, finalDelay);
    }
}

// Final text displayed
function addFinalText() {
    const finalText = document.createElement('p');
    finalText.textContent = "Jk remember you are valuable and be kind to yourself :-)";
    finalText.className = 'final-text';
    document.body.appendChild(finalText);
    createTextRain();
}

function createTextRain() {
    const characters = 'hahahahahahhhahahaahahahahhhahahahahahaaahhahahahahahah';
    const numberOfDrops = 200;
    let dropsFinished = 0;

    for (let i = 0; i < numberOfDrops; i++) {
        setTimeout(() => {
            const drop = document.createElement('div');
            drop.className = 'text-drop';
            drop.style.left = `${Math.random() * 100}vw`;
            drop.style.animationDuration = `${Math.random() * 2 + 3}s`;
            drop.textContent = characters[Math.floor(Math.random() * characters.length)];
            document.body.appendChild(drop);

            // Remove the drop after animation and check if all drops are finished
            drop.addEventListener('animationend', () => {
                document.body.removeChild(drop);
                dropsFinished++;
                if (dropsFinished === numberOfDrops) {
                    // All drops have finished, call resetHaha after a short delay
                    setTimeout(resetHaha, 1000);
                }
            });
        }, i * 50); // Stagger the creation of drops
    }
}

function resetHaha() {
    const contentElement = document.getElementById("content");
    contentElement.innerHTML = 'Hello my name is <span id="edit" contenteditable="true" class="single-line"></span>';

    const additionalSpans = document.querySelectorAll('[id^="edit"]:not(#edit)');
    additionalSpans.forEach(span => span.remove());

    const finalText = document.querySelector('.final-text');
    if (finalText) {
        finalText.remove();
    }

    const textDrops = document.querySelectorAll('.text-drop');
    textDrops.forEach(drop => drop.remove());

    clearTimeout(typingTimeout);
    showInstructions();
    updateInstructions("Start typing");
    setupEventListeners();  
    focusLatestEditableSpan();
}