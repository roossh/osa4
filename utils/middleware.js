const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
  
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
  
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  
  next(error)
}
 
const getTokenFrom = (request, response, next) => {
  const authorization = request.get('authorization')
  console.log(request.path)
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    request.token = authorization.substring(7)
    return next()
  } else if (!authorization && request.method !== "POST" && request.method !== "DELETE") {
    return next()
  } else if ( request.path !== "/api/blogs") {
    return next()
  } else {
    return response.status(401).json({error: 'Token missing or invalid'})
  }
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  getTokenFrom
}