"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ChefHat, ArrowLeft, Plus, Minus, Trash2, Loader2 } from "lucide-react"

type CartItem = {
  _id?: string; // id do item no backend
  produto: string; // id do produto
  nome: string;
  preco: number;
  quantidade: number;
  observacao?: string;
  customizacoes?: string[];
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartId, setCartId] = useState<string | null>(null)
  const [clienteId, setClienteId] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null) // Para mostrar loading em itens específicos

  const [specialInstructions, setSpecialInstructions] = useState("")
  const tableNumber = "12" // TODO: integrar com seleção de mesa se necessário

  // Função para obter ou gerar o clientId igual ao menu
  function getClientId() {
    if (typeof window === 'undefined') return ''
    let stored = sessionStorage.getItem('clienteId')
    if (stored) return stored
    const newId = `cliente_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    sessionStorage.setItem('clienteId', newId)
    return newId
  }

  // Carregar carrinho do backend ao montar
  useEffect(() => {
    const id = getClientId()
    setClienteId(id)
    if (id) {
      fetchCart(id)
    }
  }, [])

  // Buscar carrinho do backend
  async function fetchCart(clientId: string) {
    setLoading(true)
    try {
      const res = await fetch(`/api/carrinho/${clientId}`)
      if (res.ok) {
        const data = await res.json()
        setCartId(data._id || null)
        // Mapear itens para o formato do frontend
        setCartItems(
          (data.itens || []).map((item: any) => ({
            _id: item._id,
            produto: item.produto?._id || item.produto,
            nome: item.produto?.nome || '',
            preco: item.produto?.preco || 0,
            quantidade: item.quantidade,
            observacao: item.observacao,
            customizacoes: item.customizacoes || [],
          }))
        )
      } else {
        setCartItems([])
        setCartId(null)
      }
    } catch (e) {
      console.error('Erro ao buscar carrinho:', e)
      setCartItems([])
      setCartId(null)
    } finally {
      setLoading(false)
    }
  }

  // Atualizar quantidade de um item usando o endpoint PUT correto
  const updateQuantity = async (itemId: string, newQuantity: number) => {
    const item = cartItems.find((i) => i._id === itemId)
    if (!item) return

    if (newQuantity <= 0) {
      await removeItem(itemId)
      return
    }

    setUpdating(itemId)
    try {
      const res = await fetch(`/api/carrinho/${clienteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemId: itemId,
          quantidade: newQuantity,
          observacao: item.observacao || ""
        })
      })
      
      if (res.ok) {
        // Atualizar o estado local imediatamente para melhor UX
        setCartItems(prevItems => 
          prevItems.map(i => 
            i._id === itemId ? { ...i, quantidade: newQuantity } : i
          )
        )
        // Opcional: recarregar do backend para garantir sincronização
        // fetchCart(clienteId)
      } else {
        console.error('Erro ao atualizar quantidade')
      }
    } catch (e) {
      console.error('Erro ao atualizar quantidade:', e)
    } finally {
      setUpdating(null)
    }
  }

  // Remover item do carrinho usando o endpoint DELETE correto
  const removeItem = async (itemId: string) => {
    const item = cartItems.find((i) => i._id === itemId)
    if (!item) return

    setUpdating(itemId)
    try {
      const res = await fetch(`/api/carrinho/${clienteId}/item/${itemId}`, { 
        method: 'DELETE' 
      })
      
      if (res.ok) {
        // Remover o item do estado local imediatamente
        setCartItems(prevItems => prevItems.filter(i => i._id !== itemId))
        // Opcional: recarregar do backend para garantir sincronização
        // fetchCart(clienteId)
      } else {
        console.error('Erro ao remover item')
      }
    } catch (e) {
      console.error('Erro ao remover item:', e)
    } finally {
      setUpdating(null)
    }
  }

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.preco || 0) * (item.quantidade || 0), 0)
  }

  // Enviar pedido
  const handleOrder = async () => {
    if (!cartItems.length) return
    
    setLoading(true)
    try {
      const res = await fetch('/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clienteId,
          itens: cartItems.map(({ produto, quantidade, observacao }) => ({ 
            produto, 
            quantidade, 
            observacao 
          })),
          mesa: tableNumber,
          observacao: specialInstructions
        })
      })
      
      if (res.ok) {
        // Limpar carrinho após pedido
        await fetch(`/api/carrinho/${clienteId}`, { method: 'DELETE' })
        setCartItems([])
        setCartId(null)
        window.location.href = "/client/orders"
      } else {
        console.error('Erro ao criar pedido')
      }
    } catch (e) {
      console.error('Erro ao criar pedido:', e)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-blue-600">Carregando...</span>
      </div>
    )
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-blue-100 sticky top-0 z-50">
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
                <ChefHat className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Carrinho</span>
              </div>
            </div>
            <span className="text-sm text-blue-600">Mesa {tableNumber}</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Seus Itens</h2>
            {cartItems.map((item) => (
              <Card key={item._id} className="border-blue-100 relative">
                {updating === item._id && (
                  <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
                    <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-blue-900">{item.nome}</h3>
                      {item.customizacoes && item.customizacoes.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm text-blue-600">Personalizações:</p>
                          <ul className="text-sm text-blue-600">
                            {item.customizacoes.map((custom, index) => (
                              <li key={index}>• {custom}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {item.observacao && (
                        <div className="mt-2">
                          <p className="text-sm text-blue-600">Observação:</p>
                          <p className="text-sm text-blue-600">• {item.observacao}</p>
                        </div>
                      )}
                      <p className="text-blue-600 font-bold mt-2">€ {item.preco?.toFixed(2)} cada</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => updateQuantity(item._id!, item.quantidade - 1)} 
                          className="border-blue-200 text-blue-600 hover:bg-blue-50"
                          disabled={updating === item._id}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-semibold text-blue-900">{item.quantidade}</span>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => updateQuantity(item._id!, item.quantidade + 1)} 
                          className="border-blue-200 text-blue-600 hover:bg-blue-50"
                          disabled={updating === item._id}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => removeItem(item._id!)} 
                        className="border-red-200 text-red-600 hover:bg-red-50"
                        disabled={updating === item._id}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right mt-4">
                    <span className="text-lg font-bold text-blue-700">Subtotal: € {(item.preco * item.quantidade).toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-700">Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-blue-600">Mesa:</span>
                  <span className="font-semibold text-blue-900">{tableNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-600">Subtotal:</span>
                  <span className="text-blue-900">€ {getTotal().toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-blue-700">Total:</span>
                    <span className="text-blue-600">€ {getTotal().toFixed(2)}</span>
                  </div>
                </div>
                <div className="pt-4">
                  <label className="block text-sm font-medium text-blue-700 mb-2">
                    Instruções Especiais:
                  </label>
                  <Textarea
                    placeholder="Ex: Sem cebola na pizza, ponto da carne bem passado..."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    rows={4}
                    className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                  />
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white" 
                  size="lg" 
                  onClick={handleOrder} 
                  disabled={cartItems.length === 0 || loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Processando...
                    </>
                  ) : (
                    <>Finalizar Pedido - € {getTotal().toFixed(2)}</>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}