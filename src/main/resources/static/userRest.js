$(async function () {
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