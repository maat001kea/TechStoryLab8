// Lytter efter at DOM'en er fuldt indlæst, før funktionen "hentData" køres
window.addEventListener("DOMContentLoaded", hentData);

//  Funktionen til at hente produktdata fra API'et,
function hentData() {
  // API-nøgle og URL til at hente produktdata
  fetch("https://inrchbadbkirfzkcebcg.supabase.co/rest/v1/kategorier", {
    method: "GET",
    headers: {
      apikey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlucmNoYmFkYmtpcmZ6a2NlYmNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU5NzA4MjYsImV4cCI6MjA0MTU0NjgyNn0.mpSt_VfMJynts4yNhF_lHvJafqeHolxXL7wYKBacfjA",
    },
  })
    .then((res) => res.json())
    .then((data) => showData(data));
}

function showData(items) {
  console.log(items);
  items.forEach(showCat);
}

function showCat(item) {
  console.log("item", item);

  const template = document.querySelector("template").content;
  const categoryList = document.querySelector("#categoryList");

  // Lav en kopi (får børnene med?)
  const copy = template.cloneNode(true);

  // Ændrer indhold
  copy.querySelector("h3").textContent = item.imgname;
  copy.querySelector("a").href = `produktliste.html?id=${item.category}`;
  copy.querySelector("img").src = `./assets/img/${item.Img}`;

  // Appende
  categoryList.appendChild(copy);
}
