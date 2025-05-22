let toolsData = []; // Initialize toolsData as an empty array

// Simulated fetch from a server
async function gettoolsdata() {
  try {
    const response = await fetch('https://13.51.136.131:443'); // or your actual server domain
    const data = await response.json();
    console.log('Received data:', data);
    toolsData = data; // Store the fetched data
    populateContent(); // Call the function to populate the content after data is fetched
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Dynamically populate the category dropdown and AI tools
function populateContent() {
  const container = document.getElementById('tool-container');
  const dropdown = document.getElementById('category-dropdown');
  
  // Clear previous content
  container.innerHTML = '';
  dropdown.innerHTML = '<option value="" disabled selected>Select a Category</option>'; // Reset dropdown

  // Populate the dropdown with categories
  toolsData.forEach(category => {
    const option = document.createElement('option');
    option.value = category.name;
    option.textContent = category.name;
    dropdown.appendChild(option);

    // Create category section
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'category';
    categoryDiv.setAttribute('data-category', category.name);

    const h2 = document.createElement('h2');
    h2.textContent = category.name;
    categoryDiv.appendChild(h2);

    const aiList = document.createElement('div');
    aiList.className = 'ai-list';

    // Add AI tools for this category
    category.INFO.forEach(tool => {
      const toolDiv = document.createElement('div');
      toolDiv.className = 'ai-tool';

      const h3 = document.createElement('h3');
      h3.textContent = tool.name;
      toolDiv.appendChild(h3);

      const p = document.createElement('p');
      p.textContent = tool.description;
      toolDiv.appendChild(p);

      const a = document.createElement('a');
      a.href = tool.link;
      a.target = '_blank';
      a.textContent = 'Visit';
      toolDiv.appendChild(a);

      aiList.appendChild(toolDiv);
    });

    categoryDiv.appendChild(aiList);
    container.appendChild(categoryDiv);
  });
}

// Initialize fetching the data when the page loads
window.addEventListener('DOMContentLoaded', () => {
  gettoolsdata(); // Fetch the data when the page is ready
});

// Optional: Dropdown filtering
document.getElementById('category-dropdown').addEventListener('change', (e) => {
  const selected = e.target.value;
  document.querySelectorAll('.category').forEach(cat => {
    cat.style.display = (cat.getAttribute('data-category') === selected || selected === '') ? '' : 'none';
  });
});
