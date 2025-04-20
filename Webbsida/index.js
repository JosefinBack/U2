
//Klienten 

//requests här 

const addedCity= document.querySelector("#cityName").value; 
const addedCounty = document.querySelector("#countryName").value;
const addCityButton = document.querySelector("#addButton");

let newCityAndCountry = [];

//hämta städerna och visa dem på webbsidan
async function getCities() {
    try {
        const request = new Request("http://localhost:8000/cities");
      
        const response = await fetch(request);
        const cities = await response.json();
    
        const citiesDiv = document.querySelector("#div1");
      
        for (let i = 0; i < cities.length; i++) {
          const city = cities[i];
          const div = document.createElement("div");
          div.textContent = city.name + ", " + city.country;
          citiesDiv.appendChild(div);
        }

    } catch {
        console.log("Något gick fel");
    }
}


addCityButton.addEventListener("click", function() {
    if(addedCity && addedCounty) {
        newCityAndCountry.push(addedCity, addedCounty
        )
    }

})
  
  // Kör funktionen för att hämta och visa städer
  getCities();
