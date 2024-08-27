async function loadProducts() {
  try {
    const response = await fetch("data.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const products = await response.json();
    return products;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

async function collection_load() {
  const data = await loadProducts();

  await localStorage.setItem("collection", JSON.stringify(data[0]));

  for (let i = 0; i < 4; i++) {
    document.getElementById("most_popular").children[i].firstElementChild.src =
      data[0].most_popular[i].image;
    document.getElementById("most_popular").children[
      i
    ].lastElementChild.firstElementChild.innerHTML =
      data[0].most_popular[i].name;
    document.getElementById("most_popular").children[
      i
    ].lastElementChild.lastElementChild.innerHTML =
      "MRP : " + data[0].most_popular[i].price + " ₹";
    document
      .getElementById("most_popular")
      .children[i].addEventListener("click", function profile_data() {
        let collection = localStorage.getItem("collection");
        collection = JSON.parse(collection);
        localStorage.setItem(
          "profile_data",
          JSON.stringify(collection.most_popular[i])
        );
        window.location.href = "./profile.html";
      });
  }

  for (let i = 0; i < 4; i++) {
    document.getElementById("mostsell_formal").children[
      i
    ].firstElementChild.src = data[0].mostsell_formal[i].image;
    document.getElementById("mostsell_formal").children[
      i
    ].lastElementChild.firstElementChild.innerHTML =
      data[0].mostsell_formal[i].name;
    document.getElementById("mostsell_formal").children[
      i
    ].lastElementChild.lastElementChild.innerHTML =
      "MRP : " + data[0].mostsell_formal[i].price + " ₹";

    document
      .getElementById("mostsell_formal")
      .children[i].addEventListener("click", function profile_data() {
        let collection = localStorage.getItem("collection");
        collection = JSON.parse(collection);
        localStorage.setItem(
          "profile_data",
          JSON.stringify(collection.mostsell_formal[i])
        );
        window.location.href = "./profile.html";
      });
  }

  for (let i = 0; i < 4; i++) {
    document.getElementById("mostsell_sneakers").children[
      i
    ].firstElementChild.src = data[0].mostsell_sneakers[i].image;
    document.getElementById("mostsell_sneakers").children[
      i
    ].lastElementChild.firstElementChild.innerHTML =
      data[0].mostsell_sneakers[i].name;
    document.getElementById("mostsell_sneakers").children[
      i
    ].lastElementChild.lastElementChild.innerHTML =
      "MRP : " + data[0].mostsell_sneakers[i].price + " ₹";
    document
      .getElementById("mostsell_sneakers")
      .children[i].addEventListener("click", function profile_data() {
        let collection = localStorage.getItem("collection");
        collection = JSON.parse(collection);
        localStorage.setItem(
          "profile_data",
          JSON.stringify(collection.mostsell_sneakers[i])
        );
        window.location.href = "./profile.html";
      });
  }

  for (let i = 0; i < 4; i++) {
    document.getElementById("mostsell_casual").children[
      i
    ].firstElementChild.src = data[0].mostsell_casual[i].image;
    document.getElementById("mostsell_casual").children[
      i
    ].lastElementChild.firstElementChild.innerHTML =
      data[0].mostsell_casual[i].name;
    document.getElementById("mostsell_casual").children[
      i
    ].lastElementChild.lastElementChild.innerHTML =
      "MRP : " + data[0].mostsell_casual[i].price + " ₹";
    document
      .getElementById("mostsell_casual")
      .children[i].addEventListener("click", function profile_data() {
        let collection = localStorage.getItem("collection");
        collection = JSON.parse(collection);
        localStorage.setItem(
          "profile_data",
          JSON.stringify(collection.mostsell_casual[i])
        );
        window.location.href = "./profile.html";
      });
  }

  for (let i = 0; i < 4; i++) {
    document.getElementById("mostsell_sports").children[
      i
    ].firstElementChild.src = data[0].mostsell_sports[i].image;
    document.getElementById("mostsell_sports").children[
      i
    ].lastElementChild.firstElementChild.innerHTML =
      data[0].mostsell_sports[i].name;
    document.getElementById("mostsell_sports").children[
      i
    ].lastElementChild.lastElementChild.innerHTML =
      "MRP : " + data[0].mostsell_sports[i].price + " ₹";
    document
      .getElementById("mostsell_sports")
      .children[i].addEventListener("click", function profile_data() {
        let collection = localStorage.getItem("collection");
        collection = JSON.parse(collection);
        localStorage.setItem(
          "profile_data",
          JSON.stringify(collection.mostsell_sports[i])
        );
        window.location.href = "./profile.html";
      });
  }
}

collection_load();
