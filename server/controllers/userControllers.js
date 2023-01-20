const db = require('../models/models.js');

const userControllers = {};

//log-in auth
userControllers.logInUser = (req, res, next) => {
  const login = `SELECT *
                FROM Users
                WHERE email=$1`
  const value = [req.body.email]
  console.log(value)
  db.query(login, value, (err, response) => {
    if (err) return next({
      log: 'Error with logInUser - unable to search data in db',
      status: 400,
      message: {err: 'Error with logInUser'},
    });
    console.log(response.rows[0])
    if (!response.rows[0]) {
      res.locals.login = {login: 'failed'}
      return next();
    }
    if (response.rows[0].password !== req.body.password) {
      res.locals.login = {login: 'failed'}
      return next();
    }
    res.locals.login = {login: 'success', id: response.rows[0]._id, firstName: response.rows[0].first_name}
    return next();
  })
}

//check if account exist
userControllers.checkUser = (req, res, next) => {
  const checkUser = `SELECT email
                    FROM Users
                    WHERE email=$1`
  const value = [req.body.email]
  db.query(checkUser, value, (err, response) => {
    if (err) return next({
      log: 'Error with checkUser - unable to search data in db',
      status: 400,
      message: {err: 'Error with checkUser'},
    });
    if(!response.rows[0]) {
      res.locals.newUser = req.body
      return next();
    }
    return next();
  })
}

//sign-up
userControllers.saveUser = (req, res, next) => {
  if (!res.locals.newUser) {
    res.locals.signUpStat = {signup: 'fail'};
    console.log(res.locals.signUpStat)
    return next();
  }
  const saveUser = `INSERT INTO Users (first_name, last_name, email, password) 
                    VALUES ($1, $2, $3, $4) 
                    RETURNING *`;
  const value = [res.locals.newUser.firstName, res.locals.newUser.lastName, res.locals.newUser.email, res.locals.newUser.password];
  db.query(saveUser, value, (err, response) => {
    if (err) return next({
      log: 'Error with saveUser - unable to update data to db',
      status: 400,
      message: {err: 'Error with saveUser'},
    });
    res.locals.signUpStat = {signup: 'success'};
    console.log(res.locals.signUpStat)
    return next();
  });
};

//change password
userControllers.changePass = (req, res, next) => {
  const checkUser = `UPDATE Users
                    SET password=$1
                    WHERE _id=$2 AND password=$3
                    RETURNING *`
  const value = [req.body.newPass, req.body.id, req.body.oldPass]
  console.log(value)
  db.query(checkUser, value, (err, response) => {
    if (err) return next({
      log: 'Error with changePass - unable to search data in db',
      status: 400,
      message: {err: 'Error with changePass'},
    });
    console.log(response.rows[0])
    if(response.rows[0]) {
      res.locals.changePass = {changePass: 'success'}
      return next();
    }
    res.locals.changePass = {changePass: 'failed'}
    return next();
  })
}

module.exports = userControllers;