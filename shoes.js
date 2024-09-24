var type = "all";
var all = true;

async function fetchShoes() {
  try {
    const response = await fetch("https://trekist.onrender.com/shoes");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const products = await response.json();

    return products;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

async function shoes_load() {
  const data = await fetchShoes();
  if (data != undefined)
    document.getElementById("right").innerHTML =
      "<p class='shoes_heading'>All</p>";

  console.log(data);
  let count = 0;
  data.forEach((element) => {
    if (element.type == type || all == true) {
      count++;
    }
  });
  document.getElementById("right").innerHTML = `<p class='shoes_heading'>${
    type[0].toUpperCase() + type.slice(1)
  } (${count})</p>`;

  data.forEach((element) => {
    if (element.type == type || all == true) {
      console.log(element.name);
      var shoe = document.createElement("div");
      shoe.className = "shoe";
      shoe.innerHTML = `<img class='shoe_image' src="
      ${element.image} 
    " alt=''>

<p class='shoe_name'>
    ${element.name}
     </p>

<p class='shoe_price'> MRP :  
    ${element.price}
     ₹</p>`;

      shoe.addEventListener("click", () => {
        localStorage.setItem("profile_data", JSON.stringify(element));
        window.location.href = "./profile.html";
      });

      document.getElementById("right").appendChild(shoe);
    }
  });
}

shoes_load();

function filter_apply(type_) {
  (type = type_), (all = false);
  if (type_ == "all") {
    all = true;
    type = "all";
  }
  document.getElementById("right").scrollTop = 0;
  shoes_load();
}
