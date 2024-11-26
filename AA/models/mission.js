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
    answer1 : {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    answer2 : {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    answer3 : {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    answer4 : {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    correct : {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};

module.exports = Mission;