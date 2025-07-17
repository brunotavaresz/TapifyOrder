"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ChefHat, ArrowLeft, Plus, Edit, Trash2, Eye, Save, X, Loader2 } from "lucide-react"

interface MenuItem {
  _id: string
  nome: string
  descricao: string
  preco: number
  categoria: string
  foto: string
  personalizavel: boolean
  disponivel: boolean
  tempoPreparo: number
}

interface NewMenuItem {
  nome: string
  descricao: string
  preco: number
  categoria: string
  foto: string
  personalizavel: boolean
  disponivel: boolean
  tempoPreparo: number
}

export default function AdminMenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [newItem, setNewItem] = useState<NewMenuItem>({
    nome: "",
    descricao: "",
    preco: 0,
    categoria: "prato principal",
    foto: "",
    personalizavel: false,
    disponivel: true,
    tempoPreparo: 15,
  })

  const categories = ["entrada", "prato principal", "sobremesa", "bebidas"]

  // Carregar produtos ao montar o componente
  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/produtos')
      if (!response.ok) {
        throw new Error('Erro ao carregar produtos')
      }
      const data = await response.json()
      setMenuItems(data)
    } catch (error) {
      console.error('Erro ao carregar produtos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveItem = async (item: MenuItem) => {
    try {
      const response = await fetch(`/api/produtos/${item._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: item.nome,
          descricao: item.descricao,
          preco: item.preco,
          categoria: item.categoria,
          foto: item.foto,
          personalizavel: item.personalizavel,
          disponivel: item.disponivel,
          tempoPreparo: item.tempoPreparo,
        }),
      })

      if (!response.ok) {
        throw new Error('Erro ao atualizar produto')
      }

      const updatedItem = await response.json()
      setMenuItems((prev) => prev.map((i) => (i._id === item._id ? updatedItem : i)))
      setEditingItem(null)
    } catch (error) {
      console.error('Erro ao salvar item:', error)
    }
  }

  const handleDeleteItem = async (id: string) => {
    try {
      const response = await fetch(`/api/produtos/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Erro ao remover produto')
      }

      setMenuItems((prev) => prev.filter((i) => i._id !== id))
    } catch (error) {
      console.error('Erro ao deletar item:', error)
    }
  }

  const handleAddItem = async () => {
    if (newItem.nome && newItem.descricao && newItem.preco) {
      try {
        const response = await fetch('/api/produtos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newItem),
        })

        if (!response.ok) {
          throw new Error('Erro ao criar produto')
        }

        const createdItem = await response.json()
        setMenuItems((prev) => [...prev, createdItem])
        setNewItem({
          nome: "",
          descricao: "",
          preco: 0,
          categoria: "prato principal",
          foto: "",
          personalizavel: false,
          disponivel: true,
          tempoPreparo: 15,
        })
      } catch (error) {
        console.error('Erro ao adicionar item:', error)
      }
    }
  }

  const toggleAvailability = async (id: string) => {
    try {
      const response = await fetch(`/api/produtos/${id}/disponibilidade`, {
        method: 'PATCH',
      })

      if (!response.ok) {
        throw new Error('Erro ao alterar disponibilidade')
      }

      const updatedItem = await response.json()
      setMenuItems((prev) => prev.map((item) => (item._id === id ? updatedItem : item)))
    } catch (error) {
      console.error('Erro ao alterar disponibilidade:', error)
    }
  }

  const formatCategory = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      "entrada": "Entradas",
      "prato principal": "Pratos Principais", 
      "sobremesa": "Sobremesas",
      "bebidas": "Bebidas"
    }
    return categoryMap[category] || category
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="text-lg text-gray-600">Carregando menu...</span>
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
              <Link href="/admin">
                <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50 text-xs lg:text-sm">
                  <ArrowLeft className="h-3 lg:h-4 w-3 lg:w-4 mr-1 lg:mr-2" />
                  Voltar ao Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="p-1.5 lg:p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg lg:rounded-xl">
                  <ChefHat className="h-4 lg:h-6 w-4 lg:w-6 text-white" />
                </div>
                <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Gerenciar Menu
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
              className="border-blue-200 text-blue-600 hover:bg-blue-50 text-xs lg:text-sm self-start lg:self-auto"
            >
              <Eye className="h-3 lg:h-4 w-3 lg:w-4 mr-1 lg:mr-2" />
              {showPreview ? "Ocultar" : "Ver"} Preview
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className={`${showPreview ? "grid lg:grid-cols-2 gap-8" : ""}`}>
          {/* Admin Panel */}
          <div className="space-y-6 lg:space-y-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">Gerenciamento do Menu</h1>
              <p className="text-gray-600">Adicione, edite ou remova itens do menu</p>
            </div>

            {/* Add New Item */}
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center text-lg lg:text-xl">
                  <Plus className="h-4 lg:h-5 w-4 lg:w-5 mr-2 text-blue-600" />
                  Adicionar Novo Item
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="new-name" className="text-sm">
                      Nome do Prato
                    </Label>
                    <Input
                      id="new-name"
                      value={newItem.nome}
                      onChange={(e) => setNewItem((prev) => ({ ...prev, nome: e.target.value }))}
                      placeholder="Ex: Pizza Margherita"
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-price" className="text-sm">
                      Preço (€)
                    </Label>
                    <Input
                      id="new-price"
                      type="number"
                      step="0.01"
                      value={newItem.preco}
                      onChange={(e) => setNewItem((prev) => ({ ...prev, preco: Number.parseFloat(e.target.value) }))}
                      placeholder="0.00"
                      className="text-sm"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="new-description" className="text-sm">
                    Descrição
                  </Label>
                  <Textarea
                    id="new-description"
                    value={newItem.descricao}
                    onChange={(e) => setNewItem((prev) => ({ ...prev, descricao: e.target.value }))}
                    placeholder="Descreva os ingredientes e características do prato"
                    rows={3}
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="new-foto" className="text-sm">
                    URL da Foto
                  </Label>
                  <Input
                    id="new-foto"
                    value={newItem.foto}
                    onChange={(e) => setNewItem((prev) => ({ ...prev, foto: e.target.value }))}
                    placeholder="https://exemplo.com/foto.jpg"
                    className="text-sm"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="new-category" className="text-sm">
                      Categoria
                    </Label>
                    <Select
                      value={newItem.categoria}
                      onValueChange={(value) => setNewItem((prev) => ({ ...prev, categoria: value }))}
                    >
                      <SelectTrigger className="text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat} className="text-sm">
                            {formatCategory(cat)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="new-preptime" className="text-sm">
                      Tempo de Preparo (min)
                    </Label>
                    <Input
                      id="new-preptime"
                      type="number"
                      value={newItem.tempoPreparo}
                      onChange={(e) => setNewItem((prev) => ({ ...prev, tempoPreparo: Number.parseInt(e.target.value) }))}
                      placeholder="15"
                      className="text-sm"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="new-customizable"
                    checked={newItem.personalizavel}
                    onCheckedChange={(checked) => setNewItem((prev) => ({ ...prev, personalizavel: checked }))}
                  />
                  <Label htmlFor="new-customizable" className="text-sm">
                    Personalizável
                  </Label>
                </div>
                <Button
                  onClick={handleAddItem}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-sm lg:text-base"
                >
                  <Plus className="h-3 lg:h-4 w-3 lg:w-4 mr-2" />
                  Adicionar Item
                </Button>
              </CardContent>
            </Card>

            {/* Menu Items List */}
            <div className="space-y-4">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-800">Itens do Menu</h2>
              {menuItems.map((item) => (
                <Card key={item._id} className={`border-blue-100 ${!item.disponivel ? "opacity-60" : ""}`}>
                  <CardContent className="p-4 lg:p-6">
                    {editingItem?._id === item._id ? (
                      <EditItemForm
                        item={editingItem}
                        onSave={handleSaveItem}
                        onCancel={() => setEditingItem(null)}
                        categories={categories}
                      />
                    ) : (
                      <div className="space-y-4">
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between space-y-4 lg:space-y-0">
                          <div className="flex items-start space-x-3 lg:space-x-4 flex-1">
                            <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                              {item.foto ? (
                                <img 
                                  src={item.foto} 
                                  alt={item.nome}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                  }}
                                />
                              ) : null}
                              <div className={`w-full h-full flex items-center justify-center text-2xl lg:text-3xl ${item.foto ? 'hidden' : ''}`}>
                                🍽️
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-2 mb-2">
                                <h3 className="text-base lg:text-lg font-semibold text-gray-800 truncate">
                                  {item.nome}
                                </h3>
                                <div className="flex items-center space-x-2">
                                  {item.personalizavel && (
                                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                                      Personalizável
                                    </Badge>
                                  )}
                                  {!item.disponivel && (
                                    <Badge variant="destructive" className="text-xs">
                                      Indisponível
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <p className="text-sm lg:text-base text-gray-600 mb-2 line-clamp-2">{item.descricao}</p>
                              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-xs lg:text-sm text-gray-500">
                                <span>Categoria: {formatCategory(item.categoria)}</span>
                                <span>Preparo: {item.tempoPreparo} min</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col lg:items-end space-y-3">
                            <div className="text-xl lg:text-2xl font-bold text-blue-600">
                              € {item.preco.toFixed(2)}
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch checked={item.disponivel} onCheckedChange={() => toggleAvailability(item._id)} />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingItem(item)}
                                className="border-blue-200 text-blue-600 hover:bg-blue-50 text-xs lg:text-sm"
                              >
                                <Edit className="h-3 lg:h-4 w-3 lg:w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteItem(item._id)}
                                className="border-red-200 text-red-600 hover:bg-red-50 text-xs lg:text-sm"
                              >
                                <Trash2 className="h-3 lg:h-4 w-3 lg:w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Preview Panel */}
          {showPreview && (
            <div className="space-y-6">
              <div className="sticky top-24">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">Preview do Cliente</h2>
                <Card className="border-blue-100">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 lg:p-6">
                    <CardTitle className="text-lg lg:text-xl">Restaurante Sabor & Arte</CardTitle>
                    <CardDescription className="text-blue-100 text-sm lg:text-base">
                      Como os clientes veem o menu
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 lg:p-4 max-h-96 overflow-y-auto">
                    <div className="space-y-3 lg:space-y-4">
                      {menuItems
                        .filter((item) => item.disponivel)
                        .map((item) => (
                          <div key={item._id} className="border border-gray-200 rounded-lg p-3 lg:p-4">
                            <div className="flex items-start space-x-3">
                              <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                {item.foto ? (
                                  <img 
                                    src={item.foto} 
                                    alt={item.nome}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                    }}
                                  />
                                ) : null}
                                <div className={`w-full h-full flex items-center justify-center text-lg lg:text-xl ${item.foto ? 'hidden' : ''}`}>
                                  🍽️
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold text-gray-800 text-sm lg:text-base truncate">
                                    {item.nome}
                                  </h4>
                                  <span className="text-base lg:text-lg font-bold text-blue-600 ml-2">
                                    € {item.preco.toFixed(2)}
                                  </span>
                                </div>
                                <p className="text-xs lg:text-sm text-gray-600 mb-2 line-clamp-2">{item.descricao}</p>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-500">{item.tempoPreparo} min</span>
                                  {item.personalizavel && (
                                    <Badge variant="secondary" className="text-xs">
                                      Personalizável
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

function EditItemForm({
  item,
  onSave,
  onCancel,
  categories,
}: {
  item: MenuItem
  onSave: (item: MenuItem) => void
  onCancel: () => void
  categories: string[]
}) {
  const [editedItem, setEditedItem] = useState(item)

  const formatCategory = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      "entrada": "Entradas",
      "prato principal": "Pratos Principais", 
      "sobremesa": "Sobremesas",
      "bebidas": "Bebidas"
    }
    return categoryMap[category] || category
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-sm">Nome do Prato</Label>
          <Input
            value={editedItem.nome}
            onChange={(e) => setEditedItem((prev) => ({ ...prev, nome: e.target.value }))}
            className="text-sm"
          />
        </div>
        <div>
          <Label className="text-sm">Preço (€)</Label>
          <Input
            type="number"
            step="0.01"
            value={editedItem.preco}
            onChange={(e) => setEditedItem((prev) => ({ ...prev, preco: Number.parseFloat(e.target.value) }))}
            className="text-sm"
          />
        </div>
      </div>
      <div>
        <Label className="text-sm">Descrição</Label>
        <Textarea
          value={editedItem.descricao}
          onChange={(e) => setEditedItem((prev) => ({ ...prev, descricao: e.target.value }))}
          rows={3}
          className="text-sm"
        />
      </div>
      <div>
        <Label className="text-sm">URL da Foto</Label>
        <Input
          value={editedItem.foto}
          onChange={(e) => setEditedItem((prev) => ({ ...prev, foto: e.target.value }))}
          placeholder="https://exemplo.com/foto.jpg"
          className="text-sm"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="text-sm">Categoria</Label>
          <Select
            value={editedItem.categoria}
            onValueChange={(value) => setEditedItem((prev) => ({ ...prev, categoria: value }))}
          >
            <SelectTrigger className="text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat} className="text-sm">
                  {formatCategory(cat)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-sm">Tempo de Preparo (min)</Label>
          <Input
            type="number"
            value={editedItem.tempoPreparo}
            onChange={(e) => setEditedItem((prev) => ({ ...prev, tempoPreparo: Number.parseInt(e.target.value) }))}
            className="text-sm"
          />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          checked={editedItem.personalizavel}
          onCheckedChange={(checked) => setEditedItem((prev) => ({ ...prev, personalizavel: checked }))}
        />
        <Label className="text-sm">Personalizável</Label>
      </div>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <Button
          onClick={() => onSave(editedItem)}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-sm"
        >
          <Save className="h-3 lg:h-4 w-3 lg:w-4 mr-2" />
          Salvar
        </Button>
        <Button variant="outline" onClick={onCancel} className="text-sm bg-transparent">
          <X className="h-3 lg:h-4 w-3 lg:w-4 mr-2" />
          Cancelar
        </Button>
      </div>
    </div>
  )
}