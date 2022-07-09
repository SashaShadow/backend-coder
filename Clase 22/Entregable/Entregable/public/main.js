const socket = io.connect();

const chatButton = document.querySelector("#chatButton");
const chatForm = document.querySelector(".chatForm");

chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    return fetch(`http://localhost:8080/api/mensajes/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"author": {"email": e.target.email.value, "nombre": e.target.nombre.value, "apellido": e.target.apellido.value, "edad": e.target.edad.value,
"alias": e.target.alias.value, "avatar": e.target.avatar.value}, "text": e.target.text.value}),})
})

const render = (data) => {
    const html = data.map(elem => {
        return (`<div style="display:flex; column-gap: 0.2rem;">
        <strong style="color:blue;">${elem.author.alias}</strong> 
        <p style="color:brown;">[${elem.createdAt}]</p>
        <i style="color:green;">${elem.text}</i></div>`)}).join(" ");
        document.querySelector(".ChatMsgs").innerHTML = html;
}

const addMessage = () => {
    const mensaje = {
        id: document.querySelector("#id").value,
        text: document.querySelector("#text").value,
    }

    socket.emit("new-message", mensaje);
    //document.querySelector("#texto").value = "";
    return false;
}

chatForm.addEventListener("submit", () => addMessage());

socket.on("Mensajes", data => {
    render(data);
});

socket.on("MensajeIndividual", data => {
    document.querySelector(".ChatMsgs").innerHTML+=`
    <div style="display:flex; column-gap: 0.2rem;">
        <strong style="color:blue;">${data.email}</strong> 
        <p style="color:brown;">[${data.time}]</p>
        <i style="color:green;">${data.text}</i></div>               
`
    window.scrollTo(0, document.body.scrollHeight);
});
