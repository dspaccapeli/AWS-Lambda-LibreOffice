<?php

// 1. Read the file containing the base64 string
$inputFilePath = 'encoded_response.txt';
$fileContent = file_get_contents($inputFilePath);

// 2. Extract the base64 string (if necessary)
// In this case, we'll assume the entire file content is the base64 string
// If the base64 string is embedded in other content, you may need to extract it first
$base64String = trim($fileContent);

// 3. Decode the base64 string
$decodedContent = base64_decode($base64String);

// 4. Write the decoded content to a new file
$outputFilePath = 'decoded_output.docx'; // Adjust the file extension based on the expected output format
file_put_contents($outputFilePath, $decodedContent);

echo "File decoded and saved as $outputFilePath";

?>