document.getElementById('search').addEventListener('click', event => {
    event.preventDefault()

    let city = document.getElementById('city').value

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=1dd25ac798a84daed3b612ef4b3c9a3e`)
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

    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=1dd25ac798a84daed3b612ef4b3c9a3e`)
      .then(res => {
        let forecast = res.data.list

        for (let i = 5; i < forecast.length; i += 8) {
          console.log(forecast[i])
          let forecastElem = document.createElement('div')
          forecastElem.className = 'forecast'
          forecastElem.innerHTML = `
            <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <img src="..." class="rounded mr-2" alt="...">
                    <strong class="mr-auto">${forecast[i].dt_txt}</strong>
                    <small class="text-muted">${city}</small>
                </div>
                <div class="toast-body">
                    <h4>Weather: ${forecast[i].weather[0].description}</h4>
                    <h5>Temperature: ${forecast[i].main.temp}</h5>
                    <h5>Humidity: ${forecast[i].main.humidity}</h5>
                    <h5>Wind Speed: ${forecast[i].wind.speed}</h5> 
                </div>
            </div>
          `
          document.getElementById('fiveday').append(forecastElem)
        }
      })
      .catch(err => { console.log(err) })
  })

document.getElementsByClassName('list-group-item')[0].addEventListener('mouseover', () =>{


})



/* <h1>${forecast[i].dt_txt}</h1>
<h2>Weather: ${forecast[i].weather[0].description}</h2>
<h3>Temperature: ${forecast[i].main.temp}</h3>
<h3>Humidity: ${forecast[i].main.humidity}</h3>
<h3>Wind Speed: ${forecast[i].wind.speed}</h3> */