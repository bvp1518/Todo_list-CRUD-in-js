text
// Initial values
function InitialValues() {
    let idInputText = document.getElementById('id')
    let titleInputText = document.getElementById('title')
    let categoryInputText = document.getElementById('category')
    let priceInputText = document.getElementById('price')
    let descriptionInputText = document.getElementById('desc')
    idInputText.value = ""
    categoryInputText = ""
    titleInputText.value = ""
    priceInputText.value = ""
    descriptionInputText.value = ""
}
submit.addEventListener("click", (e) => {
    e.preventDefault()
    let t = localStorage.getItem("todo")
    console.log(t);
    let idText = id.value
    let titleText = title.value
    let categoryText = category.value
    let priceText = price.value
    let descriptionText = desc.value
    let array = [{
        id: idText,
        title: titleText,
        category:categoryText,
        price:priceText,
        disc: descriptionText
    }]
    // 
    console.log(array);
    let idError = document.getElementById('idError')
    let titleError = document.getElementById('titleError')
    let categoryError = document.getElementById('categoryError')
    let priceError = document.getElementById('priceError')
    let descError = document.getElementById('descError')

    if (idText.length > 0 &&  titleText.length > 0 && categoryText.length > 0 && priceText.length > 0 && descriptionText.length > 0) {
        localStorage.setItem("todo", JSON.stringify(array))
        InitialValues()
    } else {
        if(idText.length < 1){
            idError.innerText ="This field is required"
        }
        if (titleText.length < 1) {
            titleError.innerText = "This field is required"
        }
        if(categoryText.length < 1){
            categoryError.innerText = "This field is required"
        }
        if(priceText.length < 1){
            priceError.innerText = "This field is required"
        }
        if (descriptionText.length < 1) {
            descError.innerText = 'This field is required'
        }
    }
    // console.log(e)


    todo.innerHTML =
        `
    <table>
    <tr>
        <th>Id</th>
        <th>Title</th>
        <th>Category</th>
        <th>Price</th>
        <th>Description</th>
    </tr>
    <tr>
    <td>${idText}</td>
    <td>${titleText}</td>
    <td>${categoryText}</td>
    <td>${priceText}</td>
    <td>${descriptionText}</td>
    </tr>
    </table>
    `

})

deletebtn.addEventListener("click", () => {
    // e.preventDefault()
    // console.log('deletePressed');
    localStorage.clear()
    // todo.innerHTML = " "
});



// =================================================



const dataArray = document.getElementsByClassName('data');

const fetchDataAndRenderTable = async () => {
    const apiUrl = 'http://localhost:4000/products';
    try {
        // Make a GET request

        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);

        // Build the table HTML
        const tableHTML = `
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Description</th>
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
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;

        // Loop through all elements with the class name 'data' and set their innerHTML
        const dataArray = document.querySelectorAll('.data');
        dataArray.forEach(element => {
            element.innerHTML = tableHTML;
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the function with the API URL
fetchDataAndRenderTable();



