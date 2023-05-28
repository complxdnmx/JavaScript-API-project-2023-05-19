export function firstLetterToUpperCase(str) {
    const firstLetter = str.at(0).toUpperCase();
    const restOfStr = str.slice(1);
    const output = firstLetter + restOfStr
    //arba tiseiog output = str.at(0).toUpperCase() + str.slice(1)

    return output
}


export async function fetchData (url) {
    const res = await fetch(url);
    const data = await res.json()

    return data
}

export function createHtmlElement (type, className, text) {
    const element = document.createElement(type);

    if(className) {
        element.classList.add(className)
    }
    
    if (textContent) {
        element.textContent = text;
    }
    
    return element
}

// createHtmlElement('div', 'test-class', 'lorem ipsum')

export function getUrlParams (param) {
    const queryParams = location.search
    const urlParams = new URLSearchParams(queryParams)
    const paramValue = urlParams.get(param)

    return paramValue
}