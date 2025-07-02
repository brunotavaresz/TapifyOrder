"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LanguageSelector } from "@/components/LanguageSelector"
import { useLanguage } from "@/contexts/LanguageContext"
import {
  Smartphone,
  CreditCard,
  QrCode,
  ChefHat,
  Star,
  Zap,
  TrendingUp,
  Target,
  Award,
  CheckCircle,
  ArrowRight,
  PlayCircle,
  BarChart3,
  Wifi,
} from "lucide-react"

export default function LandingPage() {
  const { t, formatPrice } = useLanguage()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="relative z-50 bg-white/95 backdrop-blur-sm border-b border-blue-100 sticky top-0">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <ChefHat className="h-7 w-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {t.landingTitle}
                </span>
                <div className="text-xs text-gray-500 font-medium">{t.landingSubtitle}</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <Link href="/client/menu">
                <Button variant="ghost" className="text-blue-600 hover:bg-blue-50">
                  {t.demoClient}
                </Button>
              </Link>
              <Link href="/admin">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
                  {t.adminArea}
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
              <div className="space-y-4 lg:space-y-6">
                <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 text-sm font-medium">
                  {t.digitalRevolutionBadge}
                </Badge>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-gray-900">{t.transformYourRestaurant}</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    restaurante
                  </span>
                  <br />
                  <span className="text-gray-900">{t.intoDigital}</span>
                </h1>

                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  {t.landingDescription}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/client/menu">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <PlayCircle className="mr-2 lg:mr-3 h-5 lg:h-6 w-5 lg:w-6" />
                    {t.seeInteractiveDemo}
                  </Button>
                </Link>
                <Link href="/admin">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-2 border-blue-300 text-blue-600 hover:bg-blue-50 text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300 bg-transparent"
                  >
                    {t.adminPanel}
                    <ArrowRight className="ml-2 lg:ml-3 h-4 lg:h-5 w-4 lg:w-5" />
                  </Button>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex items-center justify-center lg:justify-start space-x-6 lg:space-x-8 pt-6 lg:pt-8">
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-blue-600">500+</div>
                  <div className="text-xs lg:text-sm text-gray-500">{t.restaurants}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-indigo-600">98%</div>
                  <div className="text-xs lg:text-sm text-gray-500">{t.satisfaction}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-purple-600">45%</div>
                  <div className="text-xs lg:text-sm text-gray-500">{t.sales}</div>
                </div>
              </div>
            </div>

            {/* Right Content - Interactive Demo - Hidden on mobile, shown after buttons */}
            <div className="hidden lg:block relative">
              <div className="relative z-10 bg-white rounded-2xl lg:rounded-3xl shadow-2xl p-4 lg:p-8 transform rotate-1 lg:rotate-3 hover:rotate-0 transition-transform duration-500 mx-4 lg:mx-0">
                <div className="space-y-4 lg:space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 lg:space-x-3">
                      <div className="w-8 lg:w-10 h-8 lg:h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg lg:rounded-xl flex items-center justify-center">
                        <Smartphone className="h-4 lg:h-6 w-4 lg:w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm lg:text-base font-semibold text-gray-800">{t.tableDemo} 12</div>
                        <div className="text-xs lg:text-sm text-gray-500">{t.restaurantDemo}</div>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700 text-xs lg:text-sm">{t.online}</Badge>
                  </div>

                  <div className="space-y-3 lg:space-y-4">
                    <div className="flex items-center justify-between p-3 lg:p-4 bg-blue-50 rounded-lg lg:rounded-xl">
                      <div className="flex items-center space-x-2 lg:space-x-3">
                        <div className="text-xl lg:text-2xl">🍕</div>
                        <div>
                          <div className="text-sm lg:text-base font-medium">Pizza Margherita</div>
                          <div className="text-xs lg:text-sm text-gray-500">{t.customizable}</div>
                        </div>
                      </div>
                      <div className="text-base lg:text-lg font-bold text-blue-600">{formatPrice(32.9)}</div>
                    </div>

                    <div className="flex items-center justify-between p-3 lg:p-4 bg-indigo-50 rounded-lg lg:rounded-xl">
                      <div className="flex items-center space-x-2 lg:space-x-3">
                        <div className="text-xl lg:text-2xl">🥗</div>
                        <div>
                          <div className="text-sm lg:text-base font-medium">Salada Caesar</div>
                          <div className="text-xs lg:text-sm text-gray-500">{t.extraChicken}</div>
                        </div>
                      </div>
                      <div className="text-base lg:text-lg font-bold text-indigo-600">{formatPrice(24.5)}</div>
                    </div>
                  </div>

                  <div className="border-t pt-3 lg:pt-4">
                    <div className="flex justify-between items-center mb-3 lg:mb-4">
                      <span className="text-base lg:text-lg font-semibold">{t.total}:</span>
                      <span className="text-xl lg:text-2xl font-bold text-blue-600">{formatPrice(57.4)}</span>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-sm lg:text-base py-2 lg:py-3">
                      <CreditCard className="mr-2 h-4 lg:h-5 w-4 lg:w-5" />
                      {t.finalizeOrder}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Floating elements - hidden on mobile */}
              <div className="hidden lg:block absolute -top-4 -left-4 w-20 h-20 bg-yellow-200 rounded-full flex items-center justify-center animate-bounce">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="hidden lg:block absolute -bottom-4 -right-4 w-16 h-16 bg-green-200 rounded-full flex items-center justify-center animate-pulse">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Mobile Demo Card - Shown only on mobile, positioned after buttons */}
          <div className="lg:hidden mt-12">
            <div className="bg-white rounded-2xl shadow-2xl p-6 mx-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                      <Smartphone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{t.table} 12</div>
                      <div className="text-sm text-gray-500">Restaurante Demo</div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Online</Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">🍕</div>
                      <div>
                        <div className="font-medium">Pizza Margherita</div>
                        <div className="text-sm text-gray-500">{t.customizable}</div>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-blue-600">{formatPrice(32.9)}</div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">🥗</div>
                      <div>
                        <div className="font-medium">Salada Caesar</div>
                        <div className="text-sm text-gray-500">Extra frango</div>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-indigo-600">{formatPrice(24.5)}</div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">{t.total}:</span>
                    <span className="text-2xl font-bold text-blue-600">{formatPrice(57.4)}</span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 py-3">
                    <CreditCard className="mr-2 h-5 w-5" />
                    {t.finalizeOrder}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-700 px-4 py-2 mb-6">{t.whyChoose}</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{t.provenResults}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.provenDescription}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <Card className="border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-800">{t.salesIncrease}</CardTitle>
                <CardDescription className="text-gray-600">{t.salesIncreaseDesc}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-800">{t.costReduction}</CardTitle>
                <CardDescription className="text-gray-600">{t.costReductionDesc}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-800">{t.satisfactionRate}</CardTitle>
                <CardDescription className="text-gray-600">{t.satisfactionRateDesc}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{t.everythingYourRestaurantNeeds}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.completeDescription}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
              <div className="flex items-start space-x-3 lg:space-x-4">
                <div className="w-10 lg:w-12 h-10 lg:h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0">
                  <QrCode className="h-5 lg:h-6 w-5 lg:w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-semibold text-gray-800 mb-2">{t.frictionlessAccess}</h3>
                  <p className="text-sm lg:text-base text-gray-600">{t.frictionlessDesc}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 lg:space-x-4">
                <div className="w-10 lg:w-12 h-10 lg:h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="h-5 lg:h-6 w-5 lg:w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-semibold text-gray-800 mb-2">{t.smartOrders}</h3>
                  <p className="text-sm lg:text-base text-gray-600">{t.smartOrdersDesc}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 lg:space-x-4">
                <div className="w-10 lg:w-12 h-10 lg:h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="h-5 lg:h-6 w-5 lg:w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-semibold text-gray-800 mb-2">{t.advancedAnalytics}</h3>
                  <p className="text-sm lg:text-base text-gray-600">{t.advancedAnalyticsDesc}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 lg:space-x-4">
                <div className="w-10 lg:w-12 h-10 lg:h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0">
                  <Wifi className="h-5 lg:h-6 w-5 lg:w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-semibold text-gray-800 mb-2">{t.worksOffline}</h3>
                  <p className="text-sm lg:text-base text-gray-600">{t.worksOfflineDesc}</p>
                </div>
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="bg-white rounded-2xl lg:rounded-3xl shadow-2xl p-4 lg:p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-800">{t.adminPanel}</h3>
                    <Badge className="bg-green-100 text-green-700">Tempo Real</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600">127</div>
                      <div className="text-sm text-gray-600">{t.ordersToday}</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-green-600">{formatPrice(3200)}</div>
                      <div className="text-sm text-gray-600">{t.revenue}</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="font-medium">
                          {t.table} 8 - {t.preparing}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">5 min</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span className="font-medium">
                          {t.table} 12 - {t.ready}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{t.now}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{t.whatClientsSay}</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <Card className="border-blue-100">
              <CardHeader>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                    M
                  </div>
                  <div>
                    <div className="font-semibold">{t.testimonialMaria}</div>
                    <div className="text-sm text-gray-500">{t.testimonialMariaRole}</div>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <CardDescription className="text-gray-600">{t.testimonialMariaText}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-blue-100">
              <CardHeader>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                    J
                  </div>
                  <div>
                    <div className="font-semibold">{t.testimonialJoao}</div>
                    <div className="text-sm text-gray-500">{t.testimonialJoaoRole}</div>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <CardDescription className="text-gray-600">{t.testimonialJoaoText}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-blue-100">
              <CardHeader>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div>
                    <div className="font-semibold">{t.testimonialAna}</div>
                    <div className="text-sm text-gray-500">{t.testimonialAnaRole}</div>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <CardDescription className="text-gray-600">{t.testimonialAnaText}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">{t.readyToRevolutionize}</h2>
            <p className="text-lg lg:text-xl mb-6 lg:mb-8 opacity-90 max-w-2xl mx-auto">{t.revolutionizeDesc}</p>

            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center mb-8 lg:mb-12">
              <Link href="/client/menu">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100 text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <PlayCircle className="mr-2 lg:mr-3 h-5 lg:h-6 w-5 lg:w-6" />
                  {t.testFreeDemo}
                </Button>
              </Link>
              <Link href="/admin">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-blue-600 text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4 rounded-xl transform hover:scale-105 transition-all duration-300 bg-transparent"
                >
                  {t.seeAdminPanel}
                  <ArrowRight className="ml-2 lg:ml-3 h-4 lg:h-5 w-4 lg:w-5" />
                </Button>
              </Link>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 lg:gap-8 text-center">
              <div>
                <div className="text-xl lg:text-3xl font-bold mb-2">{t.quickSetup}</div>
                <div className="text-sm lg:text-base opacity-80">{t.quickImplementation}</div>
              </div>
              <div>
                <div className="text-xl lg:text-3xl font-bold mb-2">{t.support247}</div>
                <div className="text-sm lg:text-base opacity-80">{t.alwaysAvailable}</div>
              </div>
              <div>
                <div className="text-xl lg:text-3xl font-bold mb-2">{t.guaranteedROI}</div>
                <div className="text-sm lg:text-base opacity-80">{t.returnIn60Days}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <ChefHat className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">{t.landingTitle}</span>
              </div>
              <p className="text-gray-400">{t.transformingRestaurants}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t.product}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t.features}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t.pricing}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t.demo}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t.company}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t.about}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t.blog}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t.careers}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t.support}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t.helpCenter}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t.contact}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t.whatsapp}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>{t.footerCopyright}</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
