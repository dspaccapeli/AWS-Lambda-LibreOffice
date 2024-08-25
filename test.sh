#!/bin/bash

# Read and encode test.html
base64 -i test.html > encoded.html
TEST_HTML_CONTENT=$(cat encoded.html)

# Call the Lambda function
RESPONSE=$(curl -X POST "http://localhost:9000/2015-03-31/functions/function/invocations" \
  -H "Content-Type: application/json" \
  -d '{
    "body": "{\"fileContent\":\"'"$TEST_HTML_CONTENT"'\",\"targetExtension\":\"docx\",\"sourceExtension\":\"html\",\"fileName\":\"test\"}"
  }')

# Extract the convertedFile content from the response
CONVERTED_FILE=$(echo $RESPONSE | jq -r '.body | fromjson | .convertedFile')

# Save the converted file content to a temporary file
echo $CONVERTED_FILE > encoded_response.txt

# Run decode.php
php decode.php

# Clean up the temporary file
rm encoded.html
rm encoded_response.txt