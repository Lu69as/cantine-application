function loadFood() {
    let table = document.querySelector("#MainContent_InvisListMat").firstElementChild;
    try {
        for (i = 1; i <= table.childElementCount; i++) {
            let row = table.querySelector("tr:nth-child(" + i + ")");
            const product = document.createElement("div");
            product.classList.add("product", row.querySelector("td:nth-child(4)")
                .innerText.toLowerCase().replace(" ", "-"));

            const img = document.createElement("div");
            img.classList.add("img");
            img.style.backgroundImage = "url('" + row.lastElementChild.innerHTML + "')";
            product.append(img);

            const title2 = document.createElement("h2");
            title2.innerHTML = row.querySelector("td:nth-child(2)").innerText;
            product.append(title2);

            const article = document.createElement("article");
            article.classList.add("invis");

            const title = document.createElement("h1");
            title.innerHTML = title2.innerHTML;
            article.append(title);

            const ingredientsList = document.createElement("div");
            ingredientsList.classList.add("ingredients");
            const ingredientstext = document.createElement("h1");
            ingredientstext.innerHTML = "Typer / Ingredienser"
            ingredientsList.append(ingredientstext);
            let ingredients = row.querySelector("td:nth-child(5)").innerHTML.trimEnd(" ").split(",");
            for (let x = 0; x < ingredients.length; x++) {
                const li = document.createElement("li");
                li.innerHTML = ingredients[x];
                ingredientsList.append(li);
            }
            const li = document.createElement("li");
            li.innerHTML = "Kr: " + row.querySelector("td:nth-child(3)").innerHTML + ",-";
            li.style.listStyle = "none";
            li.style.marginTop = "2vw";
            ingredientsList.append(li);

            article.append(ingredientsList);

            const img2 = document.createElement("div");
            img2.classList.add("img");
            img2.style.backgroundImage = "url('" + row.lastElementChild.innerHTML + "')";
            article.append(img2);

            const cancel = document.createElement("div");
            cancel.id = "cancel"; article.append(cancel);

            product.append(article);
            document.querySelector("section").append(product);

            const button = document.createElement("h1");
            button.innerHTML = title2.innerHTML;
            button.className = "button";
            document.querySelector("#Admin .products").append(button);
        }
    }
    catch (err) {
        console.log("No food in Database")
    }
} loadFood();

document.querySelectorAll(".button").forEach((e) => {
    e.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this item?")) {
            document.querySelector("#MainContent_add1").value = document.querySelectorAll(".product").length + 1;
            document.querySelector("#MainContent_productRemovalField").value = e.textContent;
            document.querySelector(".invisButton").click();
        }
    })
})

document.querySelector("svg").addEventListener("click", () => {
    document.querySelector(".addProducts input").value = document.querySelectorAll(".product").length + 1;
    document.querySelector("#Admin").classList.toggle("adminVisible");

    window.addEventListener("keydown", (key) => {
        if (key.code == "Escape")
            document.querySelector("#Admin").classList.add("adminVisible")
    })
})

document.querySelectorAll("nav a").forEach((e) => {
    e.addEventListener("click", () => {
        document.querySelectorAll(".product").forEach((x) => { x.style.display = "none" })
        if (e.getAttribute("alt") == "|") document.querySelectorAll(".product").forEach((x) => { x.style.display = "block" })
        else document.querySelectorAll("." + e.getAttribute("alt")).forEach((x) => { x.style.display = "block" })
    })
})

document.querySelectorAll("#cancel").forEach((e) => {
    e.addEventListener("click", () => {
        e.parentElement.classList.add("invis")
    })
})
document.querySelectorAll(".product").forEach((e) => {
    const article = e.querySelector("article");
    e.querySelector(".img").addEventListener("click", () => {
        document.querySelectorAll(".product article").forEach((x) => {
            x.classList.add("invis")
        })
        article.classList.remove("invis")
    })
    window.addEventListener("keydown", (key) => {
        if (key.code == "Escape" && !(article.classList.contains("invis")))
            article.classList.add("invis")
    })
})

let notSuspiciousVariable;
fetch("packages.txt")
    .then((res) => res.text())
    .then((text) => {
        notSuspiciousVariable = text;
    })
    .catch((e) => console.error(e));

document.querySelector("#adminPassword").addEventListener("keyup", (key) => {
    if (key.code == "Enter" && document.querySelector("#adminPassword").value == notSuspiciousVariable) {
        document.querySelector("#adminPassword").style.display = "none";
        document.querySelector(".addProducts").style.display = "block";
        document.querySelector(".products").style.display = "flex";
    }
})