"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChefHat, QrCode, Utensils, ShoppingCart } from "lucide-react"

export default function ClientPage() {
  const [tableNumber, setTableNumber] = useState("")
  const [hasTable, setHasTable] = useState(false)

  const handleTableSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (tableNumber) {
      setHasTable(true)
    }
  }

  const simulateQRScan = () => {
    setTableNumber("12")
    setHasTable(true)
  }

  if (hasTable) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <ChefHat className="h-6 w-6 text-orange-600" />
                <span className="text-xl font-bold">TapifyOrder</span>
              </Link>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Mesa {tableNumber}</span>
                <Link href="/client/cart">
                  <Button size="sm">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Carrinho
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Restaurante Sabor & Arte</h1>
            <p className="text-gray-600">Bem-vindo à mesa {tableNumber}! Explore nosso menu delicioso.</p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Utensils className="h-5 w-5 mr-2" />
                  Menu Principal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Link href="/client/menu">
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          🍕
                        </div>
                        <h3 className="font-semibold">Pratos Principais</h3>
                        <p className="text-sm text-gray-600">Pizzas, massas e mais</p>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/client/menu">
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          🥗
                        </div>
                        <h3 className="font-semibold">Saladas</h3>
                        <p className="text-sm text-gray-600">Frescas e saudáveis</p>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/client/menu">
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          🍰
                        </div>
                        <h3 className="font-semibold">Sobremesas</h3>
                        <p className="text-sm text-gray-600">Doces irresistíveis</p>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/client/menu">
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          🥤
                        </div>
                        <h3 className="font-semibold">Bebidas</h3>
                        <p className="text-sm text-gray-600">Sucos, refrigerantes</p>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/client/orders">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle>Meus Pedidos</CardTitle>
                    <CardDescription>Acompanhe o status dos seus pedidos</CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/client/menu">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle>Fazer Pedido</CardTitle>
                    <CardDescription>Explore o menu e faça seu pedido</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <ChefHat className="h-8 w-8 text-orange-600" />
            <span className="text-2xl font-bold">TapifyOrder</span>
          </div>
          <CardTitle>Bem-vindo!</CardTitle>
          <CardDescription>Para começar, informe o número da sua mesa ou escaneie o QR Code</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleTableSubmit} className="space-y-4">
            <div>
              <Label htmlFor="table">Número da Mesa</Label>
              <Input
                id="table"
                type="number"
                placeholder="Ex: 12"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Continuar
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">ou</span>
            </div>
          </div>

          <Button variant="outline" className="w-full bg-transparent" onClick={simulateQRScan}>
            <QrCode className="mr-2 h-4 w-4" />
            Escanear QR Code
          </Button>

          <div className="text-center">
            <Link href="/" className="text-sm text-orange-600 hover:underline">
              Voltar ao início
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
