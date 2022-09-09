module.exports = (note) => {
        return {
            id: note.id,
            content: note.content,
            date: note.date,
            important: note.important
        }
}