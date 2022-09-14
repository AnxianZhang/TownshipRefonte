const hasNextAnimation = _ =>{
    if (_.classList.contains("nextAnim"))
        _.style.border = "transparent";
    setTimeout(() =>{
        if (_.classList.contains("nextAnim") )
            _.style.border = "2px red solid";
    },250);
}

const addNextClass = () => {
    const images = Array.from(document.querySelectorAll(".frame"));
    images.forEach((img) =>{
        img.addEventListener("mouseover", () =>{
            img.classList.add("nextAnim");
            hasNextAnimation(img);
        });
        img.addEventListener("mouseleave", () =>{
            img.classList.remove("nextAnim"); //test
            hasNextAnimation(img)
        });
    });
}

window.addEventListener("DOMContentLoaded", addNextClass);