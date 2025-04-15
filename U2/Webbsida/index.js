
//Klienten 

//requests här 

//hämta städerna och visa dem på webbsidan
async function getCities() {
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
}
  
  // Kör funktionen för att hämta och visa städer
  getCities();
