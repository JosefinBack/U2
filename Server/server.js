
const cities = [
  { id: 2, name: "Lille", country: "France" },
  { id: 3, name: "Nantes", country: "France" },
  { id: 5, name: "Bremen", country: "Germany" },
  { id: 10, name: "Dresden", country: "Germany" },
  { id: 11, name: "Heidelberg", country: "Germany" },
  { id: 12, name: "Venice", country: "Italy" },
  { id: 13, name: "Rome", country: "Italy" },
  { id: 16, name: "Graz", country: "Austria" },
  { id: 20, name: "Basel", country: "Switzerland" },
  { id: 21, name: "Lucerne", country: "Switzerland" },
  { id: 22, name: "Kraków", country: "Poland" },
  { id: 23, name: "Warsaw", country: "Poland" },
  { id: 24, name: "Poznań", country: "Poland" },
  { id: 28, name: "Ghent", country: "Belgium" },
  { id: 31, name: "Maastricht", country: "Netherlands" },
  { id: 38, name: "Maribor", country: "Slovenia" },
  { id: 42, name: "Strasbourg", country: "France" },
];

let id = 43;

async function handler(request) {
  const url = new URL(request.url);

  const headerCORS = new Headers();
  headerCORS.append("Access-Control-Allow-Origin", "*");
  headerCORS.append("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  headerCORS.append("Access-Control-Allow-Headers", "Content-Type");
  headerCORS.append("Content-Type", "application/json");

  if (request.method === "OPTIONS") {
    return new Response(null,
      { headers: headerCORS });
  }

  if (request.method === "GET") {
    //test 7 
    let filterdArray = [];

    if (url.pathname === "/cities/search" &&
      url.search.includes("text") &&
      url.search.includes("country")) {

      const fullUrl = new URL(request.url);
      const inputText = fullUrl.searchParams.get("text");
      const inputCountry = fullUrl.searchParams.get("country");

      filterdArray = cities.filter(city =>
        city.name.toLowerCase().includes(inputText.toLowerCase()) &&
        city.country.toLowerCase().includes(inputCountry.toLowerCase())
      );

      return new Response(JSON.stringify(filterdArray), {
        status: 200,
        headers: headerCORS,
      });
    }

    //test 6 
    if (url.pathname === "/cities/search") {
      const fullUrl = new URL(request.url);
      const inputText = fullUrl.searchParams.get("text");
      const inputCountry = fullUrl.searchParams.get("country");

      //test 13
      if (!inputText && !inputCountry) {
        return new Response(JSON.stringify({ error: "Must have at leat one searchparam" }), {
          status: 400,
          headers: headerCORS,
        });
      }

      let arrayOfAllCities = cities;

      let newArrayCities = arrayOfAllCities;
      if (inputText) {
        newArrayCities = arrayOfAllCities.filter(city => city.name.toLowerCase().includes(inputText.toLowerCase()));
      }

      let newArrayCountries = newArrayCities;
      if (inputCountry) {
        newArrayCountries = newArrayCities.filter(city => city.country.toLowerCase().includes(inputCountry.toLowerCase()));
      }

      return new Response(JSON.stringify(newArrayCountries), {
        status: 200,
        headers: headerCORS,
      });
    }

    //test 5
    const patternId = new URLPattern({ pathname: "/cities/:id" })

    if (patternId.test(url)) {
      const match = patternId.exec(url);
      const cityRightId = Number(match.pathname.groups.id);

      const findCity = cities.find((city) => city.id === cityRightId);

      return new Response(JSON.stringify(findCity), {
        status: 200,
        headers: headerCORS,
      });
    }

    //få städerna, test 1
    if (url.pathname === "/cities") {
      return new Response(JSON.stringify(cities),
        {
          status: 200,
          headers: headerCORS,
        });
    }
  }

  //test 2 och test 8
  if (request.method === "POST") {
    if (url.pathname === "/cities") {
      let body = await request.json();

      if ("name" in body && "country" in body) {
        const cityAlredyExist = cities.some((city) => city.name === body.name && city.country === body.country)

        //test 8
        if (cityAlredyExist) {
          return new Response(JSON.stringify({ "Message": "City alredy exist in the list" }), {
            status: 409,
            headers: headerCORS,
          });
        }

        const newCity = {
          id: id++,
          name: body.name,
          country: body.country,
        }

        cities.push(newCity);

        return new Response(JSON.stringify(newCity), {
          status: 200,
          headers: headerCORS,
        });
      } else {
        return new Response(JSON.stringify({ "Message": "Missing parts of request" }), {
          status: 400,
          headers: headerCORS,
        });
      }
    }

    //test 12
    if (url.pathname === "/message") {
      return new Response(JSON.stringify({ "Message": "Bad request in url" }), {
        status: 400,
        headers: headerCORS,
      });
    }
  }

  //test 3
  if (request.method === "DELETE") {
    if (url.pathname === "/cities") {
      let body = await request.json();
      let removeId = body.id;

      if (Object.keys(body).length === 0) {
        return new Response(JSON.stringify({ "Message": "Empty request" }), {
          status: 400,
          headers: headerCORS,
        });
      }

      const findCity = cities.findIndex((city) => city.id === removeId);

      if (findCity !== -1) {
        cities.splice(findCity, 1);
      } else {
        return new Response(JSON.stringify({ "Message": "ID not found" }), {
          status: 404,
          headers: headerCORS,
        });
      }

      return new Response(JSON.stringify("Delete OK"), {
        status: 200,
        headers: headerCORS,
      });
    }

    //test 14
    if (url.pathname === "/mordor") {
      return new Response(JSON.stringify({ error: "This city is not real" }), {
        status: 400,
        headers: headerCORS,
      });
    }
  }
}
Deno.serve(handler);
