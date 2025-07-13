export type Language = "en" | "pt" | "es" | "fr" | "de"

export interface Currency {
  symbol: string
  code: string
}

export interface Translations {
  landingTitle: string
  welcomeToTable: string
  discoverFlavors: string
  restaurantName: string
  stars: string
  deliveryTime: string
  table: string
  searchPlaceholder: string
  all: string
  starters: string
  mains: string
  desserts: string
  beverages: string
  popular: string
  customizable: string
  customize: string // Adicionado a chave 'customize'
  noItemsFound: string
  noItemsFoundDesc: string
  viewCart: string
  cart: string
  myOrders: string
  callWaiter: string
  callingWaiter: string
  waiterCalled: string
  waiterCalledDesc: string
  itemAddedToCart: string
  add: string
  loading: string
  changingLanguage: string
  // Add other keys as needed
}

export const currencies: Record<Language, Currency> = {
  pt: { symbol: "€", code: "EUR" },
  en: { symbol: "$", code: "USD" },
  es: { symbol: "€", code: "EUR" },
  fr: { symbol: "€", code: "EUR" },
  de: { symbol: "€", code: "EUR" },
}

const dictionaries: Record<Language, Translations> = {
  pt: {
    landingTitle: "TapifyOrder",
    welcomeToTable: "Bem-vindo à mesa",
    discoverFlavors: "Descubra os nossos sabores!",
    restaurantName: "O Sabor da Casa",
    stars: "estrelas",
    deliveryTime: "20-30 min",
    table: "Mesa",
    searchPlaceholder: "Pesquisar pratos...",
    all: "Todos",
    starters: "Entradas",
    mains: "Pratos Principais",
    desserts: "Sobremesas",
    beverages: "Bebidas",
    popular: "Popular",
    customizable: "Personalizável",
    customize: "Personalizar", // Tradução para português
    noItemsFound: "Nenhum item encontrado",
    noItemsFoundDesc: "Tente ajustar a sua pesquisa ou filtros.",
    viewCart: "Ver Carrinho",
    cart: "Carrinho",
    myOrders: "Meus Pedidos",
    callWaiter: "Chamar Garçom",
    callingWaiter: "Chamando...",
    waiterCalled: "Garçom Chamado!",
    waiterCalledDesc: "Um garçom estará consigo em breve.",
    itemAddedToCart: "Item adicionado ao carrinho",
    add: "adicionado",
    loading: "A carregar...",
    changingLanguage: "A mudar idioma...",
  },
  en: {
    landingTitle: "TapifyOrder",
    welcomeToTable: "Welcome to table",
    discoverFlavors: "Discover our flavors!",
    restaurantName: "The House Flavor",
    stars: "stars",
    deliveryTime: "20-30 min",
    table: "Table",
    searchPlaceholder: "Search dishes...",
    all: "All",
    starters: "Starters",
    mains: "Main Courses",
    desserts: "Desserts",
    beverages: "Beverages",
    popular: "Popular",
    customizable: "Customizable",
    customize: "Customize", // Tradução para inglês
    noItemsFound: "No items found",
    noItemsFoundDesc: "Try adjusting your search or filters.",
    viewCart: "View Cart",
    cart: "Cart",
    myOrders: "My Orders",
    callWaiter: "Call Waiter",
    callingWaiter: "Calling...",
    waiterCalled: "Waiter Called!",
    waiterCalledDesc: "A waiter will be with you shortly.",
    itemAddedToCart: "Item added to cart",
    add: "added",
    loading: "Loading...",
    changingLanguage: "Changing language...",
  },
  es: {
    landingTitle: "TapifyOrder",
    welcomeToTable: "¡Bienvenido a la mesa",
    discoverFlavors: "¡Descubre nuestros sabores!",
    restaurantName: "El Sabor de la Casa",
    stars: "estrellas",
    deliveryTime: "20-30 min",
    table: "Mesa",
    searchPlaceholder: "Buscar platos...",
    all: "Todos",
    starters: "Entradas",
    mains: "Platos Principales",
    desserts: "Postres",
    beverages: "Bebidas",
    popular: "Popular",
    customizable: "Personalizable",
    customize: "Personalizar", // Tradução para espanhol
    noItemsFound: "No se encontraron elementos",
    noItemsFoundDesc: "Intenta ajustar tu búsqueda o filtros.",
    viewCart: "Ver Carrito",
    cart: "Carrito",
    myOrders: "Mis Pedidos",
    callWaiter: "Llamar Camarero",
    callingWaiter: "Llamando...",
    waiterCalled: "¡Camarero Llamado!",
    waiterCalledDesc: "Un camarero estará contigo en breve.",
    itemAddedToCart: "Artículo añadido al carrito",
    add: "añadido",
    loading: "Cargando...",
    changingLanguage: "Cambiando idioma...",
  },
  fr: {
    landingTitle: "TapifyOrder",
    welcomeToTable: "Bienvenue à la table",
    discoverFlavors: "Découvrez nos saveurs !",
    restaurantName: "La Saveur de la Maison",
    stars: "étoiles",
    deliveryTime: "20-30 min",
    table: "Table",
    searchPlaceholder: "Rechercher des plats...",
    all: "Tous",
    starters: "Entrées",
    mains: "Plats Principaux",
    desserts: "Desserts",
    beverages: "Boissons",
    popular: "Populaire",
    customizable: "Personnalisable",
    customize: "Personnaliser", // Tradução para francês
    noItemsFound: "Aucun élément trouvé",
    noItemsFoundDesc: "Essayez d'ajuster votre recherche ou vos filtres.",
    viewCart: "Voir le Panier",
    cart: "Panier",
    myOrders: "Mes Commandes",
    callWaiter: "Appeler le Serveur",
    callingWaiter: "Appel en cours...",
    waiterCalled: "Serveur Appelé !",
    waiterCalledDesc: "Un serveur sera avec vous sous peu.",
    itemAddedToCart: "Article ajouté au panier",
    add: "ajouté",
    loading: "Chargement...",
    changingLanguage: "Changement de langue...",
  },
  de: {
    landingTitle: "TapifyOrder",
    welcomeToTable: "Willkommen am Tisch",
    discoverFlavors: "Entdecken Sie unsere Aromen!",
    restaurantName: "Der Geschmack des Hauses",
    stars: "Sterne",
    deliveryTime: "20-30 Min.",
    table: "Tisch",
    searchPlaceholder: "Gerichte suchen...",
    all: "Alle",
    starters: "Vorspeisen",
    mains: "Hauptgerichte",
    desserts: "Desserts",
    beverages: "Getränke",
    popular: "Beliebt",
    customizable: "Anpassbar",
    customize: "Anpassen", // Tradução para alemão
    noItemsFound: "Keine Artikel gefunden",
    noItemsFoundDesc: "Versuchen Sie, Ihre Suche oder Filter anzupassen.",
    viewCart: "Warenkorb ansehen",
    cart: "Warenkorb",
    myOrders: "Meine Bestellungen",
    callWaiter: "Kellner rufen",
    callingWaiter: "Ruft an...",
    waiterCalled: "Kellner gerufen!",
    waiterCalledDesc: "Ein Kellner wird in Kürze bei Ihnen sein.",
    itemAddedToCart: "Artikel zum Warenkorb hinzugefügt",
    add: "hinzugefügt",
    loading: "Wird geladen...",
    changingLanguage: "Sprache wird geändert...",
  },
}

export const getDictionary = async (locale: Language) => dictionaries[locale]
