function add_event(da) {
  let right = document.getElementById("right");
  for (let k = 0; k < da.length; k++) {
    right.children[k].addEventListener("click", function () {
      console.log(da[k]);
      localStorage.setItem("profile_data", JSON.stringify(da[k]));
      window.location.href = "./profile.html";
    });
  }
}

async function display_shoes(shoes, all, type) {
  let right = document.getElementById("right");
  right.innerHTML = "";
  if (shoes == undefined || shoes.length == 0) {
    console.log("undefined");
    right.innerHTML = `<h1 style="font-size: 40px; color:rgb(107, 107, 107);">NO DATA</h1>`;
  } else {
    for (let i = 0, j = 0; i < shoes.length; i++) {
      if (all == true || type == shoes[i].type) {
        right.innerHTML =
          right.innerHTML +
          `<div class='shoe'>
      <img class='shoe_image' src="` +
          shoes[i].image +
          `" alt=''>
      <p class='shoe_name'>` +
          shoes[i].name +
          ` </p>
      <p class='shoe_price'> MRP : ` +
          shoes[i].price +
          ` ₹</p>
    </div>`;
      } else {
        right.innerHTML =
          right.innerHTML +
          `<div class='shoe' style = 'display: none'>
      <img class='shoe_image' src="` +
          shoes[i].image +
          `" alt=''>
      <p class='shoe_name'>` +
          shoes[i].name +
          ` </p>
      <p class='shoe_price'> MRP : ` +
          shoes[i].price +
          ` ₹</p>
    </div>`;
      }
    }

    add_event(shoes);
  }
}

let data_ = JSON.parse(localStorage.getItem("collection")).shoes;

console.log(data_);

display_shoes(data_, true);

load_data();

function filter_apply(type) {
  if (type != "all") {
    display_shoes(data_, false, type);
  } else {
    display_shoes(data_, true);
  }
}
