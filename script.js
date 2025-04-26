gallary = document.querySelector('#image-gallery')
KEY = '49956837-fedce1a4a04ffbd3c6eb71c88'
function render(data){
  images = data.hits
  for(imageArr of images){
    formatImage = imageArr.webformatURL.slice(-4)
    image = imageArr.webformatURL.slice(0,-7)
    image = image+'340' + formatImage
    element = document.createElement('img')
    element.src = image
    element.classList.add('imageRender')
    gallary.append(element)
  }
}


function clearRender(){
  deleteItems = document.querySelectorAll('.imageRender')
  for(itemToDel of deleteItems){
    itemToDel.remove()
  }
}

function fetchImages(key,page,max_per_page){
  reqURL = `https://pixabay.com/api/?key=${key}&editors_choice=true&safesearch=true&page=${page}&per_page=${max_per_page}`
  fetch(reqURL)
  .then(response => response.json())
  .then(data => {
    clearRender()
    render(data)
  })
  .catch(error => {
    console.log(error);
  });
}

refreshButton = document.querySelector('#load-more-btn')


maxPerPage = 5
nowPage = 1
refreshButton.addEventListener('click',function(){
  nowPage++
  fetchImages(KEY,nowPage,maxPerPage)
})

fetchImages(KEY,nowPage,maxPerPage)