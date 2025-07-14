"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image" // Importar o componente Image
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { LanguageSelector } from "@/components/LanguageSelector"
import { WaiterNotification } from "@/components/WaiterNotification"
import { useLanguage } from "@/contexts/LanguageContext"
import { ChefHat, ShoppingCart, Plus, Minus, Search, Star, Clock, Users, Bell, Loader2 } from "lucide-react"

interface Product {
  _id: string
  nome: string
  descricao: string
  preco: number
  categoria: string
  foto?: string // Campo 'foto' para a URL da imagem
  customizavel?: boolean
  rating?: number
  tempoPreparacao?: string
  popular?: boolean
}

interface CartItem {
  _id: string // ID do subdocumento do item no carrinho
  produto: string | Product // Pode ser o ID ou o objeto populado
  quantidade: number
  observacao?: string
}

interface Cart {
  clienteId: string
  itens: CartItem[]
  _id?: string
  precoTotal?: number
}

// Função para gerar um clienteId único POR ABA (usar sessionStorage em vez de localStorage)
const generateClientId = (): string => {
  // Verificar se estamos no cliente
  if (typeof window === "undefined") {
    return "" // Retornar string vazia no servidor
  }
  // Usar sessionStorage para que cada aba tenha seu próprio ID
  const stored = sessionStorage.getItem("clienteId")
  if (stored) return stored
  const newId = `cliente_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  sessionStorage.setItem("clienteId", newId)
  return newId
}

// Mapear categorias da API para o frontend
const categoryMap: { [key: string]: string } = {
  entrada: "entries",
  "prato principal": "mainCourses",
  sobremesa: "desserts",
  bebidas: "beverages",
}

const reverseCategoryMap: { [key: string]: string } = {
  entries: "entrada",
  mainCourses: "prato principal",
  desserts: "sobremesa",
  beverages: "bebidas",
}

export default function MenuPage() {
  const { t, loadingLanguage } = useLanguage() // Use loadingLanguage from context
  const [products, setProducts] = useState<Product[]>([])
  const [allProducts, setAllProducts] = useState<Product[]>([]) // Novo estado para todos os produtos
  const [cart, setCart] = useState<{ [key: string]: number }>({})
  const [selectedCategory, setSelectedCategory] = useState(t.all) // Sempre inicializar com t.all
  const [searchTerm, setSearchTerm] = useState("")
  const [showWaiterNotification, setShowWaiterNotification] = useState(false)
  const [loading, setLoading] = useState(true)
  const [clienteId, setClienteId] = useState<string>("")
  const [isClient, setIsClient] = useState(false)
  const [cartExists, setCartExists] = useState<boolean>(false)
  const [cartLoading, setCartLoading] = useState(false)
  const [cartItemIds, setCartItemIds] = useState<{ [productId: string]: string }>({})
  const [callingWaiter, setCallingWaiter] = useState(false)

  // Atualizar categoria selecionada quando a linguagem mudar
  useEffect(() => {
    setSelectedCategory(t.all)
  }, [t.all])

  // Inicializar cliente ID apenas no cliente
  useEffect(() => {
    setIsClient(true)
    const id = generateClientId()
    setClienteId(id)
    // Carregar carrinho existente
    if (id) {
      loadExistingCart(id)
    }
  }, [])

  // Carregar produtos da API
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/produtos")
      if (!response.ok) throw new Error("Erro ao buscar produtos")
      const data = await response.json()
      setProducts(data)
      setAllProducts(data) // Salvar todos os produtos
    } catch (error) {
      console.error("Erro ao carregar produtos:", error)
      setProducts([])
      setAllProducts([])
    } finally {
      setLoading(false)
    }
  }

  const fetchProductsByCategory = async (category: string) => {
    try {
      setLoading(true)
      const apiCategory = reverseCategoryMap[category]

      if (!apiCategory) {
        setProducts(allProducts)
        return
      }

      // Tentar buscar por categoria via API primeiro
      try {
        const response = await fetch(`/api/produtos/categoria/${encodeURIComponent(apiCategory)}`)
        if (response.ok) {
          const data = await response.json()
          setProducts(data)
          return
        }
      } catch (apiError) {
        console.log("API de categoria não disponível, filtrando localmente")
      }

      // Fallback: filtrar localmente
      const filteredProducts = allProducts.filter(
        (product) => product.categoria.toLowerCase() === apiCategory.toLowerCase(),
      )
      setProducts(filteredProducts)
    } catch (error) {
      console.error("Erro ao carregar produtos por categoria:", error)
      // Fallback final: mostrar todos os produtos
      setProducts(allProducts)
    } finally {
      setLoading(false)
    }
  }

  // Helper para atualizar o estado local do carrinho a partir da resposta da API
  const updateLocalCartState = (apiCart: Cart) => {
    const localCart: { [key: string]: number } = {}
    const itemIds: { [productId: string]: string } = {}
    if (apiCart.itens && apiCart.itens.length > 0) {
      apiCart.itens.forEach((item) => {
        const productId = typeof item.produto === "object" ? item.produto._id : item.produto
        localCart[productId] = item.quantidade
        itemIds[productId] = item._id
      })
      setCartExists(true)
    } else {
      setCartExists(false)
    }
    setCart(localCart)
    setCartItemIds(itemIds)
  }

  const loadExistingCart = async (clientId: string) => {
    try {
      setCartLoading(true)
      const response = await fetch(`/api/carrinho/${clientId}`)
      if (response.ok) {
        const cartData = await response.json()
        updateLocalCartState(cartData)
      } else if (response.status === 404) {
        setCartExists(false)
        setCart({})
        setCartItemIds({})
      } else {
        throw new Error("Erro ao carregar carrinho")
      }
    } catch (error) {
      console.error("Erro ao carregar carrinho existente:", error)
      setCartExists(false)
      setCart({})
      setCartItemIds({})
    } finally {
      setCartLoading(false)
    }
  }

  const categories = [t.all, t.starters, t.mains, t.desserts, t.beverages]

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === t.all ||
      (selectedCategory === t.starters && categoryMap[product.categoria] === "entries") ||
      (selectedCategory === t.mains && categoryMap[product.categoria] === "mainCourses") ||
      (selectedCategory === t.desserts && categoryMap[product.categoria] === "desserts") ||
      (selectedCategory === t.beverages && categoryMap[product.categoria] === "beverages")

    const matchesSearch =
      product.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Nova função para adicionar um novo item ao carrinho (ou criar o carrinho se não existir)
  const addNewItemToCart = async (productId: string, quantity: number, observacao = "") => {
    if (!clienteId || !isClient) {
      console.warn("Cliente ID não disponível ainda")
      return
    }
    try {
      const response = await fetch(`/api/carrinho/${clienteId}/item`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          produtoId: productId,
          quantidade: quantity,
          observacao: observacao,
        }),
      })

      if (!response.ok) {
        const errorData = await response.text()
        console.error("Erro na resposta da API (addNewItemToCart):", errorData)
        throw new Error(`Erro ao adicionar/atualizar item no carrinho: ${response.status}`)
      }
      const updatedCart = await response.json()
      updateLocalCartState(updatedCart) // Atualiza todo o estado local do carrinho
    } catch (error) {
      console.error("Erro ao adicionar/atualizar item no carrinho:", error)
      throw error
    }
  }

  // Função modificada para atualizar a quantidade/observação de um item existente
  const updateExistingCart = async (productId: string, quantity: number, observacao = "") => {
    if (!clienteId || !isClient) {
      console.warn("Cliente ID não disponível ainda")
      return
    }
    const itemId = cartItemIds[productId]
    if (!itemId) {
      console.error(`Erro: itemId não encontrado para o produto ${productId}. Tentando adicionar como novo item.`)
      // Fallback: se o itemId estiver faltando, tenta adicionar como um novo item
      return addNewItemToCart(productId, quantity, observacao)
    }

    try {
      const response = await fetch(`/api/carrinho/${clienteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: itemId,
          quantidade: quantity,
          observacao: observacao,
        }),
      })

      if (!response.ok) {
        const errorData = await response.text()
        console.error("Erro na resposta da API (updateExistingCart):", errorData)
        throw new Error(`Erro ao atualizar carrinho: ${response.status}`)
      }
      const updatedCart = await response.json()
      updateLocalCartState(updatedCart) // Atualiza todo o estado local do carrinho
    } catch (error) {
      console.error("Erro ao atualizar carrinho:", error)
      throw error
    }
  }

  // Nova função para remover um item do carrinho
  const removeItemFromCart = async (productId: string) => {
    if (!clienteId || !isClient) {
      console.warn("Cliente ID não disponível ainda")
      return
    }
    const itemId = cartItemIds[productId]
    if (!itemId) {
      console.warn(`Tentativa de remover item ${productId} que não possui itemId no estado local.`)
      // Se o itemId estiver faltando, apenas atualiza o estado local e retorna
      setCart((prev) => {
        const newCart = { ...prev }
        delete newCart[productId]
        return newCart
      })
      setCartItemIds((prev) => {
        const newItemIds = { ...prev }
        delete newItemIds[productId]
        return newItemIds
      })
      // Se o carrinho ficar vazio, define cartExists como false
      if (Object.keys(cart).length === 1 && cart[productId] === 1) {
        // Se este era o último item
        setCartExists(false)
      }
      return
    }

    try {
      const response = await fetch(`/api/carrinho/${clienteId}/item/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const errorData = await response.text()
        console.error("Erro na resposta da API (removeItemFromCart):", errorData)
        throw new Error(`Erro ao remover item do carrinho: ${response.status}`)
      }
      // Após a exclusão bem-sucedida, recarrega o carrinho para obter o estado mais recente
      await loadExistingCart(clienteId)
    } catch (error) {
      console.error("Erro ao remover item do carrinho:", error)
      throw error
    }
  }

  const addToCart = async (productId: string) => {
    const currentQuantity = cart[productId] || 0
    const newQuantity = currentQuantity + 1

    // Atualização otimista da UI
    setCart((prev) => ({
      ...prev,
      [productId]: newQuantity,
    }))

    if (clienteId && isClient) {
      try {
        if (currentQuantity === 0) {
          // Item não está no carrinho, adiciona-o
          await addNewItemToCart(productId, newQuantity)
        } else {
          // Item já está no carrinho, atualiza sua quantidade
          await updateExistingCart(productId, newQuantity)
        }
      } catch (error) {
        console.error("Erro ao adicionar ao carrinho:", error)
        // Reverte a atualização otimista em caso de erro
        setCart((prev) => ({
          ...prev,
          [productId]: currentQuantity,
        }))
      }
    }
  }

  const removeFromCart = async (productId: string) => {
    const currentQuantity = cart[productId] || 0
    if (currentQuantity <= 0) return

    const newQuantity = currentQuantity - 1

    // Atualização otimista da UI
    setCart((prev) => ({
      ...prev,
      [productId]: Math.max(newQuantity, 0),
    }))

    if (clienteId && isClient) {
      try {
        if (newQuantity === 0) {
          // Quantidade se torna 0, remove o item do carrinho
          await removeItemFromCart(productId)
        } else {
          // Quantidade ainda é > 0, atualiza sua quantidade
          await updateExistingCart(productId, newQuantity)
        }
      } catch (error) {
        console.error("Erro ao remover do carrinho:", error)
        // Reverte a atualização otimista em caso de erro
        setCart((prev) => ({
          ...prev,
          [productId]: currentQuantity,
        }))
      }
    }
  }

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
  }

  const getTotalPrice = () => {
    return products.reduce((total, product) => {
      const quantity = cart[product._id] || 0
      return total + quantity * product.preco
    }, 0)
  }

  const callWaiter = async () => {
    try {
      setCallingWaiter(true)

      const response = await fetch("/api/chamadas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mesa: "12",
          tipo: "chamada_garcom",
          observacao: "Cliente solicitou atendimento",
        }),
      })

      if (!response.ok) {
        throw new Error("Erro ao chamar garçom")
      }

      setShowWaiterNotification(true)
    } catch (error) {
      console.error("Erro ao chamar garçom:", error)
      alert("Erro ao chamar garçom. Tente novamente.")
    } finally {
      setCallingWaiter(false)
    }
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    if (category === t.all) {
      setProducts(allProducts) // Usar todos os produtos localmente
    } else {
      const categoryKey = Object.keys(reverseCategoryMap).find(
        (key) =>
          (key === "entries" && category === t.starters) ||
          (key === "mainCourses" && category === t.mains) ||
          (key === "desserts" && category === t.desserts) ||
          (key === "beverages" && category === t.beverages),
      )
      if (categoryKey) {
        fetchProductsByCategory(categoryKey)
      }
    }
  }

  // Função para mapear emoji baseado na categoria
  const getProductEmoji = (categoria: string): string => {
    const emojiMap: { [key: string]: string } = {
      entrada: "🥗",
      "prato principal": "🍽️",
      sobremesa: "🍰",
      bebidas: "🥤",
    }
    return emojiMap[categoria] || "🍽️"
  }

  // Não renderizar funcionalidades dependentes do localStorage até estar no cliente
  if (!isClient || loadingLanguage) {
    // Use loadingLanguage here
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-blue-600">{loadingLanguage ? t.changingLanguage : t.loading}</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Waiter Notification */}
      <WaiterNotification isVisible={showWaiterNotification} onClose={() => setShowWaiterNotification(false)} />

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 lg:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 lg:space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="p-1.5 lg:p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg lg:rounded-xl">
                  <ChefHat className="h-5 lg:h-6 w-5 lg:w-6 text-white" />
                </div>
                <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {t.landingTitle}
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-2 lg:space-x-4">
              <LanguageSelector />
              <Link href="/client/orders" className="hidden sm:block">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent text-xs lg:text-sm"
                >
                  <Clock className="h-3 lg:h-4 w-3 lg:w-4 mr-1 lg:mr-2" />
                  {t.myOrders}
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={callWaiter}
                disabled={callingWaiter}
                className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent text-xs lg:text-sm"
              >
                {callingWaiter ? (
                  <Loader2 className="h-3 lg:h-4 w-3 lg:w-4 mr-1 lg:mr-2 animate-spin" />
                ) : (
                  <Bell className="h-3 lg:h-4 w-3 lg:w-4 mr-1 lg:mr-2" />
                )}
                {t.callWaiter}
              </Button>
              <Link href="/client/cart">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 relative text-xs lg:text-sm">
                  <ShoppingCart className="h-3 lg:h-4 w-3 lg:w-4 mr-1 lg:mr-2" />
                  <span className="hidden sm:inline">{t.cart}</span>
                  {getTotalItems() > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 mb-6 lg:mb-8">
            <h1 className="text-2xl lg:text-4xl font-bold mb-2 lg:mb-4">{t.restaurantName}</h1>
            <p className="text-base lg:text-xl text-blue-100 mb-4 lg:mb-6">
              {t.welcomeToTable} 12! {t.discoverFlavors}
            </p>
            <div className="flex items-center justify-center space-x-4 lg:space-x-6 text-blue-100 text-sm lg:text-base">
              <div className="flex items-center">
                <Star className="h-4 lg:h-5 w-4 lg:w-5 text-yellow-400 mr-1" />
                <span>4.8 {t.stars}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 lg:h-5 w-4 lg:w-5 mr-1" />
                <span>{t.deliveryTime}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 lg:h-5 w-4 lg:w-5 mr-1" />
                <span>{t.table} 12</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 lg:mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange(category)}
                className={
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-xs lg:text-sm"
                    : "border-blue-200 text-blue-600 hover:bg-blue-50 text-xs lg:text-sm"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-blue-600">Carregando produtos...</span>
          </div>
        )}

        {/* Menu Items */}
        {!loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
            {filteredProducts.map((product) => (
              <Card
                key={product._id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-blue-100"
              >
                <div className="relative">
                  <div className="h-32 lg:h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                    {product.foto ? ( // Usar product.foto aqui
                      <Image
                        src={product.foto || "/placeholder.svg"} // Usar product.foto
                        alt={product.nome}
                        width={200} // Ajuste conforme necessário
                        height={200} // Ajuste conforme necessário
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="text-6xl lg:text-8xl">{getProductEmoji(product.categoria)}</div>
                    )}
                  </div>
                  {product.popular && (
                    <Badge className="absolute top-2 lg:top-3 left-2 lg:left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs">
                      <Star className="h-2 lg:h-3 w-2 lg:w-3 mr-1" />
                      {t.popular}
                    </Badge>
                  )}
                  <div className="absolute top-2 lg:top-3 right-2 lg:right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                    <Star className="h-2 lg:h-3 w-2 lg:w-3 text-yellow-500 mr-1" />
                    <span className="text-xs font-medium">{product.rating || 4.5}</span>
                  </div>
                </div>

                <CardHeader className="pb-3 lg:pb-4 p-3 lg:p-6">
                  <CardTitle className="text-base lg:text-xl text-gray-800">{product.nome}</CardTitle>
                  <CardDescription className="text-sm lg:text-base text-gray-600 leading-relaxed line-clamp-2">
                    {product.descricao}
                  </CardDescription>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      € {product.preco.toFixed(2)}
                    </span>
                    <div className="flex items-center space-x-2">
                      {product.customizavel && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                          {t.customizable}
                        </Badge>
                      )}
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-2 lg:h-3 w-2 lg:w-3 mr-1" />
                        {product.tempoPreparacao || "15-20 min"}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 p-3 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 lg:space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFromCart(product._id)}
                        disabled={!cart[product._id]}
                        className="border-blue-200 text-blue-600 hover:bg-blue-50 h-8 w-8 lg:h-10 lg:w-10 p-0"
                      >
                        <Minus className="h-3 lg:h-4 w-3 lg:w-4" />
                      </Button>
                      <span className="w-6 lg:w-8 text-center font-semibold text-sm lg:text-lg">
                        {cart[product._id] || 0}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addToCart(product._id)}
                        className="border-blue-200 text-blue-600 hover:bg-blue-50 h-8 w-8 lg:h-10 lg:w-10 p-0"
                      >
                        <Plus className="h-3 lg:h-4 w-3 lg:w-4" />
                      </Button>
                    </div>
                    {product.customizavel && (
                      <Link href={`/client/customize/${product._id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 bg-transparent text-xs lg:text-sm px-2 lg:px-3"
                        >
                          {t.customize}
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">{t.noItemsFound}</h3>
            <p className="text-gray-500">{t.noItemsFoundDesc}</p>
          </div>
        )}

        {/* Floating Cart Button */}
        {getTotalItems() > 0 && (
          <div className="fixed bottom-4 lg:bottom-6 right-4 lg:right-6 z-50">
            <Link href="/client/cart">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-2xl rounded-full px-4 lg:px-6 py-3 lg:py-4 transform hover:scale-105 transition-all duration-300 text-sm lg:text-base"
              >
                <ShoppingCart className="h-4 lg:h-6 w-4 lg:w-6 mr-1 lg:mr-2" />
                <span className="hidden sm:inline">{t.viewCart} </span>({getTotalItems()})
                <Badge className="ml-1 lg:ml-2 bg-white text-blue-600 text-xs">€ {getTotalPrice().toFixed(2)}</Badge>
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
