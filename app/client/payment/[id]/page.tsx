"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { LanguageSelector } from "@/components/LanguageSelector"
import { useLanguage } from "@/contexts/LanguageContext"
import { ChefHat, ArrowLeft, CreditCard, Smartphone, DollarSign, Shield } from "lucide-react"
import { Check } from "lucide-react" // Import the Check component

export default function PaymentPage({ params }: { params: { id: string } }) {
  const { t } = useLanguage()
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const orderId = params.id
  const orderTotal = 90.3 // Mock data - would come from API

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsProcessing(false)
    setIsCompleted(true)
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center border-green-200">
          <CardContent className="p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.paymentCompleted}</h2>
            <p className="text-gray-600 mb-6">{t.paymentCompletedDesc.replace("€", "€ " + orderTotal.toFixed(2))}</p>
            <div className="space-y-3">
              <Link href="/client/orders">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  {t.viewMyOrders}
                </Button>
              </Link>
              <Link href="/client/menu">
                <Button
                  variant="outline"
                  className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
                >
                  {t.makeNewOrder}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-blue-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/client/orders">
                <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {t.backToOrders}
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
                  <ChefHat className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {t.finalizePayment}
                </span>
              </div>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{t.finalizePayment}</h1>
            <p className="text-gray-600">Pedido #{orderId}</p>
          </div>

          <div className="grid gap-8">
            {/* Order Summary */}
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
                  {t.orderSummary}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>2x Pizza Margherita Artesanal</span>
                    <span>€ 65,80</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1x Salada Caesar Premium</span>
                    <span>€ 24,50</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>{t.total}:</span>
                      <span className="text-blue-600">€ {orderTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                  {t.paymentMethod}
                </CardTitle>
                <CardDescription>{t.choosePayment}</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <Label htmlFor="credit-card" className="flex items-center cursor-pointer flex-1">
                        <CreditCard className="h-5 w-5 mr-3 text-blue-600" />
                        <div>
                          <div className="font-medium">{t.creditCard}</div>
                          <div className="text-sm text-gray-500">{t.creditCardDesc}</div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                      <RadioGroupItem value="debit-card" id="debit-card" />
                      <Label htmlFor="debit-card" className="flex items-center cursor-pointer flex-1">
                        <CreditCard className="h-5 w-5 mr-3 text-green-600" />
                        <div>
                          <div className="font-medium">{t.debitCard}</div>
                          <div className="text-sm text-gray-500">{t.debitCardDesc}</div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                      <RadioGroupItem value="mbway" id="mbway" />
                      <Label htmlFor="mbway" className="flex items-center cursor-pointer flex-1">
                        <Smartphone className="h-5 w-5 mr-3 text-purple-600" />
                        <div>
                          <div className="font-medium">{t.mbway}</div>
                          <div className="text-sm text-gray-500">{t.mbwayDesc}</div>
                        </div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Form */}
            {(paymentMethod === "credit-card" || paymentMethod === "debit-card") && (
              <Card className="border-blue-100">
                <CardHeader>
                  <CardTitle>{t.cardData}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="card-number">{t.cardNumber}</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">{t.validity}</Label>
                      <Input id="expiry" placeholder="MM/AA" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">{t.cvv}</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="name">{t.nameOnCard}</Label>
                    <Input id="name" placeholder="Nome como está no cartão" />
                  </div>
                </CardContent>
              </Card>
            )}

            {paymentMethod === "mbway" && (
              <Card className="border-blue-100">
                <CardHeader>
                  <CardTitle>{t.mbwayPayment}</CardTitle>
                  <CardDescription>{t.mbwayDescription}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="phone">{t.enterPhoneNumber}</Label>
                    <Input id="phone" placeholder="+351 912 345 678" />
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    {t.copyMBWayCode}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Security Info */}
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm text-green-800">{t.securityInfo}</span>
                </div>
              </CardContent>
            </Card>

            {/* Pay Button */}
            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg py-4"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>A processar...
                </div>
              ) : (
                <>
                  <CreditCard className="h-5 w-5 mr-2" />
                  Pagar € {orderTotal.toFixed(2)}
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
