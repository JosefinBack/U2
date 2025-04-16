
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

let id= 42; //lägger den här för om dne ligger i functionen så kommer den att återställas varje gång servern tar emot en ny förfrågan. 

//Server
async function handler (request) {
  const url = new URL(request.url);

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

    //få städerna, test 1
    if (request.method === "GET") {
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
          const newCity = {
            id: id++,
            name: body.name,
            country: body.country,
          }
  
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
  
        cities.splice(findCity, 1); 
  
        return new Response(JSON.stringify("Delete OK"), {
          status: 200,
          headers: headerCORS, 
        })
      }
    } 
}
Deno.serve(handler);
