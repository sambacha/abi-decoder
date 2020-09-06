#!/bin/bash

curl \
  --header "Authorization: Token 4ee01390-127f-46fb-a8c8-498dfcb6cd32" \
  --header "Content-Type: application/json" \
  --data "{
    \"values\":[
      {
        \"line\":\"a\",
        \"value\":\"1 %\"
      },
      {
        \"line\":\"b\",
        \"value\":\"2 %\"
      },
      {
        \"line\":\"c\",
        \"value\":\"3 %\"
      }
    ],
    \"sha\":\"${TRAVIS_COMMIT}\"
  }" \
  https://seriesci.com/api/sambacha/abi-decoder/:series/many

