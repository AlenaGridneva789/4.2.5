const input = document.querySelector('.wrapper__input')
const listOfRepositories = document.querySelector('.listOfRepositories')
const listOfNames = document.querySelector('.listOfNames')

const debounce = (fn, debounceTime) => {
    let timeout;
    return function() {
        const fnCall = () => {
            fn.apply(this, arguments)
        }
        clearTimeout(timeout);
        timeout = setTimeout(fnCall, debounceTime)
    }
}

const getElement = (value) => {
    fetch(`https://api.github.com/search/repositories?q=${value}&per_page=5`)
        .then(res => res.json())
        .then(res => {
          res.items.forEach(element => {
            listOfNames.insertAdjacentHTML('beforeend',`<button onclick="addElement('${element.name}', '${element.owner.login}', '${element.stargazers_count}', this)" class="listOfNames--item">
                     ${element.name}
                </button>`)
          })})    
}

const addElement = (name, owner, stars, item) => {
    listOfRepositories.insertAdjacentHTML('beforeend',`<div class="item">
        <div class="item__info">
          <span>Name: ${name}</span>
          <span>Owner: ${owner}</span>
          <span>Stars: ${stars}</span>
        </div>
        <button onclick="deleteElement(this)" ><img src="img/x.png" class = "img"></button>
      </div>`)
    listOfNames.innerHTML = ''
    input.value = ''
    item.onclick = null
}

const deleteElement = (el) => {
  el.parentNode.remove()
  el.onclick = null
}

const func = debounce(getElement, 1000)

const onInputChange = (event) => {
  if (input.value !== '') {
    func(event.target.value)
  }
  listOfNames.innerHTML = '' 
}
input.addEventListener('input', onInputChange)






