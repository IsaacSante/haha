    //setup before functions
let typingTimer;                //timer identifier
let doneTypingInterval = 1000;  //time in ms (5 seconds)
let myInput = document.getElementById('edit');


//on keyup, start the countdown
myInput.addEventListener('keyup', () => {
    clearTimeout(typingTimer);
    if (myInput.innerText ) {
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    }
});

//user is "finished typing," do something
function doneTyping () {
var content = document.getElementById("first");
content.textContent += "and I am from";
content.innerHTML += "&nbsp;"

console.log("im typinggggg");
var newSpan = document.createElement('span');
document.getElementById('first').appendChild(newSpan);
newSpan.contentEditable ="true";
newSpan.setAttribute("contenteditable" , "true");
newSpan.setAttribute("id", "edit2");
newSpan.onkeyup = myListener;
}

function myListener(e) {
    let from = document.getElementById('edit2');
    from.addEventListener('keyup', () => {
        clearTimeout(typingTimer);
        if (from.innerText ) {
            typingTimer = setTimeout(doneTyping2, doneTypingInterval);
        }
    
    });

function doneTyping2 () {
    var content = document.getElementById("first");
    content.innerHTML += "&nbsp;"
    content.textContent += "and I work in";
    content.innerHTML += "&nbsp;"
    var newSpan2 = document.createElement('span');
    document.getElementById('first').appendChild(newSpan2);
    newSpan2.contentEditable ="true";
    newSpan2.setAttribute("contenteditable" , "true");
    newSpan2.setAttribute("id", "edit3");
    newSpan2.onkeyup = mySecondListner;

    }
}

function mySecondListner(e) {
    let from2 = document.getElementById('edit2');
    let work = document.getElementById('edit3');
    // console.log(from2)
    work.addEventListener('keyup', () => {
        console.log('IM LISTENING');
        clearTimeout(typingTimer);
        if (work.innerText ) {
            typingTimer = setTimeout(doneTyping3, doneTypingInterval);
        }
    });
};


function doneTyping3 () {
    var content = document.getElementById("hey");
    content.innerHTML += "&nbsp;"
    content.textContent += "and no one gives a flying fuck...lol jk, im still figuring the animation here";
}