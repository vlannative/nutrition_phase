# Shop photos for the static preview

For the Python static preview, add one JPG per product here and name it with the product ID plus `.jpg`. The shop will load a matching photo automatically; without one, its existing illustration stays visible.

Examples:

- `moringa-soap.jpg`
- `beef-tallow-body-butter.jpg`
- `pure-kombucha.jpg`
- `hibiscus-kombucha.jpg`
- `pure-ashwagandha.jpg`
- `scoby-culture.jpg`
- `sauerkraut.jpg`
- `beeswax-candles.jpg`

Run `python3 -m http.server 8001` from the project root, then open `http://127.0.0.1:8001/shop.html`.

The admin upload saves the photo with the Laravel product record and is the recommended method for the live catalog. A folder photo only changes the static shop preview; Python does not load product records from the Laravel database. Keep photos small (around 1 MB or less) and use JPG format for this folder option.
