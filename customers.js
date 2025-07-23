document.addEventListener('DOMContentLoaded', () => {
  const customers = [
    { id: 'CUST001', name: 'Alice Johnson', email: 'alice@example.com', phone: '9876543210', joined: '2023-01-15' },
    { id: 'CUST002', name: 'Bob Smith', email: 'bob.smith@example.com', phone: '9876501234', joined: '2023-03-21' },
    { id: 'CUST003', name: 'Carol White', email: 'carolw@example.com', phone: '9123456789', joined: '2023-02-10' },
    { id: 'CUST004', name: 'David Brown', email: 'david.brown@example.com', phone: '9911223344', joined: '2022-12-05' },
    { id: 'CUST005', name: 'Emily Davis', email: 'emilyd@example.com', phone: '9988776655', joined: '2023-04-03' }
  ];

  const tbody = document.querySelector('#customersTable tbody');
  const noDataDiv = document.getElementById('noData');
  const searchInput = document.getElementById('searchInput');
  const headers = document.querySelectorAll('#customersTable th[data-column]');

  let currentSort = { column: null, direction: 'asc' };

  function renderTable(data) {
    tbody.innerHTML = '';
    if (data.length === 0) {
      noDataDiv.style.display = 'block';
      return;
    }
    noDataDiv.style.display = 'none';

    data.forEach(customer => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${customer.id}</td>
        <td>${customer.name}</td>
        <td>${customer.email}</td>
        <td>${customer.phone}</td>
        <td>${formatDate(customer.joined)}</td>
        <td>
          <button class="action-btn edit-btn" data-id="${customer.id}">Edit</button>
          <button class="action-btn delete-btn" data-id="${customer.id}">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  // Search filter
  function filterCustomers() {
    const term = searchInput.value.trim().toLowerCase();
    const filtered = customers.filter(cust =>
      cust.id.toLowerCase().includes(term) ||
      cust.name.toLowerCase().includes(term) ||
      cust.email.toLowerCase().includes(term) ||
      cust.phone.toLowerCase().includes(term)
    );
    return filtered;
  }

  // Sort data
  function sortData(data, column, direction) {
    return data.slice().sort((a, b) => {
      let valA = a[column];
      let valB = b[column];

      // Handle date sorting
      if (column === 'joined') {
        valA = new Date(valA);
        valB = new Date(valB);
      }

      if (valA < valB) return direction === 'asc' ? -1 : 1;
      if (valA > valB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Re-render table based on search and sort
  function updateTable() {
    let data = filterCustomers();

    if (currentSort.column) {
      data = sortData(data, currentSort.column, currentSort.direction);
    }

    renderTable(data);
  }

  // Event: search input
  searchInput.addEventListener('input', updateTable);

  // Event: table header click for sorting
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const col = header.getAttribute('data-column');
      if (currentSort.column === col) {
        currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
      } else {
        currentSort.column = col;
        currentSort.direction = 'asc';
      }
      updateTable();
    });
  });

  // Event delegation for edit/delete buttons
  tbody.addEventListener('click', e => {
    if (e.target.classList.contains('edit-btn')) {
      const id = e.target.getAttribute('data-id');
      alert(`Edit customer ${id} - function to be implemented`);
    } else if (e.target.classList.contains('delete-btn')) {
      const id = e.target.getAttribute('data-id');
      if (confirm(`Are you sure you want to delete customer ${id}?`)) {
        // Remove from array & update
        const index = customers.findIndex(c => c.id === id);
        if (index > -1) {
          customers.splice(index, 1);
          updateTable();
        }
      }
    }
  });

  // Initialize table on page load
  updateTable();
});
