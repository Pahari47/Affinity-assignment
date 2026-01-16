#!/bin/bash

URL="$1"

curl -s "$URL" |
awk -F',' '
NR > 1 {
    company = $2
    location = $5

    if (match($8, /[0-9]{4}/)) {
        year = substr($8, RSTART, RLENGTH)
        print year "|" company "|" location
    }
}
' |
sort -n |
awk -F'|' '{ print $2 ", " $3 ", " $1 }'
