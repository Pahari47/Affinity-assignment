import type { Product } from "../types/Product.ts";
import { fetchHtml } from "./fetchHtml.ts";
import { parseProducts } from "./parseProducts.ts";

export async function searchProducts(searchTerm: string): Promise<Product[]> {
    const encodedTerm = encodeURIComponent(searchTerm);
    const url = `https://mdcomputers.in/?route=product/search&search=${encodedTerm}`;
    const html = await fetchHtml(url);
    console.log("HTML length:", html.length);
    
    return parseProducts(html);
}