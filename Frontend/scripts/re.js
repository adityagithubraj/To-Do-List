const registerForm = document.querySelector('form');
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

//................. Send a POST request to backend..........................//

            try {
                const response = await fetch('http://localhost:6060/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: username, email, password }),
                });

                const data = await response.json();
                if (data.msg === 'User Registered Successfully') {
                   
                    window.location.href = './login.html'; 
                } else {
                    alert('Registration failed. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Something went wrong. Please try again later.');
            }
        });