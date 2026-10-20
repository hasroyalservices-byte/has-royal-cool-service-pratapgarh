H A S ROYAL COOL SERVICE - Static Website (HTML / CSS / JS), Prayagraj (Allahabad)
=====================================================================================
OPEN: index.html double-click karein. Koi npm/server nahi chahiye. Notepad se kisi bhi page ko edit kar sakte hain.

19 PAGES
  Main     : index, about, services, booking, blog, contact, thank-you
  Services : ac-repair, ac-gas-charging, fridge-repair, washing-machine-repair, geyser-repair, deep-freezer,
             chest-freezer, microwave-repair, ro-water-purifier, kitchen-chimney, led-tv-repair, microwave-magnetron
  (har service ka apna alag HTML page - Notepad mein seedha khol kar edit karein)

LINKING
  - Header "Services" dropdown mein saare 12 service pages listed hain (mobile menu mein bhi).
  - Home / Services page ke har card, icon aur button par click karte hi usi service ka page khulta hai.
  - Footer "Our Services" mein bhi saare 12 pages.

FOLDERS
  css/style.css  - poori styling (brand colours sabse upar :root; neeche "v2 UPDATE" section mein naye rules)
  js/main.js     - menu, booking form (Web3Forms), Call Now conversion tracking
  images/        - har page ka alag folder, details: images/README-IMAGES.txt
  video/         - AC cooling video (Home + Booking page), posters JPG

IMAGES: har page ki image alag hai. images/<page-name>/<page-name>-hero.jpg jaisi file rakhte hi placeholder ki jagah
  aapki photo aa jati hai (4:3 fixed box, object-fit:cover, loading="lazy" decoding="async").

PHONE NUMBER: page par number dikhta nahi, sirf "Call Now" buttons hain. Number badalne ke liye Find & Replace karein:
  +918828634628   (tel: links, WhatsApp link)

LOCATION: sirf Prayagraj / Allahabad aur local areas (Civil Lines, Katra, Naini, Teliyarganj, Dhoomanganj, Chowk, Jhusi ...).

KEPT FROM ORIGINAL: Web3Forms key, Google tag AW-18336661507, call conversion label.
sitemap.xml / robots.txt mein domain https://has-royal-cool-service.netlify.app hai - apna asli domain daal kar replace karein.
PUBLISH: poora folder Netlify par drag-and-drop.

V3 DESIGN UPDATE
  css/style.css ke sabse neeche "v3 PREMIUM DESIGN LAYER" hai: brand colours (--blue, --sky, --orange, --amber) aur
  gradients (--grad, --grad-warm) wahin se badal sakte hain. Text highlight ke liye <b class="hi">text</b> use karein.
  Speed: system fonts, 1 CSS + 1 JS, lazy images, video preload="none", niche ke sections content-visibility:auto.
  (CSS jaan-boojh kar readable rakhi hai taaki Notepad mein edit ho sake; Netlify khud gzip kar deta hai.)
