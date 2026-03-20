import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const attractions = [
  { id: 1, name: "bigtrees", query: "Calaveras_Big_Trees_State_Park" },
  { id: 2, name: "arnoldrim", query: "Stanislaus_National_Forest" },
  { id: 3, name: "caverns", query: "Moaning_Cavern" },
  { id: 4, name: "whitepines", query: "Arnold,_California" },
  { id: 5, name: "lakealpine", query: "Lake_Alpine_(California)" },
  { id: 6, name: "bearvalley", query: "Bear_Valley_Ski_Area" },
  { id: 7, name: "bvxc", query: "Cross-country_skiing" },
  { id: 8, name: "sledding", query: "Sledding" },
  { id: 9, name: "sarafina", query: "Italian_cuisine" },
  { id: 10, name: "giantburger", query: "Hamburger" },
  { id: 11, name: "snowshoe", query: "Brewery" },
  { id: 12, name: "bistro", query: "Coffeehouse" }
];

const destDir = path.join(__dirname, 'public', 'assets', 'attractions');
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

async function download() {
  for (const attr of attractions) {
    try {
      const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${attr.query}&prop=pageimages&format=json&pithumbsize=800`;
      const json = await new Promise((resolve) => {
        https.get(url, { headers: { 'User-Agent': 'MeadowmontCabins/1.0 (contact@meadowmontcabins.com)' } }, (res) => {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => resolve(JSON.parse(data)));
        });
      });
      
      const pages = json.query.pages;
      const pageId = Object.keys(pages)[0];
      const imgUrl = pages[pageId].thumbnail?.source;
      
      if (imgUrl) {
        await new Promise((resolve) => {
          https.get(imgUrl, { headers: { 'User-Agent': 'MeadowmontCabins/1.0' } }, (res) => {
            const file = fs.createWriteStream(path.join(destDir, `${attr.name}.jpg`));
            res.pipe(file);
            file.on('finish', () => resolve());
          });
        });
        console.log(`Downloaded ${attr.name}.jpg`);
      } else {
        // Fallback to a placeholder if wikipedia has no image
        console.log(`No image for ${attr.query}`);
      }
    } catch (e) {
      console.log(`Failed for ${attr.name}: ` + e.message);
    }
  }
}
download();
