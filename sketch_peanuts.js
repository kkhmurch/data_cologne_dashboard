let peanutsData;
let peanutsPrice;

function peanutsPreload() {
  peanutsData = loadTable('https://docs.google.com/spreadsheets/d/e/2PACX-1vQv4HF1VsJRln3h1I8fpkfoTdrprJY2etWfHVhcwFcRJyfcFRLf-YENkxs6XMPFDVzhi11YuQizNbi1/pub?gid=0&single=true&output=csv', 'csv', 'header')
}

// Extract price time series of peanuts from response data.
function peanutsSetup() {
  peanutsPrice = peanutsData.rows.map(r => Number(r.obj.Preis))
}

// Visualize the price of peanuts as gray-scale stripes with normalised lightness.
function peanutsDraw() {
  strokeWeight(0);
  for (let i = 0; i < peanutsPrice.length; i++) {
    const grayscale = map(peanutsPrice[i], 0, 2000, 0, 255, true);
    fill(grayscale);
    rect(0, map(i, 0, peanutsPrice.length, 0, height), width, height / peanutsPrice.length);
  }
}
