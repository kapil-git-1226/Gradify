document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
      const response = await fetch('http://localhost:3000/api/users/log-in', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (result.success) {
          alert('Login successful!');
          // Redirect to dashboard or home page
          window.location.href = './../dashboard/gradify-html.html';
      } else {
          alert('Login failed: ' + result.message);
          // Optionally redirect to signup if user not found
          window.location.href = './sign-up.html';
      }
  } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during login');
  }
});