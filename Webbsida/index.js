
//Klienten 

//requests här 

const addedCity= document.querySelector("#cityName").value; 
const addedCounty = document.querySelector("#countryName").value;


//hämta städerna och visa dem på webbsidan
async function getCities() {
    try {
        const request = new Request("http://localhost:8000/cities");
      
        const response = await fetch(request);
        const cities = await response.json();
    
        const citiesDiv = document.querySelector("#cities");
      
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

function addOneCity() {
    options = {method: "POST"}

    const request = new Request("http://localhost:8000/cities", options);




}

  
  // Kör funktionen för att hämta och visa städer
  getCities();
