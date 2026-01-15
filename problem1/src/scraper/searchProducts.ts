import type { Product } from "../types/Product.js";
import { fetchHtml } from "./fetchHtml.js";
import { parseProducts } from "./parseProducts.js";

export async function searchProducts(searchTerm: string): Promise<Product[]> {
    const encodedTerm = encodeURIComponent(searchTerm);
    const url = `https://mdcomputers.in/?route=product/search&search=${encodedTerm}`;
    const html = await fetchHtml(url);
    
    return parseProducts(html);
}