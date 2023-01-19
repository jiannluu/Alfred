/* eslint-disable no-unused-vars */
const path = require('path')
const express = require('express')
const app = express()
const PORT = 3000

const apiRouter = require('./api/api.js');
const userControllers = require('./controllers/userControllers.js')
const subControllers = require('./controllers/subControllers.js')

// handling parsing request body
app.use(express.json())

// serve static files
app.use(express.static(path.join(__dirname, '../client')))

//routes
app.post('/api/signup', userControllers.checkUser, userControllers.saveUser, (req, res) => {
  res.status(200).json(res.locals.signUpStat);
})

app.post('/api/login', userControllers.logInUser, (req, res) => {
  res.status(200).json(res.locals.login);
})

app.post('/api/addsub', subControllers.addSub, (req, res) => {
  res.status(200).json(res.locals.addSubStat);
})

app.use('/api/getsub', apiRouter);

app.use('/api', apiRouter);

//unknown route handler
app.use('*', (req, res) => {
  res.status(404).json('Unknown route')
})

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})

module.exports = app
