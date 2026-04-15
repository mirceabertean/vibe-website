// ============================================================
// SURSA UNICĂ DE ADEVĂR pentru meniul Vibe Caffè
// Modifică aici → se actualizează automat UI + chatbot
// ============================================================

export interface MenuItem {
  name: string;
  price: number;
  description: string;
  image: string;
  ingredients: string;
  vegan: boolean;
}

export type MenuCategory = 'Espresso' | 'Specialty' | 'Cold Brew' | 'Patiserie';

export const categoryMeta: Record<MenuCategory, { emoji: string; tagline: string }> = {
  Espresso:   { emoji: '☕', tagline: 'Clasice din cafea, de la simplu la complex' },
  Specialty:  { emoji: '✨', tagline: 'Băuturi speciale: matcha, chai, turmeric, pour over' },
  'Cold Brew':{ emoji: '🧊', tagline: 'Cafea rece și răcoritoare pentru vreme caldă' },
  Patiserie:  { emoji: '🥐', tagline: 'Produse de cofetărie și patiserie proaspete zilnic' },
};

export const menuData: Record<MenuCategory, MenuItem[]> = {
  Espresso: [
    { name: 'Espresso',               price: 12, description: 'Shot dublu de espresso intens',                      ingredients: '18g cafea, 36ml extract',                         vegan: true,  image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600&auto=format&fit=crop' },
    { name: 'Ristretto',              price: 12, description: 'Shot ultra-concentrat, sub 15ml',                    ingredients: '18g cafea, sub 15ml extract',                      vegan: true,  image: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=600&auto=format&fit=crop' },
    { name: 'Lungo',                  price: 13, description: 'Espresso prelungit, aromă mai delicată',             ingredients: 'Espresso prelungit cu mai multă apă',              vegan: true,  image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop' },
    { name: 'Americano',              price: 14, description: 'Espresso diluat cu apă caldă',                       ingredients: 'Espresso dublu + apă caldă',                       vegan: true,  image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop' },
    { name: 'Doppio',                 price: 14, description: 'Dublu espresso pentru un boost maxim',               ingredients: '36g cafea, 72ml extract',                          vegan: true,  image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=600&auto=format&fit=crop' },
    { name: 'Con Panna',              price: 15, description: 'Espresso acoperit cu frișcă bătută',                 ingredients: 'Espresso, frișcă bătută',                          vegan: false, image: 'https://images.unsplash.com/photo-1527156231393-7023794f363c?w=600&auto=format&fit=crop' },
    { name: 'Cappuccino',             price: 16, description: 'Espresso cu lapte spumat',                           ingredients: 'Espresso, lapte, spumă de lapte',                  vegan: false, image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&auto=format&fit=crop' },
    { name: 'Flat White',             price: 17, description: 'Microfoam mătăsos peste espresso',                   ingredients: 'Espresso dublu, microfoam de lapte',               vegan: false, image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600&auto=format&fit=crop' },
    { name: 'Latte',                  price: 17, description: 'Espresso cu lapte abundant',                         ingredients: 'Espresso, lapte cremos',                           vegan: false, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&auto=format&fit=crop' },
    { name: 'Café Breve',             price: 18, description: 'Espresso cu amestec de lapte și frișcă',             ingredients: 'Espresso, lapte integral, frișcă lichidă',         vegan: false, image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&auto=format&fit=crop' },
    { name: 'Mocha',                  price: 19, description: 'Espresso cu ciocolată și lapte spumat',              ingredients: 'Espresso, sirop ciocolată, lapte spumat, frișcă',  vegan: false, image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=600&auto=format&fit=crop' },
    { name: 'Latte Macchiato Caramel',price: 20, description: 'Lapte spumat cu espresso și sirop caramel',          ingredients: 'Lapte spumat, espresso, sirop caramel',            vegan: false, image: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=600&auto=format&fit=crop' },
  ],

  Specialty: [
    { name: 'Cortado',        price: 16, description: 'Espresso cu lapte în proporții egale',            ingredients: 'Espresso, lapte',                                    vegan: false, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop' },
    { name: 'Turmeric Latte', price: 18, description: 'Lapte auriu cu turmeric și miere',                ingredients: 'Lapte, turmeric, miere, ghimbir, scorțișoară',        vegan: false, image: '/photo-1669219695489-9163d12a2611.avif' },
    { name: 'Matcha Latte',   price: 19, description: 'Ceai matcha japonez cu lapte cremos',             ingredients: 'Matcha ceremonial, lapte cremos',                    vegan: false, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop' },
    { name: 'Chai Latte',     price: 19, description: 'Ceai chai cu lapte și condimente exotice',        ingredients: 'Ceai chai, lapte, scorțișoară, cardamom, ghimbir',   vegan: false, image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&auto=format&fit=crop' },
    { name: 'Beetroot Latte', price: 19, description: 'Lapte roz cu sfeclă roșie și ghimbir',            ingredients: 'Pudră sfeclă roșie, lapte, ghimbir',                 vegan: false, image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=600&auto=format&fit=crop' },
    { name: 'Rose Latte',     price: 21, description: 'Lapte cremos cu extract de trandafir',            ingredients: 'Extract trandafir, lapte cremos',                    vegan: false, image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=600&auto=format&fit=crop' },
    { name: 'Cold Brew Tonic',price: 21, description: 'Cold brew cu apă tonică și portocală',            ingredients: 'Cold brew, apă tonică, felie de portocală',           vegan: true,  image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=600&auto=format&fit=crop' },
    { name: 'Pour Over',      price: 22, description: 'Cafea filtrată manual, aromă complexă',           ingredients: 'Cafea de specialitate măcinată la comandă, apă filtrată', vegan: true, image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&auto=format&fit=crop' },
  ],

  'Cold Brew': [
    { name: 'Iced Americano',       price: 16, description: 'Espresso dublu cu gheață și apă rece',                ingredients: 'Espresso dublu, gheață, apă rece',                    vegan: true,  image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&auto=format&fit=crop' },
    { name: 'Cold Brew Classic',    price: 18, description: 'Infuzie la rece 12 ore, intensă și lină',             ingredients: 'Cafea grosier măcinată, apă rece, infuzie 12h',        vegan: true,  image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600&auto=format&fit=crop' },
    { name: 'Iced Latte',           price: 19, description: 'Espresso cu lapte rece și gheață',                    ingredients: 'Espresso, lapte rece, gheață',                         vegan: false, image: '/premium_photo-1663933534262-5de49eb4f59f.avif' },
    { name: 'Cold Brew cu Lapte',   price: 20, description: 'Cold brew cu lapte și sirop de vanilie',              ingredients: 'Cold brew, lapte, sirop vanilie',                      vegan: false, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop' },
    { name: 'Frappé Caramel',       price: 21, description: 'Cafea blended cu caramel și frișcă',                  ingredients: 'Espresso, gheață, sirop caramel, lapte, frișcă',       vegan: false, image: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=600&auto=format&fit=crop' },
    { name: 'Cold Brew Portocală',  price: 21, description: 'Cold brew cu suc de portocală și miere',              ingredients: 'Cold brew, suc portocală, miere',                      vegan: false, image: 'https://images.unsplash.com/photo-1576669801820-a9ab287ac2d1?w=600&auto=format&fit=crop' },
    { name: 'Cold Brew Cocos',      price: 21, description: 'Cold brew cu lapte de cocos și scorțișoară',          ingredients: 'Cold brew, lapte de cocos, scorțișoară',               vegan: true,  image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=600&auto=format&fit=crop' },
    { name: 'Nitro Cold Brew',      price: 22, description: 'Cold brew cu azot — cremă naturală',                  ingredients: 'Cold brew, azot alimentar (N2)',                        vegan: true,  image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&auto=format&fit=crop' },
    { name: 'Cold Brew Lavender',   price: 22, description: 'Cold brew cu sirop de lavandă și lămâie',             ingredients: 'Cold brew, sirop lavandă, suc lămâie',                 vegan: true,  image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&auto=format&fit=crop' },
  ],

  Patiserie: [
    { name: 'Croissant cu Unt',   price: 12, description: 'Croissant franțuzesc, crocant și fraged',             ingredients: 'Făină, unt, drojdie, sare, zahăr',                           vegan: false, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop' },
    { name: 'Muffin Afine',       price: 12, description: 'Muffin pufos cu afine proaspete',                     ingredients: 'Făină, afine, ouă, lapte, unt, zahăr',                       vegan: false, image: 'https://images.unsplash.com/photo-1613119719948-d53865658a88?w=600&auto=format&fit=crop' },
    { name: 'Pain au Chocolat',   price: 14, description: 'Aluat foietaj cu ciocolată neagră',                   ingredients: 'Aluat foietaj, ciocolată neagră 70%',                        vegan: false, image: 'https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?w=600&auto=format&fit=crop' },
    { name: 'Brownie',            price: 14, description: 'Brownie dens cu ciocolată și nuci',                   ingredients: 'Ciocolată neagră, unt, ouă, zahăr, nuci',                    vegan: false, image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=600&auto=format&fit=crop' },
    { name: 'Cinnamon Roll',      price: 15, description: 'Rulou cu scorțișoară și glazură de vanilie',          ingredients: 'Aluat brioche, scorțișoară, zahăr, glazură vanilie',          vegan: false, image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=600&auto=format&fit=crop' },
    { name: 'Tartă cu Fructe',    price: 16, description: 'Cremă patisserie cu fructe de sezon',                 ingredients: 'Aluat sablé, cremă patisserie, fructe sezon',                 vegan: false, image: 'https://images.unsplash.com/photo-1508736375612-66c03035c629?w=600&auto=format&fit=crop' },
    { name: 'Ecler Ciocolată',    price: 16, description: 'Ecler cu cremă de vanilie și glazură neagră',         ingredients: 'Aluat choux, cremă vanilie, ciocolată neagră',                vegan: false, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop' },
    { name: 'Cheesecake Vanilie', price: 18, description: 'Cheesecake cremos cu coulis de fructe',               ingredients: 'Cream cheese, frișcă, zahăr, biscuiți, vanilie, coulis fructe', vegan: false, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop' },
    { name: 'Red Velvet',         price: 20, description: 'Felie de tort red velvet cu frosting de brânză',      ingredients: 'Făină, cacao, colorant roșu, frosting cream cheese',          vegan: false, image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&auto=format&fit=crop' },
  ],
};

// ── Helpers folosite de knowledge-base.ts ──────────────────

export function getAllItems(): MenuItem[] {
  return Object.values(menuData).flat();
}

export function getVeganItems(): MenuItem[] {
  return getAllItems().filter(item => item.vegan);
}

export function getCheapestItem(): MenuItem {
  return getAllItems().reduce((a, b) => a.price < b.price ? a : b);
}

export function getMostExpensiveItem(): MenuItem {
  return getAllItems().reduce((a, b) => a.price > b.price ? a : b);
}
