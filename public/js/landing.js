function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

function performLogin() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var data = {
        username: username,
        password: password
    };
    
    console.log('Login:', 'Username:', username, 'Password:', password);

    fetch("http://localhost:3000/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(data) 
    })
     .then(response => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error('Login failed');
        }
    })
    .then(data => {
        console.log('Server response:', data);

        // Check for a successful login
        if (data === 'Login successful') {
            // Redirect to the "/dashboard" route
            window.location.href = '/explore';
        } else {
            // Handle other responses
            alert('Invalid credentials! Please try again.');
        }

        closeModal('loginModal');
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle errors here
    });
    closeModal('loginModal');
}

function performSignup() {
    var newUsername = document.getElementById('newUsername').value;
    var email = document.getElementById('signupEmail').value;
    var newPassword = document.getElementById('newPassword').value;
     var data = {
        email:email,
        username: username,
        password: password
    };
    fetch(process.env.BASE_URL+"/signup", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(data) 
    })
    .then(response => response.json())
    .then(data => {
        console.log('Server response:', data);
        closeModal('loginModal');
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle errors here
    });
    console.log('Signup:', 'New Username:', newUsername, 'New Password:', newPassword);
    closeModal('signupModal');
}
// Add new functions for the Forgot Password feature
function openForgotPasswordModal() {
    closeModal('loginModal'); // Close the login modal if open
    openModal('forgotPasswordModal');
}

function sendPasswordResetEmail() {
    var forgotUsername = document.getElementById('forgotUsername').value;
    console.log('Password reset email sent to:', forgotUsername);
    closeModal('forgotPasswordModal');
}
// Function to check password strength
function checkPasswordStrength() {
    var password = document.getElementById('signupPassword').value;
    var strengthIndicator = document.getElementById('passwordStrength');

    // Perform password strength check (you can enhance this as needed)
    var strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    var mediumRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{6,})/;

    if (strongRegex.test(password)) {
        strengthIndicator.innerHTML = 'Strong';
        strengthIndicator.style.color = 'green';
    } else if (mediumRegex.test(password)) {
        strengthIndicator.innerHTML = 'Medium';
        strengthIndicator.style.color = 'orange';
    } else {
        strengthIndicator.innerHTML = 'Weak';
        strengthIndicator.style.color = 'red';
    }
}

// Function to perform signup
function performSignup() {
    var signupEmail = document.getElementById('signupEmail').value;
    var signupUsername = document.getElementById('signupUsername').value;
    var signupPassword = document.getElementById('signupPassword').value;

    // Validate the entered data (you can enhance this as needed)
    if (!signupEmail || !signupUsername || !signupPassword) {
        alert('Please fill in all fields.');
        return;
    }

    // Perform signup or send the data to your server for processing
    console.log('Signup:', 'Email:', signupEmail, 'Username:', signupUsername, 'Password:', signupPassword);

    // Close the signup modal or redirect to another page
    closeModal('signupModal');
}
