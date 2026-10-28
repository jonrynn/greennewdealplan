// Shared top bar, breadcrumb and footer for the subpages of GreenNewDealPlan.com.
//
// A page includes it like this (adjust ../ to the page's depth):
//     <div id="site-header"><a href="../../greennewdealplan.html">Green New Deal Plan</a></div>
//     <main class="wrap"><article class="article">
//         <div class="article-band energy"><h1>Title</h1></div>
//         ... page content ...
//     </article></main>
//     <div id="site-footer"></div>
//     <script src="../../js/site.js"></script>
//
// The link inside #site-header is a fallback for browsers without JavaScript;
// this script replaces it.

(function () {
    var HOME = "greennewdealplan.html";

    // Folder (relative to the site root) -> breadcrumb label and link
    var SECTIONS = {
        "plan/Interstate": ["Interstate Renewable Electricity System", "plan/Interstate/interstate.html"],
        "plan/buildings": ["Green Buildings and Housing for All", "plan/buildings/green.html"],
        "plan/Transportation": ["Transportation Reconstruction", HOME + "#transportation"],
        "plan/food": ["Food/Environmental Reconstruction", HOME + "#environment"],
        "plan/manufacturing": ["Manufacturing Reconstruction", "plan/manufacturing/manufacturing.html"],
        "plan/billofrights": ["Economic Bill of Rights", HOME + "#billofrights"],
        "howtopay": ["How to Pay for the Green New Deal", HOME + "#pay"]
    };

    // This script lives in <root>/js/, so the site root is one level up from it.
    var root = new URL("..", document.currentScript.src);
    var page = decodeURI(location.pathname).slice(decodeURI(root.pathname).length);
    var folder = page.slice(0, page.lastIndexOf("/"));

    function link(path, text) {
        return '<a href="' + new URL(path, root).href + '">' + text + "</a>";
    }

    var crumbs = link(HOME, "Green New Deal Plan");
    var section = SECTIONS[folder];
    if (section && section[1] !== page) {
        crumbs += '<span class="sep">&rsaquo;</span>' + link(section[1], section[0]);
    }

    // Same top bar as the home page; the section links go to the home page's anchors
    var header = document.getElementById("site-header");
    if (header) {
        header.innerHTML =
            '<header class="topbar"><div class="wrap">' +
            link(HOME, 'Green New Deal <span>Plan</span>').replace("<a ", '<a class="brand" ') +
            '<nav aria-label="Sections">' +
            link(HOME + "#program", "The Plan") +
            link(HOME + "#billofrights", "Bill of Rights") +
            link(HOME + "#pay", "How to Pay") +
            link(HOME + "#lecture", "Lecture") +
            "</nav></div></header>";
    }

    // Breadcrumb goes above the article title
    var band = document.querySelector(".article-band");
    if (band) {
        band.insertAdjacentHTML("afterbegin", '<nav class="crumbs" aria-label="Breadcrumb">' + crumbs + "</nav>");
    }

    var footer = document.getElementById("site-footer");
    if (footer) {
        footer.innerHTML =
            '<footer class="site-foot"><div class="wrap">' +
            link(HOME, "&larr; Back to the Green New Deal Plan") +
            ' &middot; Twitter: <a href="https://twitter.com/jonathanrynn">@jonathanrynn</a>' +
            " &middot; For more Green New Deal articles see JonRynn.com" +
            "</div></footer>";
    }
})();
