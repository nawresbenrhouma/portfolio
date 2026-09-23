# Nawres Ben Rhouma — Portfolio

Static portfolio site: `index.html` (main page) and `cv.html` (print-ready CV).
No build step. Plain HTML, CSS and JavaScript.

## Run locally

    python3 -m http.server 8080
    # open http://localhost:8080/

## Checks

    scripts/check.sh          # node tests + html-validate
    scripts/screenshots.sh    # desktop / mobile / 320px screenshots into .qa/
    scripts/print-check.sh    # prints cv.html to .qa/cv.pdf and reports page count

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which publishes the
repo to GitHub Pages at https://nawresbenrhouma.github.io/portfolio/.
In the repo settings, Pages → Source must be "GitHub Actions".

Live: https://nawresbenrhouma.github.io/portfolio/

## Design context

`PRODUCT.md` and `DESIGN.md` are maintained by the impeccable skill and
describe the product intent and the visual system. Read them before changing
the look.
