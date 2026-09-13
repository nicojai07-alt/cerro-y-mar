/**
 * Catálogo Oficial de Productos - Cerro y Mar (Alfajores de Autor)
 * Basado en la identidad oficial y wireframes de catálogo de sabores
 */

const PRODUCTS_DATA = [
  {
    id: "alf-oro-negro",
    name: "Oro Negro",
    category: "especiales",
    filterTags: ["especiales", "clasicos"],
    price: 4500,
    badge: "Insignia Estrella",
    description: "Masa de cacao amargo profundo con un corazón voluptuoso de dulce de leche repostero infusionado con café arábica y baño de chocolate 70% cacao.",
    ingredients: "Dulce de leche artesanal, cacao amargo de origen, café arábica tostado, masa con manteca natural.",
    features: ["Receta Insignia", "Artesanal", "Chocolate 70%"],
    image: "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/53720a80-c3ba-5a4d-9324-36819ebda8a8.png",
    thumbnails: [
      "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/53720a80-c3ba-5a4d-9324-36819ebda8a8.png",
      "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/b0d96b47-7ac3-591e-9eac-1d4ff2fdc49e.png",
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    id: "alf-dubai",
    name: "Dubai",
    category: "especiales",
    filterTags: ["especiales", "argentos"],
    price: 4500,
    badge: "Best Seller",
    description: "Pasta pura de pistachos tostados crocantes combinada con dulce de leche vacuno de primera línea, bajo una doble cobertura crujiente de chocolate belga.",
    ingredients: "Pistacho 100% tostado a mano, dulce de leche repostero, chocolate belga semiamargo.",
    features: ["Pistacho Natural", "Gourmet", "Artesanal"],
    image: "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/b0d96b47-7ac3-591e-9eac-1d4ff2fdc49e.png",
    thumbnails: [
      "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/b0d96b47-7ac3-591e-9eac-1d4ff2fdc49e.png",
      "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/53720a80-c3ba-5a4d-9324-36819ebda8a8.png",
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    id: "alf-calafate",
    name: "Calafate",
    category: "patagonicos",
    filterTags: ["patagonicos", "especiales"],
    price: 4500,
    badge: "Fruto Patagónico",
    description: "El sabor sagrado de nuestra tierra: reducción casera de calafate silvestre cosechado en la estepa patagónica, crema suave y baño de chocolate blanco.",
    ingredients: "Calafate silvestre patagónico, manteca de cacao pura, chocolate blanco fino, dulce de leche.",
    features: ["Fruto Silvestre", "Identidad Patagónica", "Artesanal"],
    image: "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/c69f4986-4d4f-51c5-9bcc-ea63b8f237a2.png",
    thumbnails: [
      "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/c69f4986-4d4f-51c5-9bcc-ea63b8f237a2.png",
      "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/2de595bb-0adb-5c7f-965f-38fbe7e2e8f5.jpeg",
      "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    id: "alf-frambuespecial",
    name: "Frambuespecial",
    category: "patagonicos",
    filterTags: ["patagonicos", "especiales"],
    price: 4500,
    badge: "Cordillera Andina",
    description: "Confitura artesanal de frambuesas andinas con notas ácidas y dulces equilibradas, dulce de leche repostero y baño de chocolate semiamargo.",
    ingredients: "Frambuesas cordilleranas seleccionadas, dulce de leche vacuno, chocolate amargo 60%.",
    features: ["Frambuesas Reales", "Sin Conservantes", "Artesanal"],
    image: "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/2de595bb-0adb-5c7f-965f-38fbe7e2e8f5.jpeg",
    thumbnails: [
      "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/2de595bb-0adb-5c7f-965f-38fbe7e2e8f5.jpeg",
      "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/c69f4986-4d4f-51c5-9bcc-ea63b8f237a2.png",
      "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    id: "alf-licor-dulce",
    name: "Licor Dulce",
    category: "especiales",
    filterTags: ["especiales", "argentos"],
    price: 4500,
    badge: "Crema de Licor",
    description: "Ganache sedosa emulsionada con crema de licor Baileys irlandés, dulce de leche y notas sutiles de café bajo una corteza crocante de chocolate.",
    ingredients: "Licor de crema, dulce de leche premium, café arábica, chocolate semiamargo.",
    features: ["Toque de Licor", "Gourmet", "Artesanal"],
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80",
      "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/8b0c1821-684a-5ee4-bb2a-28518a1a6806.png",
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    id: "alf-vino",
    name: "Vino",
    category: "patagonicos",
    filterTags: ["patagonicos", "argentos", "especiales"],
    price: 4500,
    badge: "Malbec Patagónico",
    description: "Reducción aromática de vino Malbec patagónico en un corazón líquido que sorprende en cada mordisco, rodeado de dulce de leche y chocolate.",
    ingredients: "Reducción de vino Malbec patagónico, dulce de leche repostero, masa especiada, chocolate amargo.",
    features: ["Malbec Patagónico", "Autor", "Artesanal"],
    image: "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/8b0c1821-684a-5ee4-bb2a-28518a1a6806.png",
    thumbnails: [
      "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/8b0c1821-684a-5ee4-bb2a-28518a1a6806.png",
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    id: "alf-comodorense",
    name: "Comodorense",
    category: "clasicos",
    filterTags: ["clasicos", "argentos"],
    price: 4500,
    badge: "Clásico de Autor",
    description: "La receta tradicional perfeccionada en el viento de Comodoro Rivadavia: masa suave con ralladura cítrica, dulce de leche abundante y chocolate.",
    ingredients: "Dulce de leche vacuno tradicional, harina de trigo, ralladura fresca de naranja, manteca y chocolate.",
    features: ["Tradición", "Artesanal", "Producto local"],
    image: "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/c04d4b54-7f83-5699-b01a-c80aaefa535d.png",
    thumbnails: [
      "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/c04d4b54-7f83-5699-b01a-c80aaefa535d.png",
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1548848221-0c2e497ed557?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    id: "alf-sal-marina",
    name: "Sal Marina",
    category: "especiales",
    filterTags: ["especiales", "argentos"],
    price: 4500,
    badge: "Mar Patagónico",
    description: "Contraste sublime: dulce de leche con toque de caramelo y cristales puros de sal marina de la costa atlántica patagónica bajo chocolate amargo.",
    ingredients: "Dulce de leche artesanal, escamas de sal marina patagónica, chocolate negro 65%.",
    features: ["Sal Marina Atlántica", "Equilibrio Único", "Artesanal"],
    image: "https://images.unsplash.com/photo-1548848221-0c2e497ed557?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1548848221-0c2e497ed557?auto=format&fit=crop&w=400&q=80",
      "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/53720a80-c3ba-5a4d-9324-36819ebda8a8.png",
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    id: "alf-oreo",
    name: "Oreo",
    category: "especiales",
    filterTags: ["especiales", "clasicos"],
    price: 4500,
    badge: "Cacao Crocante",
    description: "Tapas extra crocantes de galleta de cacao intenso rellenas con doble capa: crema de vainilla americana y dulce de leche repostero.",
    ingredients: "Galleta de cacao negro estilo Oreo, crema de vainilla, dulce de leche, chocolate blanco y negro.",
    features: ["Textura Crocante", "Doble Relleno", "Artesanal"],
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=400&q=80",
      "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/b0d96b47-7ac3-591e-9eac-1d4ff2fdc49e.png",
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    id: "alf-chocovegan",
    name: "Chocovegan",
    category: "veganos",
    filterTags: ["veganos", "plantbased", "glutenfree", "especiales"],
    price: 4500,
    badge: "Plant Based 100%",
    description: "Masa a base de harina de almendras y cacao puro, rellena de abundante dulce de leche vegetal de coco y avellanas con baño de chocolate 80%.",
    ingredients: "Harina de almendras, dulce de coco artesanal, cacao puro orgánico, avellanas tostadas. Sin lácteos ni derivados animales.",
    features: ["100% Plant Based", "Sin Lácteos", "Artesanal"],
    image: "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/8b617c09-f4fc-5f69-a43f-cbd85c18e1d6.jpeg",
    thumbnails: [
      "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/8b617c09-f4fc-5f69-a43f-cbd85c18e1d6.jpeg",
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    id: "alf-fernet",
    name: "Fernet",
    category: "argentos",
    filterTags: ["argentos", "especiales"],
    price: 4500,
    badge: "Sabor Argento",
    description: "Fusión osada y armónica: ganache infusionada con hierbas botánicas de fernet artesanal cordobés y dulce de leche bajo chocolate negro.",
    ingredients: "Fernet artesanal, dulce de leche repostero, masa de especias, chocolate amargo.",
    features: ["Sabor Argento", "Hierbas Finas", "Artesanal"],
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=400&q=80",
      "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/8b0c1821-684a-5ee4-bb2a-28518a1a6806.png",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    id: "alf-frutos-rojos",
    name: "Frutos Rojos",
    category: "patagonicos",
    filterTags: ["patagonicos", "especiales"],
    price: 4500,
    badge: "Frutos del Bosque",
    description: "Mermelada casera de arándanos, moras y frambuesas patagónicas con centro de dulce de leche suave y baño de chocolate blanco.",
    ingredients: "Mix de frutos rojos patagónicos, chocolate blanco de manteca de cacao, dulce de leche.",
    features: ["Frutos del Bosque", "Sin Químicos", "Artesanal"],
    image: "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/c69f4986-4d4f-51c5-9bcc-ea63b8f237a2.png",
    thumbnails: [
      "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/c69f4986-4d4f-51c5-9bcc-ea63b8f237a2.png",
      "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/2de595bb-0adb-5c7f-965f-38fbe7e2e8f5.jpeg",
      "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    id: "alf-marroc",
    name: "Marroc",
    category: "especiales",
    filterTags: ["especiales", "clasicos", "argentos"],
    price: 4500,
    badge: "Praliné y Maní",
    description: "Masa fina de chocolate con corazón de praliné cremoso de pasta de maní tostado y chocolate con leche y blanco.",
    ingredients: "Pasta pura de maní tostado, chocolate con leche, chocolate blanco, dulce de leche.",
    features: ["Pasta de Maní", "Sedoso", "Artesanal"],
    image: "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/8b617c09-f4fc-5f69-a43f-cbd85c18e1d6.jpeg",
    thumbnails: [
      "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/8b617c09-f4fc-5f69-a43f-cbd85c18e1d6.jpeg",
      "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    id: "alf-integral",
    name: "Integral",
    category: "glutenfree",
    filterTags: ["glutenfree", "plantbased", "clasicos", "veganos"],
    price: 4500,
    badge: "Nutritivo Integral",
    description: "Masa elaborada con harina integral orgánica molida a piedra, azúcar mascabo, semillas de chía y lino, rellena de dulce de leche suave.",
    ingredients: "Harina integral orgánica, semillas tostadas, azúcar mascabo, dulce de leche tradicional.",
    features: ["Harina Integral", "Fibra Natural", "Artesanal"],
    image: "https://images.unsplash.com/photo-1548848221-0c2e497ed557?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1548848221-0c2e497ed557?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    id: "box-especiales",
    name: "Cajas Especiales (x6)",
    category: "combos",
    filterTags: ["combos", "especiales"],
    price: 20000,
    badge: "Colección Especial",
    description: "Selección de 6 alfajores de autor premium: Oro Negro, Dubai Pistacho, Licor Dulce, Marroc, Sal Marina y Oreo en estuche rígido con faja.",
    ingredients: "6 alfajores de 90g de la línea especial en caja de autor rígida.",
    features: ["Estuche Premium", "Ideal Regalo", "6 Sabores Únicos"],
    image: "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/547e5711-a120-59c9-bc77-9c648cef04fe.png",
    thumbnails: [
      "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/547e5711-a120-59c9-bc77-9c648cef04fe.png",
      "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    id: "box-patagonicas",
    name: "Cajas Patagónicas (x6)",
    category: "combos",
    filterTags: ["combos", "patagonicos"],
    price: 20000,
    badge: "Edición Patagónica",
    description: "Homenaje a nuestra región: 2 Calafate, 2 Frambuespecial y 2 Vino Malbec patagónico en estuche exclusivo de colección.",
    ingredients: "6 alfajores elaborados con frutos silvestres y vino de la Patagonia.",
    features: ["100% Patagonia", "Frutos Nativos", "Estuche Regalo"],
    image: "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/547e5711-a120-59c9-bc77-9c648cef04fe.png",
    thumbnails: [
      "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/547e5711-a120-59c9-bc77-9c648cef04fe.png",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    id: "box-argento",
    name: "Cajas Argento (x6)",
    category: "combos",
    filterTags: ["combos", "argentos"],
    price: 20000,
    badge: "Selección Criolla",
    description: "Lo mejor de nuestra pastelería criolla: 2 Comodorense Clásicos, 2 Fernet y 2 Vino Malbec en caja con sello de cera artesanal.",
    ingredients: "6 alfajores representativos de la cultura de repostería argentina.",
    features: ["Sabores de Autor", "Presentación de Lujo", "Artesanal"],
    image: "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/547e5711-a120-59c9-bc77-9c648cef04fe.png",
    thumbnails: [
      "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/547e5711-a120-59c9-bc77-9c648cef04fe.png",
      "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    id: "box-plant-based",
    name: "Caja Plant Based (x6)",
    category: "combos",
    filterTags: ["combos", "veganos", "plantbased"],
    price: 20000,
    badge: "Caja Sustentable",
    description: "6 alfajores 100% vegetales: 3 Chocovegan y 3 Frambuesa con Algarroba. Sin lácteos, sin derivados animales y con todo el sabor artesanal.",
    ingredients: "6 unidades veganas artesanales libres de conservantes y lácteos.",
    features: ["100% Plant Based", "Apto Vegano", "Caja Sustentable"],
    image: "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/8b617c09-f4fc-5f69-a43f-cbd85c18e1d6.jpeg",
    thumbnails: [
      "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/8b617c09-f4fc-5f69-a43f-cbd85c18e1d6.jpeg",
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80"
    ]
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = PRODUCTS_DATA;
}
