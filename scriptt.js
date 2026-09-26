const form = document.getElementById('resForm');
const resList = document.getElementById('resList');

// Load initial data from localStorage or initialize an empty array
let reservations = JSON.parse(localStorage.getItem('lab_res')) || [];

// Save state to localStorage and re-render the list items
function saveAndRender() {
  localStorage.setItem('lab_res', JSON.stringify(reservations));
  resList.innerHTML = '';

  reservations.forEach((res, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span><strong>${res.id}</strong> - ${res.room} @ ${res.time}</span>
      <button onclick="cancelRes(${index})">Cancel</button>
    `;
    resList.appendChild(li);
  });
}

// Handle form submission to add a new reservation
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = document.getElementById('studentId').value;
  const room = document.getElementById('labRoom').value;
  const time = document.getElementById('resTime').value;

  reservations.push({ id, room, time });
  form.reset();
  saveAndRender();
});

// Remove a reservation entry by index
function cancelRes(index) {
  reservations.splice(index, 1);
  saveAndRender();
}

// Initial load on page load
saveAndRender();