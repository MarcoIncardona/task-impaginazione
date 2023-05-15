function populateTable(posts) {
    const tableBody = document.getElementById('postTableBody');
    tableBody.innerHTML = ''; // Pulisce la tabella
  
    
    
    const postsPerPage = 10;
    const totalPosts = 100;
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    let currentPage = 1;
    
    function paginatePosts() {
      const startIndex = (currentPage - 1) * postsPerPage;
      const endIndex = startIndex + postsPerPage;
      
      fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        const posts = data.slice(startIndex, endIndex);
        populateTable(posts);
      })
      .catch(error => {
        console.log('Si è verificato un errore:', error);
      });
    }
    
    posts.forEach(post => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${post.id}</td>
        <td>${post.title}</td>
        <td>${post.body}</td>
      `;
      tableBody.appendChild(row);
    });
  }
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    paginatePosts(posts);
    updatePaginationButtons();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    paginatePosts(posts);
    updatePaginationButtons();
  }
});

function updatePaginationButtons() {
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

