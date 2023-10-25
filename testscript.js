document.getElementById("searchButton").addEventListener("click", fetchData);

function fetchData() {
    var xhr = new XMLHttpRequest();

    const searchString = document.getElementById("searchInput").value;
    var apiUrl = "https://dummyjson.com/products/search?q=" + searchString;
    xhr.open("GET", apiUrl, true);

    const productList = document.getElementById("products");
    const responseFailed = document.getElementById("responseFailed");

    productList.innerHTML = "";

    // Eventlistener implementieren
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            // Abfrage war erfolgreich
            var response = JSON.parse(xhr.responseText);
            const products = response.products;

            if (products.length === 0) {
                responseFailed.textContent = "Keine Produkte gefunden";
                startseite.style.display = "none";
                neu.style.display = "block";
            } else {
                products.forEach((product) => {
                    const productLink = document.createElement("li");
                    const productAnchor = document.createElement("a");
                    productAnchor.href = product.apiUrl; // Produkt-URL als Linkziel
                    productAnchor.textContent = product.title; // Produktname als Linktext
                    productLink.appendChild(productAnchor);
                    productList.appendChild(productLink);
                  

                    startseite.style.display = "none";
                    ergebnis.style.display = "block";
                    neu.style.display = "block";
                });
            }
        } else {
            // Abfrage fehlgeschlagen
            responseFailed.textContent = "Error: " + xhr.status;
        }
    };

    // Netzwerk Error behandeln
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

  