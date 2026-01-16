import * as Cheerio from "cheerio";
import type { Product } from "../types/Product.ts";

export function parseProducts(html: string): Product[] {
    const $ = Cheerio.load(html);
    console.log("product-layout count:", $(".product-layout").length);
    console.log("product-thumb count:", $(".product-thumb").length);
    console.log("caption count:", $(".caption").length);
    const products: Product[] = [];
  
    $(".product-layout").each((_, element) => {
      const anchor = $(element).find(".caption h4 a");
  
      const name = anchor.text().trim();
      const price = $(element).find(".price").first().text().trim();
      const relativeUrl = anchor.attr("href");
  
      if (name && price && relativeUrl) {
        products.push({
          name,
          price: price.replace(/\s+/g, " "),
          url: relativeUrl.startsWith("http")
            ? relativeUrl
            : `https://mdcomputers.in/${relativeUrl}`
        });
      }
    });
  
    return products;
  }
  