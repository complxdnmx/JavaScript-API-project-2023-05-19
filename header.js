import { MAIN_MENU_ITEMS } from "./config.js";

export default function createHeader() {   //export default leidzia exportuot tik 1 export ir jau kai importuojame nereikia riestiniu skliaustu
    
    const headerElement = document.createElement('header')
    headerElement.classList.add('header-element')

    const searchForm = document.createElement('form')
    searchForm.action = './search.html'
    searchForm.classList.add('search-form')

    const searchInput = document.createElement('input')
    searchInput.type = 'text';
    searchInput.name = 'search';
    searchInput.id = 'search';

    const searchButton = document.createElement('button')
    searchButton.type = 'submit';
    searchButton.textContent = 'Search'

    searchForm.append(searchInput, searchButton)

    const navigationElement = document.createElement('nav')
    navigationElement.classList.add('main-navigation')
   

    const menuList = document.createElement('ul');
    menuList.classList.add('menu', 'main-menu')

    navigationElement.append(menuList) 

    headerElement.append(navigationElement, searchForm)




  MAIN_MENU_ITEMS.forEach(item => {
        // console.log(menuItem)     //nedestrukturizuota
        // console.log(menuItem.title)
        // console.log(menuItem.path)

        let {title, path} = item  // destrukturizuota ir kodas jau zinos kad title ir path priklauso menuItemui; tiesiai naudojam path;title

        // console.log(title)
        // console.log(path)

        const menuItem = document.createElement('li')
        const menuLink = document.createElement('a')

        // console.log(location.pathname)
        // console.log('/' + path)

        if (location.pathname === '/' + path) {
            menuLink.classList.add('active')
        }

        menuLink.textContent = title
        menuLink.href = './' + path

        menuItem.append(menuLink)
        menuList.append(menuItem)

        
    })

    // document.body.prepend(headerElement)
    // ne prependinam headeri, o returninam:
    return headerElement
}

//nukilinam init, nes norim navigation elementa returnint ir exportint
// init()