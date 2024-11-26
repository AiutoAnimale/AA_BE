const { DataTypes } = require('sequelize');

const Feed = (sequelize) => {
  return sequelize.define(
    'Feed',
    {
      idx: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userid: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      tag: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      emergency: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false, // 자동 createdAt, updatedAt 비활성화
    }
  );
};

module.exports = Feed;
