export default (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    name: { type: DataTypes.STRING },
    age: { type: DataTypes.INTEGER },
    id: { type: DataTypes.STRING, primaryKey: true },
  });
  return Author;
};
