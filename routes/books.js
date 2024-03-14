const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");
const IssuedBook = require("../dtos/book-dto");

const { UserModel, BookModel } = require("../models");
const {
  getAllBooks,
  getSingleBookById,
  getAllIssuedBooks,
  addNewBook,
  updateBookById,
} = require("../controllers/book-controller");

const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get all books
 * Access: Public
 * Parmaters: None
 */
router.get("/", getAllBooks);

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get single book by ID
 * Access: Public
 * Parmaters: Id
 */
router.get("/:id", getSingleBookById);
/**
 * Route: /books/issued/by-user
 * method: GET
 * Description: Get all issued books
 * Access: Public
 * Parmaters: None
 */
router.get("/issued/by-user", getAllIssuedBooks);

/**
 * Route: /books
 * Method: POST
 * Description: Create a New Book
 * Access: Public
 * Parmaters: None
 */

router.post("/", addNewBook);

/**
 * Route: /books/:id
 * Method: PUT
 * Description: Updating a book by ID
 * Access: Public
 * Parmaters: Id
 */

router.put("/:id", updateBookById);

module.exports = router;
