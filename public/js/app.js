console.log('Client side javascript file is loaded!')

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#report1')
const message2 = document.querySelector('#report2')
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
   const location= search.value   
   message1.textContent="Loading"
 
fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
              
           message1.className = "alert alert-danger";
           message1.innerHTML = data.error
        } else {
           message1.className = "alert alert-success"
           message2.className = "alert alert-success"
             message1.textContent = data.location 
             message2.textContent= "The Forecast summary is "+data.forecast.summary+" \n"+data.forecast.temperature+"deg C \n Wind speed is"+data.forecast.windSpeed+" m/s"
            
        }
    })
})

    
    console.log(location)
   
})
