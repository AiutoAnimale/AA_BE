const {DataTypes} = require('sequelize');

const Act = (sequelize)=>{
  return sequelize.define('Act',{
    idx: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    categories : {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt : {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });
};

module.exports = Act;