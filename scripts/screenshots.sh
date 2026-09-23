#!/usr/bin/env bash
# Captures index.html and cv.html at desktop, mobile and 320px, light and dark,
# into .qa/ using real device emulation (scripts/shot.js) and prints overflow.
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p .qa
python3 -m http.server 8088 >/dev/null 2>&1 &
SERVER=$!
trap 'kill $SERVER' EXIT
sleep 1
for page in index cv; do
  for w in 1440 390 320; do
    node scripts/shot.js "http://localhost:8088/${page}.html" ".qa/${page}-${w}-light.png" "$w"
    node scripts/shot.js "http://localhost:8088/${page}.html" ".qa/${page}-${w}-dark.png" "$w" --dark
  done
done
