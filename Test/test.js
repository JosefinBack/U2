//Här testar jag all kod som sedan ska finnas i webbsida-index.js, men det är inte exakt samma kod
//dock finns inga knappar mm, utan bara kod. Ska bara se att jag får den status eller de svar som jag ville ha enligt test-Api

//kopplad till servern 


//nummer 1

//kolla så att jag får en array 

//nummer 2
options = {method: POST}

const request = new Request("http://localhost:8000/cities", options);









// async function f1() {
//     const request = new Request("http://localhost:8000/cities");

//     if(request.method === "POST" && URL.pathname ==="/cities") {
//         const body = await request.json();

//         if("name" in body && "country" in body) {
//             console.log(body);
//         return new Response(JSON.stringify({
//             name: body.city,
//             country: body.country,
//         }), {
//             status: 200,
//             headers: {"Content-Type": "application/json"}
//         });
//     }
//     }

// }
// f1();
