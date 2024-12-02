#!/bin/sh

if [ -z "$1" ]; then
  echo "Usage: $0 <day>"
  exit 1
fi

day=$1

dest_file_ts="src/p${day}.ts"
dest_file_test="src/p${day}.test.ts"

dest_input_example="inputs/p${day}.txt"
dest_input_day="inputs/p${day}_example.txt"

copy_file() {
  src=$1
  dest=$2
  if [ -e "$dest" ]; then
    echo "File $dest already exists"
  else
    sed "s/\${DAY}/$day/g" "$src" > "$dest"
  fi
}

copy_file "template/p_template.ts" "$dest_file_ts"
copy_file "template/p_template.t.ts" "$dest_file_test"
touch "$dest_input_example"
touch "$dest_input_day"
echo "Created day $day"