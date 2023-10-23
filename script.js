ergebnis.style.display = "none";

document
.getElementById("searchButton")
.addEventListener("click", fetchData);

function fetchData() {
    var xhr = new XMLHttpRequest();

    const searchString = document.getElementById("searchInput").value;
    var apiUrl = "https://dummyjson.com/products/search?q=" + searchString;
    xhr.open("GET", apiUrl, true);

    const tableBody = document.getElementById("products");
    const responseFailed = document.getElementById("responseFailed");

    tableBody.innerHTML = "";

// Eventlistener implementieren
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
// Abfrage war erfolgreich
        var response = JSON.parse(xhr.responseText);
        const products = response.products;

        if(products.length === 0) {
            responseFailed.textContent = "Keine Produkte gefunden";
            startseite.style.display = "none";
        } else {
        products.forEach((product) => {
            const productDiv = document.createElement("tr");
            productDiv.innerHTML = `
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td>${product.description}</td>
              `;
              tableBody.appendChild(productDiv);
              startseite.style.display = "none";
              ergebnis.style.display = "block";
            });
        }
        } else {
// Abfrage fehlgeschlagen
            responseFailed.textContent =
              "Error: " + xhr.status;
        }
    };

// Netzwerk Error behandeltn
    xhr.onerror = function () {
        responseFailed.textContent = "Netzwerkfehler!";
    };

// Abfrage senden
        xhr.send();
}

// Seite neu laden
function refreshPage() {
    location.reload();
}