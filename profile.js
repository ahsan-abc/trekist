
let show = 0 ;
let profile_image=document.getElementById("profile_image");
let slider_indicator=document.getElementById("slider_indicator");

let profile_data = localStorage.getItem("profile_image")

profile_data = JSON.parse(profile_data)


for ( let i = 0 ; i < 5 ; i++)
{
    profile_image.children[i].src=profile_data.profile_image[i];
    slider_indicator.children[i].src=profile_data.profile_image[i];
}


slider_indicator.firstElementChild.style.border = "1.3px red solid";

function change ()
{
    for(i=0;i<5;i++)
        {
         if(i==show)
            { profile_image.children[i].style.zIndex = "2";
slider_indicator.children[i].style.border = "1.3px red solid";

            
            }
         else
            { profile_image.children[i].style.zIndex = "-1";
slider_indicator.children[i].style.border = "1.3px  solid rgb(226, 226, 226)";

            
            }
            
        }

}
function left_slider()
{

    profile_image.childNodes[0].src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/0f76f73e-2578-4d62-abab-c5563ea4f78c/NIKE+DUNK+LOW+RETRO.png"
    if(show==0)
        show =4;
    else
      show--;
   change();
}

function right_slider()
{

    profile_image.childNodes[0].src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/0f76f73e-2578-4d62-abab-c5563ea4f78c/NIKE+DUNK+LOW+RETRO.png"
    if(show==4)
        show =0;
    else
      show++;
      change();
   
}

