## Problem1 design choices

The solution is divided into clearly defined layers
Input > Fetching > parsing > Orchestration

It maintainable, testable and also can later be reused in an API or UI

first I try to use only cheerio for render available html. but the site renders product using client-side JavaScript.
Static HTTP requests return only a shell HTML without product data.
thats why used puppeteer, it executes js like a real browser.

#### output format 
I make it like simple and human redable and easy to inspect

```
[
  {
    "name": "Seagate Expansion 2TB External HDD",
    "price": 5399,
    "url": "https://mdcomputers.in/product/..."
  }
]
```
### for running steps
1. cd problem1
run `npm start`