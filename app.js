//set variables
let city

//set up function to retrieve information from API
function samplecity (city) {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=9080b53aa7c66e44b2b1bdd9062e63ab`)
    .then(res => {
      console.log(res.data)
      document.getElementById('today').innerHTML = `
      <h2>${res.data.name}</h2>
      <h3>Weather: ${res.data.weather[0].description}</h3>
      <h3>Temperature: ${res.data.main.temp}</h3>
      <h3>Humidity: ${res.data.main.humidity}</h3>
      <h3>Wind Speed: ${res.data.wind.speed}</h3>
    `
    })
    .catch(err => { console.log(err) })

    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=9080b53aa7c66e44b2b1bdd9062e63ab`)
        .then(res => {
        let forecast = res.data.list

        for (let i = 5; i < forecast.length; i += 8) {
            console.log(forecast[i])
            let forecastElem = document.createElement('div')
            forecastElem.className = 'forecast'
            forecastElem.innerHTML = `
            <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
                <div class="card-header">${forecast[i].dt_txt}</div>
                <div class="card-body">
                    <h5 class="card-title">Weather: ${forecast[i].weather[0].description}</h5>
                    <img src='http://openweathermap.org/img/wn/${forecast[i].weather[0].icon}@2x.png'>               
                    <h5 class="card-title">Temperature: ${forecast[i].main.temp}</h5>
                    <h5 class="card-title">Humidity: ${forecast[i].main.humidity}</h5>
                    <h5 class="card-title">Wind Speed: ${forecast[i].wind.speed}</h5>
                </div>
            </div>
            `
            document.getElementById('fiveday').append(forecastElem)
        }
        })
        .catch(err => { console.log(err) })
}

//run the function for search bar
document.getElementById('search').addEventListener('click', event => {
    event.preventDefault()
    document.getElementById('fiveday').innerHTML=""
    let city = document.getElementById('city').value
    samplecity(city)
    document.getElementById('city').value=''
  })

//run the function for sample cities
document.addEventListener('click', event =>{
    event.preventDefault()
    if (event.target.classList.contains('list-group-item')) {
        let city = event.target.textContent

        document.getElementById('fiveday').innerHTML=""
        samplecity(city)
    }

})  

//change style by click on the sample cities
// document.addEventListener('mouseover', event =>{
    
//     if (event.target.classList.contains('list-group-item')){
//         event.target.classList.toggle('active')
//         // setTimeout(()=>{
//         //     event.target.classList.remove('active')
//         // },300)
//     }
// })
