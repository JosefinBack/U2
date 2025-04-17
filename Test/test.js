//Här testar jag all kod som sedan ska finnas i webbsida-index.js, men det är inte exakt samma kod
//dock finns inga knappar mm, utan bara kod. Ska bara se att jag får den status eller de svar som jag ville ha enligt test-Api

//kopplad till servern 


//test 1
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

//test 2
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

    console.log("test 2", resourcePromise);    
}

//test 3
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
    const request = new Request("http://localhost:8000/cities")
    const response = await fetch(request);
    const resourseCities = await response.json();

    console.log("test 4", resourseCities);
}

//test 5 
async function f5() {
    const request = new Request("http://localhost:8000/cities/43")
    const responsePromise = await fetch(request); 
    const resourse = await responsePromise.json();

    console.log("test 5", resourse);
}

//test 6
async function f6() {
    const request = new Request("http://localhost:8000/cities/search?text=en");
    
    const responsePromise = await fetch(request);
    const resourse = await responsePromise.json();
    console.log("test 6", resourse);
}

async function f7() {
    const request = new Request("http://localhost:8000/cities/search?text=en&country=Sweden")

    const responsePromise = await fetch(request); 
    const resourse = await responsePromise.json();
    console.log("test 7", resourse);
}



//Functionsanrop 
//async/await
//skriver dem i en annan funktion eftersom jag vill att de ska köras i exakt denna ordning. De körs inte såhär om de står utan en funktion. 
async function runTest() {
    await f1(); 
    await f2();
    await f3();
    await f4(); 
    await f5();
    await f6();
    await f7();
}

runTest();
