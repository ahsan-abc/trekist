async function fetchCollections() {
  try {
    const response = await fetch("https://trekist.onrender.com/collections");
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
  const data = await fetchCollections();

  data.forEach((element) => {
    console.log(element.name);
    var box = document.createElement("div");
    box.className = "box";
    box.innerHTML = `<div class="heading"> ${element.name}</div>`;
    var container = document.createElement("div");
    container.className = "container";
    box.appendChild(container);

    for (let i = 0; i < 4; i++) {
      var sub_box = document.createElement("li");
      sub_box.className = "sub_box";
      sub_box.addEventListener("click", () => {
        localStorage.setItem("profile_data", JSON.stringify(element.shoes[i]));
        window.location.href = "./profile.html";
      });
      sub_box.innerHTML = `<img class="collection_image" src="${element.shoes[i].image}" alt="">
            <div class="collection_name_box">
                <p class="collection_name">${element.shoes[i].name}</p> 
                <p class="collection_price"> MRP : ${element.shoes[i].price}</p>

            </div>`;
      box.lastElementChild.appendChild(sub_box);
    }

    document.getElementById("collection").appendChild(box);
  });
}

collection_load();
