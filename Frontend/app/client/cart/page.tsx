"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ChefHat, ArrowLeft, Plus, Minus, Trash2 } from "lucide-react"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  customizations?: string[]
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Pizza Margherita",
      price: 28.9,
      quantity: 2,
      customizations: ["Sem cebola", "Extra queijo"],
    },
    {
      id: 2,
      name: "Salada Caesar",
      price: 18.5,
      quantity: 1,
    },
  ])

  const [specialInstructions, setSpecialInstructions] = useState("")
  const tableNumber = "12"

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id))
    } else {
      setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  const handleOrder = () => {
    // Aqui você faria a chamada para a API
    console.log("Pedido enviado:", {
      tableNumber,
      items: cartItems,
      specialInstructions,
      total: getTotal(),
    })
    // Redirecionar para página de confirmação
    window.location.href = "/client/orders"
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center space-x-4">
              <Link href="/client/menu">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar ao Menu
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <ChefHat className="h-6 w-6 text-orange-600" />
                <span className="text-xl font-bold">Carrinho</span>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-bold mb-2">Carrinho vazio</h2>
              <p className="text-gray-600 mb-6">Adicione alguns itens deliciosos do nosso menu!</p>
              <Link href="/client/menu">
                <Button>Explorar Menu</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/client/menu">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Continuar Comprando
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <ChefHat className="h-6 w-6 text-orange-600" />
                <span className="text-xl font-bold">Carrinho</span>
              </div>
            </div>
            <span className="text-sm text-gray-600">Mesa {tableNumber}</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold mb-4">Seus Itens</h2>
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      {item.customizations && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">Personalizações:</p>
                          <ul className="text-sm text-gray-600">
                            {item.customizations.map((custom, index) => (
                              <li key={index}>• {custom}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <p className="text-orange-600 font-bold mt-2">R$ {item.price.toFixed(2)} cada</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => removeItem(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right mt-4">
                    <span className="text-lg font-bold">Subtotal: R$ {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Mesa:</span>
                  <span className="font-semibold">{tableNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>R$ {getTotal().toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-orange-600">R$ {getTotal().toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Observações Especiais</CardTitle>
                <CardDescription>Alguma observação especial para seu pedido?</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Ex: Sem cebola na pizza, ponto da carne bem passado..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  rows={4}
                />
              </CardContent>
            </Card>

            <Button className="w-full" size="lg" onClick={handleOrder}>
              Finalizar Pedido - R$ {getTotal().toFixed(2)}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
