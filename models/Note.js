// Imports 
const {Schema, model} = require('mongoose')

// Schema para las Notas
const noteSchema = new Schema({
    content: String, 
    date: Date, 
    important: Boolean
})

// Modificacion del schema
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// Crear un esquema con el modelo y el nombre 
const Note = model('Note', noteSchema)

// El modelo hay que ponerlo en singular ya que siempre vamos a poder generar una nota pero
// la base de datos luego tendra docuemntos dentro de Notes

module.exports = Note