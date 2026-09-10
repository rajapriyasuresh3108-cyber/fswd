async function addTodo() {
  const title = document.getElementById('todo').value;

  const token = localStorage.getItem('token');

  const res = await fetch('http://localhost:5000/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ title })
  });

  const data = await res.json();

  alert('Added: ' + data.title);
}
