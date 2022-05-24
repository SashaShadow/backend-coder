const socket = io();
const myForm = document.querySelector("form");
const chat = document.querySelector(".chat");
let myVal = document.querySelector('input');

const handleClick = (e) => {
    e.preventDefault();
    if (myVal.value) {
        socket.emit('chat message', myVal.value);
        myVal.value = '';
      }
};

const makeUl = (array) => {
    let list = document.createElement("ul");

    for (let i = 0; i < array.length; i++) {
        // Create the list item:
        let item = document.createElement('li');

        // Set its contents:
        item.appendChild(document.createTextNode(array[i]));

        // Add it to the list:
        list.appendChild(item);
    }
    return list;
}

myForm.addEventListener("submit", handleClick);

socket.on("historial", data => {
    if (!chat.childNodes.length && data.length) {
        chat.appendChild(makeUl(data));
    }
})

socket.on('chat message', (msg) => {
    let item = document.createElement('li');
    item.textContent = msg;
    
    chat.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });