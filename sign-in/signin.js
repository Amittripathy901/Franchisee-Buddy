// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get references to DOM elements
    const emailBtn = document.getElementById('emailBtn');
    const phoneBtn = document.getElementById('phoneBtn');
    const emailInput = document.getElementById('emailInput');
    const phoneInput = document.getElementById('phoneInput');
    const passwordInput = document.getElementById('password');
    const signInBtn = document.getElementById('signInBtn');
    const toggleButtons = document.querySelector('.toggle-buttons');
    
    // Add inner span to button for styling
    signInBtn.innerHTML = '<span>Sign In</span>';
    
    // Function to switch between email and phone inputs
    function toggleInputMode(mode) {
        if (mode === 'email') {
            emailBtn.classList.add('active');
            phoneBtn.classList.remove('active');
            emailInput.style.display = 'block';
            phoneInput.style.display = 'none';
            toggleButtons.classList.remove('phone-active');
            
            // Animation effect
            emailInput.style.animation = 'none';
            setTimeout(() => {
                emailInput.style.animation = 'slideRight 0.5s ease-out forwards';
            }, 10);
            
            // Update placeholder for better UX
            passwordInput.placeholder = 'Enter your password';
        } else if (mode === 'phone') {
            phoneBtn.classList.add('active');
            emailBtn.classList.remove('active');
            phoneInput.style.display = 'block';
            emailInput.style.display = 'none';
            toggleButtons.classList.add('phone-active');
            
            // Animation effect
            phoneInput.style.animation = 'none';
            setTimeout(() => {
                phoneInput.style.animation = 'slideRight 0.5s ease-out forwards';
            }, 10);
            
            // Update placeholder for better UX
            passwordInput.placeholder = 'Enter your password';
        }
    }
    
    // Event listeners for toggle buttons
    emailBtn.addEventListener('click', () => toggleInputMode('email'));
    phoneBtn.addEventListener('click', () => toggleInputMode('phone'));
    
    // Add focused class for input styling
    const allInputs = [emailInput, phoneInput, passwordInput];
    
    allInputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
        
        // Clear error class on input
        input.addEventListener('input', function() {
            this.classList.remove('input-error');
            
            // Remove any existing error messages
            const errorMsg = this.parentElement.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.style.display = 'none';
            }
        });
    });
    
    // Validation functions
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function validatePhone(phone) {
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return re.test(String(phone));
    }
    
    function validatePassword(password) {
        return password.length >= 6;
    }
    
    // Function to show error
    function showError(input, message) {
        input.classList.add('input-error');
        
        // Create or update error message
        let errorMsg = input.parentElement.querySelector('.error-message');
        
        if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            input.parentElement.appendChild(errorMsg);
        }
        
        errorMsg.textContent = message;
        errorMsg.style.display = 'block';
        
        // Shake animation effect
        input.style.animation = 'none';
        setTimeout(() => {
            input.style.animation = 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both';
        }, 10);
    }
    
    // Sign in button click handler
    signInBtn.addEventListener('click', function() {
        let isValid = true;
        
        // Determine which input is active
        const isEmailMode = emailInput.style.display !== 'none';
        const activeInput = isEmailMode ? emailInput : phoneInput;
        
        // Validate active input
        if (isEmailMode) {
            if (!validateEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
        } else {
            if (!validatePhone(phoneInput.value)) {
                showError(phoneInput, 'Please enter a valid phone number');
                isValid = false;
            }
        }
        
        // Validate password
        if (!validatePassword(passwordInput.value)) {
            showError(passwordInput, 'Password must be at least 6 characters');
            isValid = false;
        }
        
        // If all validations pass
        if (isValid) {
            // Show loading state
            signInBtn.classList.add('loading');
            
            // Simulate API call (Replace with actual authentication)
            setTimeout(() => {
                signInBtn.classList.remove('loading');
                signInBtn.classList.add('success');
                signInBtn.innerHTML = '<span>Success! Redirecting...</span>';
                
                // Redirect or complete sign-in process
                setTimeout(() => {
                    // Redirect to dashboard or home page
                    window.location.href = 'index.html'; // Change to your dashboard page
                }, 1500);
            }, 2000);
        }
    });
    
    // Enter key press handler
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            signInBtn.click();
        }
    });
    
    // Add floating label effect (optional enhancement)
    function createFloatingLabels() {
        allInputs.forEach(input => {
            const parent = input.parentElement;
            const labelText = input.placeholder;
            
            // Create floating label element
            const label = document.createElement('label');
            label.className = 'floating-label';
            label.textContent = labelText;
            
            // Add label to DOM
            parent.appendChild(label);
            
            // Events to handle label animation
            input.addEventListener('focus', () => {
                label.classList.add('active');
            });
            
            input.addEventListener('blur', () => {
                if (input.value === '') {
                    label.classList.remove('active');
                }
            });
            
            // Initial state
            if (input.value !== '') {
                label.classList.add('active');
            }
        });
    }
    
    // Enable the following line to add floating labels
    // createFloatingLabels();
    
    // Add some subtle background animation effects
    function createBackgroundEffect() {
        const container = document.querySelector('.container');
        const particles = 15;
        
        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.className = 'bg-particle';
            
            // Random positioning and size
            const size = Math.random() * 10 + 5;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.left = `${Math.random() * 100}%`;
            
            // Add animation with random duration
            const duration = Math.random() * 20 + 10;
            particle.style.animation = `float ${duration}s ease-in-out infinite`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            
            document.body.appendChild(particle);
        }
    }
    
    // Add the following CSS to your stylesheet to enable the background particles
    /*
    .bg-particle {
        position: absolute;
        background: rgba(31, 129, 221, 0.1);
        border-radius: 50%;
        pointer-events: none;
        z-index: -1;
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0) translateX(0);
        }
        50% {
            transform: translateY(-20px) translateX(10px);
        }
    }
    */
    
    // Enable the following line to add background particles
    // createBackgroundEffect();
});

document.getElementById("signInBtn").addEventListener("click", function() {
    alert("Login Successful! Redirecting...");
    
    // Redirect to the homepage (index.html inside the index folder)
    window.location.href = "../index/index.html";
});
