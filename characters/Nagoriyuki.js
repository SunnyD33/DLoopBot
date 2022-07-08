let puppeteer = require('puppeteer-extra');
let pluginStealth = require('puppeteer-extra-plugin-stealth');
puppeteer.use(pluginStealth);

puppeteer = require('puppeteer');

// Arrays to pass back to Bot.js
const inputArr = [];

const scrapeNagoriyukiData = async () => {
    const browser = await puppeteer.launch({ headless: true });

    try {
        const page = await browser.newPage();
        await page.goto('https://dustloop.com/wiki/index.php?title=GGST/Nagoriyuki/Frame_Data', {timeout: 0, waitUntil: 'networkidle0'});
        
        const [moveInput1] = await page.$x('/html/body/div[3]/div[4]/div[5]/div/div[3]/table/tbody/tr[1]/td[2]');
        const moveValue1 = await moveInput1.getProperty('textContent');
        const moveText1 = await moveValue1.jsonValue();
        inputArr.push(moveText1);

        console.log(inputArr.join(' | '));
    } catch(error) {
        console.log(error);
    } finally {
        browser.close();
    }
}

const getNagoriyukiInputs = () => {
    return inputArr;
}

module.exports = { scrapeNagoriyukiData, getNagoriyukiInputs };