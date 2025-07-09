"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChefHat, Clock, CheckCircle, Truck, Users, DollarSign, Menu, TrendingUp } from "lucide-react"

interface Order {
  id: number
  tableNumber: string
  items: string[]
  total: number
  status: "Recebido" | "A fazer" | "A ser entregue" | "Entregue"
  timestamp: string
  specialInstructions?: string
  orderTime: Date
}

const statusConfig = {
  Recebido: { color: "bg-blue-500", icon: Clock, text: "Recebido" },
  "A fazer": { color: "bg-yellow-500", icon: Clock, text: "Preparando" },
  "A ser entregue": { color: "bg-orange-500", icon: Truck, text: "Pronto" },
  Entregue: { color: "bg-green-500", icon: CheckCircle, text: "Entregue" },
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1001,
      tableNumber: "12",
      items: ["2x Pizza Margherita", "1x Salada Caesar"],
      total: 76.3,
      status: "Recebido",
      timestamp: "14:30",
      specialInstructions: "Pizza sem cebola, extra queijo",
      orderTime: new Date(Date.now() - 5 * 60000), // 5 minutes ago
    },
    {
      id: 1002,
      tableNumber: "8",
      items: ["1x Tiramisu", "2x Suco Natural"],
      total: 29.9,
      status: "A fazer",
      timestamp: "14:25",
      orderTime: new Date(Date.now() - 10 * 60000), // 10 minutes ago
    },
    {
      id: 1003,
      tableNumber: "15",
      items: ["3x Pizza Margherita", "2x Salada Caesar"],
      total: 123.7,
      status: "A ser entregue",
      timestamp: "14:15",
      orderTime: new Date(Date.now() - 20 * 60000), // 20 minutes ago
    },
    {
      id: 1000,
      tableNumber: "5",
      items: ["1x Tiramisu", "1x Suco Natural"],
      total: 21.4,
      status: "Entregue",
      timestamp: "13:15",
      orderTime: new Date(Date.now() - 80 * 60000), // 80 minutes ago
    },
  ])

  const [selectedStatus, setSelectedStatus] = useState<string>("Todos")

  const updateOrderStatus = (orderId: number, newStatus: Order["status"]) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  // Sort orders by time (oldest first for pending orders)
  const sortedOrders = [...orders].sort((a, b) => {
    if (a.status === "Entregue" && b.status !== "Entregue") return 1
    if (a.status !== "Entregue" && b.status === "Entregue") return -1
    return a.orderTime.getTime() - b.orderTime.getTime()
  })

  const filteredOrders =
    selectedStatus === "Todos" ? sortedOrders : sortedOrders.filter((order) => order.status === selectedStatus)

  const getStats = () => {
    const today = orders.filter((order) => order.timestamp.includes("14:") || order.timestamp.includes("13:"))
    return {
      totalOrders: today.length,
      totalRevenue: today.reduce((sum, order) => sum + order.total, 0),
      pendingOrders: orders.filter((order) => order.status !== "Entregue").length,
      completedOrders: orders.filter((order) => order.status === "Entregue").length,
    }
  }

  const stats = getStats()

  const getTimeElapsed = (orderTime: Date) => {
    const now = new Date()
    const diff = now.getTime() - orderTime.getTime()
    const minutes = Math.floor(diff / 60000)
    return `${minutes} min atrás`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 lg:py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-2 lg:space-y-0">
            <div className="flex items-center space-x-2 lg:space-x-4">
              <div className="p-1.5 lg:p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg lg:rounded-xl">
                <ChefHat className="h-6 lg:h-8 w-6 lg:w-8 text-white" />
              </div>
              <div>
                <h1 className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  TapifyOrder Admin
                </h1>
                <p className="text-xs lg:text-sm text-gray-600">Painel de Controle Avançado</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 lg:space-x-4">
              <Link href="/admin/menu">
                <Button
                  variant="outline"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent text-xs lg:text-sm"
                >
                  <Menu className="h-3 lg:h-4 w-3 lg:w-4 mr-1 lg:mr-2" />
                  Gerenciar Menu
                </Button>
              </Link>
              <Link href="/">
                <Button
                  variant="outline"
                  className="border-gray-200 text-gray-600 hover:bg-gray-50 bg-transparent text-xs lg:text-sm"
                >
                  Voltar ao Site
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <Card className="border-blue-100 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs lg:text-sm font-medium text-gray-600">Pedidos Hoje</CardTitle>
              <Users className="h-3 lg:h-4 w-3 lg:w-4 text-blue-600" />
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-xl lg:text-2xl font-bold text-gray-800">{stats.totalOrders}</div>
              <p className="text-xs text-gray-600 mt-1">
                <TrendingUp className="h-2 lg:h-3 w-2 lg:w-3 inline mr-1" />
                +12% desde ontem
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-100 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs lg:text-sm font-medium text-gray-600">Receita Hoje</CardTitle>
              <DollarSign className="h-3 lg:h-4 w-3 lg:w-4 text-green-600" />
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-xl lg:text-2xl font-bold text-gray-800">R$ {stats.totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-gray-600 mt-1">
                <TrendingUp className="h-2 lg:h-3 w-2 lg:w-3 inline mr-1" />
                +8% desde ontem
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-100 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs lg:text-sm font-medium text-gray-600">Pendentes</CardTitle>
              <Clock className="h-3 lg:h-4 w-3 lg:w-4 text-orange-600" />
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-xl lg:text-2xl font-bold text-orange-600">{stats.pendingOrders}</div>
              <p className="text-xs text-gray-600 mt-1">Aguardando preparo/entrega</p>
            </CardContent>
          </Card>

          <Card className="border-blue-100 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs lg:text-sm font-medium text-gray-600">Concluídos</CardTitle>
              <CheckCircle className="h-3 lg:h-4 w-3 lg:w-4 text-green-600" />
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-xl lg:text-2xl font-bold text-green-600">{stats.completedOrders}</div>
              <p className="text-xs text-gray-600 mt-1">Entregues hoje</p>
            </CardContent>
          </Card>
        </div>

        {/* Orders Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Pedidos em Tempo Real</h2>
              <p className="text-gray-600 mt-1">Ordenados por tempo de chegada (mais antigos primeiro)</p>
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48 border-blue-200">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos os Status</SelectItem>
                <SelectItem value="Recebido">Recebido</SelectItem>
                <SelectItem value="A fazer">Preparando</SelectItem>
                <SelectItem value="A ser entregue">Pronto</SelectItem>
                <SelectItem value="Entregue">Entregue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6">
            {filteredOrders.map((order) => {
              const config = statusConfig[order.status]
              const Icon = config.icon
              const timeElapsed = getTimeElapsed(order.orderTime)

              return (
                <Card
                  key={order.id}
                  className="overflow-hidden border-blue-100 hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 lg:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-2 lg:space-y-0">
                      <div>
                        <CardTitle className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-3 text-lg lg:text-xl">
                          <span className="text-gray-800">Pedido #{order.id}</span>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className={`${config.color} text-white px-2 lg:px-3 py-1`}>
                              <Icon className="h-3 w-3 mr-1" />
                              {config.text}
                            </Badge>
                            {order.status !== "Entregue" && (
                              <Badge variant="outline" className="border-orange-300 text-orange-600 text-xs">
                                <Clock className="h-2 lg:h-3 w-2 lg:w-3 mr-1" />
                                {timeElapsed}
                              </Badge>
                            )}
                          </div>
                        </CardTitle>
                        <CardDescription className="text-sm lg:text-base mt-2">
                          Mesa {order.tableNumber} • {order.timestamp}
                        </CardDescription>
                      </div>
                      <div className="text-left lg:text-right">
                        <div className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                          R$ {order.total.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 lg:p-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-gray-800">Itens:</h4>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <ul className="space-y-1">
                            {order.items.map((item, index) => (
                              <li key={index} className="text-gray-700 flex items-center">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {order.specialInstructions && (
                        <div>
                          <h4 className="font-semibold mb-2 text-gray-800">Observações:</h4>
                          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                            <p className="text-gray-700">{order.specialInstructions}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col lg:flex-row lg:items-center justify-between pt-4 border-t border-gray-200 space-y-3 lg:space-y-0">
                        <div>
                          <label className="text-xs lg:text-sm font-medium text-gray-600">Atualizar Status:</label>
                        </div>
                        <div className="grid grid-cols-2 lg:flex lg:space-x-2 gap-2 lg:gap-0">
                          {Object.entries(statusConfig).map(([status, config]) => {
                            const Icon = config.icon
                            return (
                              <Button
                                key={status}
                                variant={order.status === status ? "default" : "outline"}
                                size="sm"
                                onClick={() => updateOrderStatus(order.id, status as Order["status"])}
                                className={
                                  order.status === status
                                    ? `${config.color} hover:opacity-90 text-xs lg:text-sm`
                                    : "border-blue-200 text-blue-600 hover:bg-blue-50 text-xs lg:text-sm"
                                }
                              >
                                <Icon className="h-3 lg:h-4 w-3 lg:w-4 mr-1" />
                                <span className="hidden sm:inline">{config.text}</span>
                                <span className="sm:hidden">{config.text.split(" ")[0]}</span>
                              </Button>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredOrders.length === 0 && (
            <Card className="text-center py-16 border-blue-100">
              <CardContent>
                <div className="text-8xl mb-6">📋</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Nenhum pedido encontrado</h3>
                <p className="text-gray-600 text-lg">
                  {selectedStatus === "Todos"
                    ? "Não há pedidos no momento."
                    : `Não há pedidos com status "${selectedStatus}".`}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
