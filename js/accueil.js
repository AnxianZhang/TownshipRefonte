const hasNextAnimation = _ =>{
    if (_.classList.contains("next-anim"))
        _.style.border = "transparent";
    setTimeout(() =>{
        if (_.classList.contains("next-anim") )
            _.style.border = "2px red solid";
    },250);
}

const addNextClass = () => {
    const images = Array.from(document.querySelectorAll(".frame"));
    images.forEach((img) =>{
        img.addEventListener("mouseover", () =>{
            img.classList.add("next-anim");
            hasNextAnimation(img);
        });
        img.addEventListener("mouseleave", () =>{
            img.classList.remove("next-anim"); //test
            hasNextAnimation(img);
        });
    });
}

window.addEventListener("DOMContentLoaded", addNextClass);