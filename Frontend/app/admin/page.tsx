"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChefHat, Clock, CheckCircle, Truck, Users, DollarSign, Menu, TrendingUp, RefreshCw, AlertCircle, Trash2, Calendar } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface OrderItem {
  id: string
  produtoId: string
  nome: string
  preco: number
  quantidade: number
  observacoes?: string
}

interface Order {
  id: string
  clienteId: string
  numeroMesa?: string
  items: OrderItem[]
  total: number
  status: "pedido recebido" | "preparando" | "pronto para entrega" | "entregue"
  createdAt: string
  updatedAt: string
}

type DateFilter = "hoje" | "ontem" | "3dias" | "semana" | "todos"

const statusConfig = {
  "pedido recebido": { 
    color: "bg-blue-500", 
    icon: Clock, 
    text: "Recebido",
    displayName: "Recebido"
  },
  "preparando": { 
    color: "bg-yellow-500", 
    icon: Clock, 
    text: "Preparando",
    displayName: "Preparando"
  },
  "pronto para entrega": { 
    color: "bg-orange-500", 
    icon: Truck, 
    text: "Pronto",
    displayName: "Pronto"
  },
  "entregue": { 
    color: "bg-green-500", 
    icon: CheckCircle, 
    text: "Entregue",
    displayName: "Entregue"
  },
}

const dateFilterConfig = {
  "hoje": { label: "Hoje", value: "hoje" },
  "ontem": { label: "Ontem", value: "ontem" },
  "3dias": { label: "Últimos 3 dias", value: "3dias" },
  "semana": { label: "Última semana", value: "semana" },
  "todos": { label: "Todos", value: "todos" },
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string>("Todos")
  const [selectedDateFilter, setSelectedDateFilter] = useState<DateFilter>("todos")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [receitaHoje, setReceitaHoje] = useState<number>(0)
  const [updating, setUpdating] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  // Função para transformar os dados da API para o formato esperado
  const transformOrderData = (apiData: any[]): Order[] => {
    return apiData.map(order => ({
      id: order._id,
      clienteId: order.clienteId,
      numeroMesa: order.numeroMesa,
      items: order.itens?.map((item: any) => ({
        id: item._id,
        produtoId: item.produto._id,
        nome: item.produto.nome,
        preco: item.produto.preco,
        quantidade: item.quantidade,
        observacoes: item.observacao || undefined
      })) || [],
      total: order.precoTotal,
      status: order.status,
      createdAt: order.data,
      updatedAt: order.updatedAt || order.data
    }))
  }

  // Função para filtrar pedidos por data
  const filterOrdersByDate = (orders: Order[], dateFilter: DateFilter): Order[] => {
    if (dateFilter === "todos") return orders

    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    
    return orders.filter(order => {
      const orderDate = new Date(order.createdAt)
      const orderDay = new Date(orderDate.getFullYear(), orderDate.getMonth(), orderDate.getDate())
      const diffTime = today.getTime() - orderDay.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      switch (dateFilter) {
        case "hoje":
          return diffDays === 0
        case "ontem":
          return diffDays === 1
        case "3dias":
          return diffDays >= 0 && diffDays <= 3
        case "semana":
          return diffDays >= 0 && diffDays <= 7
        default:
          return true
      }
    })
  }

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/pedidos')
      if (!response.ok) {
        throw new Error('Erro ao buscar pedidos')
      }
      
      const data = await response.json()
      console.log('Raw API response:', data)
      
      // Transformar os dados para o formato esperado
      const transformedOrders = transformOrderData(Array.isArray(data) ? data : [])
      console.log('Transformed orders:', transformedOrders)
      
      // Filtrar pedidos válidos (com dados obrigatórios)
      const validOrders = transformedOrders.filter((order: Order) => {
        const isValid = order && 
          order.id && 
          order.clienteId && 
          order.items && 
          Array.isArray(order.items) &&
          order.total !== undefined &&
          order.status &&
          order.createdAt
        
        if (!isValid) {
          console.log('Invalid order:', order)
        }
        return isValid
      })
      
      console.log('Valid orders count:', validOrders.length)
      setOrders(validOrders)
    } catch (err) {
      console.error('Error fetching orders:', err)
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  // Fetch today's revenue
  const fetchReceitaHoje = async () => {
    try {
      const response = await fetch('/api/pedidos/hoje/receita')
      if (response.ok) {
        const data = await response.json()
        setReceitaHoje(data.receita || 0)
      }
    } catch (err) {
      console.error('Erro ao buscar receita:', err)
    }
  }

  // Update order status
  const updateOrderStatus = async (orderId: string, newStatus: Order["status"]) => {
    try {
      setUpdating(orderId)
      
      const response = await fetch(`/api/pedidos/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error('Erro ao atualizar status')
      }

      // Update local state
      setOrders(prev => 
        prev.map(order => 
          order.id === orderId 
            ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
            : order
        )
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar status')
    } finally {
      setUpdating(null)
    }
  }

  // Delete order
const deleteOrder = async (orderId: string) => {
  try {
    setDeleting(orderId)

    const response = await fetch(`/api/pedidos/${orderId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Erro ao eliminar pedido')
    }

    // Remove from local state
    setOrders(prev => prev.filter(order => order.id !== orderId))

    // Update revenue if it was today's order
    const deletedOrder = orders.find(order => order.id === orderId)
    if (deletedOrder) {
      const today = new Date().toDateString()
      const orderDate = new Date(deletedOrder.createdAt).toDateString()
      if (today === orderDate) {
        setReceitaHoje(prev => prev - deletedOrder.total)
      }
    }
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Erro ao eliminar pedido')
  } finally {
    setDeleting(null)
  }
}


  // Initial load
  useEffect(() => {
    fetchOrders()
    fetchReceitaHoje()
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchOrders()
      fetchReceitaHoje()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  // Filter orders by date first, then by status
  const dateFilteredOrders = filterOrdersByDate(orders, selectedDateFilter)
  
  // Sort orders by time (oldest first for pending orders)
  const sortedOrders = [...dateFilteredOrders].sort((a, b) => {
    if (a.status === "entregue" && b.status !== "entregue") return 1
    if (a.status !== "entregue" && b.status === "entregue") return -1
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  })

  const filteredOrders = selectedStatus === "Todos" 
    ? sortedOrders 
    : sortedOrders.filter(order => statusConfig[order.status].displayName === selectedStatus)

  const getStats = () => {
    const today = new Date().toDateString()
    const todayOrders = orders.filter(order => 
      new Date(order.createdAt).toDateString() === today
    )
    
    return {
      totalOrders: todayOrders.length,
      totalRevenue: receitaHoje,
      pendingOrders: orders.filter(order => order.status !== "entregue").length,
      completedOrders: orders.filter(order => order.status === "entregue").length,
    }
  }

  const stats = getStats()

  const getTimeElapsed = (createdAt: string) => {
    const now = new Date()
    const orderTime = new Date(createdAt)
    const diff = now.getTime() - orderTime.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m atrás`
    }
    return `${minutes}m atrás`
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  // Helper function to safely get order display ID
  const getOrderDisplayId = (order: Order) => {
    return order.id ? order.id.slice(-8) : 'N/A'
  }

  // Helper function to safely get client display ID
  const getClientDisplayId = (order: Order) => {
    return order.clienteId ? order.clienteId.slice(-8) : 'N/A'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Carregando pedidos...</p>
        </div>
      </div>
    )
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
              <Button
                variant="outline"
                onClick={fetchOrders}
                disabled={loading}
                className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent text-xs lg:text-sm"
              >
                <RefreshCw className={`h-3 lg:h-4 w-3 lg:w-4 mr-1 lg:mr-2 ${loading ? 'animate-spin' : ''}`} />
                Atualizar
              </Button>
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
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <Card className="border-blue-100 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs lg:text-sm font-medium text-gray-600">Pedidos Hoje</CardTitle>
              <Users className="h-3 lg:h-4 w-3 lg:w-4 text-blue-600" />
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-xl lg:text-2xl font-bold text-gray-800">{stats.totalOrders}</div>
              <p className="text-xs text-gray-600 mt-1">Total do dia</p>
            </CardContent>
          </Card>

          <Card className="border-blue-100 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs lg:text-sm font-medium text-gray-600">Receita Hoje</CardTitle>
              <DollarSign className="h-3 lg:h-4 w-3 lg:w-4 text-green-600" />
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-xl lg:text-2xl font-bold text-gray-800">R$ {stats.totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-gray-600 mt-1">Faturamento do dia</p>
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
              <p className="text-xs text-gray-600 mt-1">Entregues</p>
            </CardContent>
          </Card>
        </div>

        {/* Orders Section */}
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Pedidos em Tempo Real</h2>
              <p className="text-gray-600 mt-1">Ordenados por tempo de chegada (mais antigos primeiro)</p>
            </div>
            <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4">
              <Select value={selectedDateFilter} onValueChange={(value) => setSelectedDateFilter(value as DateFilter)}>
                <SelectTrigger className="w-full lg:w-48 border-blue-200">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filtrar por data" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(dateFilterConfig).map(([key, config]) => (
                    <SelectItem key={key} value={config.value}>
                      {config.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full lg:w-48 border-blue-200">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">Todos os Status</SelectItem>
                  <SelectItem value="Recebido">Recebido</SelectItem>
                  <SelectItem value="Preparando">Preparando</SelectItem>
                  <SelectItem value="Pronto">Pronto</SelectItem>
                  <SelectItem value="Entregue">Entregue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-6">
            {filteredOrders.map((order) => {
              const config = statusConfig[order.status]
              const Icon = config.icon
              const timeElapsed = getTimeElapsed(order.createdAt)

              return (
                <Card
                  key={order.id}
                  className="overflow-hidden border-blue-100 hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 lg:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-2 lg:space-y-0">
                      <div>
                        <CardTitle className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-3 text-lg lg:text-xl">
                          <span className="text-gray-800">Pedido #{getOrderDisplayId(order)}</span>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className={`${config.color} text-white px-2 lg:px-3 py-1`}>
                              <Icon className="h-3 w-3 mr-1" />
                              {config.text}
                            </Badge>
                            {order.status !== "entregue" && (
                              <Badge variant="outline" className="border-orange-300 text-orange-600 text-xs">
                                <Clock className="h-2 lg:h-3 w-2 lg:w-3 mr-1" />
                                {timeElapsed}
                              </Badge>
                            )}
                          </div>
                        </CardTitle>
                        <CardDescription className="text-sm lg:text-base mt-2">
                          Cliente: {getClientDisplayId(order)} • {formatDate(order.createdAt)} às {formatTime(order.createdAt)}
                          {order.numeroMesa && ` • Mesa ${order.numeroMesa}`}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-4">
                        <div className="text-left lg:text-right">
                          <div className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            R$ {order.total.toFixed(2)}
                          </div>
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-200 text-red-600 hover:bg-red-50"
                              disabled={deleting === order.id}
                            >
                              {deleting === order.id ? (
                                <RefreshCw className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                              <span className="ml-2 hidden sm:inline">Eliminar</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmar Eliminação</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja eliminar o pedido #{getOrderDisplayId(order)}? 
                                Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteOrder(order.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 lg:p-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-gray-800">Itens:</h4>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <ul className="space-y-2">
                            {order.items?.map((item, index) => (
                              <li key={item.id || index} className="text-gray-700 flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                  <span>{item.quantidade}x {item.nome}</span>
                                </div>
                                <span className="text-sm text-gray-500">
                                  R$ {(item.preco * item.quantidade).toFixed(2)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {order.items?.some(item => item.observacoes) && (
                        <div>
                          <h4 className="font-semibold mb-2 text-gray-800">Observações:</h4>
                          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded space-y-1">
                            {order.items.filter(item => item.observacoes).map((item, index) => (
                              <p key={index} className="text-gray-700 text-sm">
                                <strong>{item.nome}:</strong> {item.observacoes}
                              </p>
                            ))}
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
                            const isCurrentStatus = order.status === status
                            const isUpdating = updating === order.id
                            
                            return (
                              <Button
                                key={status}
                                variant={isCurrentStatus ? "default" : "outline"}
                                size="sm"
                                onClick={() => updateOrderStatus(order.id, status as Order["status"])}
                                disabled={isUpdating}
                                className={
                                  isCurrentStatus
                                    ? `${config.color} hover:opacity-90 text-xs lg:text-sm`
                                    : "border-blue-200 text-blue-600 hover:bg-blue-50 text-xs lg:text-sm"
                                }
                              >
                                {isUpdating ? (
                                  <RefreshCw className="h-3 lg:h-4 w-3 lg:w-4 mr-1 animate-spin" />
                                ) : (
                                  <Icon className="h-3 lg:h-4 w-3 lg:w-4 mr-1" />
                                )}
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

          {filteredOrders.length === 0 && !loading && (
            <Card className="text-center py-16 border-blue-100">
              <CardContent>
                <div className="text-8xl mb-6">📋</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Nenhum pedido encontrado</h3>
                <p className="text-gray-600 text-lg">
                  {selectedStatus === "Todos" && selectedDateFilter === "todos"
                    ? "Não há pedidos no momento."
                    : `Não há pedidos para os filtros selecionados.`}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}