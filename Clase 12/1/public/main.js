const socket = io.connect();

const render = (data) => {
    const html = data.map((elem, ind) => {
        return (`<div>
        <strong>${elem.author}</strong>
        <em>${elem.text}</em></div>`)}).join(" ");
    document.querySelector(".mensajes").innerHTML = html;
}

const addMessage = (e) => {
    const mensaje = {
        author: document.querySelector("#username").value,
        text: document.querySelector("#texto").value,
    }

    socket.emit("new-message", mensaje);
    return false;
}

socket.on("Mensajes", data => {
    render(data);
});

