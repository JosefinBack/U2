//test 1
async function f1() {
    const request = new Request("http://localhost:8000/cities");

    const response = await fetch(request);
    const cities = await response.json();
    if (response.status == 200) {
        console.log("test 1", cities);
    } else {
        console.log("Wrong status, it should be 200");
    }
}

//test 2
async function f2() {
    options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: "Malmö",
            country: "Sweden"
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
        headers: { "Content-Type": "application/json" },
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

//test 7
async function f7() {
    const request = new Request("http://localhost:8000/cities/search?text=en&country=Sweden")

    const responsePromise = await fetch(request);
    const resourse = await responsePromise.json();
    console.log("test 7", resourse);
}

//Uppgifter som är gjorda med .then()

//test 8
function f8() {
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: "Dresden",
            country: "Germany",
        })
    }

    const request = new Request("http://localhost:8000/cities", options)

    const responsePromise = fetch(request);
    responsePromise.then(a1);

    function a1(response) {
        if (response.status == 409) {
            console.log("test 8 OK");
            f9();
        }
        else {
            console.log("test 8 NOT OK");
        }
    }
}

function f9() {
    const options = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            name: "Ystad",
        })
    }

    const request = new Request("http://localhost:8000/cities", options)

    const responsePromise = fetch(request);
    responsePromise.then(a1);

    function a1(response) {
        if (response.status == 400) {
            console.log("test 9 OK");
            f10();
        }
        else {
            console.log("test 9 NOT OK")
        }
    }
}

function f10() {
    const options = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: 56,
        })
    }

    const request = new Request("http://localhost:8000/cities", options)

    const responsePromise = fetch(request);
    responsePromise.then(a1);

    function a1(response) {
        if (response.status == 404) {
            console.log("test 10 OK");
            f11();

        } else {
            console.log("test 10 NOT OK");
        }
    }
}

function f11() {
    const options = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({

        })
    }

    const request = new Request("http://localhost:8000/cities", options)

    const responsePromise = fetch(request);
    responsePromise.then(a1);

    function a1(response) {
        if (response.status == 400) {
            console.log("test 11 OK")
            f12();
        } else {
            console.log("test 11 NOT OK")
        }
    }
}

function f12() {
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            from: "2",
            to: "1",
            password: "pass"
        })
    }

    const request = new Request("http://localhost:8000/message", options);

    const resourcePromise = fetch(request);
    resourcePromise.then(a1);

    function a1(response) {
        if (response.status == 400) {
            console.log("Test 12 OK");
            f13();
        } else {
            console.log("Test 12 NOT OK");
        }
    }
}

function f13() {
    const request = new Request("http://localhost:8000/cities/search");

    const responsePromise = fetch(request);
    responsePromise.then(a1);

    function a1(response) {
        if (response.status == 400) {
            console.log("Test 13 OK");
            f14();
        } else {
            console.log("Test 13 NOT OK")
        }
    }
}

function f14() {
    const options = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: "mordor",
        })
    }

    const request = new Request("http://localhost:8000/mordor", options);

    const responsePromise = fetch(request);
    responsePromise.then(a1);

    function a1(response) {
        if (response.status == 400) {
            console.log("Test 14 OK")
        } else {
            console.log("Test 14 NOT OK")
        }
    }
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
    f8();
}

runTest();
