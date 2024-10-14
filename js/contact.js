const submitBtn = document.getElementById("submitBtn")
const contactForm = document.querySelector(".contact-form")
const emailInput = document.getElementById("emailInput")
const emailRegix = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
const toggleBtn = document.querySelector(".toggle-container")
const btnIcon =  document.querySelector(".my-icon")
const allInputs = document.querySelectorAll(".form-area")

contactForm.addEventListener("submit",function(e){

e.preventDefault()


})

document.querySelectorAll(".go-to-home").forEach(ele=>{
ele.addEventListener("click",function(){
    window.location.assign("./index.html")
})

})

//  local storage check for mood
if (localStorage.getItem("moodTwo") !== null) {
    

    if (localStorage.getItem("moodTwo") === "light-mood") {
        toggleBtn.classList.add("active")
        document.body.classList.replace("dark-mood","light-mood")
        
    }else{
        toggleBtn.classList.remove("active")
        document.body.classList.replace("light-mood","dark-mood")
    }
    
    
    }
    
    //  Setting dark mood and light mood
    toggleBtn.addEventListener("click", function(e){
    
    e.target.classList.toggle("active")
    
    if (e.target.classList.contains("active")) {
        document.body.classList.replace("dark-mood","light-mood")
        btnIcon.classList.replace("fa-moon","fa-sun")
        localStorage.setItem("moodTwo","light-mood")
       
    }else{
        document.body.classList.replace("light-mood","dark-mood")
        btnIcon.classList.replace("fa-sun","fa-moon")
        localStorage.setItem("moodTwo","dark-mood")
      
    }    
       
    
    
    })
    

















emailInput.addEventListener("input",function(){
    
    emailValidation()
})



function emailValidation(){
if (emailRegix.test(emailInput.value)) {
    emailInput.classList.add("is-valid")   
    emailInput.classList.remove("is-invalid")


}else{

    emailInput.classList.add("is-invalid")
    emailInput.classList.remove("is-valid")


}






}



function formatDataFromInput(){
allInputs.forEach(ele=>ele.value = "")
emailInput.classList.remove("is-valid")
emailInput.classList.remove("is-invalid")
}



submitBtn.addEventListener("click",function(){

   if (emailInput.classList.contains("is-valid")) {
    
    Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Your Data Has Been Sent",
        showConfirmButton: false,
        timer: 1500
      });

     


   }else{

    Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Your Email Must be Valid",
        showConfirmButton: false,
        timer: 1500
      });


    


   }
   
   formatDataFromInput()

})



