module.exports = (error, response, next) => {
    response.status(404).end()
  }