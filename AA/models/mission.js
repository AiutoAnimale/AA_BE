const { DataTypes } = require('sequelize');

const Mission = (sequelize) => {
  return sequelize.define('Mission', {
    idx: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    answer1: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    answer2: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    answer3: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    answer4: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    correct: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    timestamps: false,  // createdAt, updatedAt 필드를 자동으로 추가하지 않도록 설정
  });
};

module.exports = Mission;
