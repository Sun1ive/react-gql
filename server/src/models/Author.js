module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    name: { type: DataTypes.STRING },
    age: { type: DataTypes.INTEGER },
  });
  return Author;
};
