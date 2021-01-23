let animLeft = document.querySelectorAll(".animation-left"),      //scroll animation
    animRight = document.querySelectorAll(".animation-right"),
    animBottom = document.querySelectorAll(".animation-bottom"),
    animFade = document.querySelectorAll(".animation-fade"),
    startAnim = window.innerHeight - (window.innerHeight*10/100),
    burger = document.querySelector(".burger-menu"),     //burger menu
    burgerMenu = document.querySelector(".menu"),
    menuLine = document.querySelector(".line-menu"),
    registration = document.querySelector(".registration"),    //popup call button
    popup = document.querySelector(".popup"),     //popup with background 
    popupForm = document.querySelector(".popup-form"),      //popup
    popupName = document.querySelector("#popup-name"),
    popupEmail = document.querySelector("#popup-email"),
    closePopup = document.querySelectorAll(".close-popup"),     //close popup
    activePopup,
    left = document.querySelector(".str-left"),        //slider with people. slide left
    right = document.querySelector(".str-right"),        //slider with people. slide right
    peopleSlider = document.querySelector(".people-line"), 
    peoples = document.querySelectorAll(".people"),       
    peopleWidth = peoples[0].getBoundingClientRect().width,
    peopleSliderWidth = Math.round(peopleSlider.getBoundingClientRect().width),
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
    readMore = document.querySelectorAll(".read-more"),     //read more popup
    popupReadMore = document.querySelector(".popup-read-more"),
    rMBg,
    rMP,
    cite = document.querySelectorAll(".cite"),    //slider showed cite
    showedCite,
    parentPadding,
    number,
    clearCiteInterval,
    lCallPopup = document.querySelector(".call-popup"),     //lower popup
    lPopup = document.querySelector(".l-popup"),     //lower popup with background 
    lPopupForm = document.querySelector(".l-popup-form"),      //lower popup
    name = document.querySelector("#name"),     //registr inputs
    email = document.querySelector("#email"),
    subject = document.querySelector("#subject"),
    companyName = document.querySelector("#company-name"),
    message = document.querySelector("#message"),
    registrInputs = [name, email, subject, companyName, message],
    nameCheck = document.querySelector(".name-check"),     //check registr inputs
    emailCheck = document.querySelector(".email-check"),
    subjectCheck = document.querySelector(".subject-check"),
    companyNameCheck = document.querySelector(".company-name-check"),
    messageCheck = document.querySelector(".message-check"),
    registrCheckInputs = [nameCheck, emailCheck, subjectCheck, companyNameCheck, messageCheck],
    date = new Date(),
    colors = ["rgba(26, 229, 217, 0.02)", "rgba(0, 0, 0, 0.02)", "rgba(255, 0, 26, 0.02)"]

window.onbeforeunload = () => {
  localStorage.setItem("lastVisit", `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}   ${date.getHours()}:${date.getMinutes()}`)
  if(popupName.value != ""){
    localStorage.name = popupName.value
  }
  if(popupEmail.value != ""){
    localStorage.email = popupEmail.value
  }
}

if(localStorage.bgColor == undefined){
  localStorage.bgColor = colors[0]
}else{
  for(let i = 0; i < colors.length; i++){
    if(localStorage.bgColor == colors[i]){
      if(colors.indexOf(colors[i]) == colors.length - 1){
        localStorage.bgColor = colors[0]
        break
      }else{
        localStorage.bgColor = colors[colors.indexOf(colors[i])+1]
        break
      }
    }
  }
}

document.body.style.backgroundColor = localStorage.bgColor

if(localStorage.name != undefined){
  popupName.value = localStorage.name
}
if(localStorage.email != undefined){
  popupEmail.value = localStorage.email
}


if(localStorage.visitCount === undefined){
  localStorage.visitCount = 1
}else{
  localStorage.visitCount = Number(localStorage.visitCount) + 1
}


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


closePopup.forEach((element)=>{
  element.onclick = popupClose
})

function popupOpen (event){
  event.preventDefault()
  popup.style.display = "block"
  popup.classList.add("active-popup")
  activePopup = document.querySelector(".active-popup")
  activePopup.onclick = checkClick
}

function popupClose (){
  activePopup.style.display = "none"
  activePopup.classList.remove("active-popup")
}

function checkClick (e){
  if(!activePopup.firstElementChild.contains(e.target)){
    activePopup.style.display = "none"
    activePopup.classList.remove("active-popup")
  }
}

//people slider 
left.onclick = peopleLeft
right.onclick = peopleRight
left.ondblclick = peopleFalse
right.ondblclick = peopleFalse

function peopleLeft (event){
  event.preventDefault()
  peopleSliderWidth = Math.floor(peopleSliderWidth)
  if(peopleSlider.scrollLeft == 0){
    peopleSlider.scroll(peopleSlider.scrollWidth, 0)
  }else{
    peopleSlider.scroll(peopleSlider.scrollLeft-peopleWidth, 0)
  }
}

function peopleRight (event){
  event.preventDefault()
  peopleSliderWidth = Math.floor(peopleSliderWidth)
  if(Math.round(peopleSlider.scrollLeft)-10 <= peopleSlider.scrollWidth - peopleSliderWidth && Math.round(peopleSlider.scrollLeft)+10 >= peopleSlider.scrollWidth - peopleSliderWidth){
    peopleSlider.scroll(0, 0)
  }else{
    peopleSlider.scroll(peopleSlider.scrollLeft+=peopleWidth, 0)
  }
}

function peopleFalse (){
  return false;
}

if(localStorage.filter != undefined){
  filter.forEach((element)=>{
    if(element.textContent == localStorage.filter){
      element.classList.add("active-filter")
      filterName = element.textContent
      filterImages.forEach((image)=>{
        if(filterName == "All" || image.classList.contains(filterName)){
          image.style.display = "block"
        }else{
          image.style.display = "none"
        }    
      })
    }
  })
}



filter.forEach((element)=>{
  element.onclick = filtration
})

function filtration (event){
  event.preventDefault()
  if(localStorage.filter != this.textContent){
    localStorage.filter = this.textContent
  }
  filter.forEach((element)=>{
    element.classList.remove("active-filter")
  })
  this.classList.add("active-filter")
  filterName = this.textContent
  filterImages.forEach((image)=>{
    if(filterName == "All" || image.classList.contains(filterName)){
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

//read more popup

readMore.forEach((element)=>{
  element.onclick = readMoreOpen
})

function readMoreOpen (e){
  e.preventDefault()
  popupReadMore.innerHTML = `
  <div class="read-more-bg popup">
    <article class="read-more-popup popup-form">
      <span class="close-popup"></span>
      <h2>read more</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam ducimus ea, eligendi consequatur perspiciatis, atque, dolorum reprehenderit nisi nihil itaque natus. Alias, provident. Architecto praesentium dignissimos, ipsum ducimus soluta nulla dolore deserunt animi molestiae ex at esse vitae, nobis dolor suscipit maxime. Iusto aut nostrum obcaecati earum pariatur quibusdam asperiores!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque nesciunt eius deserunt maxime autem expedita rem mollitia, et soluta earum.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente commodi nesciunt rerum, fugit laudantium alias doloremque animi labore error magnam quia facere doloribus facilis quos unde suscipit iure aliquid odit possimus, aliquam, provident! Voluptate, atque quibusdam harum quas iure, delectus.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat molestiae iusto atque omnis laborum, est ut enim, ratione magni sunt odit reprehenderit facilis? Nostrum modi delectus voluptate maxime, omnis obcaecati.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis nemo assumenda iste recusandae tenetur mollitia voluptatibus error quia optio incidunt sapiente quod dolorum voluptatem odio nihil, at cupiditate! Eligendi, quis aperiam sit, iste et adipisci. Explicabo tempora vitae quia natus, eaque labore itaque quidem, ipsum nostrum sit rerum animi modi ad. Accusantium unde blanditiis, fugit quae odio dolor facilis. Quidem sequi tenetur tempore, natus assumenda a eius velit voluptatem, aliquid sit nostrum mollitia maiores nesciunt quasi, distinctio ipsum qui vero eligendi cumque. Repellat soluta ad atque voluptas sequi officiis et itaque? Placeat voluptatem, porro, qui magni repellendus odit illum necessitatibus rerum officia quaerat reiciendis mollitia ipsum eligendi fugit quo obcaecati distinctio dicta tenetur. Blanditiis rem autem facere est esse sint, quisquam qui eos beatae modi accusantium perferendis voluptatibus vel iusto ducimus non ad, totam incidunt. Eos at debitis eaque fuga amet molestiae laudantium, ut vitae, dicta incidunt velit excepturi placeat.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta, alias.</p>
    </article>
  </div>`
  rMBg = document.querySelector(".read-more-bg"),
  rMP = document.querySelector(".read-more-popup"),
  closePopup = document.querySelectorAll(".close-popup")
  rMBg.style.display = "block"
  rMBg.classList.add("active-popup")
  activePopup = document.querySelector(".active-popup")
  activePopup.onclick = checkClick
  closePopup.forEach((element)=>{
    element.onclick = popupClose
  })
}

slideButton.forEach((element)=>{
  element.onclick = showCite
})

cite[0].classList.add("showed-cite")
slideButton[0].style.backgroundColor = "#c0301c"
cite[0].parentElement.style.height = `${cite[0].clientHeight}px`

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

lCallPopup.onclick = lPopupOpen

function lPopupOpen (event){
  event.preventDefault()
  for(i = 0; i < registrInputs.length; i++){
    if(registrInputs[i].value != ""){
      lPopup.style.display = `block`
      registrInputs[i].style.borderColor = `#555`
      console.log(registrInputs[i].value)
      registrCheckInputs[i].value = registrInputs[i].value
      lPopup.classList.add("active-popup")
      activePopup = document.querySelector(".active-popup")
      activePopup.onclick = checkClick 
    }else{
      registrInputs[i].style.borderColor = `#c0301c`
      lPopup.style.display = `none`
      break
    }
  }
}
//animations 
window.onwheel = checkScroll
window.onscroll = checkScroll

function checkScroll (){
  animLeft.forEach((elem)=>{  
    if(window.pageYOffset + startAnim >= elem.offsetTop && window.pageYOffset <= elem.offsetTop){
      elem.classList.remove("animation-left")
    }
  })
  animRight.forEach((elem)=>{  
    if(window.pageYOffset + startAnim >= elem.offsetTop && window.pageYOffset <= elem.offsetTop){
      elem.classList.remove("animation-right")
    }
  })
  animBottom.forEach((elem)=>{  
    if(window.pageYOffset + startAnim >= elem.offsetTop && window.pageYOffset <= elem.offsetTop){
      elem.classList.remove("animation-bottom")
    }
  })
  animFade.forEach((elem)=>{  
    if(window.pageYOffset + startAnim >= elem.offsetTop && window.pageYOffset <= elem.offsetTop){
      elem.classList.remove("animation-fade")
    }
  })
}
