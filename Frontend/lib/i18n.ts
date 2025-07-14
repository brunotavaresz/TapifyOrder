export type Language = "en" | "pt" | "es" | "fr" | "de"

export interface Currency {
  symbol: string
  code: string
}

export interface Translations {
  // Existing translations
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
  customize: string
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

  // Landing page translations
  landingSubtitle: string
  demoClient: string
  adminArea: string
  digitalRevolutionBadge: string
  transformYourRestaurant: string
  intoDigital: string
  landingDescription: string
  seeInteractiveDemo: string
  adminPanel: string
  restaurants: string
  satisfaction: string
  sales: string
  tableDemo: string
  restaurantDemo: string
  online: string
  extraChicken: string
  total: string
  finalizeOrder: string
  whyChoose: string
  provenResults: string
  provenDescription: string
  salesIncrease: string
  salesIncreaseDesc: string
  costReduction: string
  costReductionDesc: string
  satisfactionRate: string
  satisfactionRateDesc: string
  everythingYourRestaurantNeeds: string
  completeDescription: string
  frictionlessAccess: string
  frictionlessDesc: string
  smartOrders: string
  smartOrdersDesc: string
  advancedAnalytics: string
  advancedAnalyticsDesc: string
  worksOffline: string
  worksOfflineDesc: string
  ordersToday: string
  revenue: string
  preparing: string
  ready: string
  now: string
  whatClientsSay: string
  testimonialMaria: string
  testimonialMariaRole: string
  testimonialMariaText: string
  testimonialJoao: string
  testimonialJoaoRole: string
  testimonialJoaoText: string
  testimonialAna: string
  testimonialAnaRole: string
  testimonialAnaText: string
  readyToRevolutionize: string
  revolutionizeDesc: string
  testFreeDemo: string
  seeAdminPanel: string
  quickSetup: string
  quickImplementation: string
  support247: string
  alwaysAvailable: string
  guaranteedROI: string
  returnIn60Days: string
  transformingRestaurants: string
  product: string
  features: string
  pricing: string
  demo: string
  company: string
  about: string
  blog: string
  careers: string
  support: string
  helpCenter: string
  contact: string
  whatsapp: string
  footerCopyright: string
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
    // Existing translations
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
    customize: "Personalizar",
    noItemsFound: "Nenhum item encontrado",
    noItemsFoundDesc: "Tente ajustar a sua pesquisa ou filtros.",
    viewCart: "Ver Carrinho",
    cart: "Carrinho",
    myOrders: "Meus Pedidos",
    callWaiter: "Chamar Empregado",
    callingWaiter: "Chamando...",
    waiterCalled: "Empregado Chamado!",
    waiterCalledDesc: "Um empregado estará consigo em breve.",
    itemAddedToCart: "Item adicionado ao carrinho",
    add: "adicionado",
    loading: "A carregar...",
    changingLanguage: "A mudar idioma...",

    // Landing page translations
    landingSubtitle: "Sistema de Pedidos Digital",
    demoClient: "Demo Cliente",
    adminArea: "Área Admin",
    digitalRevolutionBadge: "Revolução Digital",
    transformYourRestaurant: "Transforme o seu",
    intoDigital: "numa experiência digital",
    landingDescription: "Sistema completo de pedidos digitais que revoluciona a experiência do cliente e aumenta a eficiência do seu restaurante.",
    seeInteractiveDemo: "Ver Demo Interativo",
    adminPanel: "Painel Admin",
    restaurants: "Restaurantes",
    satisfaction: "Satisfação",
    sales: "Vendas",
    tableDemo: "Mesa",
    restaurantDemo: "Restaurante Demo",
    online: "Online",
    extraChicken: "Extra frango",
    total: "Total",
    finalizeOrder: "Finalizar Pedido",
    whyChoose: "Por que escolher?",
    provenResults: "Resultados Comprovados",
    provenDescription: "Milhares de restaurantes já transformaram o seu negócio com a nossa solução. Veja os resultados que pode alcançar:",
    salesIncrease: "Aumento de Vendas",
    salesIncreaseDesc: "Média de 45% de aumento nas vendas com pedidos digitais otimizados.",
    costReduction: "Redução de Custos",
    costReductionDesc: "Economia de 30% nos custos operacionais com automação inteligente.",
    satisfactionRate: "Taxa de Satisfação",
    satisfactionRateDesc: "98% dos clientes aprovam a experiência digital personalizada.",
    everythingYourRestaurantNeeds: "Tudo que o seu restaurante precisa",
    completeDescription: "Uma solução completa que transforma cada aspecto da experiência gastronómica, desde o pedido até à entrega.",
    frictionlessAccess: "Acesso sem Fricção",
    frictionlessDesc: "Clientes acedem ao menu com um simples scan do código QR, sem apps ou cadastros.",
    smartOrders: "Pedidos Inteligentes",
    smartOrdersDesc: "Sistema de pedidos otimizado que reduz erros e acelera o atendimento.",
    advancedAnalytics: "Análise Avançada",
    advancedAnalyticsDesc: "Relatórios detalhados para otimizar cardápio, preços e operações.",
    worksOffline: "Funciona Offline",
    worksOfflineDesc: "Sistema robusto que continua funcionando mesmo sem conexão à internet.",
    ordersToday: "Pedidos Hoje",
    revenue: "Receita",
    preparing: "Preparando",
    ready: "Pronto",
    now: "Agora",
    whatClientsSay: "O que dizem os nossos clientes",
    testimonialMaria: "Maria Santos",
    testimonialMariaRole: "Proprietária, Restaurante Quinta",
    testimonialMariaText: "Revolucionou completamente o nosso restaurante. As vendas aumentaram 50% e os clientes adoram a experiência digital!",
    testimonialJoao: "João Silva",
    testimonialJoaoRole: "Gerente, Tasca do João",
    testimonialJoaoText: "Implementação super fácil e suporte excepcional. Não conseguimos imaginar o restaurante sem esta solução.",
    testimonialAna: "Ana Costa",
    testimonialAnaRole: "Chef, Sabores do Mar",
    testimonialAnaText: "Os relatórios ajudam-nos a otimizar o menu e a gerir melhor o stock. Ferramenta indispensável!",
    readyToRevolutionize: "Pronto para revolucionar?",
    revolutionizeDesc: "Junte-se a milhares de restaurantes que já transformaram o seu negócio com a nossa solução inovadora.",
    testFreeDemo: "Testar Demo Gratuito",
    seeAdminPanel: "Ver Painel Admin",
    quickSetup: "Configuração Rápida",
    quickImplementation: "Implementação em 24h",
    support247: "Suporte 24/7",
    alwaysAvailable: "Sempre disponível",
    guaranteedROI: "ROI Garantido",
    returnIn60Days: "Retorno em 60 dias",
    transformingRestaurants: "Transformando restaurantes em experiências digitais excepcionais.",
    product: "Produto",
    features: "Funcionalidades",
    pricing: "Preços",
    demo: "Demo",
    company: "Empresa",
    about: "Sobre",
    blog: "Blog",
    careers: "Carreiras",
    support: "Suporte",
    helpCenter: "Centro de Ajuda",
    contact: "Contacto",
    whatsapp: "WhatsApp",
    footerCopyright: "© 2024 TapifyOrder. Todos os direitos reservados.",
  },
  en: {
    // Existing translations
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
    customize: "Customize",
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

    // Landing page translations
    landingSubtitle: "Digital Ordering System",
    demoClient: "Client Demo",
    adminArea: "Admin Area",
    digitalRevolutionBadge: "Digital Revolution",
    transformYourRestaurant: "Transform your",
    intoDigital: "into a digital experience",
    landingDescription: "Complete digital ordering system that revolutionizes customer experience and increases your restaurant's efficiency.",
    seeInteractiveDemo: "See Interactive Demo",
    adminPanel: "Admin Panel",
    restaurants: "Restaurants",
    satisfaction: "Satisfaction",
    sales: "Sales",
    tableDemo: "Table",
    restaurantDemo: "Demo Restaurant",
    online: "Online",
    extraChicken: "Extra chicken",
    total: "Total",
    finalizeOrder: "Finalize Order",
    whyChoose: "Why choose?",
    provenResults: "Proven Results",
    provenDescription: "Thousands of restaurants have already transformed their business with our solution. See the results you can achieve:",
    salesIncrease: "Sales Increase",
    salesIncreaseDesc: "Average 45% increase in sales with optimized digital orders.",
    costReduction: "Cost Reduction",
    costReductionDesc: "30% savings in operational costs with intelligent automation.",
    satisfactionRate: "Satisfaction Rate",
    satisfactionRateDesc: "98% of customers approve the personalized digital experience.",
    everythingYourRestaurantNeeds: "Everything your restaurant needs",
    completeDescription: "A complete solution that transforms every aspect of the dining experience, from order to delivery.",
    frictionlessAccess: "Frictionless Access",
    frictionlessDesc: "Customers access the menu with a simple QR code scan, no apps or registrations required.",
    smartOrders: "Smart Orders",
    smartOrdersDesc: "Optimized ordering system that reduces errors and speeds up service.",
    advancedAnalytics: "Advanced Analytics",
    advancedAnalyticsDesc: "Detailed reports to optimize menu, pricing and operations.",
    worksOffline: "Works Offline",
    worksOfflineDesc: "Robust system that continues working even without internet connection.",
    ordersToday: "Orders Today",
    revenue: "Revenue",
    preparing: "Preparing",
    ready: "Ready",
    now: "Now",
    whatClientsSay: "What our clients say",
    testimonialMaria: "Maria Santos",
    testimonialMariaRole: "Owner, Quinta Restaurant",
    testimonialMariaText: "It completely revolutionized our restaurant. Sales increased 50% and customers love the digital experience!",
    testimonialJoao: "João Silva",
    testimonialJoaoRole: "Manager, João's Tavern",
    testimonialJoaoText: "Super easy implementation and exceptional support. We can't imagine the restaurant without this solution.",
    testimonialAna: "Ana Costa",
    testimonialAnaRole: "Chef, Sea Flavors",
    testimonialAnaText: "The reports help us optimize the menu and better manage inventory. Essential tool!",
    readyToRevolutionize: "Ready to revolutionize?",
    revolutionizeDesc: "Join thousands of restaurants that have already transformed their business with our innovative solution.",
    testFreeDemo: "Test Free Demo",
    seeAdminPanel: "See Admin Panel",
    quickSetup: "Quick Setup",
    quickImplementation: "24h Implementation",
    support247: "24/7 Support",
    alwaysAvailable: "Always available",
    guaranteedROI: "Guaranteed ROI",
    returnIn60Days: "Return in 60 days",
    transformingRestaurants: "Transforming restaurants into exceptional digital experiences.",
    product: "Product",
    features: "Features",
    pricing: "Pricing",
    demo: "Demo",
    company: "Company",
    about: "About",
    blog: "Blog",
    careers: "Careers",
    support: "Support",
    helpCenter: "Help Center",
    contact: "Contact",
    whatsapp: "WhatsApp",
    footerCopyright: "© 2024 TapifyOrder. All rights reserved.",
  },
  es: {
    // Existing translations
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
    customize: "Personalizar",
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

    // Landing page translations
    landingSubtitle: "Sistema de Pedidos Digital",
    demoClient: "Demo Cliente",
    adminArea: "Área Admin",
    digitalRevolutionBadge: "Revolución Digital",
    transformYourRestaurant: "Transforma tu",
    intoDigital: "en una experiencia digital",
    landingDescription: "Sistema completo de pedidos digitales que revoluciona la experiencia del cliente y aumenta la eficiencia de tu restaurante.",
    seeInteractiveDemo: "Ver Demo Interactivo",
    adminPanel: "Panel Admin",
    restaurants: "Restaurantes",
    satisfaction: "Satisfacción",
    sales: "Ventas",
    tableDemo: "Mesa",
    restaurantDemo: "Restaurante Demo",
    online: "Online",
    extraChicken: "Extra pollo",
    total: "Total",
    finalizeOrder: "Finalizar Pedido",
    whyChoose: "¿Por qué elegir?",
    provenResults: "Resultados Comprobados",
    provenDescription: "Miles de restaurantes ya han transformado su negocio con nuestra solución. Ve los resultados que puedes lograr:",
    salesIncrease: "Aumento de Ventas",
    salesIncreaseDesc: "Promedio del 45% de aumento en ventas con pedidos digitales optimizados.",
    costReduction: "Reducción de Costos",
    costReductionDesc: "30% de ahorro en costos operacionales con automatización inteligente.",
    satisfactionRate: "Tasa de Satisfacción",
    satisfactionRateDesc: "98% de los clientes aprueban la experiencia digital personalizada.",
    everythingYourRestaurantNeeds: "Todo lo que tu restaurante necesita",
    completeDescription: "Una solución completa que transforma cada aspecto de la experiencia gastronómica, desde el pedido hasta la entrega.",
    frictionlessAccess: "Acceso sin Fricción",
    frictionlessDesc: "Los clientes acceden al menú con un simple escaneo del código QR, sin apps o registros.",
    smartOrders: "Pedidos Inteligentes",
    smartOrdersDesc: "Sistema de pedidos optimizado que reduce errores y acelera el servicio.",
    advancedAnalytics: "Análisis Avanzado",
    advancedAnalyticsDesc: "Reportes detallados para optimizar menú, precios y operaciones.",
    worksOffline: "Funciona Offline",
    worksOfflineDesc: "Sistema robusto que continúa funcionando incluso sin conexión a internet.",
    ordersToday: "Pedidos Hoy",
    revenue: "Ingresos",
    preparing: "Preparando",
    ready: "Listo",
    now: "Ahora",
    whatClientsSay: "Lo que dicen nuestros clientes",
    testimonialMaria: "María Santos",
    testimonialMariaRole: "Propietaria, Restaurante Quinta",
    testimonialMariaText: "Revolucionó completamente nuestro restaurante. ¡Las ventas aumentaron 50% y los clientes aman la experiencia digital!",
    testimonialJoao: "João Silva",
    testimonialJoaoRole: "Gerente, Tasca de João",
    testimonialJoaoText: "Implementación súper fácil y soporte excepcional. No podemos imaginar el restaurante sin esta solución.",
    testimonialAna: "Ana Costa",
    testimonialAnaRole: "Chef, Sabores del Mar",
    testimonialAnaText: "Los reportes nos ayudan a optimizar el menú y gestionar mejor el inventario. ¡Herramienta indispensable!",
    readyToRevolutionize: "¿Listo para revolucionar?",
    revolutionizeDesc: "Únete a miles de restaurantes que ya han transformado su negocio con nuestra solución innovadora.",
    testFreeDemo: "Probar Demo Gratuito",
    seeAdminPanel: "Ver Panel Admin",
    quickSetup: "Configuración Rápida",
    quickImplementation: "Implementación en 24h",
    support247: "Soporte 24/7",
    alwaysAvailable: "Siempre disponible",
    guaranteedROI: "ROI Garantizado",
    returnIn60Days: "Retorno en 60 días",
    transformingRestaurants: "Transformando restaurantes en experiencias digitales excepcionales.",
    product: "Producto",
    features: "Características",
    pricing: "Precios",
    demo: "Demo",
    company: "Empresa",
    about: "Acerca de",
    blog: "Blog",
    careers: "Carreras",
    support: "Soporte",
    helpCenter: "Centro de Ayuda",
    contact: "Contacto",
    whatsapp: "WhatsApp",
    footerCopyright: "© 2024 TapifyOrder. Todos los derechos reservados.",
  },
  fr: {
    // Existing translations
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
    customize: "Personnaliser",
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

    // Landing page translations
    landingSubtitle: "Système de Commande Numérique",
    demoClient: "Démo Client",
    adminArea: "Zone Admin",
    digitalRevolutionBadge: "Révolution Numérique",
    transformYourRestaurant: "Transformez votre",
    intoDigital: "en expérience numérique",
    landingDescription: "Système complet de commandes numériques qui révolutionne l'expérience client et augmente l'efficacité de votre restaurant.",
    seeInteractiveDemo: "Voir la Démo Interactive",
    adminPanel: "Panneau Admin",
    restaurants: "Restaurants",
    satisfaction: "Satisfaction",
    sales: "Ventes",
    tableDemo: "Table",
    restaurantDemo: "Restaurant Démo",
    online: "En ligne",
    extraChicken: "Extra poulet",
    total: "Total",
    finalizeOrder: "Finaliser la Commande",
    whyChoose: "Pourquoi choisir ?",
    provenResults: "Résultats Prouvés",
    provenDescription: "Des milliers de restaurants ont déjà transformé leur entreprise avec notre solution. Voyez les résultats que vous pouvez atteindre :",
    salesIncrease: "Augmentation des Ventes",
    salesIncreaseDesc: "Augmentation moyenne de 45% des ventes avec des commandes numériques optimisées.",
    costReduction: "Réduction des Coûts",
    costReductionDesc: "30% d'économies sur les coûts opérationnels avec l'automatisation intelligente.",
    satisfactionRate: "Taux de Satisfaction",
    satisfactionRateDesc: "98% des clients approuvent l'expérience numérique personnalisée.",
    everythingYourRestaurantNeeds: "Tout ce dont votre restaurant a besoin",
    completeDescription: "Une solution complète qui transforme chaque aspect de l'expérience gastronomique, de la commande à la livraison.",
    frictionlessAccess: "Accès sans Friction",
    frictionlessDesc: "Les clients accèdent au menu avec un simple scan du code QR, sans applications ou inscriptions.",
    smartOrders: "Commandes Intelligentes",
    smartOrdersDesc: "Système de commande optimisé qui réduit les erreurs et accélère le service.",
    advancedAnalytics: "Analyse Avancée",
    advancedAnalyticsDesc: "Rapports détaillés pour optimiser le menu, les prix et les opérations.",
    worksOffline: "Fonctionne Hors Ligne",
    worksOfflineDesc: "Système robuste qui continue de fonctionner même sans connexion internet.",
    ordersToday: "Commandes Aujourd'hui",
    revenue: "Revenus",
    preparing: "Préparation",
    ready: "Prêt",
    now: "Maintenant",
    whatClientsSay: "Ce que disent nos clients",
    testimonialMaria: "Maria Santos",
    testimonialMariaRole: "Propriétaire, Restaurant Quinta",
    testimonialMariaText: "Cela a complètement révolutionné notre restaurant. Les ventes ont augmenté de 50% et les clients adorent l'expérience numérique !",
    testimonialJoao: "João Silva",
    testimonialJoaoRole: "Gérant, Taverne de João",
    testimonialJoaoText: "Implémentation super facile et support exceptionnel. Nous ne pouvons pas imaginer le restaurant sans cette solution.",
    testimonialAna: "Ana Costa",
    testimonialAnaRole: "Chef, Saveurs de la Mer",
    testimonialAnaText: "Les rapports nous aident à optimiser le menu et à mieux gérer l'inventaire. Outil indispensable !",
    readyToRevolutionize: "Prêt à révolutionner ?",
    revolutionizeDesc: "Rejoignez des milliers de restaurants qui ont déjà transformé leur entreprise avec notre solution innovante.",
    testFreeDemo: "Tester la Démo Gratuite",
    seeAdminPanel: "Voir le Panneau Admin",
    quickSetup: "Configuration Rapide",
    quickImplementation: "Implémentation en 24h",
    support247: "Support 24/7",
    alwaysAvailable: "Toujours disponible",
    guaranteedROI: "ROI Garanti",
    returnIn60Days: "Retour en 60 jours",
    transformingRestaurants: "Transformant les restaurants en expériences numériques exceptionnelles.",
    product: "Produit",
    features: "Fonctionnalités",
    pricing: "Prix",
    demo: "Démo",
    company: "Entreprise",
    about: "À propos",
    blog: "Blog",
    careers: "Carrières",
    support: "Support",
    helpCenter: "Centre d'Aide",
    contact: "Contact",
    whatsapp: "WhatsApp",
    footerCopyright: "© 2024 TapifyOrder. Tous droits réservés.",
  },
  de: {
    // Existing translations
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
    customize: "Anpassen",
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

    // Landing page translations
    landingSubtitle: "Digitales Bestellsystem",
    demoClient: "Kunden-Demo",
    adminArea: "Admin-Bereich",
    digitalRevolutionBadge: "Digitale Revolution",
    transformYourRestaurant: "Verwandeln Sie Ihr",
    intoDigital: "in ein digitales Erlebnis",
    landingDescription: "Komplettes digitales Bestellsystem, das die Kundenerfahrung revolutioniert und die Effizienz Ihres Restaurants steigert.",
    seeInteractiveDemo: "Interaktive Demo ansehen",
    adminPanel: "Admin-Panel",
    restaurants: "Restaurants",
    satisfaction: "Zufriedenheit",
    sales: "Verkäufe",
    tableDemo: "Tisch",
    restaurantDemo: "Restaurant-Demo",
    online: "Online",
    extraChicken: "Extra Hähnchen",
    total: "Gesamt",
    finalizeOrder: "Bestellung abschließen",
    whyChoose: "Warum wählen?",
    provenResults: "Bewährte Ergebnisse",
    provenDescription: "Tausende von Restaurants haben ihr Geschäft bereits mit unserer Lösung transformiert. Sehen Sie die Ergebnisse, die Sie erzielen können:",
    salesIncrease: "Umsatzsteigerung",
    salesIncreaseDesc: "Durchschnittlich 45% Umsatzsteigerung mit optimierten digitalen Bestellungen.",
    costReduction: "Kostenreduktion",
    costReductionDesc: "30% Einsparungen bei Betriebskosten durch intelligente Automatisierung.",
    satisfactionRate: "Zufriedenheitsrate",
    satisfactionRateDesc: "98% der Kunden genehmigen die personalisierte digitale Erfahrung.",
    everythingYourRestaurantNeeds: "Alles, was Ihr Restaurant braucht",
    completeDescription: "Eine Komplettlösung, die jeden Aspekt des Gastronomieerlebnisses transformiert, von der Bestellung bis zur Lieferung.",
    frictionlessAccess: "Reibungsloser Zugang",
    frictionlessDesc: "Kunden greifen mit einem einfachen QR-Code-Scan auf die Speisekarte zu, ohne Apps oder Registrierungen.",
    smartOrders: "Intelligente Bestellungen",
    smartOrdersDesc: "Optimiertes Bestellsystem, das Fehler reduziert und den Service beschleunigt.",
    advancedAnalytics: "Erweiterte Analysen",
    advancedAnalyticsDesc: "Detaillierte Berichte zur Optimierung von Menü, Preisen und Betrieb.",
    worksOffline: "Funktioniert offline",
    worksOfflineDesc: "Robustes System, das auch ohne Internetverbindung funktioniert.",
    ordersToday: "Bestellungen heute",
    revenue: "Einnahmen",
    preparing: "In Vorbereitung",
    ready: "Bereit",
    now: "Jetzt",
    whatClientsSay: "Was unsere Kunden sagen",
    testimonialMaria: "Maria Santos",
    testimonialMariaRole: "Inhaberin, Restaurant Quinta",
    testimonialMariaText: "Es hat unser Restaurant komplett revolutioniert. Die Verkäufe sind um 50% gestiegen und die Kunden lieben das digitale Erlebnis!",
    testimonialJoao: "João Silva",
    testimonialJoaoRole: "Manager, João's Taverne",
    testimonialJoaoText: "Super einfache Implementierung und außergewöhnlicher Support. Wir können uns das Restaurant ohne diese Lösung nicht mehr vorstellen.",
    testimonialAna: "Ana Costa",
    testimonialAnaRole: "Köchin, Meeresgeschmäcker",
    testimonialAnaText: "Die Berichte helfen uns, das Menü zu optimieren und den Bestand besser zu verwalten. Unverzichtbares Werkzeug!",
    readyToRevolutionize: "Bereit für eine Revolution?",
    revolutionizeDesc: "Schließen Sie sich Tausenden von Restaurants an, die ihr Geschäft bereits mit unserer innovativen Lösung transformiert haben.",
    testFreeDemo: "Kostenlose Demo testen",
    seeAdminPanel: "Admin-Panel ansehen",
    quickSetup: "Schnelle Einrichtung",
    quickImplementation: "Implementierung in 24 Stunden",
    support247: "24/7 Support",
    alwaysAvailable: "Immer verfügbar",
    guaranteedROI: "Garantierte Rendite",
    returnIn60Days: "Rückkehr in 60 Tagen",
    transformingRestaurants: "Verwandlung von Restaurants in außergewöhnliche digitale Erlebnisse.",
    product: "Produkt",
    features: "Funktionen",
    pricing: "Preise",
    demo: "Demo",
    company: "Unternehmen",
    about: "Über uns",
    blog: "Blog",
    careers: "Karriere",
    support: "Support",
    helpCenter: "Hilfezentrum",
    contact: "Kontakt",
    whatsapp: "WhatsApp",
    footerCopyright: "© 2024 TapifyOrder. Alle Rechte vorbehalten.",
  },
} 

export const getDictionary = async (locale: Language) => dictionaries[locale]
