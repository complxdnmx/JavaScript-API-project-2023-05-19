// config rasomi konfiguraciniai dydziai/konstantos; rasomi didziosiomis pavadinimuose
export const API_URL = 'https://jsonplaceholder.typicode.com';
//isvedamas kaip visad ${API_URL} arba API_URL + 

export const POSTS_PER_PAGE = 15;
//postu limito kintamasis

export const ALBUMS_PER_PAGE = 10;

export const MAIN_MENU_ITEMS = [
    {
        title: 'Home',
        path: ''
    },
    {
        title: 'Posts',
        path: 'posts.html'
    },
    {
        title: 'Users',
        path: 'users.html'
    },
    {
        title: 'Albums',
        path: 'albums.html'
    },
    {
        title: 'Search',
        path: 'search.html'
    }
]