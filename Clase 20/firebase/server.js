const admin = require("firebase-admin");
const serviceAccount = require("./coderhousesasha-firebase-adminsdk-fqfit-8c50292c86.json");

// import * as admin from "firebase-admin";

// import { readFile } from "fs";
// const serviceAccount = JSON.parse(
//     await readFile(
//         new URL("./coderhousesasha-firebase-adminsdk-fqfit-8c50292c86.json", import.meta.url)
//     )
// ) 
// import {default as serviceAccount} from "./coderhousesasha-firebase-adminsdk-fqfit-8c50292c86.json"; // que hago con esto?


// o si no import serviceAccount from "./coderhousesasha-firebase-adminsdk-fqfit-8c50292c86.json" assert {type:"json"} a partir de version 17 de node

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


const CRUD = async () => {

    const db = admin.firestore();
    const query = db.collection("usuarios");

    //create
    try {
        //const doc = query.doc() (generacion automatica de id)
        let id = 1;
        let doc = query.doc(`${id}`)
        await doc.create( {nombre: "Jose", dni: 38743434})
        id++
        doc = query.doc(`${id}`)
        await doc.create( {nombre: "Raul", dni: 58743434})
        id++
        doc = query.doc(`${id}`)
        await doc.create( {nombre: "JoJo", dni: 39743434})
        id++

        console.log("Dat0s insertados")
    } catch (err){
        console.log(err);
    }

    //read all
    try {
        const querySnapshot = await query.get()
        const docs = querySnapshot.docs

        const response = docs.map(doc => ({
            id: doc.id,
            nombre: doc.data().nombre,
            dni: doc.data().dni
        }))
        console.log(response)
    } catch (err){
        console.log(err);
    }

    //read id
    try {   
        let id = 2;
        const doc = query.doc(`${id}`)
        const item = await doc.get()
        const response = item.data()
        console.log(response)

    } catch (err){
        console.log(err);
    }

    //update
    try {
        let id = 2;
        const doc = query.doc(`${id}`)
        let item = await doc.update({dni: 301591011})
        console.log("El usuario fue actualizado", item)
    } catch (err){
        console.log(err);
    }

    //delete
    try {
        let id = 1;
        const doc = query.doc(`${id}`)
        const item = await doc.delete()
        console.log("El usuario fue borrado", item)

    } catch (err){
        console.log(err);
    }
}

CRUD()