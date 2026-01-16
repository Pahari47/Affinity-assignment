import { getUserInput } from "./io/userInput.ts";
import { searchProducts } from "./scraper/searchProducts.ts";

async function main() {
    try {
        const searchTerm = await getUserInput("Enter product to search: ")

        if(!searchTerm) {
            console.error("Search term is required");
            return;
        }

        const products = await searchProducts(searchTerm);

        console.log("\n Results: \n")
        console.log(JSON.stringify(products, null, 2));
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

main();