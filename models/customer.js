module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define("Customer", {
    name: {
      type: DataTypes.STRING,
      validate: {
        is: ["^[a-z]+$", "i"]
      }
    }
  });

  Customer.associate = models => {
    Customer.hasMany(models.Burger, {
      as: "Purchases",
      foreignKey: "purchases_id"
    });
  };

  return Customer;
};
