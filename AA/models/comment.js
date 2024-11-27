const { DataTypes } = require('sequelize');

const Comment = (sequelize) => {
  return sequelize.define('Comment', {
    idx: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    feed_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'feeds',  // 외래 키가 참조하는 테이블 이름
        key: 'idx',      // 참조하는 테이블의 컬럼
      },
    },
    userid: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  });
};

module.exports = Comment;
