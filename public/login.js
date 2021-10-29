const handleLogin = async (e) => {
  e.preventDefault();
  const email = document.querySelectorAll('.login-card input')[0].trim();
  const password = document.querySelectorAll('.login-card input')[0].trim();

  if (email && password) {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    response.ok
      ? document.location.replace('/')
      : alert('There was an error. Try again.');
  } else {
    alert('Please fill in all the fields!');
  }
};

document.querySelector('.login-card').addEventListener('submit', handleLogin);
