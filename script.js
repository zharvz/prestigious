document.addEventListener('DOMContentLoaded', function() {
    const gridCells = document.querySelectorAll('.grid-item');
  
    gridCells.forEach(cell => {
      cell.addEventListener('click', function() {
        // Example: Change the content of clicked cell
        cell.textContent = 'Clicked';
      });
    });
  });
  