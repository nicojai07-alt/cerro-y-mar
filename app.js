/**
 * CERRO & MAR | ALFAJORES DE AUTOR
 * Application Logic & Full-Stack UX State Management
 * Sincronizado con Wireframes UX/UI (01 a 05) y Flujo de Usuario
 */

(function () {
  "use strict";

  // CONFIGURATION
  const WHATSAPP_PHONE = "5492975928775";
  const LOCAL_STORAGE_KEY = "cerro_mar_cart_v3";
  const USER_STORAGE_KEY = "cerro_mar_user_v3";
  const SHIPPING_COST = 1500;

  // COUPONS DATABASE
  const VALID_COUPONS = {
    CERRO10: { type: "percent", value: 10, label: "10% OFF" },
    PATAGONIA15: { type: "percent", value: 15, label: "15% OFF" },
    BIENVENIDO: { type: "fixed", value: 2000, label: "$ 2.000 OFF" }
  };

  // FALLBACK DATASET IN CASE OF DELAYED LOAD
  const CATALOG_PRODUCTS = (typeof PRODUCTS_DATA !== "undefined" && Array.isArray(PRODUCTS_DATA) && PRODUCTS_DATA.length > 0)
    ? PRODUCTS_DATA
    : [
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
          thumbnails: ["https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/53720a80-c3ba-5a4d-9324-36819ebda8a8.png"]
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
          thumbnails: ["https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/b0d96b47-7ac3-591e-9eac-1d4ff2fdc49e.png"]
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
          thumbnails: ["https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/c69f4986-4d4f-51c5-9bcc-ea63b8f237a2.png"]
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
          thumbnails: ["https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/2de595bb-0adb-5c7f-965f-38fbe7e2e8f5.jpeg"]
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
          image: "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/8b0c1821-684a-5ee4-bb2a-28518a1a6806.png",
          thumbnails: ["https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/8b0c1821-684a-5ee4-bb2a-28518a1a6806.png"]
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
          thumbnails: ["https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/8b0c1821-684a-5ee4-bb2a-28518a1a6806.png"]
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
          thumbnails: ["https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/c04d4b54-7f83-5699-b01a-c80aaefa535d.png"]
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
          image: "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/53720a80-c3ba-5a4d-9324-36819ebda8a8.png",
          thumbnails: ["https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/53720a80-c3ba-5a4d-9324-36819ebda8a8.png"]
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
          image: "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/b0d96b47-7ac3-591e-9eac-1d4ff2fdc49e.png",
          thumbnails: ["https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/b0d96b47-7ac3-591e-9eac-1d4ff2fdc49e.png"]
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
          thumbnails: ["https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/8b617c09-f4fc-5f69-a43f-cbd85c18e1d6.jpeg"]
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
          image: "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/c04d4b54-7f83-5699-b01a-c80aaefa535d.png",
          thumbnails: ["https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/c04d4b54-7f83-5699-b01a-c80aaefa535d.png"]
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
          thumbnails: ["https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/c69f4986-4d4f-51c5-9bcc-ea63b8f237a2.png"]
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
          thumbnails: ["https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/8b617c09-f4fc-5f69-a43f-cbd85c18e1d6.jpeg"]
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
          image: "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/8b617c09-f4fc-5f69-a43f-cbd85c18e1d6.jpeg",
          thumbnails: ["https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/8b617c09-f4fc-5f69-a43f-cbd85c18e1d6.jpeg"]
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
          image: "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/8b617c09-f4fc-5f69-a43f-cbd85c18e1d6.jpeg",
          thumbnails: ["https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/8b617c09-f4fc-5f69-a43f-cbd85c18e1d6.jpeg"]
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
          image: "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/c69f4986-4d4f-51c5-9bcc-ea63b8f237a2.png",
          thumbnails: ["https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/c69f4986-4d4f-51c5-9bcc-ea63b8f237a2.png"]
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
          image: "https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/c04d4b54-7f83-5699-b01a-c80aaefa535d.png",
          thumbnails: ["https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/c04d4b54-7f83-5699-b01a-c80aaefa535d.png"]
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
          thumbnails: ["https://us-east-1-prod-treinta-assets-bucket.s3.amazonaws.com/8b617c09-f4fc-5f69-a43f-cbd85c18e1d6.jpeg"]
        }
      ];

  // APP STATE
  const state = {
    products: CATALOG_PRODUCTS,
    filteredProducts: CATALOG_PRODUCTS.filter((p) => p.category !== "combos"),
    activeCategory: "all",
    searchQuery: "",
    currentSort: "default",
    cart: [],
    
    user: {
      isLogged: false,
      name: "",
      email: "",
      phone: "",
      address: ""
    },

    customBox: {
      targetSize: 6,
      price: 20000,
      selectedFlavors: []
    },

    appliedCoupon: null,
    discountAmount: 0,
    currentModalProduct: null,
    modalQty: 1,
    cartStep: "items"
  };

  // DOM CACHE (INITIALIZED DYNAMICALLY)
  let DOM = {};

  const initDOM = () => {
    DOM = {
      // Header & Search
      siteHeader: document.getElementById("siteHeader"),
      headerSearchWrap: document.getElementById("headerSearchWrap"),
      searchInput: document.getElementById("searchInput"),
      catalogSearchInput: document.getElementById("catalogSearchInput"),
      clearSearchBtn: document.getElementById("clearSearchBtn"),
      searchSuggestionsDropdown: document.getElementById("searchSuggestionsDropdown"),
      suggestionsList: document.getElementById("suggestionsList"),
      suggestionsHeader: document.getElementById("suggestionsHeader"),
      suggestionViewAllBtn: document.getElementById("suggestionViewAllBtn"),
      filterStatus: document.getElementById("filterStatus"),
      filterStatusText: document.getElementById("filterStatusText"),
      resetFiltersBtn: document.getElementById("resetFiltersBtn"),
      filterTabPills: document.querySelectorAll(".filter-pill-btn"),
      
      // Grids
      featuredGrid: document.getElementById("featuredGrid"),
      productsGrid: document.getElementById("productsGrid"),
      premiumBoxesGrid: document.getElementById("premiumBoxesGrid"),
      emptyCatalogState: document.getElementById("emptyCatalogState"),

      // Cart Badges & Header
      cartCountBadge: document.getElementById("cartCountBadge"),
      cartTotalHeader: document.getElementById("cartTotalHeader"),
      openCartBtn: document.getElementById("openCartBtn"),

      // Cart Drawer
      cartDrawerBackdrop: document.getElementById("cartDrawerBackdrop"),
      closeCartDrawerBtn: document.getElementById("closeCartDrawerBtn"),
      drawerCartCount: document.getElementById("drawerCartCount"),
      drawerEmptyCart: document.getElementById("drawerEmptyCart"),
      drawerCartItemsList: document.getElementById("drawerCartItemsList"),
      cartCalculationCard: document.getElementById("cartCalculationCard"),
      clearCartRow: document.getElementById("clearCartRow"),
      drawerSubtotal: document.getElementById("drawerSubtotal"),
      drawerShippingVal: document.getElementById("drawerShippingVal"),
      drawerTotal: document.getElementById("drawerTotal"),
      discountLine: document.getElementById("discountLine"),
      discountBadge: document.getElementById("discountBadge"),
      drawerDiscountVal: document.getElementById("drawerDiscountVal"),
      cartStepItems: document.getElementById("cartStepItems"),
      cartStepCheckout: document.getElementById("cartStepCheckout"),

      // Checkout Form
      checkoutForm: document.getElementById("checkoutForm"),
      clientName: document.getElementById("clientName"),
      clientPhone: document.getElementById("clientPhone"),
      clientAddress: document.getElementById("clientAddress"),
      addressFieldGroup: document.getElementById("addressFieldGroup"),
      couponInput: document.getElementById("couponInput"),
      couponFeedback: document.getElementById("couponFeedback"),
      paymentMethod: document.getElementById("paymentMethod"),
      orderNotes: document.getElementById("orderNotes"),
      errorName: document.getElementById("errorName"),
      errorPhone: document.getElementById("errorPhone"),
      errorAddress: document.getElementById("errorAddress"),

      // Product Detail Modal
      productDetailModal: document.getElementById("productDetailModal"),
      closeDetailModalBtn: document.getElementById("closeDetailModalBtn"),
      detailBreadcrumbCategory: document.getElementById("detailBreadcrumbCategory"),
      detailBreadcrumbName: document.getElementById("detailBreadcrumbName"),
      detailModalImg: document.getElementById("detailModalImg"),
      detailModalThumbs: document.getElementById("detailModalThumbs"),
      detailModalTag: document.getElementById("detailModalTag"),
      detailModalTitle: document.getElementById("detailModalTitle"),
      detailModalPrice: document.getElementById("detailModalPrice"),
      detailModalDesc: document.getElementById("detailModalDesc"),
      detailModalIngredients: document.getElementById("detailModalIngredients"),
      modalQtyMinus: document.getElementById("modalQtyMinus"),
      modalQtyPlus: document.getElementById("modalQtyPlus"),
      modalQtyValue: document.getElementById("modalQtyValue"),
      modalAddToCartBtn: document.getElementById("modalAddToCartBtn"),
      relatedProductsGrid: document.getElementById("relatedProductsGrid"),

      // Confirmation Modal
      orderSuccessModal: document.getElementById("orderSuccessModal"),
      confirmationItemsTable: document.getElementById("confirmationItemsTable"),
      confirmationTotalVal: document.getElementById("confirmationTotalVal"),
      confirmationDeliveryInfo: document.getElementById("confirmationDeliveryInfo"),
      btnOpenWhatsAppDirect: document.getElementById("btnOpenWhatsAppDirect"),

      // Auth Modal
      authModal: document.getElementById("authModal"),
      authBtnText: document.getElementById("authBtnText"),
      tabLoginBtn: document.getElementById("tabLoginBtn"),
      tabRegisterBtn: document.getElementById("tabRegisterBtn"),
      loginForm: document.getElementById("loginForm"),
      registerForm: document.getElementById("registerForm"),
      loginEmail: document.getElementById("loginEmail"),
      loginPassword: document.getElementById("loginPassword"),
      regName: document.getElementById("regName"),
      regPhone: document.getElementById("regPhone"),
      regEmail: document.getElementById("regEmail"),
      regPassword: document.getElementById("regPassword"),
      checkoutUserHeading: document.getElementById("checkoutUserHeading"),
      checkoutUserSub: document.getElementById("checkoutUserSub"),
      checkoutAuthBtn: document.getElementById("checkoutAuthBtn"),

      // Custom Box Builder Modal
      customBoxModal: document.getElementById("customBoxModal"),
      boxSlotsCount: document.getElementById("boxSlotsCount"),
      boxSlotsTarget: document.getElementById("boxSlotsTarget"),
      boxStatusBadge: document.getElementById("boxStatusBadge"),
      boxSlotsVisualGrid: document.getElementById("boxSlotsVisualGrid"),
      flavorsPickerList: document.getElementById("flavorsPickerList"),
      boxBuilderPrice: document.getElementById("boxBuilderPrice"),
      btnAddCustomBoxToCart: document.getElementById("btnAddCustomBoxToCart"),
      btnCustomBoxText: document.getElementById("btnCustomBoxText"),

      // Institutional & Story Modal
      storyModal: document.getElementById("storyModal"),
      closeStoryModalBtn: document.getElementById("closeStoryModalBtn"),

      // Contact Modal
      contactModal: document.getElementById("contactModal"),
      closeContactModalBtn: document.getElementById("closeContactModalBtn"),

      // Toasts
      toastContainer: document.getElementById("toastContainer")
    };
  };

  // ================= UTILITIES =================
  const formatCurrency = (amount) => {
    return "$ " + new Intl.NumberFormat("es-AR").format(amount);
  };

  const showToast = (message, type = "info") => {
    if (!DOM.toastContainer) return;
    const toast = document.createElement("div");
    toast.className = `toast-message ${type}`;
    const icon = type === "success" ? "fa-circle-check" : type === "warning" ? "fa-triangle-exclamation" : "fa-bell";
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  };

  // ================= PERSISTENCE & STORAGE =================
  const loadStoredData = () => {
    try {
      const savedCart = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedCart) state.cart = JSON.parse(savedCart);

      const savedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (savedUser) {
        state.user = JSON.parse(savedUser);
        updateAuthUI();
      }
    } catch (e) {
      console.warn("Error leyendo localStorage", e);
    }
  };

  const saveCartToStorage = () => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.cart));
    } catch (e) {}
  };

  const saveUserToStorage = () => {
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(state.user));
    } catch (e) {}
  };

  // ================= 01 & 02. RENDERING GRIDS (WIREFRAME 01 & 02) =================
  const renderFeaturedProducts = () => {
    if (!DOM.featuredGrid) return;
    const featuredItems = state.products.filter((p) => p.category !== "combos").slice(0, 4);

    DOM.featuredGrid.innerHTML = featuredItems.map((p) => `
      <article class="wireframe-product-card flavor-editorial-card" onclick="app.openProductModal('${p.id}')">
        <div class="card-image-box flavor-card-media">
          <span class="card-badge-pill flavor-tag-pill">${p.badge}</span>
          <img src="${p.image}" alt="${p.name}" loading="lazy">
        </div>
        <div class="card-content-box flavor-card-body">
          <h3 class="card-title-text flavor-card-title">${p.name}</h3>
          <p class="card-desc-snippet flavor-card-desc">${p.description}</p>
          <div class="card-price-action-row flavor-card-footer">
            <span class="card-price-amount flavor-card-price">${formatCurrency(p.price)}</span>
            <div class="card-btns-group">
              <button class="card-btn-quick-add" title="Agregar al carrito" onclick="event.stopPropagation(); app.quickAddToCart('${p.id}')">
                <i class="fa-solid fa-bag-shopping"></i>
                <span>Agregar</span>
              </button>
              <button class="card-circle-action-btn" title="Ver detalle" onclick="event.stopPropagation(); app.openProductModal('${p.id}')">
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </article>
    `).join("");
  };

  const renderCatalogProducts = () => {
    if (!DOM.productsGrid) return;

    if (state.filteredProducts.length === 0) {
      DOM.productsGrid.innerHTML = "";
      DOM.emptyCatalogState.style.display = "block";
      return;
    }

    DOM.emptyCatalogState.style.display = "none";

    DOM.productsGrid.innerHTML = state.filteredProducts.map((p) => `
      <article class="wireframe-product-card flavor-editorial-card" onclick="app.openProductModal('${p.id}')">
        <div class="card-image-box flavor-card-media">
          <span class="card-badge-pill flavor-tag-pill">${p.badge}</span>
          <img src="${p.image}" alt="${p.name}" loading="lazy">
        </div>
        <div class="card-content-box flavor-card-body">
          <h3 class="card-title-text flavor-card-title">${p.name}</h3>
          <p class="card-desc-snippet flavor-card-desc">${p.description}</p>
          <div class="card-price-action-row flavor-card-footer">
            <span class="card-price-amount flavor-card-price">${formatCurrency(p.price)}</span>
            <div class="card-btns-group">
              <button class="card-btn-quick-add" title="Agregar al carrito" onclick="event.stopPropagation(); app.quickAddToCart('${p.id}')">
                <i class="fa-solid fa-bag-shopping"></i>
                <span>Agregar</span>
              </button>
              <button class="card-circle-action-btn" title="Ver detalle" onclick="event.stopPropagation(); app.openProductModal('${p.id}')">
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </article>
    `).join("");
  };

  const renderPremiumBoxes = () => {
    const boxesGrid = document.getElementById("premiumBoxesGrid");
    if (!boxesGrid) return;
    const boxes = state.products.filter((p) => p.category === "combos");

    boxesGrid.innerHTML = boxes.map((b) => `
      <article class="wireframe-product-card flavor-editorial-card premium-box-card" onclick="app.openProductModal('${b.id}')">
        <div class="card-image-box flavor-card-media">
          <span class="card-badge-pill flavor-tag-pill">${b.badge}</span>
          <img src="${b.image}" alt="${b.name}" loading="lazy">
        </div>
        <div class="card-content-box flavor-card-body">
          <h3 class="card-title-text flavor-card-title">${b.name}</h3>
          <p class="card-desc-snippet flavor-card-desc">${b.description}</p>
          <div class="card-price-action-row flavor-card-footer">
            <span class="card-price-amount flavor-card-price">${formatCurrency(b.price)}</span>
            <div class="card-btns-group">
              <button class="card-btn-quick-add" title="Comprar caja" onclick="event.stopPropagation(); app.quickAddToCart('${b.id}')">
                <i class="fa-solid fa-bag-shopping"></i>
                <span>Comprar</span>
              </button>
              <button class="card-circle-action-btn" title="Ver detalle" onclick="event.stopPropagation(); app.openProductModal('${b.id}')">
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </article>
    `).join("");
  };

  // ================= LIVE SEARCH & AUTOCOMPLETE WITH PRIORITIZATION =================
  const closeSearchDropdown = () => {
    if (DOM.searchSuggestionsDropdown) {
      DOM.searchSuggestionsDropdown.style.display = "none";
    }
  };

  const openSearchDropdown = () => {
    if (DOM.searchSuggestionsDropdown && state.searchQuery.trim().length > 0) {
      DOM.searchSuggestionsDropdown.style.display = "flex";
    }
  };

  const selectSearchSuggestion = (productId) => {
    closeSearchDropdown();
    openProductModal(productId);
  };

  const renderSearchSuggestions = (queryStr) => {
    if (!DOM.searchSuggestionsDropdown || !DOM.suggestionsList) return;
    const query = (queryStr || "").toLowerCase().trim();

    if (query === "") {
      closeSearchDropdown();
      return;
    }

    const allMatches = state.products.filter((p) => {
      const matchName = p.name && p.name.toLowerCase().includes(query);
      const matchDesc = p.description && p.description.toLowerCase().includes(query);
      const matchBadge = p.badge && p.badge.toLowerCase().includes(query);
      const matchIng = p.ingredients && p.ingredients.toLowerCase().includes(query);
      const matchCategory = p.category && p.category.toLowerCase().includes(query);
      const matchTags = p.filterTags && p.filterTags.some((t) => t.toLowerCase().includes(query));
      return matchName || matchDesc || matchBadge || matchIng || matchCategory || matchTags;
    });

    // PRIORIDAD ESTRICTA: 1) Alfajores individuales primero, 2) Cajas y combos después
    const matchingAlfajores = allMatches.filter((p) => p.category !== "combos");
    const matchingCombos = allMatches.filter((p) => p.category === "combos");
    const totalCount = matchingAlfajores.length + matchingCombos.length;

    if (DOM.suggestionsHeader) {
      DOM.suggestionsHeader.innerHTML = `<span>${totalCount} resultado${totalCount === 1 ? "" : "s"} para "${queryStr}"</span>`;
    }

    if (totalCount === 0) {
      DOM.suggestionsList.innerHTML = `
        <div class="suggestion-empty">
          <i class="fa-solid fa-magnifying-glass" style="font-size: 1.5rem; color: #CBD5E1;"></i>
          <span>No encontramos sabores para "<strong>${queryStr}</strong>"</span>
          <span style="font-size: 0.75rem; color: #94A3B8;">Probá buscando "Pistacho", "Frambuesa", "Oro Negro" o "Cajas"</span>
        </div>
      `;
      DOM.searchSuggestionsDropdown.style.display = "flex";
      return;
    }

    let html = "";

    // 1. Grupo: Alfajores de Autor (Prioritarios)
    if (matchingAlfajores.length > 0) {
      html += `<div class="suggestions-group-title"><i class="fa-solid fa-cookie"></i> Alfajores de Autor (${matchingAlfajores.length})</div>`;
      html += matchingAlfajores.map((p) => `
        <div class="suggestion-item" onclick="app.selectSearchSuggestion('${p.id}')">
          <img src="${p.image}" alt="${p.name}" class="suggestion-thumb" loading="lazy">
          <div class="suggestion-info">
            <div class="suggestion-name-row">
              <span class="suggestion-name">${p.name}</span>
              <span class="suggestion-price">${formatCurrency(p.price)}</span>
            </div>
            <div class="suggestion-sub">
              <span class="suggestion-badge-pill">${p.badge}</span>
              <span>· Unidad 90g</span>
            </div>
          </div>
        </div>
      `).join("");
    }

    // 2. Grupo: Cajas y Colecciones (Debajo de los alfajores)
    if (matchingCombos.length > 0) {
      html += `<div class="suggestions-group-title"><i class="fa-solid fa-boxes-stacked"></i> Cajas & Presentaciones (${matchingCombos.length})</div>`;
      html += matchingCombos.map((p) => `
        <div class="suggestion-item" onclick="app.selectSearchSuggestion('${p.id}')">
          <img src="${p.image}" alt="${p.name}" class="suggestion-thumb" loading="lazy">
          <div class="suggestion-info">
            <div class="suggestion-name-row">
              <span class="suggestion-name">${p.name}</span>
              <span class="suggestion-price">${formatCurrency(p.price)}</span>
            </div>
            <div class="suggestion-sub">
              <span class="suggestion-badge-pill">${p.badge}</span>
              <span>· Pack Selección</span>
            </div>
          </div>
        </div>
      `).join("");
    }

    DOM.suggestionsList.innerHTML = html;
    DOM.searchSuggestionsDropdown.style.display = "flex";
  };

  const applyFilters = () => {
    const query = state.searchQuery.toLowerCase().trim();
    let result = [];

    if (query !== "") {
      // Prioridad 1: Alfajores individuales que coincidan
      let alfajores = state.products.filter((p) => p.category !== "combos");
      if (state.activeCategory !== "all") {
        alfajores = alfajores.filter((p) => p.category === state.activeCategory || (p.filterTags && p.filterTags.includes(state.activeCategory)));
      }
      alfajores = alfajores.filter((p) =>
        (p.name && p.name.toLowerCase().includes(query)) ||
        (p.description && p.description.toLowerCase().includes(query)) ||
        (p.ingredients && p.ingredients.toLowerCase().includes(query)) ||
        (p.badge && p.badge.toLowerCase().includes(query))
      );

      // Prioridad 2: Cajas y combos (debajo de alfajores individuales)
      let combos = state.products.filter((p) => p.category === "combos");
      if (state.activeCategory === "all" || state.activeCategory === "combos") {
        combos = combos.filter((p) =>
          (p.name && p.name.toLowerCase().includes(query)) ||
          (p.description && p.description.toLowerCase().includes(query)) ||
          (p.ingredients && p.ingredients.toLowerCase().includes(query)) ||
          (p.badge && p.badge.toLowerCase().includes(query))
        );
      } else {
        combos = [];
      }

      // Concatenar con orden estricto: alfajores individuales primero, cajas después
      result = [...alfajores, ...combos];
    } else {
      result = state.products.filter((p) => p.category !== "combos");
      if (state.activeCategory !== "all") {
        result = result.filter((p) => {
          if (p.category === state.activeCategory) return true;
          if (p.filterTags && p.filterTags.includes(state.activeCategory)) return true;
          return false;
        });
      }
    }

    // Sort order
    if (state.currentSort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (state.currentSort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (state.currentSort === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    state.filteredProducts = result;
    renderCatalogProducts();

    if (state.activeCategory !== "all" || query !== "") {
      if (DOM.filterStatus) {
        DOM.filterStatus.style.display = "flex";
        let filterMsg = `Mostrando ${result.length} producto${result.length === 1 ? "" : "s"}`;
        if (query) filterMsg += ` para "${state.searchQuery}"`;
        if (DOM.filterStatusText) DOM.filterStatusText.textContent = filterMsg;
      }
    } else {
      if (DOM.filterStatus) DOM.filterStatus.style.display = "none";
    }
  };

  const handleSortChange = (sortType) => {
    state.currentSort = sortType;
    applyFilters();
  };

  const quickAddToCart = (productId) => {
    const product = state.products.find((p) => p.id === productId);
    if (product) {
      addToCart(product, 1);
    }
  };

  // ================= 03. SINGLE PRODUCT DETAIL VIEW (WIREFRAME 03) =================
  const openProductModal = (productId) => {
    const product = state.products.find((p) => p.id === productId);
    if (!product) return;

    state.currentModalProduct = product;
    state.modalQty = 1;

    // Breadcrumbs
    DOM.detailBreadcrumbCategory.textContent = product.category.toUpperCase();
    DOM.detailBreadcrumbName.textContent = product.name;

    // Gallery & Info
    DOM.detailModalImg.src = product.image;
    DOM.detailModalImg.alt = product.name;
    DOM.detailModalTag.textContent = product.badge;
    DOM.detailModalTitle.textContent = product.name;
    DOM.detailModalDesc.textContent = product.description;
    DOM.detailModalPrice.textContent = formatCurrency(product.price);
    DOM.detailModalIngredients.textContent = product.ingredients;
    DOM.modalQtyValue.textContent = "1";

    // Thumbnails
    const thumbs = product.thumbnails || [product.image];
    DOM.detailModalThumbs.innerHTML = thumbs.map((t, idx) => `
      <div class="gallery-thumb-item ${idx === 0 ? "active" : ""}" onclick="app.swapMainImage('${t}', this)">
        <img src="${t}" alt="Miniatura">
      </div>
    `).join("");

    // Cross-sell Related Products (4 items)
    const related = state.products.filter((p) => p.id !== product.id).slice(0, 4);
    DOM.relatedProductsGrid.innerHTML = related.map((r) => `
      <div class="wireframe-product-card" onclick="app.openProductModal('${r.id}')" style="cursor:pointer;">
        <div class="card-image-box" style="height:130px;">
          <img src="${r.image}" alt="${r.name}">
        </div>
        <div class="card-content-box" style="padding:0.75rem;">
          <h4 style="font-size:0.825rem; font-weight:800; color:var(--brand-blue); margin-bottom:0.25rem;">${r.name}</h4>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <strong style="font-size:0.9rem; color:var(--brand-blue);">${formatCurrency(r.price)}</strong>
            <button class="card-circle-action-btn" style="width:28px; height:28px; font-size:0.75rem;"><i class="fa-solid fa-arrow-right"></i></button>
          </div>
        </div>
      </div>
    `).join("");

    DOM.productDetailModal.classList.add("show");
    DOM.productDetailModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeProductModal = () => {
    DOM.productDetailModal.classList.remove("show");
    DOM.productDetailModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    state.currentModalProduct = null;
  };

  const swapMainImage = (src, thumbEl) => {
    DOM.detailModalImg.src = src;
    document.querySelectorAll(".gallery-thumb-item").forEach((el) => el.classList.remove("active"));
    if (thumbEl) thumbEl.classList.add("active");
  };

  const switchProductTab = (tabId) => {
    document.querySelectorAll(".product-tabs-nav .tab-btn").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".product-tab-body .tab-content").forEach((c) => c.classList.remove("active"));

    if (tabId === "ingredientes") {
      document.querySelectorAll(".product-tabs-nav .tab-btn")[0].classList.add("active");
      document.getElementById("tabBodyIngredientes").classList.add("active");
    } else if (tabId === "informacion") {
      document.querySelectorAll(".product-tabs-nav .tab-btn")[1].classList.add("active");
      document.getElementById("tabBodyInformacion").classList.add("active");
    } else if (tabId === "relacionados") {
      document.querySelectorAll(".product-tabs-nav .tab-btn")[2].classList.add("active");
      document.getElementById("tabBodyRelacionados").classList.add("active");
    }
  };

  // ================= 04. TU CARRITO DRAWER (WIREFRAME 04) =================
  const getCartTotals = () => {
    const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = state.cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    let discount = 0;
    if (state.appliedCoupon) {
      if (state.appliedCoupon.type === "percent") {
        discount = Math.round((subtotal * state.appliedCoupon.value) / 100);
      } else if (state.appliedCoupon.type === "fixed") {
        discount = Math.min(subtotal, state.appliedCoupon.value);
      }
    }

    // Delivery method check
    const deliveryRadio = document.querySelector('input[name="deliveryType"]:checked');
    const isStorePickup = deliveryRadio && deliveryRadio.value === "Retiro en Tienda";
    const shipping = isStorePickup || totalCount === 0 ? 0 : SHIPPING_COST;

    const finalTotal = Math.max(0, subtotal - discount + shipping);
    state.discountAmount = discount;

    return { totalCount, subtotal, discount, shipping, finalTotal };
  };

  const updateCartUI = () => {
    const { totalCount, subtotal, discount, shipping, finalTotal } = getCartTotals();

    // Header Badges
    if (DOM.cartCountBadge) DOM.cartCountBadge.textContent = totalCount;
    if (DOM.cartTotalHeader) DOM.cartTotalHeader.textContent = formatCurrency(finalTotal);
    if (DOM.drawerCartCount) DOM.drawerCartCount.textContent = totalCount;
    if (DOM.drawerSubtotal) DOM.drawerSubtotal.textContent = formatCurrency(subtotal);
    if (DOM.drawerShippingVal) DOM.drawerShippingVal.textContent = shipping === 0 ? "Gratis" : formatCurrency(shipping);
    if (DOM.drawerTotal) DOM.drawerTotal.textContent = formatCurrency(finalTotal);

    // Discount Line
    if (discount > 0 && state.appliedCoupon) {
      DOM.discountLine.style.display = "flex";
      DOM.discountBadge.textContent = state.appliedCoupon.label;
      DOM.drawerDiscountVal.textContent = `-${formatCurrency(discount)}`;
    } else {
      DOM.discountLine.style.display = "none";
    }

    // Render Drawer Items List (Wireframe 04 layout)
    if (!DOM.drawerCartItemsList) return;

    if (state.cart.length === 0) {
      DOM.drawerEmptyCart.style.display = "block";
      DOM.drawerCartItemsList.innerHTML = "";
      DOM.cartCalculationCard.style.display = "none";
      DOM.clearCartRow.style.display = "none";
      const btnPay = document.getElementById("btnProceedCheckout");
      if (btnPay) {
        btnPay.disabled = true;
        btnPay.style.opacity = "0.5";
        btnPay.style.cursor = "not-allowed";
      }
    } else {
      DOM.drawerEmptyCart.style.display = "none";
      DOM.cartCalculationCard.style.display = "flex";
      DOM.clearCartRow.style.display = "block";
      const btnPay = document.getElementById("btnProceedCheckout");
      if (btnPay) {
        btnPay.disabled = false;
        btnPay.style.opacity = "1";
        btnPay.style.cursor = "pointer";
      }

      DOM.drawerCartItemsList.innerHTML = state.cart.map((item) => {
        const lineTotal = item.product.price * item.quantity;
        const unitLabel = item.product.category === "combos" ? "Caja de autor" : "Unidad";

        return `
          <div class="cart-item-wireframe-row">
            <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-thumb">
            <div class="cart-item-details">
              <h4 class="cart-item-name">${item.product.name}</h4>
              <div class="cart-item-unit-label">${unitLabel} · ${formatCurrency(item.product.price)}</div>
              <div class="cart-item-bottom-ctrls">
                <div class="qty-stepper-box" style="padding:0.15rem 0.35rem;">
                  <button class="stepper-btn" style="width:24px; height:24px; font-size:0.75rem;" onclick="app.updateItemQuantity('${item.product.id}', ${item.quantity - 1})" aria-label="Restar"><i class="fa-solid fa-minus"></i></button>
                  <span class="stepper-val" style="min-width:20px; font-size:0.85rem;">${item.quantity}</span>
                  <button class="stepper-btn" style="width:24px; height:24px; font-size:0.75rem;" onclick="app.updateItemQuantity('${item.product.id}', ${item.quantity + 1})" aria-label="Sumar"><i class="fa-solid fa-plus"></i></button>
                </div>
                <span class="cart-item-total-price">${formatCurrency(lineTotal)}</span>
              </div>
            </div>
            <button class="cart-trash-btn" onclick="app.removeItemFromCart('${item.product.id}')" title="Eliminar ítem">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        `;
      }).join("");
    }

    saveCartToStorage();
  };

  const addToCart = (product, quantity = 1) => {
    if (!product || quantity <= 0) return;

    const existingIndex = state.cart.findIndex((item) => item.product.id === product.id);
    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += quantity;
    } else {
      state.cart.push({ product: product, quantity: quantity });
    }

    updateCartUI();
    showToast(`+${quantity} ${product.name} agregado`, "success");
  };

  const updateItemQuantity = (productId, newQty) => {
    const index = state.cart.findIndex((item) => item.product.id === productId);
    if (index === -1) return;

    if (newQty <= 0) {
      state.cart.splice(index, 1);
      showToast("Producto eliminado", "info");
    } else {
      state.cart[index].quantity = newQty;
    }

    updateCartUI();
  };

  const removeItemFromCart = (productId) => {
    state.cart = state.cart.filter((item) => item.product.id !== productId);
    updateCartUI();
    showToast("Producto eliminado", "info");
  };

  const clearCart = () => {
    if (confirm("¿Estás seguro de que deseás vaciar todo tu carrito?")) {
      state.cart = [];
      state.appliedCoupon = null;
      updateCartUI();
      showToast("Carrito vaciado", "info");
    }
  };

  const openCart = () => {
    DOM.cartDrawerBackdrop.classList.add("show");
    DOM.cartDrawerBackdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    goToCartStep("items");
  };

  const closeCart = () => {
    DOM.cartDrawerBackdrop.classList.remove("show");
    DOM.cartDrawerBackdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  const continueShopping = () => {
    closeCart();
    const cat = document.getElementById("catalogo");
    if (cat) cat.scrollIntoView({ behavior: "smooth" });
  };

  const goToCartStep = (step) => {
    state.cartStep = step;
    if (step === "items") {
      DOM.cartStepItems.classList.add("active");
      DOM.cartStepCheckout.classList.remove("active");
    } else if (step === "checkout") {
      if (state.cart.length === 0) {
        showToast("Tu carrito está vacío. Sumá alfajores primero.", "warning");
        return;
      }
      DOM.cartStepItems.classList.remove("active");
      DOM.cartStepCheckout.classList.add("active");
      updateAuthUI();
    }
  };

  // ================= 05. CHECKOUT & CONFIRMACIÓN (WIREFRAME 05) =================
  const applyCoupon = () => {
    const code = DOM.couponInput.value.trim().toUpperCase();
    if (!code) return;

    if (VALID_COUPONS[code]) {
      state.appliedCoupon = VALID_COUPONS[code];
      DOM.couponFeedback.className = "coupon-feedback success";
      DOM.couponFeedback.style.display = "block";
      DOM.couponFeedback.innerHTML = `<i class="fa-solid fa-circle-check"></i> ¡Cupón "${code}" aplicado! (${VALID_COUPONS[code].label})`;
      updateCartUI();
      showToast(`¡Cupón ${code} aplicado con éxito!`, "success");
    } else {
      state.appliedCoupon = null;
      DOM.couponFeedback.className = "coupon-feedback error";
      DOM.couponFeedback.style.display = "block";
      DOM.couponFeedback.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Código inválido. Probá con <strong>CERRO10</strong>.`;
      updateCartUI();
    }
  };

  const validateCheckoutForm = () => {
    let isValid = true;
    const name = DOM.clientName.value.trim();
    const phone = DOM.clientPhone.value.trim();
    const deliveryType = document.querySelector('input[name="deliveryType"]:checked').value;
    const address = DOM.clientAddress.value.trim();

    DOM.clientName.classList.remove("has-error");
    DOM.errorName.style.display = "none";
    DOM.clientPhone.classList.remove("has-error");
    DOM.errorPhone.style.display = "none";
    DOM.clientAddress.classList.remove("has-error");
    DOM.errorAddress.style.display = "none";

    if (!name || name.length < 3) {
      DOM.clientName.classList.add("has-error");
      DOM.errorName.style.display = "block";
      isValid = false;
    }

    if (!phone || phone.length < 6) {
      DOM.clientPhone.classList.add("has-error");
      DOM.errorPhone.style.display = "block";
      isValid = false;
    }

    if (deliveryType === "Envío a Domicilio" && (!address || address.length < 5)) {
      DOM.clientAddress.classList.add("has-error");
      DOM.errorAddress.style.display = "block";
      isValid = false;
    }

    return isValid;
  };

  const submitOrderFlow = () => {
    if (!validateCheckoutForm()) {
      showToast("Por favor completá los datos requeridos", "warning");
      return;
    }

    const name = DOM.clientName.value.trim();
    const phone = DOM.clientPhone.value.trim();
    const deliveryType = document.querySelector('input[name="deliveryType"]:checked').value;
    const address = DOM.clientAddress.value.trim();
    const payment = DOM.paymentMethod.value;
    const notes = DOM.orderNotes.value.trim();

    state.user.name = name;
    state.user.phone = phone;
    state.user.address = address;
    saveUserToStorage();

    const { totalCount, subtotal, discount, shipping, finalTotal } = getCartTotals();
    const orderId = `#CM-${Math.floor(1000 + Math.random() * 9000)}`;

    // Build items table for Wireframe 05
    let itemsText = "";
    let confirmationTableHtml = "";

    state.cart.forEach((item) => {
      const lineTotal = item.product.price * item.quantity;
      itemsText += `• ${item.quantity}x ${item.product.name} - ${formatCurrency(lineTotal)}\n`;

      confirmationTableHtml += `
        <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
          <span>${item.product.name} <strong style="color:var(--text-muted); font-size:0.75rem;">x${item.quantity}</strong></span>
          <strong>${formatCurrency(lineTotal)}</strong>
        </div>
      `;
    });

    if (shipping > 0) {
      confirmationTableHtml += `
        <div style="display:flex; justify-content:space-between; margin-bottom:6px; color:var(--text-muted);">
          <span>Envío a domicilio</span>
          <strong>${formatCurrency(shipping)}</strong>
        </div>
      `;
    }

    if (discount > 0 && state.appliedCoupon) {
      confirmationTableHtml += `
        <div style="display:flex; justify-content:space-between; margin-bottom:6px; color:var(--success-color);">
          <span>Descuento (${state.appliedCoupon.label})</span>
          <strong>-${formatCurrency(discount)}</strong>
        </div>
      `;
    }

    // Delivery info (Wireframe 05)
    DOM.confirmationDeliveryInfo.innerHTML = `
      <div><i class="fa-solid fa-user"></i> <strong>Nombre:</strong> ${name}</div>
      <div><i class="fa-solid fa-location-dot"></i> <strong>Dirección:</strong> ${deliveryType === "Envío a Domicilio" ? address : "Retiro en Tienda (Comodoro Rivadavia)"}</div>
      <div><i class="fa-solid fa-phone"></i> <strong>Teléfono:</strong> ${phone}</div>
      <div><i class="fa-solid fa-credit-card"></i> <strong>Pago:</strong> ${payment}</div>
    `;

    DOM.confirmationItemsTable.innerHTML = confirmationTableHtml;
    DOM.confirmationTotalVal.textContent = formatCurrency(finalTotal);

    // Build WhatsApp URL
    let message = `🧁 *PEDIDO CONFIRMADO - CERRO & MAR* 🧁\n`;
    message += `📋 *Orden:* ${orderId}\n`;
    message += `👤 *Cliente:* ${name}\n`;
    message += `📱 *Teléfono:* ${phone}\n`;
    message += `🚚 *Modalidad:* ${deliveryType}\n`;
    if (deliveryType === "Envío a Domicilio") {
      message += `📍 *Dirección:* ${address}\n`;
    }
    message += `💳 *Pago:* ${payment}\n\n`;
    message += `🛒 *DETALLE (${totalCount} productos):*\n`;
    message += `${itemsText}\n`;
    message += `💵 *Subtotal:* ${formatCurrency(subtotal)}\n`;
    if (shipping > 0) message += `🚚 *Envío:* ${formatCurrency(shipping)}\n`;
    if (discount > 0) message += `🏷️ *Descuento:* -${formatCurrency(discount)}\n`;
    message += `💰 *TOTAL FINAL:* ${formatCurrency(finalTotal)}\n`;
    if (notes) message += `\n📝 *Notas:* "${notes}"\n`;
    message += `\n✨ *¡Muchas gracias por elegirnos!*`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

    DOM.btnOpenWhatsAppDirect.onclick = () => {
      window.open(whatsappUrl, "_blank");
    };

    closeCart();
    openOrderSuccessModal();

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 600);
  };

  const openOrderSuccessModal = () => {
    DOM.orderSuccessModal.classList.add("show");
    DOM.orderSuccessModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeOrderSuccessModal = () => {
    DOM.orderSuccessModal.classList.remove("show");
    DOM.orderSuccessModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    state.cart = [];
    state.appliedCoupon = null;
    updateCartUI();
  };

  // ================= CUSTOM BOX BUILDER =================
  const openCustomBoxModal = () => {
    renderCustomBoxBuilder();
    DOM.customBoxModal.classList.add("show");
    DOM.customBoxModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeCustomBoxModal = () => {
    DOM.customBoxModal.classList.remove("show");
    DOM.customBoxModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  const selectBoxSize = (size, price) => {
    state.customBox.targetSize = size;
    state.customBox.price = price;
    if (state.customBox.selectedFlavors.length > size) {
      state.customBox.selectedFlavors = state.customBox.selectedFlavors.slice(0, size);
    }

    document.querySelectorAll(".box-size-option").forEach((opt) => {
      const input = opt.querySelector('input[name="boxSizeOption"]');
      if (input && parseInt(input.value, 10) === size) {
        opt.classList.add("active");
        input.checked = true;
      } else {
        opt.classList.remove("active");
      }
    });

    renderCustomBoxBuilder();
  };

  const addFlavorToBox = (productId) => {
    if (state.customBox.selectedFlavors.length >= state.customBox.targetSize) {
      showToast(`Tu caja ya tiene los ${state.customBox.targetSize} sabores completos`, "warning");
      return;
    }

    const prod = state.products.find((p) => p.id === productId);
    if (!prod) return;

    state.customBox.selectedFlavors.push({ id: prod.id, name: prod.name, image: prod.image });
    renderCustomBoxBuilder();

    if (state.customBox.selectedFlavors.length === state.customBox.targetSize) {
      showToast("¡Caja completada con éxito! Podés agregarla al carrito", "success");
    }
  };

  const removeFlavorFromBox = (index) => {
    state.customBox.selectedFlavors.splice(index, 1);
    renderCustomBoxBuilder();
  };

  const removeFlavorById = (productId) => {
    const idx = state.customBox.selectedFlavors.findIndex((f) => f.id === productId);
    if (idx !== -1) removeFlavorFromBox(idx);
  };

  const renderCustomBoxBuilder = () => {
    const { targetSize, price, selectedFlavors } = state.customBox;
    const currentCount = selectedFlavors.length;
    const isComplete = currentCount === targetSize;

    DOM.boxSlotsCount.textContent = currentCount;
    DOM.boxSlotsTarget.textContent = targetSize;
    DOM.boxBuilderPrice.textContent = formatCurrency(price);

    if (isComplete) {
      DOM.boxStatusBadge.className = "box-slots-status completed";
      DOM.boxStatusBadge.innerHTML = `<i class="fa-solid fa-circle-check"></i> ¡Caja completa (${currentCount}/${targetSize})!`;
      DOM.btnAddCustomBoxToCart.className = "btn-add-custom-box";
      DOM.btnAddCustomBoxToCart.disabled = false;
      DOM.btnCustomBoxText.textContent = `Añadir Caja x${targetSize} al Carrito`;
    } else {
      DOM.boxStatusBadge.className = "box-slots-status";
      const remaining = targetSize - currentCount;
      DOM.boxStatusBadge.innerHTML = `<i class="fa-solid fa-cookie"></i> Seleccionados ${currentCount} de ${targetSize} (Faltan ${remaining})`;
      DOM.btnAddCustomBoxToCart.className = "btn-add-custom-box disabled";
      DOM.btnAddCustomBoxToCart.disabled = true;
      DOM.btnCustomBoxText.textContent = `Elegí ${remaining} sabor${remaining === 1 ? "" : "es"} más`;
    }

    // Slots representation
    let slotsHtml = "";
    selectedFlavors.forEach((item, idx) => {
      slotsHtml += `
        <div class="slot-item-chip">
          <span>${item.name}</span>
          <button class="slot-remove-btn" onclick="app.removeFlavorFromBox(${idx})" title="Quitar">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      `;
    });

    for (let i = currentCount; i < targetSize; i++) {
      slotsHtml += `
        <div class="slot-empty-placeholder">
          <i class="fa-regular fa-circle-dot"></i> Espacio ${i + 1}
        </div>
      `;
    }
    DOM.boxSlotsVisualGrid.innerHTML = slotsHtml;

    // Flavors picker list
    const availableFlavors = state.products.filter((p) => p.category !== "combos");
    const flavorCounts = {};
    selectedFlavors.forEach((f) => {
      flavorCounts[f.id] = (flavorCounts[f.id] || 0) + 1;
    });

    DOM.flavorsPickerList.innerHTML = availableFlavors.map((p) => {
      const count = flavorCounts[p.id] || 0;
      return `
        <div class="flavor-picker-row">
          <div class="flavor-picker-info">
            <img src="${p.image}" alt="${p.name}" class="flavor-picker-thumb">
            <div>
              <div class="flavor-picker-name">${p.name}</div>
              <div class="flavor-picker-tag">${p.badge}</div>
            </div>
          </div>
          <div class="qty-stepper-box" style="padding:0.15rem 0.35rem;">
            <button class="stepper-btn" style="width:24px; height:24px; font-size:0.75rem;" onclick="app.removeFlavorById('${p.id}')" ${count === 0 ? "disabled style='opacity:0.4; cursor:not-allowed;'" : ""} aria-label="Restar">
              <i class="fa-solid fa-minus"></i>
            </button>
            <span class="stepper-val" style="min-width:18px; font-size:0.85rem;">${count}</span>
            <button class="stepper-btn" style="width:24px; height:24px; font-size:0.75rem;" onclick="app.addFlavorToBox('${p.id}')" ${currentCount >= targetSize ? "disabled style='opacity:0.4; cursor:not-allowed;'" : ""} aria-label="Sumar">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      `;
    }).join("");
  };

  const addCustomBoxToCart = () => {
    const { targetSize, price, selectedFlavors } = state.customBox;
    if (selectedFlavors.length < targetSize) return;

    const flavorMap = {};
    selectedFlavors.forEach((f) => {
      flavorMap[f.name] = (flavorMap[f.name] || 0) + 1;
    });
    const flavorsSummary = Object.entries(flavorMap).map(([name, qty]) => `${qty}x ${name}`).join(", ");

    const customBoxProduct = {
      id: `custom-box-${Date.now()}`,
      name: `Caja personalizada de autor (x${targetSize})`,
      category: "combos",
      price: price,
      badge: "A Medida ✨",
      description: `Sabores elegidos: ${flavorsSummary}`,
      image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80"
    };

    addToCart(customBoxProduct, 1);
    closeCustomBoxModal();
    openCart();
    state.customBox.selectedFlavors = [];
  };

  // ================= AUTH MODAL =================
  const openAuthModal = () => {
    DOM.authModal.classList.add("show");
    DOM.authModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeAuthModal = () => {
    DOM.authModal.classList.remove("show");
    DOM.authModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  const switchAuthTab = (tab) => {
    if (tab === "login") {
      DOM.tabLoginBtn.classList.add("active");
      DOM.tabRegisterBtn.classList.remove("active");
      DOM.loginForm.classList.add("active");
      DOM.registerForm.classList.remove("active");
    } else {
      DOM.tabLoginBtn.classList.remove("active");
      DOM.tabRegisterBtn.classList.add("active");
      DOM.loginForm.classList.remove("active");
      DOM.registerForm.classList.add("active");
    }
  };

  const updateAuthUI = () => {
    if (state.user && state.user.isLogged) {
      DOM.authBtnText.textContent = `Hola, ${state.user.name.split(" ")[0]}`;
      DOM.checkoutUserHeading.textContent = `Sesión iniciada: ${state.user.name}`;
      DOM.checkoutUserSub.textContent = `Tus datos de entrega se cargaron automáticamente.`;
      DOM.checkoutAuthBtn.textContent = "Cerrar sesión";
      DOM.checkoutAuthBtn.onclick = logoutUser;

      if (DOM.clientName && !DOM.clientName.value) DOM.clientName.value = state.user.name;
      if (DOM.clientPhone && !DOM.clientPhone.value) DOM.clientPhone.value = state.user.phone || "";
      if (DOM.clientAddress && !DOM.clientAddress.value) DOM.clientAddress.value = state.user.address || "";
    } else {
      DOM.authBtnText.textContent = "Ingresar";
      DOM.checkoutUserHeading.textContent = "Comprando como Invitado";
      DOM.checkoutUserSub.textContent = "Iniciá sesión para autocompletar tus datos.";
      DOM.checkoutAuthBtn.textContent = "Identificarme";
      DOM.checkoutAuthBtn.onclick = openAuthModal;
    }
  };

  const loginWithGoogle = () => {
    state.user = {
      isLogged: true,
      name: "María López",
      email: "maria.lopez@gmail.com",
      phone: "297 123 4567",
      address: "Av. Roca 1234, Dpto 2, Comodoro Rivadavia"
    };
    saveUserToStorage();
    updateAuthUI();
    closeAuthModal();
    showToast("¡Sesión iniciada con Google!", "success");
  };

  const submitLogin = () => {
    const email = DOM.loginEmail.value.trim();
    if (!email) return;
    state.user = {
      isLogged: true,
      name: email.split("@")[0],
      email: email,
      phone: "297 123 4567",
      address: ""
    };
    saveUserToStorage();
    updateAuthUI();
    closeAuthModal();
    showToast("¡Bienvenido/a a Cerro & Mar!", "success");
  };

  const submitRegister = () => {
    const name = DOM.regName.value.trim();
    const phone = DOM.regPhone.value.trim();
    const email = DOM.regEmail.value.trim();
    if (!name || !email) return;
    state.user = { isLogged: true, name, email, phone, address: "" };
    saveUserToStorage();
    updateAuthUI();
    closeAuthModal();
    showToast(`¡Cuenta creada con éxito, ${name}!`, "success");
  };

  const logoutUser = () => {
    state.user = { isLogged: false, name: "", email: "", phone: "", address: "" };
    saveUserToStorage();
    updateAuthUI();
    showToast("Sesión cerrada", "info");
  };

  // ================= INSTITUTIONAL & STORY MODAL =================
  const openStoryModal = () => {
    if (DOM.storyModal) {
      DOM.storyModal.classList.add("show");
      DOM.storyModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
  };

  const closeStoryModal = () => {
    if (DOM.storyModal) {
      DOM.storyModal.classList.remove("show");
      DOM.storyModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  };

  const switchStoryTab = (tabId) => {
    document.querySelectorAll(".inst-tab-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    document.querySelectorAll(".story-tab-pane").forEach((pane) => {
      pane.classList.remove("active");
    });

    const targetBtn = document.querySelector(`.inst-tab-btn[onclick*="${tabId}"]`);
    if (targetBtn) targetBtn.classList.add("active");

    const targetPane = document.getElementById(`tabStory${tabId.charAt(0).toUpperCase() + tabId.slice(1)}`);
    if (targetPane) targetPane.classList.add("active");
  };

  const openStoryTab = (tabId) => {
    openStoryModal();
    switchStoryTab(tabId);
  };

  // ================= CONTACT MODAL =================
  const openContactModal = () => {
    if (DOM.contactModal) {
      DOM.contactModal.classList.add("show");
      DOM.contactModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
  };

  const closeContactModal = () => {
    if (DOM.contactModal) {
      DOM.contactModal.classList.remove("show");
      DOM.contactModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  };

  // ================= EVENT LISTENERS =================
  const setupEvents = () => {
    let isScrolled = false;
    const handleScroll = () => {
      const currentScrollY = window.scrollY || window.pageYOffset || 0;
      if (currentScrollY > 60 && !isScrolled) {
        isScrolled = true;
        DOM.siteHeader.classList.add("scrolled");
      } else if (currentScrollY <= 30 && isScrolled) {
        isScrolled = false;
        DOM.siteHeader.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Search events
    if (DOM.searchInput) {
      DOM.searchInput.addEventListener("input", (e) => {
        state.searchQuery = e.target.value;
        if (DOM.catalogSearchInput) DOM.catalogSearchInput.value = state.searchQuery;
        if (DOM.clearSearchBtn) DOM.clearSearchBtn.style.display = state.searchQuery ? "flex" : "none";
        applyFilters();
        renderSearchSuggestions(state.searchQuery);
      });

      DOM.searchInput.addEventListener("focus", () => {
        if (state.searchQuery && state.searchQuery.trim().length > 0) {
          renderSearchSuggestions(state.searchQuery);
        }
      });
    }

    if (DOM.catalogSearchInput) {
      DOM.catalogSearchInput.addEventListener("input", (e) => {
        state.searchQuery = e.target.value;
        if (DOM.searchInput) DOM.searchInput.value = state.searchQuery;
        if (DOM.clearSearchBtn) DOM.clearSearchBtn.style.display = state.searchQuery ? "flex" : "none";
        applyFilters();
        renderSearchSuggestions(state.searchQuery);
      });
    }

    if (DOM.clearSearchBtn) {
      DOM.clearSearchBtn.addEventListener("click", () => {
        DOM.searchInput.value = "";
        if (DOM.catalogSearchInput) DOM.catalogSearchInput.value = "";
        state.searchQuery = "";
        DOM.clearSearchBtn.style.display = "none";
        closeSearchDropdown();
        applyFilters();
      });
    }

    if (DOM.resetFiltersBtn) {
      DOM.resetFiltersBtn.addEventListener("click", () => {
        state.activeCategory = "all";
        state.searchQuery = "";
        if (DOM.searchInput) DOM.searchInput.value = "";
        if (DOM.catalogSearchInput) DOM.catalogSearchInput.value = "";
        if (DOM.clearSearchBtn) DOM.clearSearchBtn.style.display = "none";
        closeSearchDropdown();
        DOM.filterTabPills.forEach((p) => p.classList.remove("active"));
        if (DOM.filterTabPills[0]) DOM.filterTabPills[0].classList.add("active");
        applyFilters();
      });
    }

    // Close suggestions dropdown on outside click
    document.addEventListener("click", (e) => {
      if (DOM.headerSearchWrap && !DOM.headerSearchWrap.contains(e.target)) {
        closeSearchDropdown();
      }
    });

    // Filter pill tabs (Wireframe 02)
    DOM.filterTabPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        DOM.filterTabPills.forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        state.activeCategory = pill.getAttribute("data-category");
        applyFilters();
      });
    });

    // Cart Drawer triggers
    DOM.openCartBtn.addEventListener("click", openCart);
    DOM.closeCartDrawerBtn.addEventListener("click", closeCart);
    DOM.cartDrawerBackdrop.addEventListener("click", (e) => {
      if (e.target === DOM.cartDrawerBackdrop) closeCart();
    });

    // Product Modal
    DOM.closeDetailModalBtn.addEventListener("click", closeProductModal);
    DOM.productDetailModal.addEventListener("click", (e) => {
      if (e.target === DOM.productDetailModal) closeProductModal();
    });

    DOM.modalQtyMinus.addEventListener("click", () => {
      if (state.modalQty > 1) {
        state.modalQty--;
        DOM.modalQtyValue.textContent = state.modalQty;
      }
    });

    DOM.modalQtyPlus.addEventListener("click", () => {
      state.modalQty++;
      DOM.modalQtyValue.textContent = state.modalQty;
    });

    DOM.modalAddToCartBtn.addEventListener("click", () => {
      if (state.currentModalProduct) {
        addToCart(state.currentModalProduct, state.modalQty);
        closeProductModal();
      }
    });

    // Delivery Radio switcher
    const deliveryRadios = document.querySelectorAll('input[name="deliveryType"]');
    deliveryRadios.forEach((radio) => {
      radio.addEventListener("change", (e) => {
        document.querySelectorAll(".delivery-radio-card").forEach((c) => c.classList.remove("active"));
        e.target.closest(".delivery-radio-card").classList.add("active");

        if (e.target.value === "Retiro en Tienda") {
          DOM.addressFieldGroup.style.display = "none";
        } else {
          DOM.addressFieldGroup.style.display = "block";
        }
        updateCartUI();
      });
    });

    // Institutional / Story Modal triggers
    if (DOM.closeStoryModalBtn) {
      DOM.closeStoryModalBtn.addEventListener("click", closeStoryModal);
    }
    if (DOM.storyModal) {
      DOM.storyModal.addEventListener("click", (e) => {
        if (e.target === DOM.storyModal) closeStoryModal();
      });
    }

    // Contact Modal triggers
    if (DOM.closeContactModalBtn) {
      DOM.closeContactModalBtn.addEventListener("click", closeContactModal);
    }
    if (DOM.contactModal) {
      DOM.contactModal.addEventListener("click", (e) => {
        if (e.target === DOM.contactModal) closeContactModal();
      });
    }

    // Keyboard ESC handler
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeProductModal();
        closeCart();
        closeAuthModal();
        closeCustomBoxModal();
        closeStoryModal();
        closeContactModal();
        closeSearchDropdown();
        closeOrderSuccessModal();
      }
    });
  };

  // ================= FILTER COUNTS DYNAMIC CALCULATION =================
  const updateFilterCounts = () => {
    const all = state.products.filter((p) => p.category !== "combos");
    const counts = {
      all: all.length,
      clasicos: all.filter((p) => p.category === "clasicos" || (p.filterTags && p.filterTags.includes("clasicos"))).length,
      patagonicos: all.filter((p) => p.category === "patagonicos" || (p.filterTags && p.filterTags.includes("patagonicos"))).length,
      especiales: all.filter((p) => p.category === "especiales" || (p.filterTags && p.filterTags.includes("especiales"))).length,
      argentos: all.filter((p) => p.category === "argentos" || (p.filterTags && p.filterTags.includes("argentos"))).length,
      veganos: all.filter((p) => p.category === "veganos" || (p.filterTags && p.filterTags.includes("veganos"))).length,
      glutenfree: all.filter((p) => p.category === "glutenfree" || (p.filterTags && p.filterTags.includes("glutenfree"))).length,
      plantbased: all.filter((p) => p.category === "plantbased" || (p.filterTags && p.filterTags.includes("plantbased"))).length
    };

    document.querySelectorAll(".filter-pill-btn").forEach((pill) => {
      const cat = pill.getAttribute("data-category");
      const countSpan = pill.querySelector(".pill-count");
      if (countSpan && counts[cat] !== undefined) {
        countSpan.textContent = counts[cat];
      }
    });

    const countAllEl = document.getElementById("countAll");
    if (countAllEl) {
      countAllEl.textContent = counts.all;
    }
  };

  // ================= INITIALIZATION =================
  const init = () => {
    initDOM();
    loadStoredData();
    renderFeaturedProducts();
    renderCatalogProducts();
    renderPremiumBoxes();
    updateCartUI();
    setupEvents();
    updateFilterCounts();
  };

  // Exposed API
  window.app = {
    openAuthModal,
    closeAuthModal,
    switchAuthTab,
    loginWithGoogle,
    submitLogin,
    submitRegister,
    logoutUser,

    openCustomBoxModal,
    closeCustomBoxModal,
    selectBoxSize,
    addFlavorToBox,
    removeFlavorFromBox,
    removeFlavorById,
    addCustomBoxToCart,

    openProductModal,
    closeProductModal,
    swapMainImage,
    switchProductTab,
    openCart,
    closeCart,
    goToCartStep,
    continueShopping,
    applyCoupon,
    submitOrderFlow,
    closeOrderSuccessModal,
    clearCart,
    updateItemQuantity,
    removeItemFromCart,
    addToCart,
    quickAddToCart,
    handleSortChange,

    // Institutional / Nosotros Modal
    openStoryModal,
    closeStoryModal,
    switchStoryTab,
    openStoryTab,

    // Contact Modal
    openContactModal,
    closeContactModal,

    // Live Search API
    renderSearchSuggestions,
    openSearchDropdown,
    closeSearchDropdown,
    selectSearchSuggestion,

    filterByCategory: (category) => {
      state.activeCategory = category;
      DOM.filterTabPills.forEach((p) => {
        if (p.getAttribute("data-category") === category) {
          p.classList.add("active");
        } else {
          p.classList.remove("active");
        }
      });
      applyFilters();
      const cat = document.getElementById("catalogo");
      if (cat) cat.scrollIntoView({ behavior: "smooth" });
    },
    resetSearch: () => {
      state.searchQuery = "";
      state.activeCategory = "all";
      if (DOM.searchInput) DOM.searchInput.value = "";
      if (DOM.catalogSearchInput) DOM.catalogSearchInput.value = "";
      if (DOM.clearSearchBtn) DOM.clearSearchBtn.style.display = "none";
      closeSearchDropdown();
      DOM.filterTabPills.forEach((p) => p.classList.remove("active"));
      if (DOM.filterTabPills[0]) DOM.filterTabPills[0].classList.add("active");
      applyFilters();
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
