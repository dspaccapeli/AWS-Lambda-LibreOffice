# LibreOffice Lambda

This repository contains a Dockerized AWS Lambda function that uses LibreOffice to convert files between different formats.

### Features
- Converts files using LibreOffice in an AWS Lambda environment
- Supports various file formats, including HTML to DOCX conversion
- Uses base64 encoding for file input and output

### Limitations:

- Request and Response payload cannot exceed 6 MB, hence you cannot send big files
- The file that you send needs to be encoded in base64
- The file that you receive is encoded in base64

## Prerequisites
- Docker
- AWS CLI
- Node.js
- PHP (for local testing)


## Setup
1. Clone the repository
2. Build the Docker image:
```
docker build -t libreoffice-lambda .
```

## Running Locally
1. Start the Lambda function locally:
   ```
   docker run -p 9000:8080 libreoffice-lambda
   ```
2. Ensure you have PHP installed on your system to run the command in the script.
3. Make the test script executable:
   ```
   chmod +x test.sh
   ```
4. Use the `test.sh` script to test the function:
   ```
   ./test.sh
   ```

This script will:
- Encode a test HTML file
- Send it to the Lambda function
- Decode the response
- Save the converted file as `decoded_output.docx`

## Deployment
Deploy the Docker image to AWS Lambda using the AWS CLI or AWS Console.

## Configuration
- Set Lambda memory to at least 1'200 MB (3'008 MB).
- Set an appropriate timeout (>15 seconds). The Lambda needs to have time to spin up and convert the file (~10 seconds with cold start) [[Relevant StackOverFlow discussion]](https://stackoverflow.com/questions/62948910/aws-lambda-errormessage-task-timed-out-after-3-00-seconds).

Note:

- This is meant to be only a Lambda endpoint and not rely on S3 or external storage
- Remember to configure the Lambda with 3008 MB of memory and appropriate timeout (>15 seconds) 

## Credits

This project utilizes and builds upon several valuable resources:

- [AWS Lambda Node.js image instructions](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-image.html#nodejs-image-instructions)
- [LibreOffice Lambda Base Image](https://github.com/shelfio/libreoffice-lambda-base-image)
- [AWS Lambda LibreOffice](https://github.com/shelfio/aws-lambda-libreoffice)
- [StackOverflow discussion on Lambda timeouts](https://stackoverflow.com/questions/62948910/aws-lambda-errormessage-task-timed-out-after-3-00-seconds)

These resources provided crucial guidance and components for creating a Lambda function capable of converting documents using LibreOffice. We extend our gratitude to the authors and contributors of these projects and discussions.