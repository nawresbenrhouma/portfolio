#!/usr/bin/env bash
# Prints cv.html with headless Chrome and reports the page count (must be <= 2).
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p .qa
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
python3 -m http.server 8089 >/dev/null 2>&1 &
SERVER=$!
trap 'kill $SERVER' EXIT
sleep 1
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=4000 \
  --print-to-pdf="$PWD/.qa/cv.pdf" http://localhost:8089/cv.html >/dev/null 2>&1
PAGES=$(mdls -name kMDItemNumberOfPages -raw .qa/cv.pdf 2>/dev/null || true)
if ! [[ "$PAGES" =~ ^[0-9]+$ ]]; then
  PAGES=$(python3 -c "import re;print(len(re.findall(rb'/Type\s*/Page[^s]', open('.qa/cv.pdf','rb').read())))")
fi
echo "pages: $PAGES"
[ "$PAGES" -le 2 ] || { echo "cv.html prints to more than 2 pages"; exit 1; }
# Render pages to PNG for visual inspection (macOS PDFKit via swift).
swift scripts/pdf2png.swift .qa/cv.pdf .qa/cv >/dev/null 2>&1 && echo "rendered .qa/cv-page*.png" || echo "page render skipped (swift unavailable)"
