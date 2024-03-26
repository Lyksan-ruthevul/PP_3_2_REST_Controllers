$(async function () {
    await getAllUsers();
    await showUserInfo();
})

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

