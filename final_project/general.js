const axios = require('axios');

const BASE_URL = "http://localhost:5000";

// Task 10: Get all books
async function getAllBooks() {
    try {
        const response = await axios.get(`${BASE_URL}/`);
        if (Object.keys(response.data).length === 0) {
            console.log("Task 10 - No books found.");
        } else {
            console.log("Task 10 - All books:", response.data);
        }
    } catch (err) {
        console.error("Error fetching all books:", err.response?.data || err.message);
    }
}

// Task 11: Get book by ISBN
async function getBookByISBN(isbn) {
    try {
        const response = await axios.get(`${BASE_URL}/isbn/${isbn}`);
        if (!response.data || Object.keys(response.data).length === 0) {
            console.log(`Task 11 - No book found with ISBN ${isbn}`);
        } else {
            console.log(`Task 11 - Book with ISBN ${isbn}:`, response.data);
        }
    } catch (err) {
        console.error(`Error fetching book with ISBN ${isbn}:`, err.response?.data || err.message);
    }
}

// Task 12: Get books by author
async function getBooksByAuthor(author) {
    try {
        const response = await axios.get(`${BASE_URL}/author/${author}`);
        if (!response.data || Object.keys(response.data).length === 0) {
            console.log(`Task 12 - No books found by author "${author}"`);
        } else {
            console.log(`Task 12 - Books by "${author}":`, response.data);
        }
    } catch (err) {
        console.error(`Error fetching books by author "${author}":`, err.response?.data || err.message);
    }
}

// Task 13: Get books by title
async function getBooksByTitle(title) {
    try {
        const response = await axios.get(`${BASE_URL}/title/${title}`);
        if (!response.data || Object.keys(response.data).length === 0) {
            console.log(`Task 13 - No books found with title "${title}"`);
        } else {
            console.log(`Task 13 - Books with title "${title}":`, response.data);
        }
    } catch (err) {
        console.error(`Error fetching books with title "${title}":`, err.response?.data || err.message);
    }
}

// Run all tasks
getAllBooks();
getBookByISBN(1);
getBooksByAuthor("Unknown");
getBooksByTitle("Things Fall Apart");
