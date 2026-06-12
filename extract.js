const fs = require('fs');

const htmlFile = 'D:/index.html/What_is_a_Building_Plan.html';
const appJsFile = 'D:/Gamuda Tech AI/prototype/app.js';

let htmlContent = fs.readFileSync(htmlFile, 'utf8');

const svgRegex = /(<svg class="plan-wrap" viewBox=".*?(?:<\/svg>))/gs;
let match;
const svgs = [];
while ((match = svgRegex.exec(htmlContent)) !== null) {
    svgs.push(match[1]);
}

if (svgs.length < 3) {
    console.error("Found less than 3 SVGs!");
    process.exit(1);
}

const processedSvgs = svgs.slice(0, 3).map((svg, i) => {
    // Strip callout circles and side annotations which are placed at the end of the SVGs
    svg = svg.replace(/<!-- ── Callout circles ── -->.*?<\/svg>/s, '</svg>');
    svg = svg.replace(/<!-- Callout circles -->.*?<\/svg>/s, '</svg>');
    
    return '`\n' + svg.replace('class="plan-wrap"', `class="drawing-svg" id="svg-page-${i + 1}"`) + '\n`';
});

const pagesArrayContent = processedSvgs.join(',\n\n');

let appJsContent = fs.readFileSync(appJsFile, 'utf8');
const replaceRegex = /const pages = \[.*?\];/s;
appJsContent = appJsContent.replace(replaceRegex, `const pages = [\n${pagesArrayContent}\n];`);

fs.writeFileSync(appJsFile, appJsContent, 'utf8');
console.log("Success! Extracted SVGs and removed callout labels.");
