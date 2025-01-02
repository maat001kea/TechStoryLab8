window.addEventListener("DOMContentLoaded", init);

const urlParams = new URLSearchParams(window.location.search);
const number = urlParams.get("number");

console.log(number);

function init() {
  const option = {
    method: "GET",
    headers: {
      apikey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlucmNoYmFkYmtpcmZ6a2NlYmNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU5NzA4MjYsImV4cCI6MjA0MTU0NjgyNn0.mpSt_VfMJynts4yNhF_lHvJafqeHolxXL7wYKBacfjA",
    },
  };

  fetch(
    `https://inrchbadbkirfzkcebcg.supabase.co/rest/v1/TSLNEW?number=eq.${number}`,
    option
  )
    .then((res) => res.json())
    .then((data) => showProduct(data));

  fetch(
    `https://inrchbadbkirfzkcebcg.supabase.co/rest/v1/TSLNEW?limit=3`,
    option
  )
    .then((resa) => resa.json())
    .then((dataa) => handleRec(dataa));
}

function handleRec(recjson) {
  recjson.forEach(showRec);
}

function showProduct(items) {
  const item = items[0];

  document.querySelector("#valgteprod").textContent = item.productname;
  document.querySelector("#prodimg").src = `./assets/img/${item.Img}`;
  document.querySelector("#underimg_a").src = `./assets/img/${item.imga}`;
  document.querySelector("#underimg_b").src = `./assets/img/${item.imgb}`;
  document.querySelector("#underimg_c").src = `./assets/img/${item.imgc}`;
}

function showRec(recitem) {
  const recprod = document.querySelector(".recprod");
  const templateRec = document.querySelector("template").content;
  const clone = templateRec.cloneNode(true);

  clone.querySelector("img").src = `./assets/img/${recitem.Img}`;
  clone.querySelector("p").textContent =
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto consequatur cum error iste minus suscipit amet facilis eos veniam";

  recprod.appendChild(clone);
}
