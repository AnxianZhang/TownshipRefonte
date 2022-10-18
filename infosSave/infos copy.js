var ar;
var tr;
var lc;
var ce;
var gauche;
var droite;
var haut;
var bas;
var basB;
var largeur;

$(init);

function init() {
    ar = $("#AutoReleve");
    tr = $("#TarifsReglement");
    lc = $("#LireCompteur");
    ce = $("#ConseilExplo");
    gauche = $(".smallBlockG");
    droite = $(".smallBlockD");
    haut = $("#bHaut div");
    bas = $("#bBas div");
    basB = $("#bBas");
    largeur = ar.width();

    ar.hover(hover1, quit1);
    tr.hover(hover2, quit2);
    lc.hover(hover3, quit3);
    ce.hover(hover4, quit4);
}

function hover1() {
    haut.css("height", "13em")
    gauche.width(1.3 * largeur)
    gauche.css("margin-right", "0%")
    basB.css("margin-top", "2em")
    //$("#AutoReleve h2 a").css("color", "red")
}

function quit1() {
    haut.css("height", "5em")
    gauche.width(largeur)
    gauche.css("margin-right", "2.5%")
    basB.css("margin-top", "4em")
    //$("#AutoReleve h2 a").css("color", "black")
}

function hover2() {
    haut.css("height", "13em")
    droite.width(1.3 * largeur)
    droite.css("margin-left", "0%")
    basB.css("margin-top", "2em")
}

function quit2() {
    haut.css("height", "5em")
    droite.width(largeur)
    droite.css("margin-left", "2.5%")
    basB.css("margin-top", "4em")
}

function hover3() {
    bas.css("height", "13em")
    gauche.width(1.3 * largeur)
    gauche.css("margin-right", "0%")
    basB.css("margin-top", "2em")
}

function quit3() {
    bas.css("height", "5em")
    gauche.width(largeur)
    gauche.css("margin-right", "2.5%")
    basB.css("margin-top", "4em")
}

function hover4() {
    bas.css("height", "13em")
    droite.width(1.3 * largeur)
    droite.css("margin-left", "0%")
    basB.css("margin-top", "2em")
}

function quit4() {
    bas.css("height", "5em")
    droite.width(largeur)
    droite.css("margin-left", "2.5%")
    basB.css("margin-top", "4em")
}