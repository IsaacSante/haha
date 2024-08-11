// Setup before functions
let typingTimeout;
const typingDelay = 1000; 
const userEditableElement = document.getElementById('edit');
const followUpMessages = ["and I am from", "and I work in", "and no one gives a flying..."];

// On keyup, start the countdown
userEditableElement.addEventListener('keyup', () => {
    clearTimeout(typingTimeout);
    if (userEditableElement.innerText) {
        typingTimeout = setTimeout(() => addNextMessage(0), typingDelay);
    }
});

// User is "finished typing," add the next piece of text
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
                typingTimeout = setTimeout(() => addNextMessage(index + 1), typingDelay);
            }
        });
    } else {
        // This is the last message, add the final text after a delay
        setTimeout(addFinalText, typingDelay);
    }
}
// Final text displayed
function addFinalText() {
   // console.log("adding final text")
    const finalText = document.createElement('p');
    finalText.textContent = "Jk remember you are valuable and be kind to yourself";
    finalText.className = 'final-text';
    document.body.appendChild(finalText);
}