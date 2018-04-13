module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    name: { type: DataTypes.STRING },
    genre: { type: DataTypes.STRING },
    authorId: { type: DataTypes.INTEGER },
  });
  return Book;
};
