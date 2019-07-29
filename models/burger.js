module.exports = function(sequelize, DataTypes) {
  const Burger = sequelize.define("Burger", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Burger.associate = models => {
    Burger.belongsTo(models.Customer, { as: "buyer" });
  };
  return Burger;
};
