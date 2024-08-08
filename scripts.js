// Setup before functions
let typingTimer;
const doneTypingInterval = 1000; // Time in ms (1 second)
const myInput = document.getElementById('edit');
const contents = ["and I am from", "and I work in", "and no one gives a flying..."];

// On keyup, start the countdown
myInput.addEventListener('keyup', () => {
    clearTimeout(typingTimer);
    if (myInput.innerText) {
        typingTimer = setTimeout(() => doneTyping(0), doneTypingInterval);
    }
});

// User is "finished typing," do something
function doneTyping(index) {
    if (index < contents.length) {
        const content = document.getElementById("first");
        content.innerHTML += "&nbsp;" + contents[index];
        if (index < contents.length - 1) {
            const newSpan = document.createElement('span');
            newSpan.contentEditable = "true";
            newSpan.setAttribute("contenteditable", "true");
            newSpan.setAttribute("id", `edit${index + 1}`);
            content.appendChild(newSpan);
            
            newSpan.addEventListener('keyup', () => {
                clearTimeout(typingTimer);
                if (newSpan.innerText) {
                    typingTimer = setTimeout(() => doneTyping(index + 1), doneTypingInterval);
                }
            });
        }
    } else {
        console.log("Finished typing all content.");
    }
}