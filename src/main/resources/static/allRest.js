$(async function () {
    await showUserInfo();
    await getAllUsers();
    await addUser();
})

// show user(R)
async function showUserInfo() {
    fetch("/user/")
        .then(response => response.json())
        .then(data => {
            document.querySelector('#userName').textContent = data.email;
            document.querySelector('#userRole').textContent = (data.roles.map(role => " " + role.roleName.substring(5)).join(' '));
            let user = `$(
                    <tr>
                    <td>${data.id}</td>
                    <td>${data.name}</td>
                    <td>${data.surname}</td>
                    <td>${data.age}</td>
                    <td>${data.email}</td>
                    <td>${data.roles.map(role => " " + role.roleName.substring(5))}</td>)</tr>`;
            $('#userInfo').append(user);
        })
}

// admin panel table users(R)
async function getAllUsers() {
    const userTable = $('#AllUsersTable');
    userTable.empty();
    fetch("/admin/listUsers")
        .then(response => response.json())
        .then(data => {
            data.forEach(user => {
                let tmpUserTable = `$(
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.name}</td>
                            <td>${user.surname}</td>
                            <td>${user.age}</td>
                            <td>${user.email}</td>
                            <td>${user.roles.map(role => " " + role.roleName.substring(5))}</td>
                            <td>
                                <button type="button" class="btn btn-info" data-bs-toggle="modal"
                                 data-id="${user.id}" data-bs-target="#edit">Edit</button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-danger" data-bs-toggle="modal"
                                 data-id="${user.id}" data-bs-target="#delete">Delete</button>
                            </td>
                        </tr>)`;
                userTable.append(tmpUserTable);
            })
        })
}

//add new user(C)
async function addUser() {
    const rolesResponse = await fetch("/admin/listRoles");
    const roles = await rolesResponse.json();
    roles.forEach(role => {
        let addRoles = document.createElement("option");
        addRoles.value = role.id;
        addRoles.text = role.roleName.substring(5);
        document.getElementById('addRoles').appendChild(addRoles);
    });

    const addUserForm = document.forms["addUserForm"];
    const addLink = document.querySelector('#addNewUser');
    const addButton = document.querySelector('#addUserButton');

    addLink.addEventListener('click', (event) => {
        event.preventDefault();
        addUserForm.style.display = 'block';
    });

    addUserForm.addEventListener('submit', addNewUser);
    addButton.addEventListener('click', addNewUser);

    async function addNewUser(e) {
        e.preventDefault();
        let newUserRoles = [];
        for (let i = 0; i < addUserForm.role.options.length; i++) {
            if (addUserForm.role.options[i].selected) {
                newUserRoles.push({
                    id: addUserForm.role.options[i].value,
                    role: addUserForm.role.options[i].text
                });
            }
        }

        const response = await fetch("/admin/addUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: addUserForm.firstName.value,
                surname: addUserForm.lastName.value,
                age: addUserForm.age.value,
                email: addUserForm.email.value,
                password: addUserForm.password.value,
                roles: newUserRoles
            })
        });
        getAllUsers();
        window.location.href = "/admin";
    }
}