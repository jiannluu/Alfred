const db = require('../models/models.js');

const subControllers = {};

subControllers.addSub = (req, res, next) => {
  const addSub = `INSERT INTO Subscriptions (name, start_date, price, user_id) 
                    VALUES ($1, $2, $3, $4) 
                    RETURNING *`;
  const value = [req.body.service, req.body.date, req.body.price, req.body.id];
  db.query(addSub, value, (err, response) => {
    if (err) return next({
      log: 'Error with addSub - unable to update data to db',
      status: 400,
      message: {err: 'Error with addSub'},
    });
    res.locals.addSubStat = {addSub: 'success'};
    return next();
  });
}

subControllers.getSub = (req, res, next) => {
  const { id } = req.params
  const getSub = `SELECT _id, name, to_char(start_date, 'mm/dd/yyyy') AS start_date, price
                  FROM Subscriptions
                  WHERE user_id=$1
                  ORDER BY EXTRACT(YEAR FROM start_date) DESC`
  db.query(getSub, [ id ],(err, response) => {
    if (err) return next({
      log: 'Error with getSub - unable to grab data from db',
      status: 400,
      message: {err: 'Error with getSub'},
    });
    res.locals.getSub = response.rows;
    return next();
  });
}

subControllers.deleteSub = (req, res, next) => {
  const { id } = req.params
  const deleteSub = `DELETE FROM Subscriptions
                  WHERE _id=$1`
  db.query(deleteSub, [ id ],(err, response) => {
    if (err) return next({
      log: 'Error with deleteSub - unable to delete data from db',
      status: 400,
      message: {err: 'Error with deleteSub'},
    });
    res.locals.deleteSub = {deleteSub: 'success'};
    return next();
  });
}

module.exports = subControllers;