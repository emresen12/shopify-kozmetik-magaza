const fs = require('fs');

const products = [
  // Makyaj
  { cat: "yuz-makyaji,yeni-makyaj", badge: "YENİ", title: "Luminous Foundation", desc: "Cildinize doğal bir ışıltı veren hafif formüllü fondöten.", price: "1250", cprice: "1500" },
  { cat: "goz-makyaji", badge: "ÇOK SATAN", title: "Volume Intense Mascara", desc: "Göz alıcı hacim ve uzunluk için ekstra siyah maskara.", price: "650", cprice: "750" },
  { cat: "dudak,trend", badge: "TREND", title: "Matte Liquid Lipstick", desc: "Dudakları kurutmayan, uzun süre kalıcı mat likit ruj.", price: "450", cprice: "550" },
  { cat: "goz-makyaji", badge: "", title: "Desert Mirage Eyeshadow Palette", desc: "Toprak tonlarında yoğun pigmentli far paleti.", price: "1150", cprice: "1300" },
  { cat: "yuz-makyaji,trend", badge: "TREND", title: "Glow Liquid Highlighter", desc: "Yüzünüzde inci parlaklığı sağlayan likit aydınlatıcı.", price: "550", cprice: "" },

  // Cilt Bakım
  { cat: "temizleyici", badge: "DOĞAL", title: "Gentle Foaming Cleanser", desc: "Cildi kurutmadan derinlemesine temizleyen köpük.", price: "450", cprice: "500" },
  { cat: "nemlendirici,yeni-cilt", badge: "YENİ", title: "Aqua Boost Moisturizer", desc: "Gün boyu nem sağlayan su bazlı hafif nemlendirici.", price: "950", cprice: "1100" },
  { cat: "serum", badge: "ÇOK SATAN", title: "Vitamin C Brightening Serum", desc: "Cilt tonunu eşitleyen ve aydınlatan C vitamini serumu.", price: "1450", cprice: "1700" },
  { cat: "serum,trend", badge: "ETKİLİ", title: "Hyaluronic Acid Plump Serum", desc: "Dolgunlaştırıcı ve yoğun nemlendirici hyaluronik asit serumu.", price: "1250", cprice: "1400" },
  { cat: "temizleyici", badge: "", title: "Micellar Water & Makeup Remover", desc: "Makyajı ve kiri nazikçe arındıran misel su.", price: "350", cprice: "420" },

  // Vücut Bakım
  { cat: "losyon,yeni-vucut", badge: "YENİ", title: "Shea Butter Body Lotion", desc: "Çok kuru ciltler için anında rahatlama sağlayan yoğun losyon.", price: "650", cprice: "800" },
  { cat: "dus-jeli", badge: "FERAH", title: "Citrus Burst Shower Gel", desc: "Sabahları canlandıran narenciye özlü duş jeli.", price: "350", cprice: "400" },
  { cat: "gunes,trend", badge: "YAZ", title: "SPF 50+ Sun Protection Cream", desc: "Yüksek korumalı, leke bırakmayan hafif güneş kremi.", price: "750", cprice: "900" },
  { cat: "losyon", badge: "BESLEYİCİ", title: "Almond Oil Body Butter", desc: "Badem yağlı besleyici ve sıkılaştırıcı vücut kremi.", price: "850", cprice: "1000" },

  // Parfümler
  { cat: "edp,yeni-parfum", badge: "YENİ", title: "Midnight Jasmine EDP 50ml", desc: "Gece açan yasemin ve amberin büyüleyici uyumu.", price: "2450", cprice: "2800" },
  { cat: "edt", badge: "FERAH", title: "Ocean Breeze EDT 100ml", desc: "Okyanus esintisi ve bergamotun tazeleyen dokunuşu.", price: "1150", cprice: "1300" },
  { cat: "niche,trend", badge: "SEÇKİN", title: "Oud & Wood Extrait 30ml", desc: "Nadir odunsu notaların zengin ve kalıcı harmanı.", price: "3850", cprice: "4500" },
  { cat: "edp", badge: "ÇOK SATAN", title: "Vanilla Orchid EDP 100ml", desc: "Sıcak vanilya ve orkide çiçeklerinin romantik buluşması.", price: "1950", cprice: "2200" }
];

const files = [
  'templates/collection.json',
  'templates/collection.makyaj.json',
  'templates/collection.cilt-bakim.json',
  'templates/collection.vucut-bakim.json',
  'templates/collection.yeni-urunler.json'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let json = JSON.parse(content);
  
  let blocks = json.sections.product_grid.blocks;
  let block_order = json.sections.product_grid.block_order;
  
  Object.keys(blocks).forEach(key => {
    if (blocks[key].type === 'product_card') {
      delete blocks[key];
      block_order = block_order.filter(id => id !== key);
    }
  });
  
  products.forEach((p, index) => {
    let blockId = 'card_gen_' + (index + 1);
    blocks[blockId] = {
      type: 'product_card',
      settings: {
        category: p.cat,
        badge_text: p.badge,
        title: p.title,
        description: p.desc,
        price: '₺' + p.price + ',00',
        compare_price: p.cprice ? '₺' + p.cprice + ',00' : ''
      }
    };
    block_order.push(blockId);
  });
  
  json.sections.product_grid.blocks = blocks;
  json.sections.product_grid.block_order = block_order;
  
  fs.writeFileSync(file, JSON.stringify(json, null, 2), 'utf8');
});
console.log('Success');
