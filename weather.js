//Accessing html elements
const form=document.querySelector('form');
const input=document.querySelector('#input');
const weather=document.querySelector('#weather');
const apiKey=`d3b64dbcb796fa06aed6022a6af9bbd6`;
//finding date
let currentDate=new Date().toJSON().slice(0,10);
//finding day and time in 12 hour system
let currentHours = new Date().getHours() % 12;
let currentMinutes=new Date().getMinutes();  
let dayName = new Date().toLocaleDateString('en-us', { weekday:"long"})
let checkTime=currentHours >= 12 ? 'AM' : 'PM';  
currentHours = currentHours ? currentHours : 12;
currentMinutes = currentMinutes < 10 ? '0' + currentMinutes : currentMinutes;
let showdayTime=`${dayName} ${currentHours}:${currentMinutes} ${checkTime}`;
//fetching weather api 
const getWeather=async (city) => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try{      
    const response=await fetch(url);
   const data=await response.json();
   return showWeather(data);
    }catch(error){
      console.log('Error:', error)
    }    
}
//showing weather after fetching data from api
const showWeather=(data)=>{
     weather.innerHTML=`<div class="row">
     <div class="col-xs-12">
       <div class="col-xs-12 col-sm-6 col-sm-offset-3 col-lg-4 col-lg-offset-4 weather-panel">
         <div class="col-xs-6">
           <h2>${data.name}<br><small id="date">${currentDate}</small><br><span id="dayTime">${showdayTime}</span></h2>
           <p class="h3"><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" style='font-size:36px'>${data.weather[0].main} </p>
           <br>
           <div>
               <cite>
                  ${data.weather[0].description}
               </cite>
           </div>
         </div>
         <div class="col-xs-6 text-center">
           <div class="h1 temperature">
             <span>${data.main.temp}°C</span>
             <figcaption>Feels Alike:</figcaption><h4>${data.main.feels_like}°C</h4>
             <figcaption>Wind:</figcaption><h4>${data.wind['speed']} km/h
             </h4>
             <figcaption>Degree</figcaption><h4>${data.wind.deg}°</h4>
           </div>`
}
//when input gets submitted 
form.addEventListener('submit',function(event){
  const validLocation = input.value.trim() !== '';
if (!validLocation) {
  alert('Please enter a valid city or country.');
  return;
}
    getWeather(input.value);
    event.preventDefault();
});















