const {DataTypes} = require('sequelize');

const Mission = (sequelize)=>{
  return sequelize.define('Vet',{
    idx: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    phone : {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location : {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    roadname : {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};

module.exports = Vet;