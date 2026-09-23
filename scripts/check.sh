#!/usr/bin/env bash
# Runs every automated check. Exit code is non-zero on any failure.
set -euo pipefail
cd "$(dirname "$0")/.."
echo "== node tests =="
node --test
echo "== html-validate =="
npx --yes html-validate index.html cv.html
echo "== all checks passed =="
