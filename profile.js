let show = 0;
let profile_image = document.getElementById("profile_image");
let slider_indicator = document.getElementById("slider_indicator");

let profile_data = localStorage.getItem("profile_data");
profile_data = JSON.parse(profile_data);

let profile_price = document.getElementById("profile_price");

profile_price.children[0].innerHTML = profile_data.name;
profile_price.children[1].innerHTML = profile_data.type;
profile_price.children[2].innerHTML = `MRP : ` + profile_data.price + ` ₹`;
profile_price.children[3].innerHTML = profile_data.description;

for (let i = 0; i < 5; i++) {
  profile_image.children[i].src = profile_data.profile_image[i];
  slider_indicator.children[i].src = profile_data.profile_image[i];
}

slider_indicator.firstElementChild.style.border = "1.3px red solid";

// add size in profile-->

function set_size(size) {
  let profile_data = localStorage.getItem("profile_data");
  let select_size = document.getElementById("select-size");
  profile_data = JSON.parse(profile_data);
  profile_data.set_size = size;
  localStorage.setItem("profile_data", JSON.stringify(profile_data));
  for (l = 0; l < 5; l++) {
    select_size.children[l].style.border = "white solid 1.6px";
    select_size.children[l].style.boxShadow =
      "1px 1px 1px 1px rgb(182, 181, 181)";
    ("0px 0px 0px 0px ");
    select_size.children[l].style.color = "black";
  }
  select_size.children[size - 5].style.border = "red solid 1.6px";
  select_size.children[size - 5].style.boxShadow = "0px 0px 0px 0px ";
  select_size.children[size - 5].style.color = "red";
}
set_size(5);
//<--- add size in profile

function change() {
  for (i = 0; i < 5; i++) {
    if (i == show) {
      profile_image.children[i].style.zIndex = "2";
      slider_indicator.children[i].style.border = "1.3px red solid";
    } else {
      profile_image.children[i].style.zIndex = "-1";
      slider_indicator.children[i].style.border =
        "1.3px  solid rgb(226, 226, 226)";
    }
  }
}
function left_slider() {
  profile_image.childNodes[0].src =
    "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/0f76f73e-2578-4d62-abab-c5563ea4f78c/NIKE+DUNK+LOW+RETRO.png";
  if (show == 0) show = 4;
  else show--;
  change();
}

function right_slider() {
  profile_image.childNodes[0].src =
    "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/0f76f73e-2578-4d62-abab-c5563ea4f78c/NIKE+DUNK+LOW+RETRO.png";
  if (show == 4) show = 0;
  else show++;
  change();
}

if (JSON.parse(localStorage.getItem("mylike")) != null) {
  JSON.parse(localStorage.getItem("mylike")).forEach((element) => {
    console.log(element);
    if (JSON.parse(localStorage.getItem("profile_data"))._id == element._id) {
      document
        .getElementById("like_profile")
        .firstElementChild.setAttribute(
          "src",
          "./source/menu_icons/like_shoe.svg"
        );
    }
  });
}

///like event

document.getElementById("like_profile").addEventListener("click", () => {
  let like_profile = document.getElementById("like_profile");
  let profile_data = localStorage.getItem("profile_data");
  let mylike = localStorage.getItem("mylike");

  console.log(localStorage.getItem("profile_data"));
  if (mylike == null || JSON.parse(mylike) == null) {
    mylike = [JSON.parse(profile_data)];
    localStorage.setItem("mylike", JSON.stringify(mylike));
    like_profile.firstElementChild.setAttribute(
      "src",
      "./source/menu_icons/like_shoe.svg"
    );
    console.log("nullllll");
  } else {
    console.log("else start");
    mylike = JSON.parse(mylike);
    profile_data = JSON.parse(profile_data);

    let profile_value = -1;
    mylike.forEach((element, index) => {
      if (element._id == profile_data._id) {
        console.log("dislike");
        profile_value = index;
        return false;
      } else {
        console.log("like");

        return true;
      }
    });

    console.log("else end");
    //like
    if (profile_value != -1) {
      for (let j = profile_value; j < mylike.length - 1; j++) {
        mylike[j] = mylike[j + 1];
      }
      mylike.pop();
      localStorage.setItem("mylike", JSON.stringify(mylike));

      like_profile.firstElementChild.setAttribute(
        "src",
        "./source/menu_icons/dislike_shoe.svg"
      );
    }
    ///dislike
    else {
      mylike[mylike.length] = profile_data;
      localStorage.setItem("mylike", JSON.stringify(mylike));
      like_profile.firstElementChild.setAttribute(
        "src",
        "./source/menu_icons/like_shoe.svg"
      );
    }
  }
});

///cart event

document.getElementById("cart-button").addEventListener("click", () => {
  let profile_data = JSON.parse(localStorage.getItem("profile_data"));
  let mycart = localStorage.getItem("mycart");

  if (mycart == null || JSON.parse(mycart) == null) {
    localStorage.setItem("mycart", JSON.stringify([profile_data]));
  } else {
    mycart = JSON.parse(mycart);
    mycart[mycart.length] = profile_data;
    localStorage.setItem("mycart", JSON.stringify(mycart));
  }
});

// cart_add_effect
function cart_add_effect() {
  console.log("cart");
  document.getElementById("cart-button").style.color = "black";
  document.getElementById("cart-button").style.background = "white";
  document.getElementById("cart-button").innerText = "Added Successfully";

  window.setTimeout(() => {
    document.getElementById("cart-button").style.color = "white";
    document.getElementById("cart-button").style.background = "black";
    document.getElementById("cart-button").innerText = "Add to Cart";
  }, 1150);
}
