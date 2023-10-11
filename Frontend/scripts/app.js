
        const loginForm = document.querySelector('form');
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

//................ POST request to backend........................//
            try {
                const response = await fetch('http://localhost:6060/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email, password }),
                });

                const data = await response.json();
                if (data.token) {
                  
                    localStorage.setItem('token', data.token);
                
                    window.location.href = './todos.html'; 
                } else {
                    alert('Login failed. Please check your credentials.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Something went wrong. Please try again later.');
            }
        });
    
