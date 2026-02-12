const axios = require('axios');

const BASE_URL = "http://localhost:5000";

// Task 10: Get all books
async function getAllBooks() {
    try {
        const response = await axios.get(`${BASE_URL}/`);
        console.log("Task 10 - All books:", response.data);
    } catch (err) {
        console.error(err.message);
    }
}

// Task 11: Get book by ISBN
async function getBookByISBN(isbn) {
    try {
        const response = await axios.get(`${BASE_URL}/isbn/${isbn}`);
        console.log(`Task 11 - Book with ISBN ${isbn}:`, response.data);
    } catch (err) {
        console.error(err.message);
    }
}

// Task 12: Get books by author
async function getBooksByAuthor(author) {
    try {
        const response = await axios.get(`${BASE_URL}/author/${author}`);
        console.log(`Task 12 - Books by ${author}:`, response.data);
    } catch (err) {
        console.error(err.message);
    }
}

// Task 13: Get books by title
async function getBooksByTitle(title) {
    try {
        const response = await axios.get(`${BASE_URL}/title/${title}`);
        console.log(`Task 13 - Books with title "${title}":`, response.data);
    } catch (err) {
        console.error(err.message);
    }
}


getAllBooks();
getBookByISBN(1);
getBooksByAuthor("Unknown");
getBooksByTitle("Things Fall Apart");
