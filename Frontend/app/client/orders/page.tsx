"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChefHat, ArrowLeft, Clock, CheckCircle, Truck, CreditCard, Bell, RefreshCw, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface OrderItem {
  produto: {
    _id: string
    nome: string
    preco: number
  }
  quantidade: number
  observacao?: string
  _id: string
}

interface Order {
  _id: string
  clienteId: string
  itens: OrderItem[]
  precoTotal: number
  status: "pedido recebido" | "preparando" | "pronto para entrega" | "entregue"
  data: string
}

const statusConfig = {
  "pedido recebido": {
    color: "bg-blue-500",
    icon: Clock,
    text: "Pedido recebido",
    progress: 25,
    description: "Seu pedido foi recebido e está na fila de preparação",
  },
  preparando: {
    color: "bg-yellow-500",
    icon: RefreshCw,
    text: "Preparando",
    progress: 50,
    description: "Nossa equipe está preparando seu pedido com carinho",
  },
  "pronto para entrega": {
    color: "bg-orange-500",
    icon: Truck,
    text: "Pronto para entrega",
    progress: 75,
    description: "Seu pedido está pronto e será entregue em breve",
  },
  entregue: {
    color: "bg-green-500",
    icon: CheckCircle,
    text: "Entregue",
    progress: 100,
    description: "Pedido entregue! Agora você pode efetuar o pagamento",
  },
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [callingWaiter, setCallingWaiter] = useState(false)
  const { toast } = useToast()

  // Simular clienteId - em uma aplicação real, isso viria da autenticação
  // Remove this line:
  // const clienteId = "cliente123"

  // Add state for clienteId:
  const [clienteId, setClienteId] = useState<string>("")
  const tableNumber = "12"

  // Add this function before the fetchOrders function:
  function getClientId() {
    if (typeof window === "undefined") return ""
    const stored = sessionStorage.getItem("clienteId")
    if (stored) return stored
    const newId = `cliente_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    sessionStorage.setItem("clienteId", newId)
    return newId
  }

  // Update fetchOrders to accept clientId parameter:
  const fetchOrders = async (clientId: string) => {
    if (!clientId) return

    try {
      setLoading(true)
      const response = await fetch(`/api/pedidos/cliente/${clientId}`)

      if (!response.ok) {
        throw new Error("Erro ao buscar pedidos")
      }

      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar seus pedidos. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Update the useEffect to get clienteId:
  useEffect(() => {
    const id = getClientId()
    setClienteId(id)
    if (id) {
      fetchOrders(id)
    }
  }, [])

  const handlePayment = (orderId: string) => {
    window.location.href = `/client/payment/${orderId}`
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
          mesa: tableNumber,
          tipo: "chamada_garcom",
          observacao: "Cliente solicitou atendimento",
        }),
      })

      if (!response.ok) {
        throw new Error("Erro ao chamar garçom")
      }

      toast({
        title: "Garçom chamado!",
        description: "Ele estará na sua mesa em breve.",
      })
    } catch (error) {
      console.error("Erro ao chamar garçom:", error)
      toast({
        title: "Erro",
        description: "Não foi possível chamar o garçom. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setCallingWaiter(false)
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatOrderItems = (items: OrderItem[]) => {
    return items.map(
      (item) => `${item.quantidade}x ${item.produto.nome}${item.observacao ? ` (${item.observacao})` : ""}`,
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Carregando seus pedidos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 lg:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 lg:space-x-4">
              <Link href="/client/menu">
                <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50 text-xs lg:text-sm">
                  <ArrowLeft className="h-3 lg:h-4 w-3 lg:w-4 mr-1 lg:mr-2" />
                  Voltar ao Menu
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="p-1.5 lg:p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg lg:rounded-xl">
                  <ChefHat className="h-4 lg:h-6 w-4 lg:w-6 text-white" />
                </div>
                <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Meus Pedidos
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 lg:space-x-4">
              <span className="text-xs lg:text-sm text-gray-600 bg-blue-50 px-2 lg:px-3 py-1 rounded-full">
                Mesa {tableNumber}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={callWaiter}
                disabled={callingWaiter}
                className="border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent text-xs lg:text-sm"
              >
                {callingWaiter ? (
                  <Loader2 className="h-3 lg:h-4 w-3 lg:w-4 mr-1 lg:mr-2 animate-spin" />
                ) : (
                  <Bell className="h-3 lg:h-4 w-3 lg:w-4 mr-1 lg:mr-2" />
                )}
                <span className="hidden sm:inline">Chamar </span>Garçom
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {orders.length === 0 ? (
          <Card className="text-center py-16 border-blue-100">
            <CardContent>
              <div className="text-8xl mb-6">📋</div>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Nenhum pedido ainda</h2>
              <p className="text-gray-600 mb-8 text-lg">Que tal fazer seu primeiro pedido?</p>
              <Link href="/client/menu">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-3">
                  Explorar Menu
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Acompanhe seus Pedidos</h1>
              <p className="text-gray-600 text-lg">Veja o status em tempo real de todos os seus pedidos</p>
              <Button
                variant="outline"
                onClick={() => fetchOrders(clienteId)}
                className="mt-4 border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Atualizar
              </Button>
            </div>

            {orders.map((order) => {
              const config = statusConfig[order.status]
              const Icon = config.icon
              const orderItems = formatOrderItems(order.itens)

              return (
                <Card key={order._id} className="overflow-hidden border-blue-100 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 lg:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-2 lg:space-y-0">
                      <div>
                        <CardTitle className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-3 text-lg lg:text-2xl">
                          <span className="text-gray-800">Pedido #{order._id.slice(-6)}</span>
                          <Badge
                            variant="secondary"
                            className={`${config.color} text-white px-2 lg:px-3 py-1 self-start lg:self-auto`}
                          >
                            <Icon className="h-3 lg:h-4 w-3 lg:w-4 mr-1 lg:mr-2" />
                            {config.text}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="text-sm lg:text-lg mt-2">
                          Feito às {formatTime(order.data)} • Mesa {tableNumber}
                        </CardDescription>
                      </div>
                      <div className="text-left lg:text-right">
                        <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                          € {order.precoTotal.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-4 lg:p-6">
                    <div className="space-y-4 lg:space-y-6">
                      {/* Progress Bar */}
                      <div className="space-y-2 lg:space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs lg:text-sm font-medium text-gray-600">Progresso do pedido</span>
                          <span className="text-xs lg:text-sm font-medium text-gray-600">{config.progress}%</span>
                        </div>
                        <Progress value={config.progress} className="h-2 lg:h-3" />
                        <p className="text-xs lg:text-sm text-gray-600">{config.description}</p>
                      </div>

                      {/* Items */}
                      <div>
                        <h4 className="font-semibold mb-2 lg:mb-3 text-base lg:text-lg text-gray-800">
                          Itens do pedido:
                        </h4>
                        <div className="bg-gray-50 rounded-lg p-3 lg:p-4">
                          <ul className="space-y-1 lg:space-y-2">
                            {orderItems.map((item, index) => (
                              <li key={index} className="text-sm lg:text-base text-gray-700 flex items-center">
                                <div className="w-1.5 lg:w-2 h-1.5 lg:h-2 bg-blue-500 rounded-full mr-2 lg:mr-3 flex-shrink-0"></div>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Status Timeline */}
                      <div className="border-t pt-4 lg:pt-6">
                        <h4 className="font-semibold mb-3 lg:mb-4 text-base lg:text-lg text-gray-800">
                          Status do pedido:
                        </h4>
                        <div className="hidden lg:flex items-center justify-between">
                          {/* Desktop timeline */}
                          {Object.entries(statusConfig).map(([status, config], index) => {
                            const Icon = config.icon
                            const isActive = Object.keys(statusConfig).indexOf(order.status) >= index
                            const isCurrent = order.status === status

                            return (
                              <div key={status} className="flex flex-col items-center space-y-2">
                                <div
                                  className={`
                  w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                  ${isActive ? config.color : "bg-gray-200"}
                  ${isCurrent ? "ring-4 ring-blue-200 scale-110" : ""}
                `}
                                >
                                  <Icon className={`h-6 w-6 ${isActive ? "text-white" : "text-gray-400"}`} />
                                </div>
                                <span
                                  className={`text-sm text-center ${isActive ? "text-gray-900 font-medium" : "text-gray-400"}`}
                                >
                                  {config.text}
                                </span>
                              </div>
                            )
                          })}
                        </div>

                        {/* Mobile timeline */}
                        <div className="lg:hidden space-y-3">
                          {Object.entries(statusConfig).map(([status, config], index) => {
                            const Icon = config.icon
                            const isActive = Object.keys(statusConfig).indexOf(order.status) >= index
                            const isCurrent = order.status === status

                            return (
                              <div key={status} className="flex items-center space-x-3">
                                <div
                                  className={`
                  w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                  ${isActive ? config.color : "bg-gray-200"}
                  ${isCurrent ? "ring-2 ring-blue-200" : ""}
                `}
                                >
                                  <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-gray-400"}`} />
                                </div>
                                <span className={`text-sm ${isActive ? "text-gray-900 font-medium" : "text-gray-400"}`}>
                                  {config.text}
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      {order.status === "entregue" && (
                        <div className="border-t pt-4 lg:pt-6">
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4 lg:p-6">
                            <div className="flex items-center mb-3 lg:mb-4">
                              <CheckCircle className="h-5 lg:h-6 w-5 lg:w-6 text-green-600 mr-2" />
                              <h4 className="font-semibold text-base lg:text-lg text-green-800">
                                Pedido entregue com sucesso!
                              </h4>
                            </div>
                            <p className="text-sm lg:text-base text-green-700 mb-3 lg:mb-4">
                              Seu pedido foi entregue. Agora você pode efetuar o pagamento de forma segura.
                            </p>
                            <Button
                              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-sm lg:text-lg py-2 lg:py-3"
                              onClick={() => handlePayment(order._id)}
                            >
                              <CreditCard className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
                              Pagar Pedido - € {order.precoTotal.toFixed(2)}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            <div className="text-center pt-8">
              <Link href="/client/menu">
                <Button
                  variant="outline"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50 text-lg px-8 py-3 bg-transparent"
                >
                  Fazer Novo Pedido
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
