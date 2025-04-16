
const cities = [
  { id: 2, name: "Lille", country: "France"},
  { id: 3, name: "Nantes", country: "France"},
  { id: 5, name: "Bremen", country: "Germany"},
  { id: 10, name: "Dresden", country: "Germany"},
  { id: 11, name: "Heidelberg", country: "Germany"},
  { id: 12, name: "Venice", country: "Italy"},
  { id: 13, name: "Rome", country: "Italy"},
  { id: 16, name: "Graz", country: "Austria"},
  { id: 20, name: "Basel", country: "Switzerland"},
  { id: 21, name: "Lucerne", country: "Switzerland"},
  { id: 22, name: "Kraków", country: "Poland"},
  { id: 23, name: "Warsaw", country: "Poland"}, 
  { id: 24, name: "Poznań", country: "Poland"},
  { id: 28, name: "Ghent", country: "Belgium"},
  { id: 31, name: "Maastricht", country: "Netherlands"},
  { id: 38, name: "Maribor", country: "Slovenia"},
  { id: 42, name: "Strasbourg", country: "France"},
];

let id= 43; //lägger den här för om dne ligger i functionen så kommer den att återställas varje gång servern tar emot en ny förfrågan. 

//Server
async function handler (request) {
  const url = new URL(request.url);
  const patternId = new URLPattern({pathname:"/cities/:id"})

  //servern hanterar CORS här
  const headerCORS = new Headers();
  headerCORS.append("Access-Control-Allow-Origin", "*");
  headerCORS.append("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  headerCORS.append("Access-Control-Allow-Headers", "Content-Type");
  headerCORS.append("Content-Type", "application/json");

    if (request.method === "OPTIONS") 
      {return new Response(null, 
        { headers: headerCORS }); 
      }
  
    if (request.method === "GET") {

          //test 6 
    let array = [];
    if(url.pathname === "/cities/search") {
      const urlParams = new URLSearchParams(url.search);
      const searchText = urlParams.get("text");

      array = cities.filter(city => city.name.toLowerCase().includes(searchText.toLowerCase()))

      console.log("Returning cities array:", array);

      return new Response(JSON.stringify(array), {
        status: 200, 
        headers: headerCORS,
      });
    }

    //test 5
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
    if(url.pathname === "/cities") {
      return new Response(JSON.stringify(cities), 
        {status: 200, 
         headers: headerCORS,
      });
    } 

  }

    //test 2
    if(request.method === "POST") {
      if(url.pathname ==="/cities") {
        let body = await request.json(); 
  
        if("name" in body && "country" in body) {
          const cityAlredyExist = cities.some((city) => city.name === body.name && city.country === body.country)

          if(cityAlredyExist) {
            return new Response(JSON.stringify({"Message": "City alredy exist in the list"}), {
              status: 400, 
              headers: headerCORS,
            });
          }

          const newCity = {
            id: id++,
            name: body.name,
            country: body.country,
          }

          cities.push(newCity); //lägg till staden 
  
          return new Response(JSON.stringify(newCity), {
            status: 200,
            headers: headerCORS,
          })
        } 
      }
    }

    //test 3
    if(request.method === "DELETE") {
      if(url.pathname === "/cities") {
        let body = await request.json();
        let removeId = body.id; 
  
        const findCity = cities.findIndex((city) => city.id === removeId);
  
        if(findCity !== -1) {
          cities.splice(findCity, 1); 
        }
  
        return new Response(JSON.stringify("Delete OK"), {
          status: 200,
          headers: headerCORS, 
        })
      }
    } 
}
Deno.serve(handler);
