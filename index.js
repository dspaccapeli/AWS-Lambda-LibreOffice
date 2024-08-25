const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

module.exports.handler = async (event) => {
  try {
    // Parse the request body
    const body = JSON.parse(event.body);
    const { fileContent, targetExtension, sourceExtension, fileName = 'document' } = body;

    // Decode base64 file content
    const decodedFileContent = Buffer.from(fileContent, 'base64');

    // Create a temporary file path with source extension
    const tempFilePath = path.join('/tmp', `${fileName}.${sourceExtension}`);

    // Write the file to /tmp
    await fs.writeFile(tempFilePath, decodedFileContent);

    // Convert the file using libreoffice
    const convertedFileName = `${fileName}.${targetExtension}`;
    // You need an extension for docx output
    // https://help.libreoffice.org/latest/he/text/shared/guide/start_parameters.html
    const convertToOption = targetExtension === 'docx' ? `${targetExtension}:"Office Open XML Text"` : targetExtension;
    const libreofficeCommand = `
      cd /tmp
      libreoffice7.6 --headless --invisible --nodefault --view --nolockcheck --nologo --norestore --convert-to ${convertToOption} --outdir /tmp ${path.basename(tempFilePath)}
    `;

    // console.log('LibreOffice command:', libreofficeCommand);
    execSync(libreofficeCommand);

    // Read the converted file
    const convertedFilePath = path.join('/tmp', convertedFileName);
    const convertedFileContent = await fs.readFile(convertedFilePath, { encoding: 'base64' });

    // Clean up temporary files
    await fs.unlink(tempFilePath);
    await fs.unlink(convertedFilePath);

    // Return the converted file content
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        convertedFile: convertedFileContent,
        convertedFileName: convertedFileName,
      }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Internal Server Error',
        // message: error.message,
        // stack: error.stack,
      }),
    };
  }
};