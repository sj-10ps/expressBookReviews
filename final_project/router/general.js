const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const {username,password}=req.body
  const existing=users.find(p=>p.username===username&&p.password===password)
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

   if (existing) {
    return res.status(409).json({ message: "Username already exists" });
  }

  users.push({ username: username, password: password });

  return res.status(200).json({message: "User registered successfully"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  const bookData=books
  return res.status(200).json(bookData)
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn=req.params.isbn
  const bookData=books[isbn]
  return res.status(200).json(bookData);
 });
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;

    // Convert books object to array and filter by author
    const bookData = Object.entries(books)
        .filter(([isbn, book]) => book.author === author)
        .map(([isbn, book]) => ({ isbn, ...book })); // include ISBN in each object

    // Return the filtered books
    return res.status(200).json(bookData);
});


// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const bookData=Object.values(books).filter(b=>b.title===req.params.title)
  return res.status(200).json(bookData);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const bookData=books[req.params.isbn]
  const bookreviews=bookData.reviews
 
  return res.status(200).json(bookreviews);
});





module.exports.general = public_users;
