//Här testar jag all kod som sedan ska finnas i webbsida-index.js, men det är inte exakt samma kod
//dock finns inga knappar mm, utan bara kod. Ska bara se att jag får den status eller de svar som jag ville ha enligt test-Api

//kopplad till servern 


//nummer 1
async function f1() {
    const request = new Request("http://localhost:8000/cities");
    
    const response = await fetch(request);
    const cities = await response.json();
        if(response.status == 200) {
            console.log("test 1", cities);
        } else {
            console.log("Wrong status, it should be 200");
        }
}

//nummer 2
async function f2() {
    options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "name": "Malmö",
            "country": "Sweden"
        })
    }

    const request = new Request("http://localhost:8000/cities", options);

    const responsePromise = await fetch(request);
    const resourcePromise = await responsePromise.json();

    console.log("test 2", resourcePromise)
;    
}

//nummer 3
async function f3() {
    const options = {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            id: 2,
        })
    }

    const request = new Request("http://localhost:8000/cities", options);

    const responsePromise = await fetch(request);
    const resourse = await responsePromise.json();
    
    console.log("test 3", resourse);
}

//test 4
async function f4() {
    
}




//Functionsanrop 
//async/await
f1(); 
f2();
f3();

