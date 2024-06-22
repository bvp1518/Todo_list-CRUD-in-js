// Initial values
function resetForm() {
  document.getElementById('id').value = "";
  document.getElementById('title').value = "";
  document.getElementById('category').value = "";
  document.getElementById('price').value = "";
  document.getElementById('desc').value = "";
  document.getElementById('submit').textContent = 'Submit';
  clearErrors();
}

function clearErrors() {
  document.getElementById('idError').innerText = "";
  document.getElementById('titleError').innerText = "";
  document.getElementById('categoryError').innerText = "";
  document.getElementById('priceError').innerText = "";
  document.getElementById('descError').innerText = "";
}

// Validate form
function validateForm() {
  let idText = document.getElementById('id').value.trim();
  let titleText = document.getElementById('title').value.trim();
  let categoryText = document.getElementById('category').value.trim();
  let priceText = document.getElementById('price').value.trim();
  let descriptionText = document.getElementById('desc').value.trim();
  
  clearErrors();
  
  let isValid = true;

  if (idText.length < 1) {
    document.getElementById('idError').innerText = "This field is required";
    isValid = false;
  }
  if (titleText.length < 1) {
    document.getElementById('titleError').innerText = "This field is required";
    isValid = false;
  }
  if (categoryText.length < 1) {
    document.getElementById('categoryError').innerText = "This field is required";
    isValid = false;
  }
  if (priceText.length < 1) {
    document.getElementById('priceError').innerText = "This field is required";
    isValid = false;
  }
  if (descriptionText.length < 1) {
    document.getElementById('descError').innerText = 'This field is required';
    isValid = false;
  }
  
  return isValid;
}

// Submit function
document.getElementById('productForm').addEventListener("submit", (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  let idText = document.getElementById('id').value.trim();
  let titleText = document.getElementById('title').value.trim();
  let categoryText = document.getElementById('category').value.trim();
  let priceText = document.getElementById('price').value.trim();
  let descriptionText = document.getElementById('desc').value.trim();

  let payload = {
    id: idText,
    title: titleText,
    category: categoryText,
    price: priceText,
    description: descriptionText
  };

  let method = document.getElementById('submit').textContent === 'Update' ? 'PUT' : 'POST';
  let apiUrl = method === 'PUT' ? `http://localhost:4000/products/${idText}` : 'http://localhost:4000/products';

  fetch(apiUrl, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
  .then((response) => response.json())
  .then((data) => {
    console.log("Success:", data);
    fetchDataAndRenderTable();
    resetForm();
  })
  .catch((error) => console.error("Error:", error));
});

const fetchDataAndRenderTable = async () => {
  const apiUrl = 'http://localhost:4000/products';
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();
    const tableHTML = `
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${data.map(item => `
            <tr>
              <td>${item.id}</td>
              <td>${item.title}</td>
              <td>${item.category}</td>
              <td>${item.price}</td>
              <td>${item.description}</td>
              <td>
                <button onclick="edit(${item.id})" class="btn">Edit</button>
                <button class="btn btn-danger" onclick="deleteItem(${item.id})">Delete</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    document.querySelector('.data').innerHTML = tableHTML;
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchDataAndRenderTable();

function edit(id) {
  const apiUrl = `http://localhost:4000/products/${id}`;
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      document.getElementById('id').value = data.id;
      document.getElementById('title').value = data.title;
      document.getElementById('category').value = data.category;
      document.getElementById('price').value = data.price;
      document.getElementById('desc').value = data.description;
      document.getElementById('submit').textContent = 'Update';
    })
    .catch(error => console.error('Error:', error));
}

function deleteItem(id) {
  const apiUrl = `http://localhost:4000/products/${id}`;
  fetch(apiUrl, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
    console.log('Deleted:', data);
    fetchDataAndRenderTable();
  })
  .catch(error => console.error('Error:', error));
}
