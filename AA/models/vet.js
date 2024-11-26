const { DataTypes } = require('sequelize');

const Vet = (sequelize) => {
  return sequelize.define('Vet', { // 모델 이름 'Vet'으로 일관되게 정의
    idx: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    roadname: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    tableName: 'vets', // 테이블 이름을 소문자 'vets'로 명시
  });
};

module.exports = Vet;
