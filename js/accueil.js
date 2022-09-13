const addSecondAnimation = () => {
    const images = Array.from(document.querySelectorAll(".frame"));
    for(let image of images){
        image.addEventListener("mouseover", () =>{
            image.classList.add("next");
        });
        image.addEventListener("mouseleave", () =>{
            image.classList.remove("next");
        })
    }
}

window.addEventListener("load", addSecondAnimation);