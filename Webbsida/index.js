const addCityButton = document.querySelector("#addButton");
addCityButton.classList.add("deleteButton")
const searchButton = document.querySelector("#searchButton");
searchButton.classList.add("deleteButton");
const removeButton = document.querySelector("#remove");
removeButton.classList.add("deleteButton");
const foundCities = document.querySelector("#searcedCities");


function createDeleteButton(city, div) {
    const deleteMessage = document.querySelector("#deleteMessage")
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("deleteButton");

    deleteButton.addEventListener("click", async function () {
        const options = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: city.id
            })
        };

        const request = new Request("http://localhost:8000/cities", options);
        const response = await fetch(request);

        if (response.status === 200) {
            div.remove();
            deleteMessage.textContent = "";

            deleteMessage.textContent = `The city ${city.name} was removed`;

            const okButton = document.createElement("button");
            okButton.textContent = "OK";
            okButton.style.marginLeft = "10px";
            okButton.classList.add("deleteButton");
            deleteMessage.appendChild(okButton);

            okButton.addEventListener("click", function () {
                deleteMessage.textContent = "";
            });
        } else {
            console.log("Something went wrong with delete");
        }
    });
    return deleteButton;
}

async function getCities() {
    try {
        const request = new Request("http://localhost:8000/cities");
        const responsePromise = await fetch(request);
        const cities = await responsePromise.json();

        const citiesDiv = document.querySelector("#div1");
        citiesDiv.innerHTML += `
        <ul></ul>
        `
        for (let city of cities) {
            const div = document.createElement("div");
            div.classList.add("cityDiv");

            div.innerHTML += `
            <li>
            ${city.name}, ${city.country} 
            </li > `;

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
        const responsePromise = await fetch(request);
        const createdCity = await responsePromise.json();

        if (response.status === 200) {
            const citiesDiv = document.querySelector("#div1");
            const div = document.createElement("div");
            div.classList.add("cityDiv");

            div.innerHTML += `
            <li>
            ${createdCity.name}, ${createdCity.country} 
            </li > `;

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
    foundCities.innerHTML = "";

    const searchCity = document.querySelector("#searchCity").value;
    const searchCountry = document.querySelector("#searchCountry").value;
    const errorM = document.querySelector("#errorMessage2");
    errorM.textContent = "";

    if (!searchCity && !searchCountry) {
        errorM.textContent = "You must write something in at least one of the boxes";
        return;
    }

    let url = "http://localhost:8000/cities/search?"

    if (searchCity) {
        url += "text=" + searchCity;
    }

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

            foundCities.innerHTML += `
            <ul></ul>
            `;

            for (let city of resourse) {
                const div = document.createElement("div");
                div.classList.add("city-div");

                div.innerHTML += `
                <li>
                ${city.name}, ${city.country} 
                </li > `;

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
