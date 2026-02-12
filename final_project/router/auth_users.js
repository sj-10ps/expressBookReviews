const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  // 1️⃣ Validate input
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // 2️⃣ Check if user exists
  const userData = users.find(u => u.username === username);
  if (!userData) {
    return res.status(401).json({ message: "Username doesn't exist" });
  }

  // 3️⃣ Validate password
  if (userData.password !== password) {
    return res.status(401).json({ message: "Invalid password" });
  }

  // 4️⃣ Create JWT token
  const token = jwt.sign({ username: username }, "fingerprint_customer", { expiresIn: "1h" });

  // 5️⃣ Store token in session
  req.session.accessToken = token;

  // 6️⃣ Return success response
  return res.status(200).json({ message: "Login Successful", token: token });
});


// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn=req.params.isbn
  const review=req.query.review
  if (!review) {
    return res.status(400).json({ message: "Review text is required" });
  }
  const token=req.session.accessToken
  if(!token){
        return res.status(401).json({ message: "User not logged in" });
  }
  let username=req.user.username
   const book = books[isbn];    
    if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
   book.reviews[username]=review
  
   return res.status(200).json({
    message: "Review added/updated successfully",
    reviews: book.reviews
  });
});


regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const book = books[isbn];
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    const username = req.user.username;
    if (!book.reviews[username]) {
        return res.status(404).json({ message: `No review found for user ${username} on ISBN ${isbn}` });
    }

    delete book.reviews[username];

    return res.status(200).json({
        message: `Review for ISBN ${isbn} by user ${username} has been deleted`,
        reviews: book.reviews
    });
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
