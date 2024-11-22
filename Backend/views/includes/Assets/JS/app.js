function addRow(element) {
    // Find the current row
    const currentRow = element.parentElement;

    // Create a new row
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><input type="text" placeholder="Serial Number" class="input"></td>
        <td><input type="text" placeholder="Item Code" class="input"></td>
        <td><input type="text" placeholder="Description" class="input"></td>
        <td><input type="text" placeholder="P.O / INDENT NO." class="input"></td>
        <td><input type="text" placeholder="Unit" class="input"></td>
        <td><input type="text" placeholder="Quantity" class="input"></td>
        <td><input type="text" placeholder="Station" class="input"></td>
        <td><input type="text" placeholder="Amount" class="input"></td>
        <td class="add-row" onclick="addRow(this)">+</td>
    `;

    // Insert the new row after the current row
    currentRow.parentNode.insertBefore(newRow, currentRow.nextSibling);
}