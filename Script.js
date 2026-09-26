let students = [];

// Fetch student records asynchronously from API
async function fetchStudents() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    students = await response.json();
    document.getElementById('loading').style.display = 'none';
    renderStudents(students);
  } catch (error) {
    document.getElementById('loading').textContent = 'Failed to load records.';
  }
}

// Render student array into DOM elements
function renderStudents(list) {
  const grid = document.getElementById('studentGrid');
  grid.innerHTML = '';

  if (list.length === 0) {
    grid.innerHTML = '<p>No matching records found.</p>';
    return;
  }

  list.forEach((student) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h4>${student.name}</h4>
      <p>📧 ${student.id}</p>
      <p>🏢 ${student.company.name}</p>
      <p>📍 ${student.address.city}</p>
    `;
    grid.appendChild(card);
  });
}

// Filter students in real time based on search input
document.getElementById('search').addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(query) ||
      s.email.toLowerCase().includes(query)
  );
  renderStudents(filtered);
});

// Initial API call
fetchStudents();