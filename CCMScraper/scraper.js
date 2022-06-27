const puppeteer = require('puppeteer')
const fs = require('fs/promises')
const axios = require('axios')
//Scraper to achieve hops from mr-malt.it

async function start() {
    let hopName, hopPrice, hopLink

    //Connect to CCM Mongo
    const axiosInstance = axios.create({
        baseURL:"http://208.76.221.169/api/"
    });
    //Browse mr-malt
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto("https://www.mr-malt.it/materie-prime/luppoli.html?product_list_limit=all")

    //Scrap hops, prices and links
    const hops = await page.evaluate(()=>{
       return Array.from(document.querySelectorAll(".product-item-link")).map(x=>x.textContent)
    })
    const prices = await page.evaluate(()=>{
        return Array.from(document.querySelectorAll(".price")).map(x=>x.textContent)
    })
    const link = await page.evaluate(()=>{
        return Array.from(document.querySelectorAll(".product-item-link"), a=>a.getAttribute('href'))
    })

    let mergedArray = []
    let arrayLength = hops.length

    //Fill object and push to mongoDB
    for (let i = 0; i < arrayLength; i++){
        prices[i].replace(" ","")
        hopName = hops[i].trim()
        hopPrice = prices[i].trim()
        hopLink = link[i].trim()
        let HopWeeklyCollection = {
            hopName, hopPrice, hopLink
        }
        try{
            const res = await axiosInstance.post("/HopWeeklyCollection", HopWeeklyCollection);
            console.log(res.data)
        }catch (err){
            console.log(err)
        }
        //mergedArray.push(res)
    }
    // Writing on drive. Avoid due to lack of space.
    //await fs.writeFile('newFile.txt', mergedArray.join("\r"))

    await browser.close();
}

start();