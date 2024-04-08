const fs = require('fs');


const regex = /(?:\.org\/)(.*)(?:\.html)/;
async function getStory(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const html = await response.text();
        let content = html.substring(html.indexOf('<div id="content">'), html.indexOf('<div id="right">'));
        content = content.replace(/<[^>]*>/g, "");
        return content;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return null;
    }
}

async function getURLArr(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const html = await response.text();
        let content = html.substring(html.indexOf('<div id="content">'), html.indexOf('<div id="right">'));
        content = content.split(`"`);
        content = content.filter((item) => item.includes('http://') || item.includes('https://'));
        if(process.argv[3] != undefined) {
        content = content.filter((item) => item.includes(process.argv[3]));
        }
        return content;
    } catch (e) {
        console.log(`There was a problem with the fetch operation: ${e}`);
        return [];
    }
}

async function main() {
    const urlArr = await getURLArr(process.argv[2]);
    for (let i = 0; i < urlArr.length; i++) {
        const storyContent = await getStory(urlArr[i]);
        if (storyContent) {
            const matchResult = urlArr[i].match(regex);
            if (matchResult && matchResult[1] !== null) {
                let fileName;
                if (matchResult[1] === null) {
                    fileName = `NULL ${urlArr[i]}.txt`;
                } else {
                    fileName = `${matchResult[1]}.txt`;
                }
                fs.writeFile(fileName, storyContent, err => {
                    if (err) {
                        console.error(`Error writing file ${fileName}: ${err}`);
                    } else {
                        console.log(`File ${fileName} written successfully. File #${i + 1} out of ${urlArr.length}`);
                    }
                });
            } else {
                console.error(`Error: Unable to extract text from URL: ${urlArr[i]}. File #${i + 1} out of ${urlArr.length}`);
            }
        }
    }
}
if (process.argv[2] == '-h' || process.argv[2] == '--help') {
    console.log("Usage: node server.js [URL*] [KEY PHRASE] \n The key phrase is something you want to ensure your URL contains. \n * = Required");
} else {
main();
}