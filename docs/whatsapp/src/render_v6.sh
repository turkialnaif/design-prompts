#!/bin/zsh
cd "$(dirname "$0")"
while IFS='|' read -r html dir k; do
  mkdir -p "../carousels/$dir"
  echo "$PWD/$html ../carousels/$dir/page-$k.png"
done < v6c/manifest.txt | xargs -P 2 -L 1 sh -c 'node shot.mjs "$0" "$1" 1080 1350 || echo FAIL $0'
