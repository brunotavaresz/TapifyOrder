"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { type Language, translations, type Translations, currencies, type Currency } from "@/lib/i18n"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
  currency: Currency
  formatPrice: (price: number) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt")
  const [t, setT] = useState<Translations>(translations["pt"])
  const [currency, setCurrency] = useState<Currency>(currencies["pt"])

  useEffect(() => {
    // Load language from localStorage on mount
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("tapify-language") as Language
      if (savedLanguage && ["pt", "en", "fr", "es", "de"].includes(savedLanguage)) {
        setLanguageState(savedLanguage)
        setT(translations[savedLanguage])
        setCurrency(currencies[savedLanguage])
      }
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    setT(translations[lang])
    setCurrency(currencies[lang])
    if (typeof window !== "undefined") {
      localStorage.setItem("tapify-language", lang)
      // Refresh da página para recarregar os produtos com a nova linguagem
      window.location.reload()
    }
  }

  const formatPrice = (price: number) => {
    return `${currency.symbol} ${price.toFixed(2)}`
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, currency, formatPrice }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
