#!/bin/bash
# usage: dl.sh name url [name url ...]  -> public/a/<name>.<ext>
cd "$(dirname "$0")/../public/a"
while [ $# -gt 1 ]; do
  n=$1; u=$2; shift 2
  ext="${u##*.}"
  curl -sfL -o "$n.$ext" "$u" || echo "FAIL $n"
done
