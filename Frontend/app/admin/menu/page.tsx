"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ChefHat, ArrowLeft, Plus, Edit, Trash2, Eye, Save, X } from "lucide-react"

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  category: string
  image: string
  customizable: boolean
  available: boolean
  rating: number
  prepTime: string
}

export default function AdminMenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 1,
      name: "Pizza Margherita Artesanal",
      description: "Molho de tomate San Marzano, mozzarella di bufala, manjericão fresco e azeite extra virgem",
      price: 32.9,
      category: "Pratos Principais",
      image: "🍕",
      customizable: true,
      available: true,
      rating: 4.8,
      prepTime: "25-30 min",
    },
    {
      id: 2,
      name: "Salada Caesar Premium",
      description: "Alface romana crocante, croutons artesanais, parmesão reggiano e molho caesar tradicional",
      price: 24.5,
      category: "Entradas",
      image: "🥗",
      customizable: true,
      available: true,
      rating: 4.6,
      prepTime: "10-15 min",
    },
  ])

  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: "",
    description: "",
    price: 0,
    category: "Pratos Principais",
    image: "🍽️",
    customizable: false,
    available: true,
    prepTime: "15 min",
  })

  const categories = ["Entradas", "Pratos Principais", "Sobremesas", "Bebidas"]

  const handleSaveItem = (item: MenuItem) => {
    setMenuItems((prev) => prev.map((i) => (i.id === item.id ? item : i)))
    setEditingItem(null)
  }

  const handleDeleteItem = (id: number) => {
    setMenuItems((prev) => prev.filter((i) => i.id !== id))
  }

  const handleAddItem = () => {
    if (newItem.name && newItem.description && newItem.price) {
      const item: MenuItem = {
        id: Date.now(),
        name: newItem.name,
        description: newItem.description,
        price: newItem.price,
        category: newItem.category || "Pratos Principais",
        image: newItem.image || "🍽️",
        customizable: newItem.customizable || false,
        available: newItem.available !== false,
        rating: 4.0,
        prepTime: newItem.prepTime || "15 min",
      }
      setMenuItems((prev) => [...prev, item])
      setNewItem({
        name: "",
        description: "",
        price: 0,
        category: "Pratos Principais",
        image: "🍽️",
        customizable: false,
        available: true,
        prepTime: "15 min",
      })
    }
  }

  const toggleAvailability = (id: number) => {
    setMenuItems((prev) => prev.map((item) => (item.id === id ? { ...item, available: !item.available } : item)))
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
                      value={newItem.name}
                      onChange={(e) => setNewItem((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Ex: Pizza Margherita"
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-price" className="text-sm">
                      Preço (R$)
                    </Label>
                    <Input
                      id="new-price"
                      type="number"
                      step="0.01"
                      value={newItem.price}
                      onChange={(e) => setNewItem((prev) => ({ ...prev, price: Number.parseFloat(e.target.value) }))}
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
                    value={newItem.description}
                    onChange={(e) => setNewItem((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Descreva os ingredientes e características do prato"
                    rows={3}
                    className="text-sm"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="new-category" className="text-sm">
                      Categoria
                    </Label>
                    <Select
                      value={newItem.category}
                      onValueChange={(value) => setNewItem((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger className="text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat} className="text-sm">
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="new-image" className="text-sm">
                      Emoji
                    </Label>
                    <Input
                      id="new-image"
                      value={newItem.image}
                      onChange={(e) => setNewItem((prev) => ({ ...prev, image: e.target.value }))}
                      placeholder="🍽️"
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-preptime" className="text-sm">
                      Tempo de Preparo
                    </Label>
                    <Input
                      id="new-preptime"
                      value={newItem.prepTime}
                      onChange={(e) => setNewItem((prev) => ({ ...prev, prepTime: e.target.value }))}
                      placeholder="15 min"
                      className="text-sm"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="new-customizable"
                    checked={newItem.customizable}
                    onCheckedChange={(checked) => setNewItem((prev) => ({ ...prev, customizable: checked }))}
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
                <Card key={item.id} className={`border-blue-100 ${!item.available ? "opacity-60" : ""}`}>
                  <CardContent className="p-4 lg:p-6">
                    {editingItem?.id === item.id ? (
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
                            <div className="text-3xl lg:text-4xl">{item.image}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-2 mb-2">
                                <h3 className="text-base lg:text-lg font-semibold text-gray-800 truncate">
                                  {item.name}
                                </h3>
                                <div className="flex items-center space-x-2">
                                  {item.customizable && (
                                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                                      Personalizável
                                    </Badge>
                                  )}
                                  {!item.available && (
                                    <Badge variant="destructive" className="text-xs">
                                      Indisponível
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <p className="text-sm lg:text-base text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-xs lg:text-sm text-gray-500">
                                <span>Categoria: {item.category}</span>
                                <span>Preparo: {item.prepTime}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col lg:items-end space-y-3">
                            <div className="text-xl lg:text-2xl font-bold text-blue-600">
                              R$ {item.price.toFixed(2)}
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch checked={item.available} onCheckedChange={() => toggleAvailability(item.id)} />
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
                                onClick={() => handleDeleteItem(item.id)}
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
                        .filter((item) => item.available)
                        .map((item) => (
                          <div key={item.id} className="border border-gray-200 rounded-lg p-3 lg:p-4">
                            <div className="flex items-start space-x-3">
                              <div className="text-2xl lg:text-3xl">{item.image}</div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold text-gray-800 text-sm lg:text-base truncate">
                                    {item.name}
                                  </h4>
                                  <span className="text-base lg:text-lg font-bold text-blue-600 ml-2">
                                    R$ {item.price.toFixed(2)}
                                  </span>
                                </div>
                                <p className="text-xs lg:text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-500">{item.prepTime}</span>
                                  {item.customizable && (
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

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-sm">Nome do Prato</Label>
          <Input
            value={editedItem.name}
            onChange={(e) => setEditedItem((prev) => ({ ...prev, name: e.target.value }))}
            className="text-sm"
          />
        </div>
        <div>
          <Label className="text-sm">Preço (R$)</Label>
          <Input
            type="number"
            step="0.01"
            value={editedItem.price}
            onChange={(e) => setEditedItem((prev) => ({ ...prev, price: Number.parseFloat(e.target.value) }))}
            className="text-sm"
          />
        </div>
      </div>
      <div>
        <Label className="text-sm">Descrição</Label>
        <Textarea
          value={editedItem.description}
          onChange={(e) => setEditedItem((prev) => ({ ...prev, description: e.target.value }))}
          rows={3}
          className="text-sm"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <Label className="text-sm">Categoria</Label>
          <Select
            value={editedItem.category}
            onValueChange={(value) => setEditedItem((prev) => ({ ...prev, category: value }))}
          >
            <SelectTrigger className="text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat} className="text-sm">
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-sm">Emoji</Label>
          <Input
            value={editedItem.image}
            onChange={(e) => setEditedItem((prev) => ({ ...prev, image: e.target.value }))}
            className="text-sm"
          />
        </div>
        <div>
          <Label className="text-sm">Tempo de Preparo</Label>
          <Input
            value={editedItem.prepTime}
            onChange={(e) => setEditedItem((prev) => ({ ...prev, prepTime: e.target.value }))}
            className="text-sm"
          />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          checked={editedItem.customizable}
          onCheckedChange={(checked) => setEditedItem((prev) => ({ ...prev, customizable: checked }))}
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
