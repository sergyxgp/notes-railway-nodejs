
require('dotenv').config()
require('./mongo.js')


const express = require('express')
const app = express()
const cors = require('cors')


const Note = require('./models/Note.js')
console.log('[+] Import Note model')
const noteFormat = require('./models/noteFormat.js')

const notFound = require('./middleware/notFound.js')
const handlerError = require('./middleware/handlerErrors.js')

app.use(cors())
app.use(express.json())

// let notes = [
//     {
//       id: 1,
//       content: "HTML is easy",
//       date: "2019-05-30T17:30:31.098Z",
//       important: true
//     },
//     {
//       id: 2,
//       content: "Browser can execute only Javascript",
//       date: "2019-05-30T18:39:34.091Z",
//       important: false
//     },
//     {
//       id: 3,
//       content: "GET and POST are the most important methods of HTTP protocol",
//       date: "2019-05-30T19:20:14.298Z",
//       important: true
//     }
//   ]

  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  // Al no poder mapear correctamente la infomacion hay que realizar otro cosa

  app.get('/api/notes', (request, response, next) => {
    Note.find({}).then(notes => {
      response.json(notes.map(note => {
        return noteFormat(note)
      }))
      })
  })

  // Por tanto, se cambiara en el schema 

  // app.get('/api/notes', (request, response) => {
  //   Note.find({}).then(notes => {
  //     response.json()
  //   })
  // })

  app.get('/api/notes/:id', (request, response, next) => {
    const id = request.params.id

    Note.findById(id).then(note => {
      if (note) {
        response.json(noteFormat(note))
      } else {
        response.status(404).end()
      }
    }).catch(err => {
        next(err)
    })
  })

  // app.get('/api/notes/:id', (request, response) => {
  //   const id = Number(request.params.id)

  //   const note = notes.find(note => note.id === id)
  //   if (note) {
  //       response.json(note)
  //     } else {
  //       response.status(404).end()
  //     }
  // })

// Generador de ID's
  // const generateId = () => {
  //   const maxId = notes.length > 0
  //     ? Math.max(...notes.map(n => n.id))
  //     : 0
  //   return maxId + 1
  // }
  
  

  app.delete('/api/notes/:id', (request, response, next) => {
    const id = request.params.id
    
    Note.findByIdAndRemove(id).then(result => {
      console.log(noteFormat(result))
      response.status(204).end()
    }).catch(err => {
        next(err)
    })
  
  })

  app.post('/api/notes', (request, response, next) => {
    const note = request.body
  
    if (!note.content) {
      return response.status(400).json({ 
        error: 'required "content" field is missing' 
      })
    }
  
    const newNote = new Note({
      content: note.content,
      date: new Date(),
      important: note.important || false
    })

    newNote.save().then(saveNote => {
      response.json(noteFormat(saveNote))
      console.log("[+] Nota guardada")
    })
  })

  app.put('/api/notes/:id', (request, response, next) => {
    const id = request.params.id
    const note = request.body

    const newNoteInfo = { 
      content: note.content,
      important: note.important
    }
    
    Note.findByIdAndUpdate(id, newNoteInfo, {new: true}).then(result => {
      response.json(noteFormat(result))
    }).catch(err => {
        next(err)
    })
  
  })

  // MiddleWare Control de errores
  app.use(notFound)
  app.use(handlerError)

  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
  })