const express = require('express');
const app = express();

app.use(express.json());

// Sample in-memory database
let books = [
    {
        id: 1,
        title: "The Alchemist",
        author: "Paulo Coelho"
    },
    {
        id: 2,
        title: "Atomic Habits",
        author: "James Clear"
    }
];


// 1. GET all books
app.get('/books', (req, res) => {
    res.json(books);
});


// 2. GET single book by ID
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id == req.params.id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    res.json(book);
});


// 3. POST - Add new book
app.post('/books', (req, res) => {

    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };

    books.push(newBook);

    res.status(201).json({
        message: "Book added successfully",
        book: newBook
    });
});


// 4. PUT - Update book
app.put('/books/:id', (req, res) => {

    const book = books.find(b => b.id == req.params.id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;

    res.json({
        message: "Book updated successfully",
        book
    });
});


// 5. DELETE - Remove book
app.delete('/books/:id', (req, res) => {

    const bookIndex = books.findIndex(b => b.id == req.params.id);

    if (bookIndex === -1) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    books.splice(bookIndex, 1);

    res.json({
        message: "Book deleted successfully"
    });
});


// Server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});