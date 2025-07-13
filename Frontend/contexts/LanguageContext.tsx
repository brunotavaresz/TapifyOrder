"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { type Language, getDictionary, type Translations, currencies, type Currency } from "@/lib/i18n"
import { Loader2 } from "lucide-react" // Import Loader2

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
  currency: Currency
  formatPrice: (price: number) => string
  loadingLanguage: boolean // Add loadingLanguage to context type
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt")
  const [t, setT] = useState<Translations>({} as Translations) // Initialize with an empty object cast to Translations
  const [currency, setCurrency] = useState<Currency>(currencies["pt"]) // Default currency
  const [loadingLanguage, setLoadingLanguage] = useState(true) // Initial loading state
  const [isInitialLoad, setIsInitialLoad] = useState(true) // To differentiate initial load from subsequent changes

  const loadTranslations = useCallback(
    async (lang: Language) => {
      setLoadingLanguage(true) // Start loading
      try {
        const dictionary = await getDictionary(lang)
        setT(dictionary)
        setCurrency(currencies[lang])
        setLanguageState(lang)
        localStorage.setItem("tapify-language", lang)
      } catch (error) {
        console.error("Failed to load translations:", error)
        // Fallback to a default language if loading fails
        const defaultLang: Language = "en"
        const defaultDictionary = await getDictionary(defaultLang)
        setT(defaultDictionary)
        setCurrency(currencies[defaultLang])
        setLanguageState(defaultLang)
        localStorage.setItem("tapify-language", defaultLang)
      } finally {
        // Simulate a small delay for language change effect if not initial load
        if (!isInitialLoad) {
          setTimeout(() => {
            setLoadingLanguage(false) // End loading
          }, 300) // Adjust delay as needed
        } else {
          setLoadingLanguage(false) // End loading immediately for initial load
        }
        setIsInitialLoad(false) // Mark initial load as complete
      }
    },
    [isInitialLoad],
  ) // Dependency on isInitialLoad

  useEffect(() => {
    const savedLanguage = localStorage.getItem("tapify-language") as Language
    if (savedLanguage && ["pt", "en", "fr", "es", "de"].includes(savedLanguage)) {
      loadTranslations(savedLanguage)
    } else {
      // Detect browser language if no saved language
      const browserLanguage = navigator.language.split("-")[0] as Language
      if (["pt", "en", "fr", "es", "de"].includes(browserLanguage)) {
        loadTranslations(browserLanguage)
      } else {
        loadTranslations("pt") // Default to Portuguese if browser language not supported
      }
    }
  }, [loadTranslations]) // Dependency on loadTranslations

  const setLanguage = (lang: Language) => {
    if (lang !== language) {
      loadTranslations(lang)
    }
  }

  const formatPrice = (price: number) => {
    return `${currency.symbol} ${price.toFixed(2)}`
  }

  // Render loading spinner if language is still loading
  if (loadingLanguage && isInitialLoad) {
    // Only show initial loading screen
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-blue-600">{t.loading || "A carregar..."}</span>
      </div>
    )
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, currency, formatPrice, loadingLanguage }}>
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
