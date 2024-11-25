const {DataTypes} = require('sequelize');

const Mission = (sequelize)=>{
  return sequelize.define('Mission',{
    idx: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    question : {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    answer : {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};

module.exports = Mission;