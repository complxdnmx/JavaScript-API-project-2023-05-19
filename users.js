import { API_URL } from "./config.js";
import { fetchData } from "./functions.js";
import createHeader from "./header.js"


async function init() {
    const usersData = await fetchData(`${API_URL}/users?_embed=posts`)

    const contentElement = document.querySelector('#content')

    contentElement.append(createUsersList(usersData))
    contentElement.before(createHeader())

    console.log(createUsersList(usersData))
}

init()

function createUsersList(users) {
    const usersList = document.createElement('ul');
    usersList.classList.add('users-list')

    users.forEach(user => {
        // console.log(user.id)
        // console.log(user.posts.length)
        const userId = user.id

        const itemElement = document.createElement('li');
        itemElement.classList.add('user-item')

        const linkElement = document.createElement('a')
        linkElement.textContent = `${user.name} (${user.posts.length})`
        linkElement.href = './user.html?user_id=' + userId

        itemElement.append(linkElement)

        usersList.append(itemElement)
    });

    return usersList

}