// Lytter efter at DOM'en er fuldt indlæst, før funktionen 'hentData' køres
window.addEventListener("DOMContentLoaded", hentData);

// API-nøgle og URL til at hente produktdata
const apiURL =
  "https://inrchbadbkirfzkcebcg.supabase.co/rest/v1/TSLNEW?limit=20";
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlucmNoYmFkYmtpcmZ6a2NlYmNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU5NzA4MjYsImV4cCI6MjA0MTU0NjgyNn0.mpSt_VfMJynts4yNhF_lHvJafqeHolxXL7wYKBacfjA";

// Funktion til at hente produktdata fra API'et
function hentData() {
  const params = new URLSearchParams(document.location.search);
  const category = params.get("category");

  // Hvis en kategori er angivet i URL'en, opdateres API-anmodningens URL
  let productURI = apiURL;
  if (category) {
    productURI += `&category=eq.${category}`;
  }

  // Henter produktdata fra API'et
  fetch(productURI, {
    method: "GET",
    headers: {
      apikey: apiKey,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json()) // Konverterer svaret til JSON-format
    .then((produkter) => visProdukter(produkter)) // Sender data til funktionen 'visProdukter'
    .catch((error) => console.error("Fejl ved hentning af data:", error)); // Håndtering af fejl
}
// Funktion til at vise produkterne på siden
function visProdukter(produkter) {
  const skabelon = document.querySelector("#pro").content; // Henter produktskabelonen
  const container = document.querySelector(".grid"); // Bruger grid-div'en til at vise produkterne

  // Gennemgår hvert produkt i de hentede data
  produkter.forEach((produkt) => {
    const kopi = skabelon.cloneNode(true); // Kloner skabelonen for hvert produkt

    // Tjekker om 'ID', 'ProductName', og 'Img' findes
    const productId = produkt.imgname
      ? produkt.imgname.toUpperCase() // Hvis 'imgname' findes, konverteres det til uppercase
      : "defaultId"; // Hvis ikke, sættes en standard-id
    const productName = produkt.productname || "Navnløst produkt"; // Standard hvis productname ikke findes
    const imageName = produkt.Img || "default-image.webp"; // Standard billede hvis Img ikke er defineret
    const productCategory = produkt.productname || "Ukendt kategori"; // Standard kategori hvis produktnavn ikke er tilgængelig
    const productBrand = produkt.subcategory || "Ukendt brand"; // Standard brand hvis subcategory ikke er defineret

    const cleanImageName = (name) =>
      name
        .replace(/[-.]/g, "") // Fjerner bindestreger og punkter fra billednavn
        .replace(/\.webp$/i, "") // Fjerner filtypen ".webp"
        .toLowerCase(); // Konverterer til små bogstaver

    // Rydder imgnavn og Img-feltet for sammenligning
    const cleanImgname = cleanImageName(produkt.img || "");
    const cleanImgField = cleanImageName(produkt.Imgname || "");

    const imgMatch = cleanImgname === cleanImgField; // Sammenligner de to felter for match

    // Sætter billedets kilde og alt-tekst ved hjælp af den lokale 'assets/img' mappe
    kopi.querySelector("img").src = `assets/img/${imageName}`;
    kopi.querySelector("img").alt = productName;

    // Sætter produktkategori og brand, og tilføjer imgnavn hvis der er et match
    kopi.querySelector("h3").textContent = productId;
    if (imgMatch) {
      kopi.querySelector(
        ".text1"
      ).textContent = `${productCategory} | ${productBrand} | Image: ${produkt.imgname}`;
    } else {
      kopi.querySelector(
        ".text1"
      ).textContent = `${productCategory} | ${productBrand}`;
    }

    // Tilfældig indstilling af tilgængelighed (Ledig eller Ikke Ledig)
    const isAvailable = Math.random() > 0.4; // 60% sandsynlighed for at produktet er ledigt

    if (isAvailable) {
      kopi.querySelector(".Brugsvejledning .p1 span").textContent = "Ledig"; // Viser, at produktet er tilgængeligt
    } else {
      kopi.querySelector(".Brugsvejledning .p1 span").textContent =
        "Ikke Ledig"; // Viser, at produktet ikke er tilgængeligt
    }

    // Sætter linket til produktets detaljer
    kopi.querySelector("a").href = `singleview.html?number=${produkt.number}`; // Sætter hyperlink til en enkeltvisning af produktet baseret på dets ID

    // Tilføjer produktet til containeren (grid'en)
    container.appendChild(kopi); // Føjer produktets HTML-kopi til grid-containeren på siden
  });
}
