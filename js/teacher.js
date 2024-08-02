// Helper function to get books from localStorage
function getBooks() {
    return JSON.parse(localStorage.getItem('books')) || [];
}

// Helper function to get requests from localStorage
function getRequests() {
    return JSON.parse(localStorage.getItem('requests')) || [];
}

// Helper function to save requests to localStorage
function saveRequests(requests) {
    localStorage.setItem('requests', JSON.stringify(requests));
}

// Populate book list for teachers
function populateBookList(searchTerm = '') {
    const bookList = document.getElementById('bookList');
    const books = getBooks();
    bookList.innerHTML = '';
    books.forEach((book) => {
        if (
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.publisher.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.edition.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
            const li = document.createElement('li');
            li.textContent = `${book.title} by ${book.author}`;
            bookList.appendChild(li);
        }
    });
}

// Handle book request form submission
function handleBookRequest(event) {
    event.preventDefault();
    const bookTitle = document.getElementById('bookTitle').value;
    const requests = getRequests();
    requests.push({ bookTitle, status: 'pending' });
    saveRequests(requests);
    
    alert('Book request submitted successfully!');
    document.getElementById('requestBookForm').reset();
}

// Populate borrowed books list
function populateBorrowedBooksList() {
    const borrowedBooksList = document.getElementById('borrowedBooksList');
    const requests = getRequests();
    borrowedBooksList.innerHTML = '';
    requests.forEach((request) => {
        if (request.status === 'borrowed') {
            const li = document.createElement('li');
            li.textContent = `${request.bookTitle}`;
            borrowedBooksList.appendChild(li);
        }
    });
}

// Populate returned books list
function populateReturnedBooksList() {
    const returnedBooksList = document.getElementById('returnedBooksList');
    const requests = getRequests();
    returnedBooksList.innerHTML = '';
    requests.forEach((request) => {
        if (request.status === 'returned') {
            const li = document.createElement('li');
            li.textContent = `${request.bookTitle}`;
            returnedBooksList.appendChild(li);
        }
    });
}

// Event listeners for page-specific actions
document.addEventListener('DOMContentLoaded', () => {
    const pathname = window.location.pathname;

    if (pathname.includes('teacher.html')) {
        populateBookList();
        document.getElementById('searchBar').addEventListener('input', (event) => {
            populateBookList(event.target.value);
        });
        populateBorrowedBooksList();
        populateReturnedBooksList();
    }

    if (pathname.includes('request-book.html')) {
        document.getElementById('requestBookForm').addEventListener('submit', handleBookRequest);
    }
});
