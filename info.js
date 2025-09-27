const searchBtn = document.querySelector("#search");
const namesInfo = document.querySelector("#names");
const physicalInfo = document.querySelector("#physicalInfo");
const geoInfo = document.querySelector("#geoInfo");
const input = document.querySelector("#input") ;
async function info() {
    const rawInput = input.value.trim();
    input.value = "" ;
    if (!rawInput) return;

    const url = `https://restcountries.com/v3.1/name/${rawInput}`;
    // ********** JUST A TEMP MSG ************//
    namesInfo.innerHTML = "Fetching Data ;)";
    physicalInfo.innerHTML = "Fetching Data ;)";
    geoInfo.innerHTML = "Fetching Data ;)";

    try {
        const rawData = await fetch(url);
        const data = await rawData.json();

        // -------- 1. Names + Capital --------
        function nameAndAll() {   // ** OUR DIV 1 OF NAMES , CAPITAL ... //
            namesInfo.innerHTML = "";

            let li1 = document.createElement("li");
            li1.className = "li-common";
            li1.textContent = `Common Name: ${data[0].name.common}`;
            namesInfo.appendChild(li1);

            let li2 = document.createElement("li");
            li2.className = "li-official";
            li2.textContent = `Official Name: ${data[0].name.official}`;
            namesInfo.appendChild(li2);

            let li3 = document.createElement("li");
            li3.className = "li-capital";
            li3.textContent = `Capital: ${data[0].capital?.join(", ") || "N/A"}`;  // USE THIS METHOD CAUSE API WILL GIVE US A ARRAY ;)
            namesInfo.appendChild(li3);
        }

        // -------- 2. Physical Info --------
        function physicalDetails() {
            physicalInfo.innerHTML = "";

            let li1 = document.createElement("li");
            li1.className = "li-population";
            li1.textContent = `Population: ${data[0].population.toLocaleString()}`;
            physicalInfo.appendChild(li1);

            let li2 = document.createElement("li");
            li2.className = "li-area";
            li2.textContent = `Area: ${data[0].area.toLocaleString()} km²`;
            physicalInfo.appendChild(li2);

            const currencies = data[0].currencies;
            if (currencies) {
                const currencyValue = Object.values(currencies)[0];
                let li3 = document.createElement("li");
                li3.className = "li-currency";
                li3.textContent = `Currency: ${currencyValue.name} (${currencyValue.symbol})`;
                physicalInfo.appendChild(li3);
            }

            const languages = data[0].languages;
            if (languages) {
                let li4 = document.createElement("li");
                li4.className = "li-language";
                li4.textContent = `Languages: ${Object.values(languages).join(", ")}`;
                physicalInfo.appendChild(li4);
            }
        }

        // -------- 3. Geographical Info --------
        function geoDetails() {
            geoInfo.innerHTML = "";

            let li1 = document.createElement("li");
            li1.className = "li-region";
            li1.textContent = `Region: ${data[0].region}`;
            geoInfo.appendChild(li1);

            let li2 = document.createElement("li");
            li2.className = "li-subregion";
            li2.textContent = `Subregion: ${data[0].subregion || "N/A"}`;
            geoInfo.appendChild(li2);

            if (data[0].latlng) {
                let li3 = document.createElement("li");
                li3.className = "li-latlng";
                li3.textContent = `Lat: ${data[0].latlng[0]}, Lng: ${data[0].latlng[1]}`;
                geoInfo.appendChild(li3);
            }

            let li4 = document.createElement("li");
            li4.className = "li-borders";
            li4.textContent = `Borders: ${data[0].borders?.join(", ") || "No Borders"}`;
            geoInfo.appendChild(li4);

            let li5 = document.createElement("li");
            li5.className = "li-timezone";
            li5.textContent = `Timezones: ${data[0].timezones?.join(", ") || "N/A"}`;
            geoInfo.appendChild(li5);

            if (data[0].flags?.png) {
                let li6 = document.createElement("li");
                li6.className = "li-flag";
                let img = document.createElement("img");
                img.src = data[0].flags.png;
                img.alt = "Country Flag";
                img.width = 60;
                li6.appendChild(img);
                geoInfo.appendChild(li6);
            }
        }

        // Run all
        nameAndAll();
        physicalDetails();
        geoDetails();

    } catch (err) {
        console.log("error", err);
        namesInfo.innerHTML = "Something went wrong!";
        physicalInfo.innerHTML = "";
        geoInfo.innerHTML = "";
    }
}

searchBtn.addEventListener("click", info);  // ADDED A EVENT LISTNER 

const themeBtn = document.querySelector("#darkTheme");
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});
