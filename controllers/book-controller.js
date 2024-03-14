const IssuedBook = require("../dtos/book-dto");
const { UserModel, BookModel } = require("../models");

exports.getAllBooks = async (request, response) => {
  const books = await BookModel.find(); // Search for books in the database

  if (books.length === 0) {
    return response.status(404).json({
      success: false,
      message: "No Book Found :-(",
    });
  }
  return response.status(200).json({
    success: true,
    data: books,
  });
};

exports.getSingleBookById = async (request, response) => {
  const { id } = request.params; // Passing the id of the book in the URL as a parameter

  const book = await BookModel.findById(id); // Search for that particular book in the database
  if (!book) {
    return response.status(404).json({
      success: false,
      message: "Book Not Found",
    });
  }

  return response.status(200).json({
    success: true,
    data: book,
  });
};

exports.getAllIssuedBooks = async (request, response) => {
  const users = await UserModel.find({
    issuedBook: { $exists: true }, //It asynchronously retrieves users who have issued books. The query filters users based on the existence of the "issuedBook" field.
  }).populate("issuedBook"); //It populates the "issuedBook" field for each user.This allows you to retrieve details of the issued books associated with each user.

  const issuedBooks = users.map((each) => new IssuedBook(each));

  if (issuedBooks.length === 0)
    return response.status(404).json({
      success: false,
      message: "No books issued yet",
    });

  return response.status(200).json({
    success: true,
    data: issuedBooks,
  });
};

exports.addNewBook = async (request, response) => {
  const { data } = request.body; // Passing the book data in the request body
  if (!data)
    return responseponse.status(404).json({
      success: false,
      message: "No data Provided :-(",
    });

  const newBook = await BookModel.create(data); // Create a new book following the Book model

  // const allBooks = await BookModel.find();

  return response.status(201).json({
    success: true,
    message: "Book successfully created",
    data: newBook,
  });
};

exports.updateBookById = async (request, response) => {
  const { id } = request.params;
  const { data } = request.body;

  // Check if the book exists
  const book = await BookModel.findOne({ _id: id });
  if (!book) {
    return response.status(404).json({
      success: false,
      message: "Book does not exist for the given id",
    });
  }

  // Update the book
  const updatedBook = await BookModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });

  return response.status(200).json({
    success: true,
    data: updatedBook,
  });
};

//module.exports = {
//  getAllBooks,
//  getSingleBookById,
//  getAllIssuedBooks,
//  addNewBook,
//  updateBookById,
//};
