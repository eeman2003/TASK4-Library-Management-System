document.addEventListener('DOMContentLoaded', () => {
    const adminUser = { username: 'admin', password: 'admin123', role: 'admin' };
let users = JSON.parse(localStorage.getItem('users')) || [];
users.push(adminUser);
localStorage.setItem('users', JSON.stringify(users));
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    // Only call checkLogin on specific pages
    const pathname = window.location.pathname;
    if (pathname.includes('admin') || pathname.includes('student') || pathname.includes('teacher')) {
        checkLogin();
    }
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
});

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('Logged in successfully!');

        // Redirect based on user role
        if (user.role === 'admin') {
            window.location.href = 'admin/admin.html';
        } else if (user.role === 'student') {
            window.location.href = 'student/student.html';
        } else if (user.role === 'teacher') {
            window.location.href = 'teacher/teacher.html';
        }
    } else {
        alert('Invalid username or password');
    }
}

function handleSignup(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.username === username);

    if (userExists) {
        alert('Username already exists');
    } else {
        const newUser = { username, password, role };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Signed up successfully!');
        window.location.href = 'login.html'; // Redirect to login after signup
    }
}

// Utility function to check if user is logged in and redirect accordingly
function checkLogin() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const pathname = window.location.pathname;

    if (!currentUser) {
        window.location.href = '../login.html'; // Adjust the path if needed
    } else {
        // Redirect based on user role if already logged in
        if (currentUser.role === 'admin' && !pathname.includes('admin')) {
            window.location.href = 'admin/admin.html';
        } else if (currentUser.role === 'student' && !pathname.includes('student')) {
            window.location.href = 'student/student.html';
        } else if (currentUser.role === 'teacher' && !pathname.includes('teacher')) {
            window.location.href = 'teacher/teacher.html';
        }
    }
}
function handleLogout() {
    localStorage.removeItem('loggedInUser'); // Clear user session
    window.location.href = `${window.location.origin}/index.html`; // Dynamic base URL
}