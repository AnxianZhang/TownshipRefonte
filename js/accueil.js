const hasSegAnimation = frame => {
    setTimeout(() => {
        if (frame.classList.contains("seg-anime")) {
            frame.classList.add("next-anime");
        }
    }, 150);
}

const addEvent = frame => {
    frame.addEventListener("mouseover", () => {
        frame.classList.add("seg-anime");
        hasSegAnimation(frame);
    });
    frame.addEventListener("mouseleave", () => {
        frame.classList.remove("seg-anime");
        frame.classList.remove("next-anime");
        hasSegAnimation(frame);
    });
}

const nextAnimation = () => {
    const frames = Array.from(document.querySelectorAll(".frame"));
    frames.forEach((frame) => {
        frame.classList.remove("seg-anime");
        addEvent(frame);
    });
}

const start = () => {
    nextAnimation();
}

window.addEventListener("DOMContentLoaded", start);