"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChefHat, ArrowLeft, Plus } from "lucide-react"

interface CustomizationOption {
  id: string
  name: string
  price: number
  type: "checkbox" | "radio"
  group?: string
}

const customizationOptions: { [key: string]: CustomizationOption[] } = {
  "1": [
    // Pizza Margherita
    { id: "extra-cheese", name: "Extra Queijo", price: 3.5, type: "checkbox" },
    { id: "no-onion", name: "Sem Cebola", price: 0, type: "checkbox" },
    { id: "extra-basil", name: "Extra Manjericão", price: 2.0, type: "checkbox" },
    { id: "size-small", name: "Pequena", price: -5.0, type: "radio", group: "size" },
    { id: "size-medium", name: "Média", price: 0, type: "radio", group: "size" },
    { id: "size-large", name: "Grande", price: 8.0, type: "radio", group: "size" },
  ],
  "2": [
    // Salada Caesar
    { id: "extra-chicken", name: "Extra Frango", price: 6.0, type: "checkbox" },
    { id: "no-croutons", name: "Sem Croutons", price: 0, type: "checkbox" },
    { id: "extra-parmesan", name: "Extra Parmesão", price: 3.0, type: "checkbox" },
    { id: "dressing-side", name: "Molho à Parte", price: 0, type: "checkbox" },
  ],
}

export default function CustomizePage({ params }: { params: { id: string } }) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [radioSelections, setRadioSelections] = useState<{ [key: string]: string }>({
    size: "size-medium", // default selection
  })

  const itemId = params.id
  const options = customizationOptions[itemId] || []

  // Mock item data - in real app, fetch from API
  const itemData = {
    "1": { name: "Pizza Margherita", basePrice: 28.9 },
    "2": { name: "Salada Caesar", basePrice: 18.5 },
  }

  const item = itemData[itemId as keyof typeof itemData]

  if (!item) {
    return <div>Item não encontrado</div>
  }

  const handleCheckboxChange = (optionId: string, checked: boolean) => {
    if (checked) {
      setSelectedOptions((prev) => [...prev, optionId])
    } else {
      setSelectedOptions((prev) => prev.filter((id) => id !== optionId))
    }
  }

  const handleRadioChange = (group: string, optionId: string) => {
    setRadioSelections((prev) => ({
      ...prev,
      [group]: optionId,
    }))
  }

  const calculateTotalPrice = () => {
    let total = item.basePrice

    // Add checkbox options
    selectedOptions.forEach((optionId) => {
      const option = options.find((opt) => opt.id === optionId)
      if (option) {
        total += option.price
      }
    })

    // Add radio options
    Object.values(radioSelections).forEach((optionId) => {
      const option = options.find((opt) => opt.id === optionId)
      if (option) {
        total += option.price
      }
    })

    return total
  }

  const addToCart = () => {
    const customizations = [
      ...selectedOptions.map((id) => options.find((opt) => opt.id === id)?.name).filter(Boolean),
      ...Object.values(radioSelections)
        .map((id) => options.find((opt) => opt.id === id)?.name)
        .filter(Boolean),
    ]

    console.log("Adicionando ao carrinho:", {
      itemId,
      itemName: item.name,
      basePrice: item.basePrice,
      totalPrice: calculateTotalPrice(),
      customizations,
    })

    // Redirect to cart or show success message
    alert("Item personalizado adicionado ao carrinho!")
  }

  const groupedOptions = options.reduce(
    (acc, option) => {
      if (option.type === "radio") {
        const group = option.group || "default"
        if (!acc[group]) acc[group] = []
        acc[group].push(option)
      } else {
        if (!acc.checkbox) acc.checkbox = []
        acc.checkbox.push(option)
      }
      return acc
    },
    {} as { [key: string]: CustomizationOption[] },
  )

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
              <span className="text-xl font-bold">Personalizar</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">{item.name}</CardTitle>
              <CardDescription>Personalize seu pedido do jeito que você gosta</CardDescription>
              <div className="text-xl font-bold text-orange-600">Preço base: € {item.basePrice.toFixed(2)}</div>
            </CardHeader>
          </Card>

          <div className="space-y-6">
            {/* Checkbox Options */}
            {groupedOptions.checkbox && (
              <Card>
                <CardHeader>
                  <CardTitle>Extras e Modificações</CardTitle>
                  <CardDescription>Selecione as opções desejadas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {groupedOptions.checkbox.map((option) => (
                    <div key={option.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={option.id}
                          checked={selectedOptions.includes(option.id)}
                          onCheckedChange={(checked) => handleCheckboxChange(option.id, checked as boolean)}
                        />
                        <Label htmlFor={option.id} className="font-medium">
                          {option.name}
                        </Label>
                      </div>
                      <span className="text-sm font-medium">
                        {option.price > 0 && `+€ ${option.price.toFixed(2)}`}
                        {option.price === 0 && "Grátis"}
                        {option.price < 0 && `-€ ${Math.abs(option.price).toFixed(2)}`}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Radio Group Options */}
            {Object.entries(groupedOptions).map(([groupName, groupOptions]) => {
              if (groupName === "checkbox") return null

              return (
                <Card key={groupName}>
                  <CardHeader>
                    <CardTitle>{groupName === "size" ? "Tamanho" : groupName}</CardTitle>
                    <CardDescription>Escolha uma opção</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={radioSelections[groupName]}
                      onValueChange={(value) => handleRadioChange(groupName, value)}
                    >
                      {groupOptions.map((option) => (
                        <div key={option.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value={option.id} id={option.id} />
                            <Label htmlFor={option.id} className="font-medium">
                              {option.name}
                            </Label>
                          </div>
                          <span className="text-sm font-medium">
                            {option.price > 0 && `+€ ${option.price.toFixed(2)}`}
                            {option.price === 0 && "Padrão"}
                            {option.price < 0 && `-€ ${Math.abs(option.price).toFixed(2)}`}
                          </span>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              )
            })}

            {/* Price Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Preço</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Preço base:</span>
                    <span>€ {item.basePrice.toFixed(2)}</span>
                  </div>

                  {selectedOptions.map((optionId) => {
                    const option = options.find((opt) => opt.id === optionId)
                    if (!option || option.price === 0) return null
                    return (
                      <div key={optionId} className="flex justify-between text-sm">
                        <span>{option.name}:</span>
                        <span>+€ {option.price.toFixed(2)}</span>
                      </div>
                    )
                  })}

                  {Object.values(radioSelections).map((optionId) => {
                    const option = options.find((opt) => opt.id === optionId)
                    if (!option || option.price === 0) return null
                    return (
                      <div key={optionId} className="flex justify-between text-sm">
                        <span>{option.name}:</span>
                        <span>
                          {option.price > 0
                            ? `+€ ${option.price.toFixed(2)}`
                            : `-€ ${Math.abs(option.price).toFixed(2)}`}
                        </span>
                      </div>
                    )
                  })}

                  <div className="border-t pt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-orange-600">€ {calculateTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add to Cart Button */}
            <Button className="w-full" size="lg" onClick={addToCart}>
              <Plus className="h-5 w-5 mr-2" />
              Adicionar ao Carrinho - € {calculateTotalPrice().toFixed(2)}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
