import axios from "axios";

export async function fetchHtml(url: string): Promise<string> {
    const response = await axios.get(url, {
        headers: {
            "User-Agent": "Mozila/5.0"
        }
    });
    return response.data;
}