let editUserId = null; // Keep track of the user being edited

// Handle form submission for both adding and editing users
document
  .getElementById("userForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    if (editUserId) {
      // Update an existing user
      fetch(`http://localhost:3000/update-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editUserId, username, email, phone }),
      })
        .then(() => {
          alert("User updated successfully!");
          fetchUsers();
          clearForm();
        })
        .catch((error) => console.error("Error:", error));
    } else {
      // Add a new user
      fetch("http://localhost:3000/add-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, phone }),
      })
        .then(() => {
          alert("User added successfully!");
          fetchUsers();
          clearForm();
        })
        .catch((error) => console.error("Error:", error));
    }
  });

// Function to fetch and display users
function fetchUsers() {
  fetch("http://localhost:3000/get-users")
    .then((response) => response.json())
    .then((users) => {
      const userList = document.getElementById("userList");
      userList.innerHTML = "";
      users.forEach((user) => {
        userList.innerHTML += `
          <div>
            <p>${user.username} - ${user.email} - ${user.phone}</p>
            <button onclick="editUser(${user.id}, '${user.username}', '${user.email}', '${user.phone}')">Edit</button>
            <button onclick="deleteUser(${user.id})">Delete</button>
          </div>`;
      });
    });
}

// Function to edit a user
function editUser(id, username, email, phone) {
  editUserId = id; // Set the user ID for editing
  document.getElementById("username").value = username;
  document.getElementById("email").value = email;
  document.getElementById("phone").value = phone;
}

// Function to delete a user
function deleteUser(userId) {
  fetch("http://localhost:3000/delete-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: userId }),
  }).then(() => fetchUsers());
}

// Clear the form and reset edit mode
function clearForm() {
  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  editUserId = null;
}

// Fetch users on page load
fetchUsers();
