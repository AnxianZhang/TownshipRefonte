const addNextClass = () => {
    const images = Array.from(document.querySelectorAll(".frame"));
    images.forEach((img) =>{
        img.addEventListener("mouseover", () =>{
            img.classList.add("nextAnim");
        });
        img.addEventListener("mouseleave", () =>{
            img.classList.remove("nextAnim");
        });
    });
}

window.addEventListener("DOMContentLoaded", addNextClass);