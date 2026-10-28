# GreenNewDealPlan.com

Static rewrite of Jon Rynn's Green New Deal Plan site, migrated from Drupal. Plain HTML, CSS and JavaScript only: no framework, no build step, no package manager.

- **Repo:** https://github.com/jonrynn/greennewdealplan (public)
- **Live site:** https://jonrynn.github.io/greennewdealplan/ via GitHub Pages, publishing from `main` at the repo root. Pushing to `main` updates the live site.
- **Original Drupal site** (still up): https://economicreconstruction.org/GreenNewDealPlan. GreenNewDealPlan.com currently redirects there.

## Layout

```
index.html                 redirects to greennewdealplan.html
greennewdealplan.html      home page (hand-written, self-contained markup)
plan/<section>/*.html      program subpages (Interstate, buildings, Transportation, food, manufacturing, billofrights)
howtopay/*.html            funding subpages
css/base.css               shared by every page: color tokens (light + dark), Public Sans font, top bar, footer
css/home.css               home page only
css/site.css               subpages only (article layout, title block, breadcrumb)
js/site.js                 subpages only: renders top bar, breadcrumb and footer
.nojekyll                  tells GitHub Pages to serve files as-is
```

`jonrynn.html` redirects to the bibliography, which now lives in its own repo: https://github.com/jonrynn/jonrynn (live at https://jonrynn.github.io/jonrynn/).

Not yet converted (still Drupal-era markup with broken root-relative `/...` links, not linked from the GND pages): `jonathanmfeldman.html`, `manufacturinggreenprosperity.html`, `melman/*.html`. When converting them, reuse `base.css`, `site.css` and `site.js`.

## Subpage anatomy

Every subpage follows this shape. Adjust `../` to the page's depth.

```html
<head> ... Public Sans font links, ../../css/base.css, ../../css/site.css </head>
<body>
<div id="site-header"><a href="../../greennewdealplan.html">Green New Deal Plan</a></div>
<main class="wrap">
    <article class="article">
        <div class="article-band energy"><h1>Page title</h1></div>
        <p>Content…</p>
    </article>
</main>
<div id="site-footer"></div>
<script src="../../js/site.js"></script>
</body>
```

- The `#site-header` link is a no-JavaScript fallback; `site.js` replaces it with the top bar.
- `site.js` adds the breadcrumb inside `.article-band`. It works out the section from the page's folder using the `SECTIONS` table at the top of the file. Add a row there for a new section folder.
- The class on `.article-band` sets the sector accent color: `energy`, `buildings`, `transportation`, `environment`, `manufacturing`, `education`, `howtopay`.
- To change the top bar or footer on every subpage, edit `site.js`. The home page has its own copy of the top bar and footer markup, so update both.

## Home page

- The program tables, Economic Bill of Rights table and How to Pay cards are plain HTML. When changing a figure, recheck the **Total** row against the sum of the rows (cost and both job columns).
- Subpage breadcrumbs and `site.js` link to these home page anchors, so keep them: `#program`, `#energy`, `#buildings`, `#transportation`, `#environment`, `#manufacturing`, `#billofrights`, `#education`, `#pay`, `#lecture`.
- Sector colors are CSS variables in `base.css` (`--energy`, `--transportation`, …) and are used by both the tables and the emissions bar.

## Conventions

- Use relative links between pages (`plan/food/ccc.html`, `../../greennewdealplan.html`). Never use Drupal-style aliases like `GreenNewDealPlanEnergyWind` or root-relative `/...` paths, which break on GitHub Pages.
- Colors go in the tokens in `base.css`. Every page must work in light and dark mode and at phone widths (check 360px and 390px).
- The "A Green Energy Manufacturing Stimulus Strategy" PDF is intentionally linked to the copy on economicreconstruction.org and **not** committed: it's a published book chapter marked "Not for distribution". Ask before adding it to this public repo.

## Checking changes

There's no test suite. Before committing:

- Make sure every local `href`/`src` resolves to a file, and every `#anchor` exists on its target page.
- Open the changed pages in a browser at desktop width and phone width, in both light and dark mode.

## Workflow

- Commit and push only when Jon asks.
- Work goes directly on `main`, unless Jon asks for a branch for a larger change, as with the redesign.
