import puppeteer from "puppeteer";

export async function fetchHtml(url: string): Promise<string> {
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
  );

  await page.goto(url, {
    waitUntil: "networkidle2",
    timeout: 60000
  });

  try {
    await page.waitForSelector(".product-grid-item, .product", { 
      timeout: 10000 
    });
  } catch (e) {
    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  const html = await page.content();
  await browser.close();

  return html;
}
