// Helper function to get books from localStorage
function getBooks() {
    return JSON.parse(localStorage.getItem('books')) || [];
}

// Helper function to save books to localStorage
function saveBooks(books) {
    localStorage.setItem('books', JSON.stringify(books));
}

// Helper function to get users from localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Helper function to save users to localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Function to handle adding a new book
function handleAddBook(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const pages = document.getElementById('pages').value;
    const publisher = document.getElementById('publisher').value;
    const author = document.getElementById('author').value;
    const edition = document.getElementById('edition').value;

    const books = getBooks();
    books.push({ title, pages, publisher, author, edition });
    saveBooks(books);
    
    alert('Book added successfully!');
    document.getElementById('addBookForm').reset();
}

// Populate book list
function populateBookList(searchTerm = '') {
    const bookList = document.getElementById('bookList');
    const books = getBooks();
    bookList.innerHTML = '';
    books.forEach((book, index) => {
        if (
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.publisher.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.edition.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
            const li = document.createElement('li');
            li.textContent = `${book.title} by ${book.author}`;
            li.innerHTML += ` <button onclick="editBook(${index})">Edit</button>`;
            bookList.appendChild(li);
        }
    });
}

// Edit book function
function editBook(index) {
    const books = getBooks();
    const book = books[index];
    localStorage.setItem('editBookIndex', index);
    window.location.href = 'edit-book.html';
}

// Save edited book
function saveEditedBook(event) {
    event.preventDefault();
    const index = localStorage.getItem('editBookIndex');
    const books = getBooks();
    books[index] = {
        title: document.getElementById('title').value,
        pages: document.getElementById('pages').value,
        publisher: document.getElementById('publisher').value,
        author: document.getElementById('author').value,
        edition: document.getElementById('edition').value
    };
    saveBooks(books);
    localStorage.removeItem('editBookIndex');
    alert('Book details updated successfully!');
    window.location.href = 'view-books.html';
}

// Populate edit book form
function populateEditBookForm() {
    const index = localStorage.getItem('editBookIndex');
    const books = getBooks();
    const book = books[index];
    document.getElementById('title').value = book.title;
    document.getElementById('pages').value = book.pages;
    document.getElementById('publisher').value = book.publisher;
    document.getElementById('author').value = book.author;
    document.getElementById('edition').value = book.edition;
}

// Populate user lists
function populateUserLists() {
    const teacherList = document.getElementById('teacherList');
    const studentList = document.getElementById('studentList');
    const users = getUsers();
    teacherList.innerHTML = '';
    studentList.innerHTML = '';

    users.forEach((user, index) => {
        const li = document.createElement('li');
        li.textContent = user.username;
        li.innerHTML += ` <button onclick="removeUser(${index})">Remove</button>`;
        li.innerHTML += ` <button onclick="suspendUser(${index})">Suspend</button>`;
        if (user.role === 'teacher') {
            teacherList.appendChild(li);
        } else if (user.role === 'student') {
            studentList.appendChild(li);
        }
    });
}

// Remove user function
function removeUser(index) {
    const users = getUsers();
    users.splice(index, 1);
    saveUsers(users);
    populateUserLists();
}

// Suspend user function (for simplicity, we'll just alert a message)
function suspendUser(index) {
    const users = getUsers();
    const user = users[index];
    alert(`${user.username} has been suspended!`);
}

function getRequests() {
    return JSON.parse(localStorage.getItem('requests')) || [];
}

// Helper function to save requests to localStorage
function saveRequests(requests) {
    localStorage.setItem('requests', JSON.stringify(requests));
}

// Populate borrowed books list
function populateBorrowedBooksList() {
    const borrowedBooksList = document.getElementById('borrowedBooksList');
    const requests = getRequests();
    borrowedBooksList.innerHTML = '';
    requests.forEach((request, index) => {
        if (request.status === 'borrowed') {
            const li = document.createElement('li');
            li.textContent = request.bookTitle;
            li.innerHTML += ` <button onclick="markAsReturned(${index})">Mark as Returned</button>`;
            borrowedBooksList.appendChild(li);
        }
    });
}

// Mark book as returned
function markAsReturned(index) {
    const requests = getRequests();
    requests[index].status = 'returned'; // Change status to 'returned'
    saveRequests(requests);
    alert('Book marked as returned.');
    populateBorrowedBooksList(); // Refresh the list
}

function getRequests() {
    return JSON.parse(localStorage.getItem('requests')) || [];
}

// Helper function to save requests to localStorage
function saveRequests(requests) {
    localStorage.setItem('requests', JSON.stringify(requests));
}

// Populate book requests list
function populateRequestList() {
    const requestList = document.getElementById('requestList');
    const requests = getRequests();
    requestList.innerHTML = '';
    requests.forEach((request, index) => {
        const li = document.createElement('li');
        li.textContent = `${request.bookTitle} - Status: ${request.status}`;
        li.innerHTML += ` <button onclick="approveRequest(${index})">Approve</button>`;
        li.innerHTML += ` <button onclick="rejectRequest(${index})">Reject</button>`;
        requestList.appendChild(li);
    });
}

// Approve book request
function approveRequest(index) {
    const requests = getRequests();
    requests[index].status = 'borrowed'; // Change status to 'borrowed'
    saveRequests(requests);
    alert('Request approved and book marked as borrowed.');
    populateRequestList(); // Refresh the list
}

// Reject book request
function rejectRequest(index) {
    const requests = getRequests();
    requests.splice(index, 1); // Remove the request
    saveRequests(requests);
    alert('Request rejected.');
    populateRequestList(); // Refresh the list
}

// Event listeners for page-specific actions
document.addEventListener('DOMContentLoaded', () => {
    const pathname = window.location.pathname;

    if (window.location.pathname.includes('manage-requests.html')) {
        populateRequestList();
    }
    if (window.location.pathname.includes('manage-borrowed.html')) {
        populateBorrowedBooksList();
    }
    if (pathname.includes('add-book.html')) {
        document.getElementById('addBookForm').addEventListener('submit', handleAddBook);
    }

    if (pathname.includes('view-books.html')) {
        populateBookList();
        document.getElementById('searchBar').addEventListener('input', (event) => {
            populateBookList(event.target.value);
        });
    }

    if (pathname.includes('manage-users.html')) {
        populateUserLists();
    }

    if (pathname.includes('edit-book.html')) {
        populateEditBookForm();
        document.getElementById('editBookForm').addEventListener('submit', saveEditedBook);
    }
});
