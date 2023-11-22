const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Recipient = sequelize.define('Recipient', {
    recipient_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    recipient_f_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipient_l_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipient_phone_number: {
      type: DataTypes.STRING, // Adjust the data type based on your needs
      allowNull: false,
    },
    recipient_address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ordered_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  });

  return Recipient;
};
