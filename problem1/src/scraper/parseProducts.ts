import * as Cheerio from "cheerio";
import type { Product } from "../types/Product.ts";

export function parseProducts(html: string): Product[] {
    const $ = Cheerio.load(html);
    
    const products: Product[] = [];
  
    $(".product-grid-item, .product").each((_, element) => {
      const nameEl = $(element).find(".product-title a, .woocommerce-loop-product__title a, h2 a, h3 a, .entry-title a").first();
      const name = nameEl.text().trim();
      
      const priceEl = $(element).find(".price, .woocommerce-Price-amount, .amount, .product-price").first();
      const priceText = priceEl.text().trim();
      
      const anchor = nameEl.length > 0 ? nameEl : $(element).find("a").first();
      const relativeUrl = anchor.attr("href");

      if (name && priceText && relativeUrl) {
        let cleanedPrice = priceText
          .replace(/₹|Rs\.?|INR/gi, "")
          .replace(/\s+/g, "") 
          .trim();
        
        const priceMatch = cleanedPrice.match(/(\d+(?:,\d{2,3})*(?:\.\d{2})?)/);
        
        if (priceMatch && priceMatch[1]) {
          const priceNumber = parseFloat(priceMatch[1].replace(/,/g, ""));
          
          if (!isNaN(priceNumber) && priceNumber > 0) {
            products.push({
              name,
              price: priceNumber,
              url: relativeUrl.startsWith("http")
                ? relativeUrl
                : `https://mdcomputers.in/${relativeUrl}`
            });
          }
        }
      }
    });
  
    return products;
  }
  