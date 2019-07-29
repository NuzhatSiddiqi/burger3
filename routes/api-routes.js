const db = require("../models");

const { Burger, Customer } = db;

module.exports = function(app) {
  app.get("/", function(req, res) {
    Burger.findAll({
      include: [{ model: db.Customer, as: "buyer" }]
    }).then(function(dbBurger) {
      res.render("index", { burgers: dbBurger });
    });
  });
  app.post("/", function(req, res) {
    Customer.create({
      name: "tentative"
    }).then(dbCustomer => {
      db.Burger.create({
        name: req.body.name,
        buyerId: dbCustomer.dataValues.id
      })
        .then(dbBurger => {
          res.json(dbBurger);
          console.log("New burger stored into db ", dbBurger.dataValues.name);
        })
        .catch(err => {
          res.json(err);
        });
    });
  });

  app.delete("/api/burgers/:id", function(req, res) {
    var promiseArr = [];
    console.log("delete route hit");

    promiseArr.push(
      Burger.destroy({
        where: {
          id: req.params.id
        }
      })
    );

    promiseArr.push(
      db.Customer.destroy({
        where: {
          id: req.params.id
        }
      })
    );

    Promise.all(promiseArr).then(() => {
      console.log("Promose array was followed");
      res.status(200).end();
    });
  });

  app.put("/api/burger/:id", function(req, res) {
    var promiseArr = [];
    console.log("put route hit");

    promiseArr.push(
      Burger.update(
        {
          devoured: req.body.devoured
        },
        { where: { id: req.params.id } }
      )
    );

    promiseArr.push(
      Customer.update(
        {
          name: req.body.customerName
        },
        { where: { id: req.body.id } }
      )
    );

    Promise.all(promiseArr).then(() => {
      console.log("Promose array was followed");
      res.status(200).end();
    });
  });
};
