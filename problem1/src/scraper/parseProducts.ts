import * as Cheerio from "cheerio";
import type { Product } from "../types/Product.js";

export function parseProducts(html: string): Product[] {
    const $ = Cheerio.load(html);
    const products: Product[] = [];

    $(".product-thumb").each((_, element) => {
        const name = $(element).find(".caption h4 a").text().trim();
        const price = $(element).find(".price").first().text().trim();
        const relativeUrl = $(element).find(".caption h4 a").attr("href");

        if(name && price && relativeUrl) {
            const priceNumber = parseFloat(price.replace(/[^\d.-]/g, ""));
            
            if (!isNaN(priceNumber)) {
                products.push({
                    name,
                    price: priceNumber,
                    url: relativeUrl.startsWith("http") ? relativeUrl : `https://mdcomputers.in/${relativeUrl}`
                })
            }
        }
    })
    
    return products;
}