"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { LanguageSelector } from "@/components/LanguageSelector"
import { WaiterNotification } from "@/components/WaiterNotification"
import { useLanguage } from "@/contexts/LanguageContext"
import { ChefHat, ShoppingCart, Plus, Minus, Search, Star, Clock, Users, Bell } from "lucide-react"

interface MenuItem {
  id: number
  nameKey: string
  descriptionKey: string
  price: number
  categoryKey: string
  image: string
  customizable: boolean
  rating: number
  prepTime: string
  popular?: boolean
}

export default function MenuPage() {
  const { t } = useLanguage()
  const [cart, setCart] = useState<{ [key: number]: number }>({})
  const [selectedCategory, setSelectedCategory] = useState(t.all)
  const [searchTerm, setSearchTerm] = useState("")
  const [showWaiterNotification, setShowWaiterNotification] = useState(false)

  const menuItems: MenuItem[] = [
    {
      id: 1,
      nameKey: "pizzaMargherita",
      descriptionKey: "pizzaMargheritaDesc",
      price: 32.9,
      categoryKey: "mainCourses",
      image: "🍕",
      customizable: true,
      rating: 4.8,
      prepTime: "25-30 min",
      popular: true,
    },
    {
      id: 2,
      nameKey: "caesarSalad",
      descriptionKey: "caesarSaladDesc",
      price: 24.5,
      categoryKey: "entries",
      image: "🥗",
      customizable: true,
      rating: 4.6,
      prepTime: "10-15 min",
    },
    {
      id: 3,
      nameKey: "tiramisu",
      descriptionKey: "tiramisuDesc",
      price: 18.9,
      categoryKey: "desserts",
      image: "🍰",
      customizable: false,
      rating: 4.9,
      prepTime: "5 min",
      popular: true,
    },
    {
      id: 4,
      nameKey: "detoxJuice",
      descriptionKey: "detoxJuiceDesc",
      price: 12.5,
      categoryKey: "beverages",
      image: "🥤",
      customizable: true,
      rating: 4.4,
      prepTime: "5 min",
    },
    {
      id: 5,
      nameKey: "shrimpRisotto",
      descriptionKey: "shrimpRisottoDesc",
      price: 45.9,
      categoryKey: "mainCourses",
      image: "🍤",
      customizable: true,
      rating: 4.7,
      prepTime: "30-35 min",
    },
    {
      id: 6,
      nameKey: "bruschettaTrio",
      descriptionKey: "bruschettaTrioDesc",
      price: 28.9,
      categoryKey: "entries",
      image: "🥖",
      customizable: false,
      rating: 4.5,
      prepTime: "15 min",
    },
  ]

  const categories = [t.all, t.starters, t.mains, t.desserts, t.beverages]

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === t.all ||
      (selectedCategory === t.starters && item.categoryKey === "entries") ||
      (selectedCategory === t.mains && item.categoryKey === "mainCourses") ||
      (selectedCategory === t.desserts && item.categoryKey === "desserts") ||
      (selectedCategory === t.beverages && item.categoryKey === "beverages")

    const itemName = t[item.nameKey as keyof typeof t] as string
    const itemDesc = t[item.descriptionKey as keyof typeof t] as string

    const matchesSearch =
      itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      itemDesc.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const addToCart = (itemId: number) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }))
  }

  const removeFromCart = (itemId: number) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }))
  }

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
  }

  const callWaiter = () => {
    setShowWaiterNotification(true)
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
                className="border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent text-xs lg:text-sm"
              >
                <Bell className="h-3 lg:h-4 w-3 lg:w-4 mr-1 lg:mr-2" />
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
                onClick={() => setSelectedCategory(category)}
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

        {/* Menu Items */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          {filteredItems.map((item) => {
            const itemName = t[item.nameKey as keyof typeof t] as string
            const itemDescription = t[item.descriptionKey as keyof typeof t] as string

            return (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-blue-100"
              >
                <div className="relative">
                  <div className="h-32 lg:h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                    <div className="text-6xl lg:text-8xl">{item.image}</div>
                  </div>
                  {item.popular && (
                    <Badge className="absolute top-2 lg:top-3 left-2 lg:left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs">
                      <Star className="h-2 lg:h-3 w-2 lg:w-3 mr-1" />
                      {t.popular}
                    </Badge>
                  )}
                  <div className="absolute top-2 lg:top-3 right-2 lg:right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                    <Star className="h-2 lg:h-3 w-2 lg:w-3 text-yellow-500 mr-1" />
                    <span className="text-xs font-medium">{item.rating}</span>
                  </div>
                </div>

                <CardHeader className="pb-3 lg:pb-4 p-3 lg:p-6">
                  <CardTitle className="text-base lg:text-xl text-gray-800">{itemName}</CardTitle>
                  <CardDescription className="text-sm lg:text-base text-gray-600 leading-relaxed line-clamp-2">
                    {itemDescription}
                  </CardDescription>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      € {item.price.toFixed(2)}
                    </span>
                    <div className="flex items-center space-x-2">
                      {item.customizable && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                          {t.customizable}
                        </Badge>
                      )}
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-2 lg:h-3 w-2 lg:w-3 mr-1" />
                        {item.prepTime}
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
                        onClick={() => removeFromCart(item.id)}
                        disabled={!cart[item.id]}
                        className="border-blue-200 text-blue-600 hover:bg-blue-50 h-8 w-8 lg:h-10 lg:w-10 p-0"
                      >
                        <Minus className="h-3 lg:h-4 w-3 lg:w-4" />
                      </Button>
                      <span className="w-6 lg:w-8 text-center font-semibold text-sm lg:text-lg">
                        {cart[item.id] || 0}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addToCart(item.id)}
                        className="border-blue-200 text-blue-600 hover:bg-blue-50 h-8 w-8 lg:h-10 lg:w-10 p-0"
                      >
                        <Plus className="h-3 lg:h-4 w-3 lg:w-4" />
                      </Button>
                    </div>
                    {item.customizable && (
                      <Link href={`/client/customize/${item.id}`}>
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
            )
          })}
        </div>

        {filteredItems.length === 0 && (
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
                <Badge className="ml-1 lg:ml-2 bg-white text-blue-600 text-xs">
                  € {menuItems.reduce((total, item) => total + (cart[item.id] || 0) * item.price, 0).toFixed(2)}
                </Badge>
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
