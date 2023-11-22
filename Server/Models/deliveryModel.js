const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Delivery = sequelize.define('Delivery', {
    delivery_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    delivery_from: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'user_id',
      },
    },
    delivery_to: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Recipients',
        key: 'recipient_id',
      },
    },
    order_delivery: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Orders',
        key: 'order_id',
      },
    },
    city: {
      type: DataTypes.STRING, // Adjust the data type based on your needs
      allowNull: false,
    },
  });

  return Delivery;
};
