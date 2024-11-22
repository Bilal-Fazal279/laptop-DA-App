// Sample data
const playerData = [
    {
        user: "Matt A. Donovan",
        wagers: 14200,
        wl: -1456,
        balance: 4200,
        cashIn: 2000,
        cashOut: 0,
        numWagers: 250,
        avgW: 42,
        sharp: false,
        lastActive: "07-JAN-16:24",
        memberFor: "100 weeks",
        mobileRate: "0/100%"
    },
    // Add more sample data as needed
];

// Function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }).format(amount);
}

// Function to create table rows
function createTableRows(data) {
    const tableBody = document.querySelector('.table-body');
    tableBody.innerHTML = '';

    data.forEach(player => {
        const row = document.createElement('div');
        row.className = 'table-row';
        
        row.innerHTML = `
            <div class="cell">${player.user}</div>
            <div class="cell">${formatCurrency(player.wagers)}</div>
            <div class="cell ${player.wl >= 0 ? 'positive' : 'negative'}">${formatCurrency(player.wl)}</div>
            <div class="cell">${formatCurrency(player.balance)}</div>
            <div class="cell">${formatCurrency(player.cashIn)}</div>
            <div class="cell">${formatCurrency(player.cashOut)}</div>
            <div class="cell">${player.numWagers}</div>
            <div class="cell">${formatCurrency(player.avgW)}</div>
            <div class="cell">${player.sharp ? '✓' : ''}</div>
            <div class="cell">${player.lastActive}</div>
            <div class="cell">${player.memberFor}</div>
            <div class="cell">${player.mobileRate}</div>
        `;

        tableBody.appendChild(row);
    });
}

// Tab functionality
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Here you would typically fetch and display different data based on the selected tab
        // For this example, we'll just use the same data
        createTableRows(playerData);
    });
});

// Initial load
createTableRows(playerData);