const inputNames = document.querySelector('.input'), 
      sortBtn = document.querySelector('.sort'), 
      saveBtn = document.querySelector('.save'), 
      displayNames = document.querySelector('.names') 
 
let arrName = JSON.parse(localStorage.getItem('localList'))  
 
// console.log(arrName); 
 
const showNames = () => { 
    if (arrName) { 
        arrName.forEach(({ name }, i) => { 
            displayNames.innerHTML += `${i + 1} : ${name}<br>` 
        }) 
    } 
} 
 
function byField(field) { 
    return(a, b) => a[field] > b[field] ? 1 : -1; 
} 
 
function byFieldRev(field) { 
    return(a, b) => b[field] > a[field] ? 1 : -1; 
} 
 
sortBtn.addEventListener('click', (event) => { 
    event.preventDefault() 
    if (event.target.dataset.id == 1) { 
        arrName.sort(byField('name')) 
        event.target.dataset.id = 2 
    } else { 
        arrName.sort(byFieldRev('name')) 
        event.target.dataset.id = 1 
    } 
    // console.log(event.target.dataset.id); 
    displayNames.innerHTML = '' 
    arrName.forEach(({ name }, i) => { 
        displayNames.innerHTML += `${i + 1} : ${name}<br>`
    })  
}) 
 
saveBtn.addEventListener('click', (event) => { 
 
    event.preventDefault() 
    let nameValue = inputNames.value.toLowerCase().trim() 
    // console.log(nameValue); 
    if (nameValue) { 
 
        if (!arrName) { 
            arrName = [] 
        } 
 
        let obj = { name:nameValue } 
        const { name } = obj  
        arrName.push(obj) 
        localStorage.setItem('localList', JSON.stringify(arrName)) 
        inputNames.value = '' 
        displayNames.innerHTML = '' 
        showNames() 
 
    } else { 
        alert('name must to be completed') 
    } 
}) 
 
showNames()