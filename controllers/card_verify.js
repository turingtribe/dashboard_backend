const Tesseract = require('tesseract.js');

function verifyInfo(imagePath, name, dob, aadharNumber, debugMode) {

    return Tesseract.recognize(imagePath, 'eng', { logger: e => console.log(e) })
        .then(out => {
            const text = out.data.text;
            const dobRegex = /DOB: (\d{2}\/\d{2}\/\d{4})/;

            // Use the regex pattern to find the DOB in the text
            const match = text.match(dobRegex);
            const dobMatched = (match && match[1] === dob);

            const nameMatched = text.includes(name);
            const aadharMatched = text.includes(aadharNumber);

            const verified = dobMatched && nameMatched && aadharMatched;

            if (debugMode) {
                console.log(match && match[1]);
                console.log(nameMatched);
                console.log(aadharMatched);

                if (verified) {
                    console.log('Verified');
                } else {
                    console.log('Un-Verified');
                }
            }

            return {
                Name: nameMatched,
                DOB: dobMatched,
                AadharNumber: aadharMatched,
                Verified: verified,
            };
        });
}

// Example usage:
/*

// Example usage:
const imagePath = './images/image.jpg'
const name = 'Gagan Pramanik';
const dob = '01/01/1978';
const aadharNumber = '2334 6936 1311';
const debugMode = 1;

verifyInfo(imagePath, name, dob, aadharNumber, debugMode)
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error('Error:', error);
});

*/

module.exports = verifyInfo;