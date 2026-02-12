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
regd_users.post("/login", (req,res) => {
  //Write your code here
  const {username,password}=req.body
   if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  const userData=users.find(u=>u.username===username)
  if(!userData){
    res.status(401).json({message:'Username doesnt exist'})
  }
  if(userData.password!==password){
     res.status(401).json({message:'Invalid password'})
  }
  
  const token=jwt.sign({username:username},"fingerprint_customer",{expiresIn:"1h"})
  req.session.accessToken=token
  return res.status(200).json({message: "Login Successfull",token:token});
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

regd_users.delete('/auth/review/:isbn', function(req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  const username = req.user.username; 

  if (!book.reviews[username]) {
    return res.status(404).json({ message: "You haven't posted a review for this book" });
  }

  delete book.reviews[username];

  return res.status(200).json({
    message: "Your review has been deleted",
    reviews: book.reviews
  });
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
