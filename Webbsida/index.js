const addCityButton = document.querySelector("#addButton");
const searchButton = document.querySelector("#searchButton");
const removeButton = document.querySelector("#remove");
const foundCities = document.querySelector("#searcedCities");


function createDeleteButton(city, div) {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.backgroundColor = "red";

    deleteButton.addEventListener("click", async function () {
        const options = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: city.id })
        };

        const request = new Request("http://localhost:8000/cities", options);
        const response = await fetch(request);

        if (response.status === 200) {
            div.remove();
        } else {
            console.log("Something went wrong with delete");
        }
    });

    return deleteButton;
}

// hämta städerna och visa dem på webbsidan
async function getCities() {
    try {
        const request = new Request("http://localhost:8000/cities");
        const response = await fetch(request);
        const cities = await response.json();

        const citiesDiv = document.querySelector("#div1");

        for (let city of cities) {
            const div = document.createElement("div");
            div.textContent = city.name + ", " + city.country;

            const deleteButton = createDeleteButton(city, div);
            div.appendChild(deleteButton);

            citiesDiv.appendChild(div);
        }
    } catch {
        console.log("Something went wrong when trying to show cities");
    }
}

addCityButton.addEventListener("click", async function () {
    const addedCity = document.querySelector("#cityName").value;
    const addedCounty = document.querySelector("#countryName").value;
    const errorMessage = document.querySelector("#errorMessage");
    errorMessage.textContent = "";
    let newCity;

    if (addedCity && addedCounty) {
        newCity = {
            name: addedCity,
            country: addedCounty
        }
    } else {
        errorMessage.textContent = "You must write both a city and a country";
        return;
    }

    try {
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCity),
        };
        const request = new Request("http://localhost:8000/cities", options);
        const response = await fetch(request);

        if (response.status === 200) {
            const createdCity = await response.json(); // vi får tillbaka nya staden med id

            const citiesDiv = document.querySelector("#div1");
            const div = document.createElement("div");
            div.textContent = createdCity.name + ", " + createdCity.country;

            const deleteButton = createDeleteButton(createdCity, div);
            div.appendChild(deleteButton);

            citiesDiv.appendChild(div);
        } else if (response.status === 409) {
            errorMessage.textContent = "The city already exists in the list";
        }

        document.querySelector("#cityName").value = "";
        document.querySelector("#countryName").value = "";

    } catch (error) {
        console.log("Fel vid post");
    }
});

searchButton.addEventListener("click", async function () {
    const searchCity = document.querySelector("#searchCity").value;
    const searchCountry = document.querySelector("#searchCountry").value;
    const errorM = document.querySelector("#errorMessage2");
    errorM.textContent = "";

    if (!searchCity && !searchCountry) {
        errorM.textContent = "You must write something in at least one of the boxes";
        return;
    }

    let url = "http://localhost:8000/cities/search?" //url som ska skickas till servern i förfrågan

    if (searchCity) {
        url += "text=" + searchCity;
    }

    //om användaren har skrivit enbart country, så fixas det här. Om det även finns en city, så läggs det till ett & mellan dem. 
    if (searchCountry) {
        if (searchCity) {
            url += "&";
        }
        url += "country=" + searchCountry;
    }

    try {
        const response = await fetch(url);

        if (response.status == 200) {
            const resourse = await response.json();

            foundCities.textContent = "";

            for (let city of resourse) {
                const div = document.createElement("div");
                div.textContent = city.name + ", " + city.country;
                foundCities.appendChild(div);
            }

        }
    } catch {
        console.log("Something went wrong with search")
    }
});

removeButton.addEventListener("click", function () {
    foundCities.textContent = "";
    searchCity.value = "";
    searchCountry.value = "";

})




getCities();
