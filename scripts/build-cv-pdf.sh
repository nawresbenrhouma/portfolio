#!/usr/bin/env bash
# Renders cv.html to assets/Nawres_Ben_Rhouma_CV.pdf with headless Chrome (A4, print stylesheet).
set -euo pipefail
cd "$(dirname "$0")/.."
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
python3 -m http.server 8091 >/dev/null 2>&1 &
SERVER=$!
trap 'kill $SERVER' EXIT
sleep 1
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=6000 \
  --print-to-pdf="$PWD/assets/Nawres_Ben_Rhouma_CV.pdf" http://localhost:8091/cv.html >/dev/null 2>&1
ls -la assets/Nawres_Ben_Rhouma_CV.pdf
