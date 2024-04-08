This program was initially created to take a chapter list of an online book series and format it into something more readable. 
It uses fetch to get the HTML content of the page between two specified tags, then gets all URLs from that HTML and passes it into an array.
It then fetches the main text from every URL within the page between the two previously specified tags, filtering out all HTML content. 


Usage: node server.js  [URL*] [KEY PHRASE] 
 The key phrase is something you want to ensure your URL contains. If left empty/undefined, nothing is excluded based on the phrase.
 * = Required

Currently a few aspects of the code is formatted specifically for the site I was scraping, but that is easily changed within the code. 
Currently the regex is formatted to only take .org URLs, but that can be easily changed w/in the code
