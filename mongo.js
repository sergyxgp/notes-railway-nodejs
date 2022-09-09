console.log('[+] Init ')


const res = require('express/lib/response.js')
const mongoose = require('mongoose')
const {Schema, model} = mongoose
console.log('[+] Import mongoose ... ')

console.log('[+] Imports ')

const connectionString = process.env.MONGO_DB_URI

// Conexion a mongodb

mongoose.connect(connectionString)
    .then(() => {
        console.log('[+] Database connected ')
    }).catch(err => {
        console.error('[!] ' + err)
    })

// Creacion de un instancia del modelo

// let note = new Note({
//     content: 'MongoDB',
//     date: new Date(),
//     important: true
// })

// Creacion del documento

// note.save()
//     .then(result => {
//         console.log("[+] Creada la note")
//         console.log(result)
//         mongoose.connection.close()
//         console.warn("[*] Connection closed ...")
//     }).catch(err => {
//         console.error("[!] " + err)
//     })


// Busquedas de documentos

// Note.find({})
//     .then(result => {
//         console.log("[+] Query: ")
//         console.log(result)
//         mongoose.connection.close()
//         console.warn("[*] Connection closed ...")
//      }).catch(err => {
//         console.error("[!] " + err)
//     })