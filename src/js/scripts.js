let burger = document.querySelector(".burger-menu"),     //burger menu
    burgerMenu = document.querySelector(".menu"),
    menuLine = document.querySelector(".line-menu"),
    registration = document.querySelector(".registration"),    //popup call button
    popup = document.querySelector(".popup"),     //popup with background 
    popupForm = document.querySelector(".popup-form"),      //popup
    closePopup = document.querySelector(".close-popup"),     //close popup
    left = document.querySelector(".str-left"),        //slider with people. slide left
    right = document.querySelector(".str-right"),        //slider with people. slide right
    peopleSlider = document.querySelector(".people-line"), 
    peoples = document.querySelectorAll(".people"),       
    peopleWidth = peoples[0].clientWidth,
    peopleSliderWidth = peopleSlider.clientWidth,
    filter = document.querySelectorAll(".filter"),     //filters
    filterName,
    filterImages = document.querySelectorAll(".l-w-photo"),
    button = document.querySelector(".scroll-button"),   //scroll button
    down = document.querySelector(".scroll-down-button"),    //scroll button to registr form
    block = document.querySelector("header"),   //block to scroll
    registrForm = document.querySelector(".registr"),    //registr form to scroll
    offset,
    scrollPrecent,
    screenSize,
    slideButton = document.querySelectorAll(".slide-button"),
    cite = document.querySelectorAll(".cite"), //slider showed cite
    showedCite,
    parentPadding,
    number,
    clearCiteInterval

burger.dataset.activeCheck = "false"

burger.onclick = menu

function menu (){
  if(burger.getAttribute("data-active-check") == "false"){
    burger.dataset.activeCheck = "true"
    menuLine.classList.add("burger-menu-active")
    burgerMenu.style.display = "block"
  }else if(burger.getAttribute("data-active-check") == "true"){
    burger.dataset.activeCheck = "false"
    menuLine.classList.remove("burger-menu-active")
    burgerMenu.style.display = "none"
    burgerMenu.removeAttribute("style")
  }
}

registration.onclick = popupOpen
closePopup.onclick = popupClose
popup.onclick = checkClick

function popupOpen (event){
  event.preventDefault()
  popup.style.display = "block"
}

function popupClose (){
  popup.style.display = "none"
}

function checkClick (e){
  if(!popupForm.contains(e.target)){
    popup.style.display = "none"
  }
}

//people slider 
left.onclick = peopleLeft
right.onclick = peopleRight

function peopleLeft (event){
  event.preventDefault()
  peopleSlider.scroll(peopleSliderWidth-peopleWidth, 0)
}

function peopleRight (event){
  event.preventDefault()
  peopleSlider.scroll(peopleSliderWidth+peopleWidth, 0)
}

filter.forEach((element)=>{
  element.onclick = filtration
})

function filtration (event){
  event.preventDefault()
  filterName = this.textContent
  filterImages.forEach((image)=>{
    if(filterName == "All"){
      image.style.display = "block"
    }else if(image.classList.contains(filterName)){
      image.style.display = "block"
    }else{
      image.style.display = "none"
    }    
  })
}
    
window.onwheel = showButton

function showButton (){
  offset = window.pageYOffset
  if(offset > block.offsetHeight){
    button.style.display = "flex"
  }
  if(offset <= block.offsetHeight){
    button.style.display = "none"
  }
}

button.onclick = scrollUp
down.onclick = scrollDown

function scrollUp (){
  offset = window.pageYOffset - 20
  window.scrollTo(0, offset)
  showButton ()
  if(offset > block.offsetTop){
    setTimeout(() => {
      scrollUp ()
    }, 1);
  }
}

function scrollDown (){
  offset = window.pageYOffset + 20
  window.scrollTo(0, offset)
  showButton ()
  if(offset < registrForm.offsetTop){
    setTimeout(() => {
      scrollDown ()
    }, 1);
  }
}

slideButton.forEach((element)=>{
  element.onclick = showCite
})

cite[0].classList.add("showed-cite")
slideButton[0].style.backgroundColor = "#c0301c"
parentPadding = cite[0].clientHeight
cite[0].parentElement.style.height = `${parentPadding}px`

for(let i = 0; i < cite.length; i++){
  cite[i].dataset.number = i
  slideButton[i].dataset.digit = i
}

citeInterval ()
function citeInterval (){
  clearCiteInterval = setInterval(() => {
    showedCite = document.querySelector(".showed-cite")
    showedCite.classList.remove("showed-cite")
    if(showedCite.nextElementSibling == null){
      showedCite.parentElement.firstElementChild.classList.add("showed-cite")
      parentPadding = showedCite.parentElement.firstElementChild.clientHeight
      number = showedCite.parentElement.firstElementChild.getAttribute("data-number")
    }else{
      showedCite.nextElementSibling.classList.add("showed-cite")
      parentPadding = showedCite.nextElementSibling.clientHeight
      number = showedCite.nextElementSibling.getAttribute("data-number")
    }
    showedCite.parentElement.style.height = `${parentPadding}px`
    for(let i = 0; i < cite.length; i++){
      if(slideButton[i].getAttribute("data-digit") == number){
        slideButton[i].style.backgroundColor = "#c0301c"
        if(i-1 < 0){
          slideButton[slideButton.length-1].style.backgroundColor = "#ddd"
        }else{
          slideButton[i-1].style.backgroundColor = "#ddd"
        }
      }
    }
  }, 5000);
}

function showCite (){
  clearInterval(clearCiteInterval)
  showedCite = document.querySelector(".showed-cite")
  showedCite.classList.remove("showed-cite")
  slideButton.forEach((button)=>{
    if(showedCite.getAttribute("data-number") == button.getAttribute("data-digit")){
      button.style.backgroundColor = "#ddd"
    }
  })
  this.style.backgroundColor = "#c0301c"
  cite.forEach((cites)=>{
    if(cites.getAttribute("data-number") == this.getAttribute("data-digit")){
      console.log("adasf")
      cites.classList.add("showed-cite")
      showedCite = document.querySelector(".showed-cite")
      showedCite.parentElement.style.height = `${showedCite.clientHeight}px`
      citeInterval ()
    }
  })
}