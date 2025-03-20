var response;
var users = [];
var h1 = document.getElementById("head");
var userDiv = document.getElementById("body");

var table = document.querySelector("table");

function getUser() {
  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://fakerapi.it/api/v2/users?_quantity=5&_gender=male",
    true
  );

  xhr.onreadystatechange = function () {
    try {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log("Response:", xhr.responseText);
          response = JSON.parse(xhr.responseText);
          users = response.data.map((user) => ({
            id: user.id,
            name: user.firstname + " " + user.lastname,
            email: user.email,
            website: user.website,
            ip: user.ip,
            macAddress: user.macAddress,
          }));
          console.log(users);

          updateTable();
        } else {
          throw new Error(`Request failed with status: ${xhr.status}`);
        }
      }
    } catch (error) {
      console.error("Error handling response:", error.message);
    }
  };

  xhr.send();
  function updateTable() {
    table.innerHTML = `<tr>
    <th>ID</th>
    <th>Name</th>
    <th>Email</th>
    <th>Actions</th>
  </tr>`;
    users.forEach((user) => {
      var newRow = table.insertRow();

      newRow.insertCell().textContent = user.id;
      newRow.insertCell().textContent = user.name;
      newRow.insertCell().textContent = user.email;

      var actionCell = newRow.insertCell();
      //delete button
      var deleteBtn = document.createElement("button");
      deleteBtn.textContent = "delete";
      deleteBtn.classList.add("btn");
      deleteBtn.onclick = () => {
        users = users.filter((u) => u.id !== user.id);
        updateTable();
      };
      actionCell.appendChild(deleteBtn);

      //view button
      var viewButton = document.createElement("button");
      viewButton.textContent = "View user";
      viewButton.classList.add("btn");
      viewButton.onclick = function () {
        h1.style.display = "block";
        userDiv.style.display = "block";
        userDiv.innerHTML = `
        <div class="user-card">
          <p><strong>Name:</strong> ${user.name}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Website:</strong> <a href="${user.website}" target="_blank">${user.website}</a></p>
          <p><strong>IP Address:</strong> ${user.ip}</p>
          <p><strong>MAC Address:</strong> ${user.macAddress}</p>
        </div>
      `;
      };
      var space = document.createTextNode(" ");
      actionCell.appendChild(space);
      actionCell.appendChild(viewButton);
    });
  }
}
