const API_Users = "https://jsonplaceholder.typicode.com/users"

let allUsers = []
let statusMap = {} // для хранения статуса каждого пользователя

document.getElementById("btn-list").addEventListener("click", async function () {
  const container = document.getElementById("clients-label")
  if (container.style.display === "block") {
    container.style.display = "none"
    this.textContent = "Show Customers"
    return
  }
  container.style.display = "block"
  this.textContent = "Hide Customers"
  if (allUsers.length === 0) {
    allUsers = await (await fetch(API_Users)).json()
    allUsers.forEach(u => {
      if (!statusMap[u.id]) statusMap[u.id] = "inactive" // инициализация статуса
    })
  }

  renderTable(allUsers)
})

function renderTable(users) {
  const container = document.getElementById("clients-label")
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
        ${users.map(u => {
          const st = statusMap[u.id] || "inactive"
          const btnText = st === "active" ? "Active" : "Inactive"
          return `
          <tr>
            <td>${u.name}</td>
            <td>${u.company.name}</td>
            <td>${u.phone}</td>
            <td>${u.email}</td>
            <td>${u.address.city}</td>
            <td><button class="status-btn" data-id="${u.id}" data-status="${st}">${btnText}</button></td>   
          </tr>`
        }).join("")}
      </tbody>
    </table>
  `

  const buttons = container.querySelectorAll(".status-btn")
  buttons.forEach(btn => {
    const id = btn.dataset.id

    // устанавливаем стиль кнопки по текущему статусу
    setStatusStyle(btn, statusMap[id])

    btn.addEventListener("click", () => {
      statusMap[id] = statusMap[id] === "active" ? "inactive" : "active"
      btn.dataset.status = statusMap[id]
      btn.textContent = statusMap[id] === "active" ? "Active" : "Inactive"
      setStatusStyle(btn, statusMap[id])
    })
  })
}

function setStatusStyle(btn, status) {
  if (status === "active") {
    btn.style.backgroundColor = "#00b0878f"
    btn.style.color = "#16C098"
    btn.style.border = "solid 2px #16C098"
  } else {
    btn.style.backgroundColor = "#e74d3c8c"
    btn.style.color = "#e74d3c"
    btn.style.border = "solid 2px #e74d3c"
  }
}

const searchInput = document.getElementById("search")

searchInput.addEventListener("input", function () {
  const value = this.value.toLowerCase().trim()
  if (!value) {
    renderTable(allUsers)
    return
  }

  const filtered = allUsers.filter(u =>
    u.name.toLowerCase().includes(value) ||
    u.company.name.toLowerCase().includes(value) ||
    u.phone.toLowerCase().includes(value) ||
    u.email.toLowerCase().includes(value) ||
    u.address.city.toLowerCase().includes(value)
  )

  renderTable(filtered)
})
