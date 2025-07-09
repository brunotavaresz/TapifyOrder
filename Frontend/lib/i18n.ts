export type Language = "pt" | "en" | "fr" | "es" | "de"

export interface Currency {
  code: string
  symbol: string
  name: string
}

export const currencies: Record<Language, Currency> = {
  pt: { code: "EUR", symbol: "€", name: "Euro" },
  en: { code: "GBP", symbol: "£", name: "British Pound" },
  fr: { code: "EUR", symbol: "€", name: "Euro" },
  es: { code: "EUR", symbol: "€", name: "Euro" },
  de: { code: "EUR", symbol: "€", name: "Euro" },
}

export interface Translations {
  // Navigation & Common
  backToMenu: string
  backToDashboard: string
  backToSite: string
  backToOrders: string
  continueToMenu: string
  loading: string
  save: string
  cancel: string
  delete: string
  edit: string
  add: string
  close: string

  // Landing Page
  landingTitle: string
  landingSubtitle: string
  landingDescription: string
  demoClient: string
  adminArea: string
  seeInteractiveDemo: string
  adminPanel: string
  restaurants: string
  satisfaction: string
  sales: string
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
  whatClientsSay: string
  readyToRevolutionize: string
  revolutionizeDesc: string
  testFreeDemo: string
  seeAdminPanel: string
  quickSetup: string
  support247: string
  guaranteedROI: string

  // Landing Page - Hero Section
  digitalRevolutionBadge: string
  transformYourRestaurant: string
  intoDigital: string

  // Demo Card
  tableDemo: string
  restaurantDemo: string
  online: string
  extraChicken: string

  // Testimonials
  testimonialMaria: string
  testimonialMariaRole: string
  testimonialMariaText: string
  testimonialJoao: string
  testimonialJoaoRole: string
  testimonialJoaoText: string
  testimonialAna: string
  testimonialAnaRole: string
  testimonialAnaText: string

  // CTA Section
  quickImplementation: string
  alwaysAvailable: string
  returnIn60Days: string

  // Footer
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

  // Client Pages
  welcome: string
  welcomeMessage: string
  tableNumberLabel: string
  tableNumberPlaceholder: string
  scanQRCode: string
  or: string
  backToStart: string
  mainMenu: string
  mainDishes: string
  mainDishesDesc: string
  salads: string
  saladsDesc: string
  desserts: string
  dessertsDesc: string
  drinks: string
  drinksDesc: string
  myOrders: string
  trackOrderStatus: string
  makeOrder: string
  makeOrderDesc: string
  exploreMenu: string
  cart: string
  emptyCart: string
  emptyCartDesc: string
  continueShopping: string
  yourItems: string
  customizations: string
  each: string
  subtotal: string
  total: string
  specialInstructions: string
  specialInstructionsDesc: string
  specialInstructionsPlaceholder: string
  finalizeOrder: string

  // Menu
  restaurantName: string
  welcomeToTable: string
  discoverFlavors: string
  stars: string
  deliveryTime: string
  table: string
  searchPlaceholder: string
  all: string
  starters: string
  mains: string
  popular: string
  customizable: string
  customize: string
  viewCart: string
  callWaiter: string
  waiterCalled: string
  waiterCalledDesc: string
  noItemsFound: string
  noItemsFoundDesc: string

  // Menu Items (for translation)
  pizzaMargherita: string
  pizzaMargheritaDesc: string
  caesarSalad: string
  caesarSaladDesc: string
  tiramisu: string
  tiramisuDesc: string
  detoxJuice: string
  detoxJuiceDesc: string
  shrimpRisotto: string
  shrimpRisottoDesc: string
  bruschettaTrio: string
  bruschettaTrioDesc: string

  // Orders
  trackOrders: string
  trackOrdersDesc: string
  noOrdersYet: string
  noOrdersDesc: string
  orderReceived: string
  preparing: string
  readyForDelivery: string
  delivered: string
  orderReceivedDesc: string
  preparingDesc: string
  readyForDeliveryDesc: string
  deliveredDesc: string
  estimatedTime: string
  orderItems: string
  specialObservations: string
  orderStatus: string
  orderDeliveredSuccess: string
  orderDeliveredDesc: string
  payOrder: string
  makeNewOrder: string
  orderProgress: string
  agoTime: string

  // Payment
  finalizePayment: string
  orderSummary: string
  paymentMethod: string
  choosePayment: string
  creditCard: string
  creditCardDesc: string
  debitCard: string
  debitCardDesc: string
  mbway: string
  mbwayDesc: string
  cardData: string
  cardNumber: string
  validity: string
  cvv: string
  nameOnCard: string
  nameOnCardPlaceholder: string
  mbwayPayment: string
  mbwayDescription: string
  enterPhoneNumber: string
  phoneNumberPlaceholder: string
  copyMBWayCode: string
  securityInfo: string
  paymentCompleted: string
  paymentCompletedDesc: string
  viewMyOrders: string
  processing: string

  // Admin
  adminTitle: string
  adminSubtitle: string
  manageMenu: string
  ordersToday: string
  revenue: string
  pending: string
  completed: string
  realTimeOrders: string
  orderedByArrival: string
  filterByStatus: string
  allStatuses: string
  received: string
  ready: string
  noOrdersFound: string
  noOrdersFoundDesc: string
  updateStatus: string
  sinceyesterday: string
  awaitingPrepDelivery: string
  deliveredToday: string

  // Admin Menu
  menuManagement: string
  addEditRemove: string
  addNewItem: string
  dishName: string
  price: string
  description: string
  descriptionPlaceholder: string
  category: string
  emoji: string
  prepTime: string
  prepTimePlaceholder: string
  addItem: string
  menuItems: string
  clientPreview: string
  howClientsView: string
  unavailable: string
  hidePreview: string
  showPreview: string

  // Categories
  entries: string
  mainCourses: string
  beverages: string

  // Notifications
  itemAddedToCart: string

  // Time
  minAgo: string
  now: string
  continue: string
}

export const translations: Record<Language, Translations> = {
  pt: {
    // Navigation & Common
    backToMenu: "Voltar ao Menu",
    backToDashboard: "Voltar ao Dashboard",
    backToSite: "Voltar ao Site",
    backToOrders: "Voltar aos Pedidos",
    continueToMenu: "Continuar para o Menu",
    loading: "A carregar...",
    save: "Guardar",
    cancel: "Cancelar",
    delete: "Eliminar",
    edit: "Editar",
    add: "Adicionar",
    close: "Fechar",

    // Landing Page
    landingTitle: "TapifyOrder",
    landingSubtitle: "RESTAURANTE DIGITAL",
    landingDescription:
      "Aumente as suas vendas em 45%, reduza custos operacionais e ofereça uma experiência única aos seus clientes com a nossa plataforma completa.",
    demoClient: "Demonstração Cliente",
    adminArea: "Área Administração",
    seeInteractiveDemo: "Ver Demonstração Interativa",
    adminPanel: "Painel Administração",
    restaurants: "Restaurantes",
    satisfaction: "Satisfação",
    sales: "+ Vendas",
    whyChoose: "Porquê escolher TapifyOrder?",
    provenResults: "Resultados comprovados para o seu negócio",
    provenDescription:
      "Mais de 500 restaurantes já transformaram as suas operações e aumentaram significativamente as suas receitas",
    salesIncrease: "+45% em Vendas",
    salesIncreaseDesc:
      "Aumento médio nas vendas dos restaurantes que adotaram a nossa plataforma nos primeiros 3 meses",
    costReduction: "-30% Custos Operacionais",
    costReductionDesc: "Redução significativa em custos com empregados, impressão de ementas e erros de pedidos",
    satisfactionRate: "98% Satisfação",
    satisfactionRateDesc:
      "Clientes adoram a praticidade e velocidade. Avaliações consistentemente acima de 4.8 estrelas",
    everythingYourRestaurantNeeds: "Tudo que o seu restaurante precisa",
    completeDescription: "Uma plataforma completa que revoluciona cada aspeto da experiência gastronómica",
    frictionlessAccess: "Acesso Sem Fricção",
    frictionlessDesc:
      "Clientes digitalizam código QR e acedem à ementa instantaneamente. Sem apps para descarregar, sem registos complicados.",
    smartOrders: "Pedidos Inteligentes",
    smartOrdersDesc:
      "Ementa interativa com personalização completa, recomendações automáticas e upselling inteligente.",
    advancedAnalytics: "Analytics Avançados",
    advancedAnalyticsDesc:
      "Relatórios detalhados sobre vendas, pratos mais pedidos, horários de pico e comportamento dos clientes.",
    worksOffline: "Funciona Offline",
    worksOfflineDesc: "Sistema robusto que continua a funcionar mesmo com internet instável. Sincronização automática.",
    whatClientsSay: "O que os nossos clientes dizem",
    readyToRevolutionize: "Pronto para revolucionar o seu restaurante?",
    revolutionizeDesc:
      "Junte-se a mais de 500 restaurantes que já transformaram as suas operações e aumentaram as suas receitas com TapifyOrder.",
    testFreeDemo: "Testar Demonstração Grátis",
    seeAdminPanel: "Ver Painel Administração",
    quickSetup: "✅ Configuração em 24h",
    support247: "📞 Suporte 24/7",
    guaranteedROI: "💰 ROI Garantido",

    // Landing Page - Hero Section
    digitalRevolutionBadge: "🚀 Revolução Digital para Restaurantes",
    transformYourRestaurant: "Transforme o seu",
    intoDigital: "restaurante em digital",

    // Demo Card
    tableDemo: "Mesa",
    restaurantDemo: "Restaurante Demonstração",
    online: "Online",
    extraChicken: "Extra frango",

    // Testimonials
    testimonialMaria: "Maria Silva",
    testimonialMariaRole: "Proprietária - Restaurante Sabor",
    testimonialMariaText:
      "As nossas vendas aumentaram 50% no primeiro mês! Os clientes adoram a praticidade e nós poupamos muito em empregados.",
    testimonialJoao: "João Santos",
    testimonialJoaoRole: "Chef - Bistro Gourmet",
    testimonialJoaoText:
      "Revolucionou a nossa operação! Menos erros de pedidos, mais eficiência na cozinha e clientes mais satisfeitos.",
    testimonialAna: "Ana Costa",
    testimonialAnaRole: "Gerente - Pizzaria Bella",
    testimonialAnaText:
      "O ROI foi incrível! Pagou o investimento em 2 meses e agora é puro lucro. Recomendo a todos os restaurantes.",

    // CTA Section
    quickImplementation: "Implementação rápida",
    alwaysAvailable: "Sempre disponível",
    returnIn60Days: "Retorno em 60 dias",

    // Footer
    transformingRestaurants: "Transformando restaurantes em negócios digitais de sucesso.",
    product: "Produto",
    features: "Funcionalidades",
    pricing: "Preços",
    demo: "Demonstração",
    company: "Empresa",
    about: "Sobre",
    blog: "Blog",
    careers: "Carreiras",
    support: "Suporte",
    helpCenter: "Central de Ajuda",
    contact: "Contacto",
    whatsapp: "WhatsApp",
    footerCopyright: "© 2024 TapifyOrder. Todos os direitos reservados. Transformando restaurantes desde 2024.",

    // Client Pages
    welcome: "Bem-vindo!",
    welcomeMessage: "Para começar, informe o número da sua mesa ou digitalize o código QR",
    tableNumberLabel: "Número da Mesa",
    tableNumberPlaceholder: "Ex: 12",
    scanQRCode: "Digitalizar Código QR",
    or: "ou",
    backToStart: "Voltar ao início",
    mainMenu: "Ementa Principal",
    mainDishes: "Pratos Principais",
    mainDishesDesc: "Pizzas, massas e mais",
    salads: "Saladas",
    saladsDesc: "Frescas e saudáveis",
    desserts: "Sobremesas",
    dessertsDesc: "Doces irresistíveis",
    drinks: "Bebidas",
    drinksDesc: "Sumos, refrigerantes",
    myOrders: "Os Meus Pedidos",
    trackOrderStatus: "Acompanhe o estado dos seus pedidos",
    makeOrder: "Fazer Pedido",
    makeOrderDesc: "Explore a ementa e faça o seu pedido",
    exploreMenu: "Explorar Ementa",
    cart: "Carrinho",
    emptyCart: "Carrinho vazio",
    emptyCartDesc: "Adicione alguns itens deliciosos da nossa ementa!",
    continueShopping: "Continuar Compras",
    yourItems: "Os Seus Itens",
    customizations: "Personalizações",
    each: "cada",
    subtotal: "Subtotal",
    total: "Total",
    specialInstructions: "Observações Especiais",
    specialInstructionsDesc: "Alguma observação especial para o seu pedido?",
    specialInstructionsPlaceholder: "Ex: Sem cebola na pizza, ponto da carne bem passado...",
    finalizeOrder: "Finalizar Pedido",

    // Menu
    restaurantName: "Restaurante Sabor & Arte",
    welcomeToTable: "Bem-vindo à mesa",
    discoverFlavors: "Descubra sabores únicos na nossa coleção gastronómica",
    stars: "estrelas",
    deliveryTime: "Entrega em 30min",
    table: "Mesa",
    searchPlaceholder: "Procurar pratos, bebidas...",
    all: "Todos",
    starters: "Entradas",
    mains: "Pratos Principais",
    popular: "Popular",
    customizable: "Personalizável",
    customize: "Personalizar",
    viewCart: "Ver Carrinho",
    callWaiter: "Chamar Empregado",
    waiterCalled: "Empregado Chamado!",
    waiterCalledDesc: "O empregado foi notificado e estará na sua mesa em breve.",
    noItemsFound: "Nenhum item encontrado",
    noItemsFoundDesc: "Tente ajustar a sua pesquisa ou filtros",

    // Menu Items
    pizzaMargherita: "Pizza Margherita Artesanal",
    pizzaMargheritaDesc: "Molho de tomate San Marzano, mozzarella di bufala, manjericão fresco e azeite extra virgem",
    caesarSalad: "Salada Caesar Premium",
    caesarSaladDesc: "Alface romana crocante, croutons artesanais, parmesão reggiano e molho caesar tradicional",
    tiramisu: "Tiramisu da Casa",
    tiramisuDesc: "Sobremesa italiana clássica com café espresso, mascarpone e cacau belga",
    detoxJuice: "Sumo Natural Detox",
    detoxJuiceDesc: "Laranja, cenoura, gengibre e hortelã. Rico em vitaminas e antioxidantes",
    shrimpRisotto: "Risotto de Camarão",
    shrimpRisottoDesc: "Arroz arbóreo cremoso com camarões frescos, vinho branco e ervas finas",
    bruschettaTrio: "Bruschetta Trio",
    bruschettaTrioDesc: "Três variações: tomate e manjericão, burrata e presunto, cogumelos e trufa",

    // Orders
    trackOrders: "Acompanhe os seus Pedidos",
    trackOrdersDesc: "Veja o estado em tempo real de todos os seus pedidos",
    noOrdersYet: "Nenhum pedido ainda",
    noOrdersDesc: "Que tal fazer o seu primeiro pedido?",
    orderReceived: "Pedido recebido",
    preparing: "A preparar",
    readyForDelivery: "Pronto para entrega",
    delivered: "Entregue",
    orderReceivedDesc: "O seu pedido foi recebido e está na fila de preparação",
    preparingDesc: "A nossa equipa está a preparar o seu pedido com carinho",
    readyForDeliveryDesc: "O seu pedido está pronto e será entregue em breve",
    deliveredDesc: "Pedido entregue! Agora pode efetuar o pagamento",
    estimatedTime: "Tempo estimado",
    orderItems: "Itens do pedido",
    specialObservations: "Observações especiais",
    orderStatus: "Estado do pedido",
    orderDeliveredSuccess: "Pedido entregue com sucesso!",
    orderDeliveredDesc: "O seu pedido foi entregue. Agora pode efetuar o pagamento de forma segura.",
    payOrder: "Pagar Pedido",
    makeNewOrder: "Fazer Novo Pedido",
    orderProgress: "Progresso do pedido",
    agoTime: "atrás",

    // Payment
    finalizePayment: "Finalizar Pagamento",
    orderSummary: "Resumo do Pedido",
    paymentMethod: "Método de Pagamento",
    choosePayment: "Escolha como deseja pagar",
    creditCard: "Cartão de Crédito",
    creditCardDesc: "Visa, Mastercard, American Express",
    debitCard: "Cartão de Débito",
    debitCardDesc: "Débito à vista",
    mbway: "MB WAY",
    mbwayDesc: "Pagamento via telemóvel",
    cardData: "Dados do Cartão",
    cardNumber: "Número do Cartão",
    validity: "Validade",
    cvv: "CVV",
    nameOnCard: "Nome no Cartão",
    nameOnCardPlaceholder: "Nome como está no cartão",
    mbwayPayment: "Pagamento via MB WAY",
    mbwayDescription: "Introduza o seu número de telemóvel para receber a notificação MB WAY",
    enterPhoneNumber: "Número de telemóvel",
    phoneNumberPlaceholder: "+351 912 345 678",
    copyMBWayCode: "Enviar Pedido MB WAY",
    securityInfo: "Os seus dados estão protegidos com encriptação SSL de 256 bits",
    paymentCompleted: "Pagamento Realizado!",
    paymentCompletedDesc: "O seu pagamento foi processado com sucesso.",
    viewMyOrders: "Ver Os Meus Pedidos",
    processing: "A processar...",

    // Admin
    adminTitle: "TapifyOrder Administração",
    adminSubtitle: "Painel de Controlo Avançado",
    manageMenu: "Gerir Ementa",
    ordersToday: "Pedidos Hoje",
    revenue: "Receita",
    pending: "Pendentes",
    completed: "Concluídos",
    realTimeOrders: "Pedidos em Tempo Real",
    orderedByArrival: "Ordenados por tempo de chegada (mais antigos primeiro)",
    filterByStatus: "Filtrar por estado",
    allStatuses: "Todos os Estados",
    received: "Recebido",
    ready: "Pronto",
    noOrdersFound: "Nenhum pedido encontrado",
    noOrdersFoundDesc: "Não há pedidos no momento.",
    updateStatus: "Atualizar Estado",
    sinceyesterday: "+12% desde ontem",
    awaitingPrepDelivery: "Aguardando preparo/entrega",
    deliveredToday: "Entregues hoje",

    // Admin Menu
    menuManagement: "Gestão da Ementa",
    addEditRemove: "Adicione, edite ou remova itens da ementa",
    addNewItem: "Adicionar Novo Item",
    dishName: "Nome do Prato",
    price: "Preço (€)",
    description: "Descrição",
    descriptionPlaceholder: "Descreva os ingredientes e características do prato",
    category: "Categoria",
    emoji: "Emoji",
    prepTime: "Tempo de Preparação",
    prepTimePlaceholder: "15 min",
    addItem: "Adicionar Item",
    menuItems: "Itens da Ementa",
    clientPreview: "Pré-visualização do Cliente",
    howClientsView: "Como os clientes veem a ementa",
    unavailable: "Indisponível",
    hidePreview: "Ocultar",
    showPreview: "Ver",

    // Categories
    entries: "Entradas",
    mainCourses: "Pratos Principais",
    beverages: "Bebidas",

    // Notifications
    itemAddedToCart: "Item adicionado ao carrinho!",

    // Time
    minAgo: "min atrás",
    now: "Agora",
    continue: "Continuar",
  },

  en: {
    // Navigation & Common
    backToMenu: "Back to Menu",
    backToDashboard: "Back to Dashboard",
    backToSite: "Back to Site",
    backToOrders: "Back to Orders",
    continueToMenu: "Continue to Menu",
    loading: "Loading...",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    add: "Add",
    close: "Close",

    // Landing Page
    landingTitle: "TapifyOrder",
    landingSubtitle: "DIGITAL RESTAURANT",
    landingDescription:
      "Increase your sales by 45%, reduce operational costs and offer a unique experience to your customers with our complete platform.",
    demoClient: "Client Demo",
    adminArea: "Admin Area",
    seeInteractiveDemo: "See Interactive Demo",
    adminPanel: "Admin Panel",
    restaurants: "Restaurants",
    satisfaction: "Satisfaction",
    sales: "+ Sales",
    whyChoose: "Why choose TapifyOrder?",
    provenResults: "Proven results for your business",
    provenDescription:
      "More than 500 restaurants have already transformed their operations and significantly increased their revenue",
    salesIncrease: "+45% in Sales",
    salesIncreaseDesc: "Average increase in sales for restaurants that adopted our platform in the first 3 months",
    costReduction: "-30% Operational Costs",
    costReductionDesc: "Significant reduction in costs with staff, menu printing and order errors",
    satisfactionRate: "98% Satisfaction",
    satisfactionRateDesc: "Customers love the convenience and speed. Ratings consistently above 4.8 stars",
    everythingYourRestaurantNeeds: "Everything your restaurant needs",
    completeDescription: "A complete platform that revolutionizes every aspect of the gastronomic experience",
    frictionlessAccess: "Frictionless Access",
    frictionlessDesc:
      "Customers scan QR code and access the menu instantly. No apps to download, no complicated registrations.",
    smartOrders: "Smart Orders",
    smartOrdersDesc:
      "Interactive menu with complete customization, automatic recommendations and intelligent upselling.",
    advancedAnalytics: "Advanced Analytics",
    advancedAnalyticsDesc: "Detailed reports on sales, most ordered dishes, peak hours and customer behavior.",
    worksOffline: "Works Offline",
    worksOfflineDesc: "Robust system that continues to work even with unstable internet. Automatic synchronization.",
    whatClientsSay: "What our clients say",
    readyToRevolutionize: "Ready to revolutionize your restaurant?",
    revolutionizeDesc:
      "Join more than 500 restaurants that have already transformed their operations and increased their revenue with TapifyOrder.",
    testFreeDemo: "Test Free Demo",
    seeAdminPanel: "See Admin Panel",
    quickSetup: "✅ 24h Setup",
    support247: "📞 24/7 Support",
    guaranteedROI: "💰 Guaranteed ROI",

    // Landing Page - Hero Section
    digitalRevolutionBadge: "🚀 Digital Revolution for Restaurants",
    transformYourRestaurant: "Transform your",
    intoDigital: "restaurant into digital",

    // Demo Card
    tableDemo: "Table",
    restaurantDemo: "Demo Restaurant",
    online: "Online",
    extraChicken: "Extra chicken",

    // Testimonials
    testimonialMaria: "Maria Silva",
    testimonialMariaRole: "Owner - Sabor Restaurant",
    testimonialMariaText:
      "Our sales increased 50% in the first month! Customers love the convenience and we save a lot on staff.",
    testimonialJoao: "João Santos",
    testimonialJoaoRole: "Chef - Bistro Gourmet",
    testimonialJoaoText:
      "It revolutionized our operation! Fewer order errors, more kitchen efficiency and more satisfied customers.",
    testimonialAna: "Ana Costa",
    testimonialAnaRole: "Manager - Pizzaria Bella",
    testimonialAnaText:
      "The ROI was incredible! It paid for the investment in 2 months and now it's pure profit. I recommend it to all restaurants.",

    // CTA Section
    quickImplementation: "Quick implementation",
    alwaysAvailable: "Always available",
    returnIn60Days: "Return in 60 days",

    // Footer
    transformingRestaurants: "Transforming restaurants into successful digital businesses.",
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
    footerCopyright: "© 2024 TapifyOrder. All rights reserved. Transforming restaurants since 2024.",

    // Client Pages
    welcome: "Welcome!",
    welcomeMessage: "To get started, enter your table number or scan the QR Code",
    tableNumberLabel: "Table Number",
    tableNumberPlaceholder: "Ex: 12",
    scanQRCode: "Scan QR Code",
    or: "or",
    backToStart: "Back to start",
    mainMenu: "Main Menu",
    mainDishes: "Main Dishes",
    mainDishesDesc: "Pizzas, pasta and more",
    salads: "Salads",
    saladsDesc: "Fresh and healthy",
    desserts: "Desserts",
    dessertsDesc: "Irresistible sweets",
    drinks: "Drinks",
    drinksDesc: "Juices, soft drinks",
    myOrders: "My Orders",
    trackOrderStatus: "Track the status of your orders",
    makeOrder: "Make Order",
    makeOrderDesc: "Explore the menu and make your order",
    exploreMenu: "Explore Menu",
    cart: "Cart",
    emptyCart: "Empty cart",
    emptyCartDesc: "Add some delicious items from our menu!",
    continueShopping: "Continue Shopping",
    yourItems: "Your Items",
    customizations: "Customizations",
    each: "each",
    subtotal: "Subtotal",
    total: "Total",
    specialInstructions: "Special Instructions",
    specialInstructionsDesc: "Any special instructions for your order?",
    specialInstructionsPlaceholder: "Ex: No onions on pizza, well-done meat...",
    finalizeOrder: "Finalize Order",

    // Menu
    restaurantName: "Sabor & Arte Restaurant",
    welcomeToTable: "Welcome to table",
    discoverFlavors: "Discover unique flavors in our gastronomic collection",
    stars: "stars",
    deliveryTime: "Delivery in 30min",
    table: "Table",
    searchPlaceholder: "Search dishes, drinks...",
    all: "All",
    starters: "Starters",
    mains: "Main Courses",
    popular: "Popular",
    customizable: "Customizable",
    customize: "Customize",
    viewCart: "View Cart",
    callWaiter: "Call Waiter",
    waiterCalled: "Waiter Called!",
    waiterCalledDesc: "The waiter has been notified and will be at your table shortly.",
    noItemsFound: "No items found",
    noItemsFoundDesc: "Try adjusting your search or filters",

    // Menu Items
    pizzaMargherita: "Artisanal Margherita Pizza",
    pizzaMargheritaDesc: "San Marzano tomato sauce, buffalo mozzarella, fresh basil and extra virgin olive oil",
    caesarSalad: "Premium Caesar Salad",
    caesarSaladDesc: "Crispy romaine lettuce, artisanal croutons, reggiano parmesan and traditional caesar dressing",
    tiramisu: "House Tiramisu",
    tiramisuDesc: "Classic Italian dessert with espresso coffee, mascarpone and Belgian cocoa",
    detoxJuice: "Natural Detox Juice",
    detoxJuiceDesc: "Orange, carrot, ginger and mint. Rich in vitamins and antioxidants",
    shrimpRisotto: "Shrimp Risotto",
    shrimpRisottoDesc: "Creamy arborio rice with fresh shrimp, white wine and fine herbs",
    bruschettaTrio: "Bruschetta Trio",
    bruschettaTrioDesc: "Three variations: tomato and basil, burrata and ham, mushrooms and truffle",

    // Orders
    trackOrders: "Track Your Orders",
    trackOrdersDesc: "See the real-time status of all your orders",
    noOrdersYet: "No orders yet",
    noOrdersDesc: "How about making your first order?",
    orderReceived: "Order received",
    preparing: "Preparing",
    readyForDelivery: "Ready for delivery",
    delivered: "Delivered",
    orderReceivedDesc: "Your order has been received and is in the preparation queue",
    preparingDesc: "Our team is preparing your order with care",
    readyForDeliveryDesc: "Your order is ready and will be delivered shortly",
    deliveredDesc: "Order delivered! You can now make the payment",
    estimatedTime: "Estimated time",
    orderItems: "Order items",
    specialObservations: "Special observations",
    orderStatus: "Order status",
    orderDeliveredSuccess: "Order delivered successfully!",
    orderDeliveredDesc: "Your order has been delivered. You can now make the payment securely.",
    payOrder: "Pay Order",
    makeNewOrder: "Make New Order",
    orderProgress: "Order progress",
    agoTime: "ago",

    // Payment
    finalizePayment: "Finalize Payment",
    orderSummary: "Order Summary",
    paymentMethod: "Payment Method",
    choosePayment: "Choose how you want to pay",
    creditCard: "Credit Card",
    creditCardDesc: "Visa, Mastercard, American Express",
    debitCard: "Debit Card",
    debitCardDesc: "Debit payment",
    mbway: "PayPal",
    mbwayDesc: "Digital wallet payment",
    cardData: "Card Data",
    cardNumber: "Card Number",
    validity: "Expiry",
    cvv: "CVV",
    nameOnCard: "Name on Card",
    nameOnCardPlaceholder: "Name as it appears on card",
    mbwayPayment: "PayPal Payment",
    mbwayDescription: "Enter your email to receive the PayPal payment request",
    enterPhoneNumber: "Email address",
    phoneNumberPlaceholder: "your.email@example.com",
    copyMBWayCode: "Send PayPal Request",
    securityInfo: "Your data is protected with 256-bit SSL encryption",
    paymentCompleted: "Payment Completed!",
    paymentCompletedDesc: "Your payment has been processed successfully.",
    viewMyOrders: "View My Orders",
    processing: "Processing...",

    // Admin
    adminTitle: "TapifyOrder Admin",
    adminSubtitle: "Advanced Control Panel",
    manageMenu: "Manage Menu",
    ordersToday: "Orders Today",
    revenue: "Revenue",
    pending: "Pending",
    completed: "Completed",
    realTimeOrders: "Real Time Orders",
    orderedByArrival: "Ordered by arrival time (oldest first)",
    filterByStatus: "Filter by status",
    allStatuses: "All Statuses",
    received: "Received",
    ready: "Ready",
    noOrdersFound: "No orders found",
    noOrdersFoundDesc: "There are no orders at the moment.",
    updateStatus: "Update Status",
    sinceyesterday: "+12% since yesterday",
    awaitingPrepDelivery: "Awaiting preparation/delivery",
    deliveredToday: "Delivered today",

    // Admin Menu
    menuManagement: "Menu Management",
    addEditRemove: "Add, edit or remove menu items",
    addNewItem: "Add New Item",
    dishName: "Dish Name",
    price: "Price (£)",
    description: "Description",
    descriptionPlaceholder: "Describe the ingredients and characteristics of the dish",
    category: "Category",
    emoji: "Emoji",
    prepTime: "Preparation Time",
    prepTimePlaceholder: "15 min",
    addItem: "Add Item",
    menuItems: "Menu Items",
    clientPreview: "Client Preview",
    howClientsView: "How clients view the menu",
    unavailable: "Unavailable",
    hidePreview: "Hide",
    showPreview: "Show",

    // Categories
    entries: "Starters",
    mainCourses: "Main Courses",
    beverages: "Beverages",

    // Notifications
    itemAddedToCart: "Item added to cart!",

    // Time
    minAgo: "min ago",
    now: "Now",
    continue: "Continue",
  },

  fr: {
    // Navigation & Common
    backToMenu: "Retour au Menu",
    backToDashboard: "Retour au Tableau de Bord",
    backToSite: "Retour au Site",
    backToOrders: "Retour aux Commandes",
    continueToMenu: "Continuer vers le Menu",
    loading: "Chargement...",
    save: "Sauvegarder",
    cancel: "Annuler",
    delete: "Supprimer",
    edit: "Modifier",
    add: "Ajouter",
    close: "Fermer",

    // Landing Page
    landingTitle: "TapifyOrder",
    landingSubtitle: "RESTAURANT NUMÉRIQUE",
    landingDescription:
      "Augmentez vos ventes de 45%, réduisez les coûts opérationnels et offrez une expérience unique à vos clients avec notre plateforme complète.",
    demoClient: "Démo Client",
    adminArea: "Zone Admin",
    seeInteractiveDemo: "Voir la Démo Interactive",
    adminPanel: "Panneau Admin",
    restaurants: "Restaurants",
    satisfaction: "Satisfaction",
    sales: "+ Ventes",
    whyChoose: "Pourquoi choisir TapifyOrder?",
    provenResults: "Résultats prouvés pour votre entreprise",
    provenDescription:
      "Plus de 500 restaurants ont déjà transformé leurs opérations et augmenté significativement leurs revenus",
    salesIncrease: "+45% de Ventes",
    salesIncreaseDesc:
      "Augmentation moyenne des ventes pour les restaurants qui ont adopté notre plateforme dans les 3 premiers mois",
    costReduction: "-30% Coûts Opérationnels",
    costReductionDesc:
      "Réduction significative des coûts avec le personnel, l'impression des menus et les erreurs de commande",
    satisfactionRate: "98% Satisfaction",
    satisfactionRateDesc:
      "Les clients adorent la praticité et la rapidité. Évaluations constamment au-dessus de 4,8 étoiles",
    everythingYourRestaurantNeeds: "Tout ce dont votre restaurant a besoin",
    completeDescription: "Une plateforme complète qui révolutionne chaque aspect de l'expérience gastronomique",
    frictionlessAccess: "Accès Sans Friction",
    frictionlessDesc:
      "Les clients scannent le code QR et accèdent au menu instantanément. Pas d'applications à télécharger, pas d'inscriptions compliquées.",
    smartOrders: "Commandes Intelligentes",
    smartOrdersDesc:
      "Menu interactif avec personnalisation complète, recommandations automatiques et vente incitative intelligente.",
    advancedAnalytics: "Analyses Avancées",
    advancedAnalyticsDesc:
      "Rapports détaillés sur les ventes, les plats les plus commandés, les heures de pointe et le comportement des clients.",
    worksOffline: "Fonctionne Hors Ligne",
    worksOfflineDesc:
      "Système robuste qui continue de fonctionner même avec une internet instable. Synchronisation automatique.",
    whatClientsSay: "Ce que disent nos clients",
    readyToRevolutionize: "Prêt à révolutionner votre restaurant?",
    revolutionizeDesc:
      "Rejoignez plus de 500 restaurants qui ont déjà transformé leurs opérations et augmenté leurs revenus avec TapifyOrder.",
    testFreeDemo: "Tester la Démo Gratuite",
    seeAdminPanel: "Voir le Panneau Admin",
    quickSetup: "✅ Installation en 24h",
    support247: "📞 Support 24/7",
    guaranteedROI: "💰 ROI Garanti",

    // Landing Page - Hero Section
    digitalRevolutionBadge: "�� Révolution Numérique pour Restaurants",
    transformYourRestaurant: "Transformez votre",
    intoDigital: "restaurant en numérique",

    // Demo Card
    tableDemo: "Table",
    restaurantDemo: "Restaurant Démo",
    online: "En ligne",
    extraChicken: "Poulet supplémentaire",

    // Testimonials
    testimonialMaria: "Maria Silva",
    testimonialMariaRole: "Propriétaire - Restaurant Sabor",
    testimonialMariaText:
      "Nos ventes ont augmenté de 50% le premier mois! Les clients adorent la commodité et nous économisons beaucoup sur le personnel.",
    testimonialJoao: "João Santos",
    testimonialJoaoRole: "Chef - Bistro Gourmet",
    testimonialJoaoText:
      "Cela a révolutionné notre opération! Moins d'erreurs de commande, plus d'efficacité en cuisine et des clients plus satisfaits.",
    testimonialAna: "Ana Costa",
    testimonialAnaRole: "Gestionnaire - Pizzaria Bella",
    testimonialAnaText:
      "Le ROI était incroyable! Il a payé l'investissement en 2 mois et maintenant c'est du pur profit. Je le recommande à tous les restaurants.",

    // CTA Section
    quickImplementation: "Implémentation rapide",
    alwaysAvailable: "Toujours disponible",
    returnIn60Days: "Retour en 60 jours",

    // Footer
    transformingRestaurants: "Transformer les restaurants en entreprises numériques prospères.",
    product: "Produit",
    features: "Fonctionnalités",
    pricing: "Tarifs",
    demo: "Démo",
    company: "Entreprise",
    about: "À propos",
    blog: "Blog",
    careers: "Carrières",
    support: "Support",
    helpCenter: "Centre d'aide",
    contact: "Contact",
    whatsapp: "WhatsApp",
    footerCopyright: "© 2024 TapifyOrder. Tous droits réservés. Transformer les restaurants depuis 2024.",

    // Client Pages
    welcome: "Bienvenue!",
    welcomeMessage: "Pour commencer, entrez votre numéro de table ou scannez le code QR",
    tableNumberLabel: "Numéro de Table",
    tableNumberPlaceholder: "Ex: 12",
    scanQRCode: "Scanner le Code QR",
    or: "ou",
    backToStart: "Retour au début",
    mainMenu: "Menu Principal",
    mainDishes: "Plats principaux",
    mainDishesDesc: "Pizzas, pâtes et plus",
    salads: "Salades",
    saladsDesc: "Fraîches et saines",
    desserts: "Desserts",
    dessertsDesc: "Douceurs irrésistibles",
    drinks: "Boissons",
    drinksDesc: "Jus, boissons gazeuses",
    myOrders: "Mes Commandes",
    trackOrderStatus: "Suivez le statut de vos commandes",
    makeOrder: "Passer Commande",
    makeOrderDesc: "Explorez le menu et passez votre commande",
    exploreMenu: "Explorer le Menu",
    cart: "Panier",
    emptyCart: "Panier vide",
    emptyCartDesc: "Ajoutez quelques délicieux articles de notre menu!",
    continueShopping: "Continuer les Achats",
    yourItems: "Vos Articles",
    customizations: "Personnalisations",
    each: "chacun",
    subtotal: "Sous-total",
    total: "Total",
    specialInstructions: "Instructions Spéciales",
    specialInstructionsDesc: "Des instructions spéciales pour votre commande?",
    specialInstructionsPlaceholder: "Ex: Pas d'oignons sur la pizza, viande bien cuite...",
    finalizeOrder: "Finaliser la Commande",

    // Menu
    restaurantName: "Restaurant Sabor & Arte",
    welcomeToTable: "Bienvenue à la table",
    discoverFlavors: "Découvrez des saveurs uniques dans notre collection gastronomique",
    stars: "étoiles",
    deliveryTime: "Livraison en 30min",
    table: "Table",
    searchPlaceholder: "Rechercher plats, boissons...",
    all: "Tous",
    starters: "Entrées",
    mains: "Plats Principaux",
    popular: "Populaire",
    customizable: "Personnalisable",
    customize: "Personnaliser",
    viewCart: "Voir le Panier",
    callWaiter: "Appeler le Serveur",
    waiterCalled: "Serveur Appelé!",
    waiterCalledDesc: "Le serveur a été notifié et sera à votre table sous peu.",
    noItemsFound: "Aucun article trouvé",
    noItemsFoundDesc: "Essayez d'ajuster votre recherche ou vos filtres",

    // Menu Items
    pizzaMargherita: "Pizza Margherita Artisanale",
    pizzaMargheritaDesc:
      "Sauce tomate San Marzano, mozzarella de bufflonne, basilic frais et huile d'olive extra vierge",
    caesarSalad: "Salade César Premium",
    caesarSaladDesc:
      "Laitue romaine croustillante, croûtons artisanaux, parmesan reggiano et vinaigrette césar traditionnelle",
    tiramisu: "Tiramisu Maison",
    tiramisuDesc: "Dessert italien classique avec café expresso, mascarpone et cacao belge",
    detoxJuice: "Jus Détox Naturel",
    detoxJuiceDesc: "Orange, carotte, gingembre et menthe. Riche en vitamines et antioxydants",
    shrimpRisotto: "Risotto aux Crevettes",
    shrimpRisottoDesc: "Riz arborio crémeux avec crevettes fraîches, vin blanc et fines herbes",
    bruschettaTrio: "Bruschetta Trio",
    bruschettaTrioDesc: "Trois variations: tomate et basilic, burrata et jambon, champignons et truffe",

    // Orders
    trackOrders: "Suivre Vos Commandes",
    trackOrdersDesc: "Voir le statut en temps réel de toutes vos commandes",
    noOrdersYet: "Aucune commande encore",
    noOrdersDesc: "Que diriez-vous de passer votre première commande?",
    orderReceived: "Commande reçue",
    preparing: "En préparation",
    readyForDelivery: "Prêt pour livraison",
    delivered: "Livré",
    orderReceivedDesc: "Votre commande a été reçue et est dans la file de préparation",
    preparingDesc: "Notre équipe prépare votre commande avec soin",
    readyForDeliveryDesc: "Votre commande est prête et sera livrée sous peu",
    deliveredDesc: "Commande livrée! Vous pouvez maintenant effectuer le paiement",
    estimatedTime: "Temps estimé",
    orderItems: "Articles de la commande",
    specialObservations: "Observations spéciales",
    orderStatus: "Statut de la commande",
    orderDeliveredSuccess: "Commande livrée avec succès!",
    orderDeliveredDesc: "Votre commande a été livrée. Vous pouvez maintenant effectuer le paiement en toute sécurité.",
    payOrder: "Payer la Commande",
    makeNewOrder: "Passer une Nouvelle Commande",
    orderProgress: "Progression de la commande",
    agoTime: "il y a",

    // Payment
    finalizePayment: "Finaliser le Paiement",
    orderSummary: "Résumé de la Commande",
    paymentMethod: "Méthode de Paiement",
    choosePayment: "Choisissez comment vous voulez payer",
    creditCard: "Carte de Crédit",
    creditCardDesc: "Visa, Mastercard, American Express",
    debitCard: "Carte de Débit",
    debitCardDesc: "Paiement par débit",
    mbway: "PayPal",
    mbwayDesc: "Paiement portefeuille numérique",
    cardData: "Données de la Carte",
    cardNumber: "Numéro de Carte",
    validity: "Validité",
    cvv: "CVV",
    nameOnCard: "Nom sur la Carte",
    nameOnCardPlaceholder: "Nom tel qu'il apparaît sur la carte",
    mbwayPayment: "Paiement PayPal",
    mbwayDescription: "Entrez votre email pour recevoir la demande de paiement PayPal",
    enterPhoneNumber: "Adresse email",
    phoneNumberPlaceholder: "votre.email@exemple.com",
    copyMBWayCode: "Envoyer Demande PayPal",
    securityInfo: "Vos données sont protégées avec un cryptage SSL 256 bits",
    paymentCompleted: "Paiement Terminé!",
    paymentCompletedDesc: "Votre paiement a été traité avec succès.",
    viewMyOrders: "Voir Mes Commandes",
    processing: "En cours...",

    // Admin
    adminTitle: "TapifyOrder Admin",
    adminSubtitle: "Panneau de Contrôle Avancé",
    manageMenu: "Gérer le Menu",
    ordersToday: "Commandes Aujourd'hui",
    revenue: "Revenus",
    pending: "En Attente",
    completed: "Terminées",
    realTimeOrders: "Commandes en Temps Réel",
    orderedByArrival: "Classées par heure d'arrivée (plus anciennes en premier)",
    filterByStatus: "Filtrer par statut",
    allStatuses: "Tous les Statuts",
    received: "Reçu",
    ready: "Prêt",
    noOrdersFound: "Aucune commande trouvée",
    noOrdersFoundDesc: "Il n'y a pas de commandes pour le moment.",
    updateStatus: "Mettre à Jour le Statut",
    sinceyesterday: "+12% depuis hier",
    awaitingPrepDelivery: "En attente de préparation/livraison",
    deliveredToday: "Livrés aujourd'hui",

    // Admin Menu
    menuManagement: "Gestion du Menu",
    addEditRemove: "Ajouter, modifier ou supprimer des éléments du menu",
    addNewItem: "Ajouter un Nouvel Article",
    dishName: "Nom du Plat",
    price: "Prix (€)",
    description: "Description",
    descriptionPlaceholder: "Décrivez les ingrédients et caractéristiques du plat",
    category: "Catégorie",
    emoji: "Emoji",
    prepTime: "Temps de Préparation",
    prepTimePlaceholder: "15 min",
    addItem: "Ajouter l'Article",
    menuItems: "Articles du Menu",
    clientPreview: "Aperçu Client",
    howClientsView: "Comment les clients voient le menu",
    unavailable: "Indisponible",
    hidePreview: "Masquer",
    showPreview: "Afficher",

    // Categories
    entries: "Entrées",
    mainCourses: "Plats Principaux",
    beverages: "Boissons",

    // Notifications
    itemAddedToCart: "Article ajouté au panier!",

    // Time
    minAgo: "min il y a",
    now: "Maintenant",
    continue: "Continuer",
  },

  es: {
    // Navigation & Common
    backToMenu: "Volver al Menú",
    backToDashboard: "Volver al Panel",
    backToSite: "Volver al Sitio",
    backToOrders: "Volver a Pedidos",
    continueToMenu: "Continuar al Menú",
    loading: "Cargando...",
    save: "Guardar",
    cancel: "Cancelar",
    delete: "Eliminar",
    edit: "Editar",
    add: "Añadir",
    close: "Cerrar",

    // Landing Page
    landingTitle: "TapifyOrder",
    landingSubtitle: "RESTAURANTE DIGITAL",
    landingDescription:
      "Aumenta tus ventas en un 45%, reduce costos operacionales y ofrece una experiencia única a tus clientes con nuestra plataforma completa.",
    demoClient: "Demo Cliente",
    adminArea: "Área Admin",
    seeInteractiveDemo: "Ver Demo Interactiva",
    adminPanel: "Panel Admin",
    restaurants: "Restaurantes",
    satisfaction: "Satisfacción",
    sales: "+ Ventas",
    whyChoose: "¿Por qué elegir TapifyOrder?",
    provenResults: "Resultados probados para tu negocio",
    provenDescription:
      "Más de 500 restaurantes ya han transformado sus operaciones y aumentado significativamente sus ingresos",
    salesIncrease: "+45% en Ventas",
    salesIncreaseDesc:
      "Aumento promedio en ventas de restaurantes que adoptaron nuestra plataforma en los primeros 3 meses",
    costReduction: "-30% Costos Operacionales",
    costReductionDesc: "Reducción significativa en costos con personal, impresión de menús y errores de pedidos",
    satisfactionRate: "98% Satisfacción",
    satisfactionRateDesc:
      "Los clientes aman la practicidad y velocidad. Calificaciones consistentemente por encima de 4.8 estrellas",
    everythingYourRestaurantNeeds: "Todo lo que tu restaurante necesita",
    completeDescription: "Una plataforma completa que revoluciona cada aspecto de la experiencia gastronómica",
    frictionlessAccess: "Acceso Sin Fricción",
    frictionlessDesc:
      "Los clientes escanean el código QR y acceden al menú instantáneamente. Sin aplicaciones para descargar, sin complicadas inscripciones.",
    smartOrders: "Pedidos Inteligentes",
    smartOrdersDesc:
      "Menú interactivo con personalización completa, recomendaciones automáticas y venta incitativa inteligente.",
    advancedAnalytics: "Análisis Avanzados",
    advancedAnalyticsDesc:
      "Informes detallados sobre ventas, platos más pedidos, horas pico y comportamiento de los clientes.",
    worksOffline: "Funciona Sin Conexión",
    worksOfflineDesc:
      "Sistema robusto que sigue funcionando incluso con internet inestable. Sincronización automática.",
    whatClientsSay: "¿Qué dicen nuestros clientes?",
    readyToRevolutionize: "¿Listo para revolucionar tu restaurante?",
    revolutionizeDesc:
      "Únete a más de 500 restaurantes que ya han transformado sus operaciones y aumentado sus ingresos con TapifyOrder.",
    testFreeDemo: "Probar Demo Gratuito",
    seeAdminPanel: "Ver Panel Admin",
    quickSetup: "✅ Configuración en 24h",
    support247: "📞 Soporte 24/7",
    guaranteedROI: "💰 ROI Garantizado",

    // Landing Page - Hero Section
    digitalRevolutionBadge: "🚀 Revolución Digital para Restaurantes",
    transformYourRestaurant: "Transforma tu",
    intoDigital: "restaurante en digital",

    // Demo Card
    tableDemo: "Mesa",
    restaurantDemo: "Restaurante Demo",
    online: "En línea",
    extraChicken: "Pollo extra",

    // Testimonials
    testimonialMaria: "Maria Silva",
    testimonialMariaRole: "Propietaria - Restaurante Sabor",
    testimonialMariaText:
      "Nuestras ventas aumentaron un 50% en el primer mes. Los clientes aman la comodidad y nosotros ahorramos mucho en personal.",
    testimonialJoao: "João Santos",
    testimonialJoaoRole: "Chef - Bistro Gourmet",
    testimonialJoaoText:
      "Revolucionó nuestra operación. Menos errores en pedidos, más eficiencia en la cocina y clientes más satisfechos.",
    testimonialAna: "Ana Costa",
    testimonialAnaRole: "Gerente - Pizzaria Bella",
    testimonialAnaText:
      "El ROI fue increíble. Pagó el inversión en 2 meses y ahora es pura ganancia. Lo recomiendo a todos los restaurantes.",

    // CTA Section
    quickImplementation: "Implementación rápida",
    alwaysAvailable: "Siempre disponible",
    returnIn60Days: "Retorno en 60 días",

    // Footer
    transformingRestaurants: "Transformando restaurantes en negocios digitales de éxito.",
    product: "Producto",
    features: "Características",
    pricing: "Precios",
    demo: "Demo",
    company: "Compañía",
    about: "Acerca de",
    blog: "Blog",
    careers: "Carreras",
    support: "Soporte",
    helpCenter: "Centro de Ayuda",
    contact: "Contacto",
    whatsapp: "WhatsApp",
    footerCopyright: "© 2024 TapifyOrder. Todos los derechos reservados. Transformando restaurantes desde 2024.",

    // Client Pages
    welcome: "¡Bienvenido!",
    welcomeMessage: "Para comenzar, ingrese su número de mesa o escanee el código QR",
    tableNumberLabel: "Número de Mesa",
    tableNumberPlaceholder: "Ex: 12",
    scanQRCode: "Escanear Código QR",
    or: "o",
    backToStart: "Volver al inicio",
    mainMenu: "Menú Principal",
    mainDishes: "Platos Principales",
    mainDishesDesc: "Pizzas, pasta y más",
    salads: "Ensaladas",
    saladsDesc: "Frescas y saludables",
    desserts: "Postres",
    dessertsDesc: "Dulces irresistibles",
    drinks: "Bebidas",
    drinksDesc: "Jugos, refrescos",
    myOrders: "Mis Pedidos",
    trackOrderStatus: "Seguimiento del estado de tus pedidos",
    makeOrder: "Realizar Pedido",
    makeOrderDesc: "Explora el menú y realiza tu pedido",
    exploreMenu: "Explorar Menú",
    cart: "Carrito",
    emptyCart: "Carrito vacío",
    emptyCartDesc: "¡Añade algunos deliciosos artículos de nuestro menú!",
    continueShopping: "Continuar Comprando",
    yourItems: "Tus Artículos",
    customizations: "Personalizaciones",
    each: "cada",
    subtotal: "Subtotal",
    total: "Total",
    specialInstructions: "Instrucciones Especiales",
    specialInstructionsDesc: "¿Alguna instrucción especial para tu pedido?",
    specialInstructionsPlaceholder: "Ex: Sin cebolla en la pizza, carne bien cocida...",
    finalizeOrder: "Finalizar Pedido",

    // Menu
    restaurantName: "Restaurante Sabor & Arte",
    welcomeToTable: "Bienvenido a la mesa",
    discoverFlavors: "Descubre sabores únicos en nuestra colección gastronómica",
    stars: "estrellas",
    deliveryTime: "Entrega en 30min",
    table: "Mesa",
    searchPlaceholder: "Buscar platos, bebidas...",
    all: "Todos",
    starters: "Entradas",
    mains: "Platos Principales",
    popular: "Popular",
    customizable: "Personalizable",
    customize: "Personalizar",
    viewCart: "Ver Carrito",
    callWaiter: "Llamar al Mesero",
    waiterCalled: "Mesero Llamado!",
    waiterCalledDesc: "El mesero ha sido notificado y estará en tu mesa pronto.",
    noItemsFound: "No se encontraron artículos",
    noItemsFoundDesc: "Intenta ajustar tu búsqueda o filtros",

    // Menu Items
    pizzaMargherita: "Pizza Margherita Artesanal",
    pizzaMargheritaDesc:
      "Salsa de tomate San Marzano, mozzarella de búfalo, albahaca fresca y aceite de oliva extra virgen",
    caesarSalad: "Ensalada Caesar Premium",
    caesarSaladDesc:
      "Lechuga romana crujiente, croûtons artesanales, parmesano reggiano y vinaigreta césar tradicional",
    tiramisu: "Tiramisu de Casa",
    tiramisuDesc: "Delicioso postre italiano con café espresso, mascarpone y cacao belga",
    detoxJuice: "Jugo Natural Detox",
    detoxJuiceDesc: "Naranja, zanahoria, jengibre y menta. Rico en vitaminas y antioxidantes",
    shrimpRisotto: "Risotto de Camarones",
    shrimpRisottoDesc: "Arroz arborio cremoso con camarones frescos, vino blanco y hierbas finas",
    bruschettaTrio: "Bruschetta Trio",
    bruschettaTrioDesc: "Tres variaciones: tomate y albahaca, burrata y jamón, champiñones y trufa",

    // Orders
    trackOrders: "Seguimiento de Tus Pedidos",
    trackOrdersDesc: "Ver el estado en tiempo real de todos tus pedidos",
    noOrdersYet: "No hay pedidos aún",
    noOrdersDesc: "¿Qué te parece hacer tu primer pedido?",
    orderReceived: "Pedido recibido",
    preparing: "Preparando",
    readyForDelivery: "Listo para entrega",
    delivered: "Entregado",
    orderReceivedDesc: "Tu pedido ha sido recibido y está en la fila de preparación",
    preparingDesc: "Nuestro equipo está preparando tu pedido con cuidado",
    readyForDeliveryDesc: "Tu pedido está listo y será entregado pronto",
    deliveredDesc: "Pedido entregado. ¡Ahora puedes realizar el pago!",
    estimatedTime: "Tiempo estimado",
    orderItems: "Artículos del pedido",
    specialObservations: "Observaciones especiales",
    orderStatus: "Estado del pedido",
    orderDeliveredSuccess: "Pedido entregado con éxito!",
    orderDeliveredDesc: "Tu pedido ha sido entregado. ¡Ahora puedes realizar el pago de forma segura!",
    payOrder: "Pagar Pedido",
    makeNewOrder: "Realizar Nuevo Pedido",
    orderProgress: "Progreso del pedido",
    agoTime: "hace",

    // Payment
    finalizePayment: "Finalizar Pago",
    orderSummary: "Resumen del Pedido",
    paymentMethod: "Método de Pago",
    choosePayment: "Elige cómo quieres pagar",
    creditCard: "Tarjeta de Crédito",
    creditCardDesc: "Visa, Mastercard, American Express",
    debitCard: "Tarjeta de Débito",
    debitCardDesc: "Pago por débito",
    mbway: "PayPal",
    mbwayDesc: "Pago con cartera digital",
    cardData: "Datos de la Tarjeta",
    cardNumber: "Número de Tarjeta",
    validity: "Vigencia",
    cvv: "CVV",
    nameOnCard: "Nombre en la Tarjeta",
    nameOnCardPlaceholder: "Nombre como aparece en la tarjeta",
    mbwayPayment: "Pago PayPal",
    mbwayDescription: "Ingresa tu email para recibir la solicitud de pago PayPal",
    enterPhoneNumber: "Dirección de email",
    phoneNumberPlaceholder: "tu.email@ejemplo.com",
    copyMBWayCode: "Enviar Solicitud PayPal",
    securityInfo: "Tus datos están protegidos con encriptación SSL de 256 bits",
    paymentCompleted: "Pago Completado!",
    paymentCompletedDesc: "Tu pago ha sido procesado con éxito.",
    viewMyOrders: "Ver Mis Pedidos",
    processing: "Procesando...",

    // Admin
    adminTitle: "Admin TapifyOrder",
    adminSubtitle: "Panel de Control Avanzado",
    manageMenu: "Administrar Menú",
    ordersToday: "Pedidos Hoy",
    revenue: "Ingresos",
    pending: "Pendientes",
    completed: "Completados",
    realTimeOrders: "Pedidos en Tiempo Real",
    orderedByArrival: "Ordenados por hora de llegada (más antiguos primero)",
    filterByStatus: "Filtrar por estado",
    allStatuses: "Todos los Estados",
    received: "Recibido",
    ready: "Listo",
    noOrdersFound: "No se encontraron pedidos",
    noOrdersFoundDesc: "No hay pedidos en este momento.",
    updateStatus: "Actualizar Estado",
    sinceyesterday: "+12% desde ayer",
    awaitingPrepDelivery: "Esperando preparación/entrega",
    deliveredToday: "Entregados hoy",

    // Admin Menu
    menuManagement: "Gestión del Menú",
    addEditRemove: "Añadir, editar o eliminar elementos del menú",
    addNewItem: "Añadir Nuevo Artículo",
    dishName: "Nombre del Plato",
    price: "Precio (€)",
    description: "Descripción",
    descriptionPlaceholder: "Describe los ingredientes y características del plato",
    category: "Categoría",
    emoji: "Emoji",
    prepTime: "Tiempo de Preparación",
    prepTimePlaceholder: "15 min",
    addItem: "Añadir Artículo",
    menuItems: "Artículos del Menú",
    clientPreview: "Vista Previa del Cliente",
    howClientsView: "Cómo los clientes ven el menú",
    unavailable: "No disponible",
    hidePreview: "Ocultar",
    showPreview: "Mostrar",

    // Categories
    entries: "Entradas",
    mainCourses: "Platos Principales",
    beverages: "Bebidas",

    // Notifications
    itemAddedToCart: "¡Artículo añadido al carrito!",

    // Time
    minAgo: "minutos atrás",
    now: "Ahora",
    continue: "Continuar",
  },

  de: {
    // Navigation & Common
    backToMenu: "Zurück zum Menü",
    backToDashboard: "Zurück zum Dashboard",
    backToSite: "Zurück zur Website",
    backToOrders: "Zurück zu Bestellungen",
    continueToMenu: "Weiter zum Menü",
    loading: "Laden...",
    save: "Speichern",
    cancel: "Abbrechen",
    delete: "Löschen",
    edit: "Bearbeiten",
    add: "Hinzufügen",
    close: "Schließen",

    // Landing Page
    landingTitle: "TapifyOrder",
    landingSubtitle: "DIGITALE RESTAURANT",
    landingDescription:
      "Erhöhen Sie Ihre Umsätze um 45%, reduzieren Sie Betriebskosten und bieten Sie Ihren Kunden eine einzigartige Erfahrung mit unserer vollständigen Plattform.",
    demoClient: "Kunden-Demo",
    adminArea: "Admin-Bereich",
    seeInteractiveDemo: "Interaktive Demo ansehen",
    adminPanel: "Admin-Panels",
    restaurants: "Restaurants",
    satisfaction: "Zufriedenheit",
    sales: "+ Umsätze",
    whyChoose: "Warum TapifyOrder wählen?",
    provenResults: "Beweisbare Ergebnisse für Ihr Geschäft",
    provenDescription:
      "Mehr als 500 Restaurants haben ihre Operationen bereits überarbeitet und ihre Einnahmen erheblich gesteigert.",
    salesIncrease: "+45% in Umsätzen",
    salesIncreaseDesc:
      "Durchschnittlicher Umsatzanstieg für Restaurants, die unsere Plattform in den ersten drei Monaten eingeführt haben.",
    costReduction: "-30% Betriebskosten",
    costReductionDesc: "Signifikante Reduzierung von Kosten durch Personal, Menüdruck und Bestelldfehler.",
    satisfactionRate: "98% Zufriedenheit",
    satisfactionRateDesc: "Kunden lieben die Komfort und Geschwindigkeit. Bewertungen konsistent über 4,8 Sterne.",
    everythingYourRestaurantNeeds: "Alles, was Ihr Restaurant braucht",
    completeDescription: "Eine vollständige Plattform, die jedes Aspekt der gastronomischen Erfahrung revolutioniert.",
    frictionlessAccess: "Reibungsloser Zugang",
    frictionlessDesc:
      "Kunden scannen den QR-Code und greifen das Menü sofort zu. Keine Apps zum Herunterladen, keine komplizierten Registrierungen.",
    smartOrders: "Intelligente Bestellungen",
    smartOrdersDesc:
      "Interaktives Menü mit vollständiger Anpassung, automatischen Empfehlungen und intelligentem Upselling.",
    advancedAnalytics: "Erweiterte Analysen",
    advancedAnalyticsDesc:
      "Detaillierte Berichte über Umsätze, beliebteste Gerichte, Spitzenzeiten und Kundenerfahrungen.",
    worksOffline: "Arbeitet offline",
    worksOfflineDesc:
      "Robustes System, das auch ohne stabile Internetverbindung funktioniert. Automatische Synchronisation.",
    whatClientsSay: "Was unsere Kunden sagen",
    readyToRevolutionize: "Bereit, Ihr Restaurant zu revolutionieren?",
    revolutionizeDesc:
      "Treten Sie den über 500 Restaurants bei, die ihre Operationen bereits mit TapifyOrder überarbeitet und ihre Einnahmen erhöht haben.",
    testFreeDemo: "Testen Sie die kostenlose Demo",
    seeAdminPanel: "Admin-Panels ansehen",
    quickSetup: "✅ Einrichtung in 24h",
    support247: "📞 24/7 Support",
    guaranteedROI: "💰 Garantierte ROI",

    // Landing Page - Hero Section
    digitalRevolutionBadge: "🚀 Digitale Revolution für Restaurants",
    transformYourRestaurant: "Transformieren Sie Ihr",
    intoDigital: "Restaurant in ein digitales",

    // Demo Card
    tableDemo: "Tisch",
    restaurantDemo: "Demo-Restaurant",
    online: "Online",
    extraChicken: "Zusätzlicher Huhn",

    // Testimonials
    testimonialMaria: "Maria Silva",
    testimonialMariaRole: "Besitzerin - Sabor Restaurant",
    testimonialMariaText:
      "Unsere Umsätze stiegen im ersten Monat um 50%. Kunden lieben die Komfort und wir sparen viel auf Personal.",
    testimonialJoao: "João Santos",
    testimonialJoaoRole: "Koch - Bistro Gourmet",
    testimonialJoaoText:
      "Es revolutionierte unsere Operation. Weniger Bestelldfehler, mehr Effizienz in der Küche und zufriedenere Kunden.",
    testimonialAna: "Ana Costa",
    testimonialAnaRole: "Manager - Pizzaria Bella",
    testimonialAnaText:
      "Die ROI war beeindruckend. Sie bezahlte die Investition in zwei Monaten und ist jetzt reinlicher Gewinn. Ich empfehle es allen Restaurants.",

    // CTA Section
    quickImplementation: "Schnelle Implementierung",
    alwaysAvailable: "Immer verfügbar",
    returnIn60Days: "Rückgabe in 60 Tagen",

    // Footer
    transformingRestaurants: "Transformieren Sie Restaurants in erfolgreiche digitale Geschäftsbetriebe.",
    product: "Produkt",
    features: "Funktionen",
    pricing: "Preise",
    demo: "Demo",
    company: "Firma",
    about: "Über uns",
    blog: "Blog",
    careers: "Karrieremöglichkeiten",
    support: "Support",
    helpCenter: "Hilfezentrum",
    contact: "Kontakt",
    whatsapp: "WhatsApp",
    footerCopyright: "© 2024 TapifyOrder. Alle Rechte vorbehalten. Seit 2024 Restaurants transformieren.",

    // Client Pages
    welcome: "Willkommen!",
    welcomeMessage: "Um zu beginnen, geben Sie Ihre Tischnummer ein oder scannen Sie den QR-Code.",
    tableNumberLabel: "Tischnummer",
    tableNumberPlaceholder: "Ex: 12",
    scanQRCode: "QR-Code scannen",
    or: "oder",
    backToStart: "Zurück zum Anfang",
    mainMenu: "Hauptmenü",
    mainDishes: "Hauptgerichte",
    mainDishesDesc: "Pizzen, Pasta und mehr",
    salads: "Salate",
    saladsDesc: "Frisch und gesund",
    desserts: "Desserts",
    dessertsDesc: "Unwiderstehliche Süßspeisen",
    drinks: "Getränke",
    drinksDesc: "Saft, Softdrinks",
    myOrders: "Meine Bestellungen",
    trackOrderStatus: "Bestellstatus verfolgen",
    makeOrder: "Bestellung aufgeben",
    makeOrderDesc: "Entdecken Sie das Menü und geben Sie Ihre Bestellung auf.",
    exploreMenu: "Menü erkunden",
    cart: "Warenkorb",
    emptyCart: "Leerer Warenkorb",
    emptyCartDesc: "Fügen Sie einige leckere Artikel aus unserem Menü hinzu!",
    continueShopping: "Weiter einkaufen",
    yourItems: "Ihre Artikel",
    customizations: "Anpassungen",
    each: "jeder",
    subtotal: "Zwischensumme",
    total: "Gesamt",
    specialInstructions: "Spezielle Anweisungen",
    specialInstructionsDesc: "Gibt es spezielle Anweisungen für Ihre Bestellung?",
    specialInstructionsPlaceholder: "Ex: Keine Zwiebeln auf der Pizza, gut gebratene Fleisch...",
    finalizeOrder: "Bestellung abschließen",

    // Menu
    restaurantName: "Restaurant Sabor & Arte",
    welcomeToTable: "Willkommen an Ihrem Tisch",
    discoverFlavors: "Entdecken Sie einzigartige Geschmacksrichtungen in unserer gastronomischen Sammlung",
    stars: "Sterne",
    deliveryTime: "Lieferung in 30min",
    table: "Tisch",
    searchPlaceholder: "Suchen Sie Gerichte, Getränke...",
    all: "Alle",
    starters: "Vorspeisen",
    mains: "Hauptgerichte",
    popular: "Beliebt",
    customizable: "Anpassbar",
    customize: "Anpassen",
    viewCart: "Warenkorb anzeigen",
    callWaiter: "Wirt rufen",
    waiterCalled: "Wirt aufgerufen!",
    waiterCalledDesc: "Der Wirt wurde benachrichtigt und wird bald bei Ihnen sein.",
    noItemsFound: "Keine Artikel gefunden",
    noItemsFoundDesc: "Versuchen Sie, Ihre Suche oder Filter anzupassen",

    // Menu Items
    pizzaMargherita: "Handgefertigte Margherita-Pizza",
    pizzaMargheritaDesc: "San Marzano Tomatensoße, Bufalino Mozzarella, frische Basilikum und extra frische Olivenöl",
    caesarSalad: "Premium Caesar-Salat",
    caesarSaladDesc:
      "Knusprige Romaine-Lettuce, handgefertigte Croûtons, Reggiano Parmesan und traditionelle Caesar-Dressing",
    tiramisu: "Haus-Tiramisu",
    tiramisuDesc: "Klassisches italienisches Dessert mit Espresso-Kaffee, Mascarpone und belgischem Kakao",
    detoxJuice: "Natürlicher Detox-Jus",
    detoxJuiceDesc: "Orange, Karotte, Ingwer und Minze. Reicher an Vitaminen und Antioxidantien",
    shrimpRisotto: "Risotto aus Garnelen",
    shrimpRisottoDesc: "Kremiger Arborio-Reis mit frischen Garnelen, weißem Weiß und feinen Kräutern",
    bruschettaTrio: "Bruschetta-Trio",
    bruschettaTrioDesc: "Drei Variationen: Tomate und Basilikum, Burrata und Schinken, Pilze und Trüffel",

    // Orders
    trackOrders: "Ihre Bestellungen verfolgen",
    trackOrdersDesc: "Sieh den Echtzeit-Status aller Ihrer Bestellungen",
    noOrdersYet: "Noch keine Bestellungen",
    noOrdersDesc: "Warum nicht Ihre erste Bestellung aufgeben?",
    orderReceived: "Bestellung erhalten",
    preparing: "Wird vorbereitet",
    readyForDelivery: "Bereit zur Lieferung",
    delivered: "Geliefert",
    orderReceivedDesc: "Ihre Bestellung wurde erhalten und steht in der Vorbereitungs-Warteschlange.",
    preparingDesc: "Unsere Team bereitet Ihre Bestellung mit Liebe vor.",
    readyForDeliveryDesc: "Ihre Bestellung ist bereit und wird bald geliefert.",
    deliveredDesc: "Bestellung geliefert! Sie können jetzt die Zahlung tätigen.",
    estimatedTime: "Geschätzte Zeit",
    orderItems: "Bestellartikel",
    specialObservations: "Spezielle Bemerkungen",
    orderStatus: "Bestellstatus",
    orderDeliveredSuccess: "Bestellung erfolgreich geliefert!",
    orderDeliveredDesc: "Ihre Bestellung wurde geliefert. Sie können jetzt sicher die Zahlung tätigen.",
    payOrder: "Bestellung bezahlen",
    makeNewOrder: "Neue Bestellung aufgeben",
    orderProgress: "Bestellfortschritt",
    agoTime: "vor",

    // Payment
    finalizePayment: "Zahlung abschließen",
    orderSummary: "Bestellübersicht",
    paymentMethod: "Zahlungsmethode",
    choosePayment: "Wählen Sie aus, wie Sie bezahlen möchten",
    creditCard: "Kreditkarte",
    creditCardDesc: "Visa, Mastercard, American Express",
    debitCard: "Debitkarte",
    debitCardDesc: "Debitzahlung",
    mbway: "PayPal",
    mbwayDesc: "Digitale Geldbörse Zahlung",
    cardData: "Kartendaten",
    cardNumber: "Kartennummer",
    validity: "Gültigkeit",
    cvv: "CVV",
    nameOnCard: "Name auf der Karte",
    nameOnCardPlaceholder: "Name wie auf der Karte",
    mbwayPayment: "PayPal Zahlung",
    mbwayDescription: "Geben Sie Ihre E-Mail ein, um die PayPal-Zahlungsanfrage zu erhalten.",
    enterPhoneNumber: "E-Mail-Adresse",
    phoneNumberPlaceholder: "ihre.email@beispiel.com",
    copyMBWayCode: "PayPal-Anfrage senden",
    securityInfo: "Ihre Daten werden mit 256-Bit SSL-Verschlüsselung geschützt.",
    paymentCompleted: "Zahlung abgeschlossen!",
    paymentCompletedDesc: "Ihre Zahlung wurde erfolgreich verarbeitet.",
    viewMyOrders: "Meine Bestellungen anzeigen",
    processing: "Wird verarbeitet...",

    // Admin
    adminTitle: "TapifyOrder Admin",
    adminSubtitle: "Erweitertes Steuerungs-Panels",
    manageMenu: "Menü verwalten",
    ordersToday: "Bestellungen Heute",
    revenue: "Einnahmen",
    pending: "Ausstehend",
    completed: "Abgeschlossen",
    realTimeOrders: "Echtzeit-Bestellungen",
    orderedByArrival: "Nach Ankunftszeit sortiert (älteste zuerst)",
    filterByStatus: "Nach Status filtern",
    allStatuses: "Alle Status",
    received: "Erhalten",
    ready: "Bereit",
    noOrdersFound: "Keine Bestellungen gefunden",
    noOrdersFoundDesc: "Es gibt derzeit keine Bestellungen.",
    updateStatus: "Status aktualisieren",
    sinceyesterday: "+12% seit gestern",
    awaitingPrepDelivery: "Warten auf Vorbereitung/Lieferung",
    deliveredToday: "Heute geliefert",

    // Admin Menu
    menuManagement: "Menüverwaltung",
    addEditRemove: "Menüeinträge hinzufügen, bearbeiten oder entfernen",
    addNewItem: "Neuen Eintrag hinzufügen",
    dishName: "Gerichtsname",
    price: "Preis (€)",
    description: "Beschreibung",
    descriptionPlaceholder: "Beschreiben Sie die Zutaten und Eigenschaften des Gerichts",
    category: "Kategorie",
    emoji: "Emoji",
    prepTime: "Vorbereitungszeit",
    prepTimePlaceholder: "15 min",
    addItem: "Eintrag hinzufügen",
    menuItems: "Menüeinträge",
    clientPreview: "Kunden-Vorschau",
    howClientsView: "Wie Kunden das Menü sehen",
    unavailable: "Nicht verfügbar",
    hidePreview: "Verstecken",
    showPreview: "Anzeigen",

    // Categories
    entries: "Vorspeisen",
    mainCourses: "Hauptgerichte",
    beverages: "Getränke",

    // Notifications
    itemAddedToCart: "Artikel zum Warenkorb hinzugefügt!",

    // Time
    minAgo: "vor Minuten",
    now: "Jetzt",
    continue: "Fortsetzen",
  },
}
