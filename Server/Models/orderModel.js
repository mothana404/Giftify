// Example: models/Order.js

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Order = sequelize.define('Order', {
    order_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    user_order_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'user_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    product_order_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'product_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    ordered_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    order_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Order;
};
