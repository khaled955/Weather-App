const toggleBtn = document.querySelector(".toggle-container")
const btnIcon =  document.querySelector(".my-icon")
const innerBtn = document.querySelector("inner-btn")
const searchInput = document.getElementById("searchInput")
const emailSubscribtionRegix = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
const closeIconBtn = document.querySelector(".close-icone-alert")
const alertBox = document.querySelector(".sucess-box-aler")
const subscribeBtn = document.getElementById("subscribeBtn")
const subscribeInput = document.querySelector(".subscrip-input")
const contactBtn = document.getElementById("contactBtn")
let lat = ""
let lng = ""
let marker;
let controler;
let currentLatitude;
let currentLongitude;


// start Setting map from leaflet library



    let map;

    map = L.map('map').setView([lat, lng], 5)
       L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)
   
    
   
    
    
    
    




    function onMapClick(e) {
       
      
       ({lat,lng} = e.latlng)

       if (marker) {
        map.removeLayer(marker)
       }

       if (controler) {
        map.removeControl(controler)
       }



        marker = L.marker([lat, lng]).addTo(map);

        controler =  L.control.scale().addTo(map);
        
       let currentPosition = `${lat},${lng}`

       getDataFromApi(currentPosition)
    
    }
    
    map.on('click', onMapClick);









//  End setting map 













let defaultPosition =`26.82,30.8`

//  local storage check for mood
if (localStorage.getItem("mood") !== null) {
    

if (localStorage.getItem("mood") === "light-mood") {
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
    localStorage.setItem("mood","light-mood")
   
}else{
    document.body.classList.replace("light-mood","dark-mood")
    btnIcon.classList.replace("fa-sun","fa-moon")
    localStorage.setItem("mood","dark-mood")
  
}    
   


})



//  search input to get data from user

searchInput.addEventListener("input",function(e){
if (e.target.value.length > 0) {
    getDataFromApi(e.target.value)
}else{

    getUserLocation()
}

    

})



const api = "https://api.weatherapi.com/v1/forecast.json?key=6754075e9be7416cbd0200928240710&q=26.4667136,50.0826112&days=3"






  function getUserLocation(){

if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition((position)=>{
       
 currentLatitude = position.coords.latitude 
 currentLongitude = position.coords.longitude
let currentPosition = `${currentLatitude},${currentLongitude}`

 getDataFromApi(currentPosition)


    })


    



}else{

    //  if not accept acces default is egypt
    getDataFromApi(defaultPosition)


}



}

getUserLocation()


  async function getDataFromApi(userLocation){
    "use strict"
let data =  await fetch(`https://api.weatherapi.com/v1/forecast.json?key=6754075e9be7416cbd0200928240710&q=${userLocation}&days=3`)
let dataList = await data.json()

//  setting current location according to lattitude and langitude
document.querySelector(".current-country").innerHTML = dataList.location.country


//  setting date 
document.querySelectorAll(".current-date").forEach((ele,index)=>
    ele.innerHTML =dataList.forecast.forecastday[index].date
)


// setting src of img condition
document.querySelectorAll(".current-img").forEach((ele,index)=>
    ele.src =dataList.forecast.forecastday[index].day.condition.icon
)


// setting Temp c

document.querySelectorAll(".current-temp").forEach((ele,index)=>
    ele.innerHTML =dataList.forecast.forecastday[index].day.maxtemp_c
)


// setting condition text


document.querySelectorAll(".current-condition").forEach((ele,index)=>
    ele.innerHTML =dataList.forecast.forecastday[0].day.condition.text
)


//  setting dewpoint
document.querySelector(".current-dew").innerHTML = dataList.current.dewpoint_c +"<sup>o</sup>"


//  setting wind degree


document.querySelector(".wind-degree").innerHTML = dataList.current.wind_degree


//  setting Humidity


document.querySelector(".current-humidity").innerHTML = dataList.current.humidity +"%"


//  setting visibilty

document.querySelector(".current-visibilty").innerHTML = dataList.current.vis_km +" km"


 // set Humidity chart
 document.querySelectorAll(".humidity-box span").forEach((ele,index)=>{
    ele.style.height = dataList.forecast.forecastday[0].hour[index].humidity +"%"
 })


 }







 


function getUserDay(){
    let userDate = new Date();
let allDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
document.querySelector(".current-day").innerHTML = allDays[userDate.getDay()]
document.querySelector(".next-day").innerHTML = allDays[(userDate.getDay() + 1) % allDays.length]


document.querySelector(".next-next-day").innerHTML = allDays[(userDate.getDay() + 2) % allDays.length]

}


getUserDay()
 





const internationalApi = `https://api.weatherapi.com/v1/current.json?key=6754075e9be7416cbd0200928240710&q=california`


 async function getInfoForInternationalCities(){
let data =  await fetch(`https://api.weatherapi.com/v1/current.json?key=6754075e9be7416cbd0200928240710&q=california`)
let dataList = await data.json()


document.querySelector(".intro-name").innerHTML = dataList.location.country
document.querySelector(".intro-city").innerHTML = dataList.location.name
document.querySelector(".national-stat-us").innerHTML = dataList.current.condition.text
document.querySelector(".national-temp-us").innerHTML = dataList.current.temp_c +"<sup>o</sup>"
document.querySelector(".national-img-us").src = dataList.current.condition.icon

}


getInfoForInternationalCities()



async function getInfoForBeijinlCities(){
    let data =  await fetch(`https://api.weatherapi.com/v1/current.json?key=6754075e9be7416cbd0200928240710&q=Beijin`)
    let dataList = await data.json()

    
    document.querySelector(".china-name").innerHTML = dataList.location.country
    document.querySelector(".bejin-name").innerHTML = dataList.location.name
    document.querySelector(".national-stat-ch").innerHTML = dataList.current.condition.text
    document.querySelector(".national-temp-ch").innerHTML = dataList.current.temp_c +"<sup>o</sup>"
    document.querySelector(".national-img-ch").src = dataList.current.condition.icon
    
    }
    
    getInfoForBeijinlCities()




    async function getInfoForMoscowlCities(){
        let data =  await fetch(`https://api.weatherapi.com/v1/current.json?key=6754075e9be7416cbd0200928240710&q=moscow`)
        let dataList = await data.json()
       
        
        document.querySelector(".russa-name").innerHTML = dataList.location.country
        document.querySelector(".russa-name").innerHTML = dataList.location.name
        document.querySelector(".national-stat-ru").innerHTML = dataList.current.condition.text
        document.querySelector(".national-temp-ru").innerHTML = dataList.current.temp_c +"<sup>o</sup>"
        document.querySelector(".national-img-ru").src = dataList.current.condition.icon
        
        }
        

        getInfoForMoscowlCities()



closeIconBtn.addEventListener("click",function(){
alertBox.classList.add("d-none")
alertBox.classList.remove("d-block")
})






   subscribeBtn.disabled = true

subscribeBtn.addEventListener("click",()=>{
alertBox.classList.add("d-block")
alertBox.classList.remove("d-none")
subscribeInput.value = ""
subscribeBtn.disabled = true

})


subscribeInput.addEventListener("input",function(){

    vlaidateEmailSubscribe()
})




subscribeInput.addEventListener("blur",function(){
    document.querySelector(".validat-alert").classList.remove("d-block")
document.querySelector(".validat-alert").classList.add("d-none")
    
})






   
   function vlaidateEmailSubscribe(){
if (emailSubscribtionRegix.test(subscribeInput.value)) {
    document.querySelector(".validat-alert").classList.remove("d-block")
document.querySelector(".validat-alert").classList.add("d-none")
    subscribeBtn.disabled = false
}else{
    subscribeBtn.disabled = true
document.querySelector(".validat-alert").classList.add("d-block")
document.querySelector(".validat-alert").classList.remove("d-none")

}





   }




//     go to contact page


contactBtn.addEventListener("click",()=>{

   window.location.assign("contact.html")
})