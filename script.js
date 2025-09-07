const API_Users = "https://jsonplaceholder.typicode.com/users"

document.getElementById("btn-list").addEventListener("click", async function () {
  const container = document.getElementById("clients-label")
  if (container.style.display === "block") {
    container.style.display = "none"
    this.textContent = "Show Customers"
    return
  }
  container.style.display = "block"
  this.textContent = "Hide Customers"

  
  const users = await (await fetch(API_Users)).json();
  container.innerHTML = `
    <table class="customers-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Company</th>
          <th>Phone</th>
          <th>Email</th>
          <th>City</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${users.map(u => `
          <tr>
            <td>${u.name}</td>
            <td>${u.company.name}</td>
            <td>${u.phone}</td>
            <td>${u.email}</td>
            <td>${u.address.city}</td>
            <td><button class="status-btn">Inactive</button></td>   
          </tr>`).join("")}
      </tbody>
    </table>
  `


  const buttons = container.querySelectorAll(".status-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.textContent === "Inactive") {
        btn.textContent = "Active"
        btn.style.backgroundColor = "#00b0878f" 
        btn.style.color = "#16C098"            
        btn.style.border = "solid 2px #16C098" 
      } else {
        btn.textContent = "Inactive"
        btn.style.backgroundColor = "#e74d3c8c"
        btn.style.color = "#e74d3c"           
        btn.style.border = "solid 2px #e74d3c"
      }
    })
  })
})
