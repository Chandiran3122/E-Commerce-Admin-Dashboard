// Sample data for reports
const reports = [
  { id: 'RPT001', type: 'sales', date: '2025-07-20', description: 'Sales increased by 15% in last week' },
  { id: 'RPT002', type: 'customers', date: '2025-07-18', description: 'New customer signups up by 10%' },
  { id: 'RPT003', type: 'products', date: '2025-07-15', description: 'Top-selling products updated' },
  { id: 'RPT004', type: 'sales', date: '2025-06-30', description: 'Monthly revenue report' },
  { id: 'RPT005', type: 'customers', date: '2025-05-25', description: 'Customer retention analysis' },
  { id: 'RPT006', type: 'products', date: '2025-07-10', description: 'Product inventory status' }
];

const reportsTableBody = document.querySelector('#reportsTable tbody');
const noDataDiv = document.getElementById('noData');
const searchInput = document.getElementById('searchInput');
const reportTypeFilter = document.getElementById('reportType');
const dateRangeFilter = document.getElementById('dateRange');
const filterBtn = document.getElementById('filterBtn');

function formatDate(dateStr) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
}

function filterReports() {
  const searchText = searchInput.value.toLowerCase();
  const selectedType = reportTypeFilter.value;
  const selectedDateRange = dateRangeFilter.value;

  let dateLimit = null;
  const today = new Date();
  if (selectedDateRange === 'last7') {
    dateLimit = new Date(today);
    dateLimit.setDate(today.getDate() - 7);
  } else if (selectedDateRange === 'last30') {
    dateLimit = new Date(today);
    dateLimit.setDate(today.getDate() - 30);
  } else if (selectedDateRange === 'last90') {
    dateLimit = new Date(today);
    dateLimit.setDate(today.getDate() - 90);
  }

  const filtered = reports.filter(report => {
    const matchesType = selectedType === 'all' || report.type === selectedType;
    const reportDate = new Date(report.date);
    const matchesDate = !dateLimit || reportDate >= dateLimit;
    const matchesSearch =
      report.id.toLowerCase().includes(searchText) ||
      report.description.toLowerCase().includes(searchText);

    return matchesType && matchesDate && matchesSearch;
  });

  renderTable(filtered);
}

function renderTable(data) {
  reportsTableBody.innerHTML = '';
  if (data.length === 0) {
    noDataDiv.style.display = 'block';
    return;
  } else {
    noDataDiv.style.display = 'none';
  }

  data.forEach(report => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${report.id}</td>
      <td>${report.type.charAt(0).toUpperCase() + report.type.slice(1)}</td>
      <td>${formatDate(report.date)}</td>
      <td>${report.description}</td>
      <td><button onclick="viewReport('${report.id}')">View</button></td>
    `;
    reportsTableBody.appendChild(tr);
  });
}

function viewReport(id) {
  alert(`Displaying details for report: ${id}`);
  // Extend this function to show detailed report views if needed
}

// Event listeners
filterBtn.addEventListener('click', filterReports);
searchInput.addEventListener('input', filterReports);

// Initial render
renderTable(reports);
