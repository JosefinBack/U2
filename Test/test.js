//Här testar jag all kod som sedan ska finnas i webbsida-index.js, men det är inte exakt samma kod
//dock finns inga knappar mm, utan bara kod. Ska bara se att jag får den status eller de svar som jag ville ha enligt test-Api

//kopplad till servern 


//nummer 1
async function f1() {
    const request = new Request("http://localhost:8000/cities");
    
    const response = await fetch(request);
    const cities = await response.json();

    if(Array.isArray(cities) && cities.length == 17) {
        if(response.status == 200) {
            console.log("test 1", cities);
        } else {
            console.log("Wrong status, should be 200");
        }
    }
}


//nummer 2
// options = {method: "POST"}

// const request = new Request("http://localhost:8000/cities", options);

//Functionsanrop
f1(); 




