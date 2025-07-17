'use client'

import { useState, useEffect, useMemo } from 'react'
import { Clock, CheckCircle, AlertCircle, RefreshCw, Bell, Users, Timer, Calendar, Filter, Search, ChevronDown, ChevronUp, MoreHorizontal, Eye, X, Zap, ArrowUp, ArrowDown, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface Chamada {
  _id: string
  mesa: string
  status: 'ativo' | 'resolvido'
  data: string
  clienteId?: string
  __v?: number
}

type FilterType = 'todos' | 'ativo' | 'resolvido'
type SortType = 'recente' | 'antigo' | 'mesa' | 'prioridade'
type ViewType = 'mobile' | 'desktop'

export default function ChamadasDashboard() {
  const [chamadas, setChamadas] = useState<Chamada[]>([])
  const [loading, setLoading] = useState(true)
  const [resolvingIds, setResolvingIds] = useState<Set<string>>(new Set())
  const [filter, setFilter] = useState<FilterType>('ativo')
  const [sortBy, setSortBy] = useState<SortType>('prioridade')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewType, setViewType] = useState<ViewType>('mobile')
  const [showFilters, setShowFilters] = useState(false)
  const [dateRange, setDateRange] = useState<'hoje' | 'ontem' | 'semana' | 'todos'>('hoje')
  const [isMobile, setIsMobile] = useState(false)

  // Detectar se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      setViewType(window.innerWidth < 768 ? 'mobile' : 'desktop')
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const fetchChamadas = async () => {
    try {
      const response = await fetch('/api/chamadas')
      if (!response.ok) throw new Error('Erro ao buscar chamadas')
      const data = await response.json()
      setChamadas(data)
    } catch (error) {
      console.error('Erro ao buscar chamadas:', error)
    } finally {
      setLoading(false)
    }
  }

  const resolverChamada = async (id: string) => {
    setResolvingIds(prev => new Set(prev).add(id))
    try {
      const response = await fetch(`/api/chamadas/${id}/resolvido`, {
        method: 'PATCH',
      })
      if (!response.ok) throw new Error('Erro ao resolver chamada')
      
      setChamadas(prev => 
        prev.map(chamada => 
          chamada._id === id 
            ? { ...chamada, status: 'resolvido' as const }
            : chamada
        )
      )
    } catch (error) {
      console.error('Erro ao resolver chamada:', error)
    } finally {
      setResolvingIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }
  }

  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return data.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const calcularTempoDecorrido = (dataString: string) => {
    const agora = new Date()
    const dataChamada = new Date(dataString)
    const diferenca = agora.getTime() - dataChamada.getTime()
    const minutos = Math.floor(diferenca / (1000 * 60))
    
    if (minutos < 1) return 'Agora'
    if (minutos < 60) return `${minutos}min`
    const horas = Math.floor(minutos / 60)
    const minutosRestantes = minutos % 60
    if (minutosRestantes === 0) return `${horas}h`
    return `${horas}h ${minutosRestantes}min`
  }

  const getPriorityLevel = (dataString: string) => {
    const minutos = Math.floor((new Date().getTime() - new Date(dataString).getTime()) / (1000 * 60))
    if (minutos > 30) return 3 // Urgente
    if (minutos > 15) return 2 // Prioritário
    return 1 // Normal
  }

  const getPriorityColors = (dataString: string) => {
    const level = getPriorityLevel(dataString)
    switch (level) {
      case 3: return {
        bg: 'bg-red-500',
        text: 'text-white',
        border: 'border-red-500',
        glow: 'shadow-red-500/25'
      }
      case 2: return {
        bg: 'bg-orange-500', 
        text: 'text-white',
        border: 'border-orange-500',
        glow: 'shadow-orange-500/25'
      }
      default: return {
        bg: 'bg-blue-500',
        text: 'text-white', 
        border: 'border-blue-500',
        glow: 'shadow-blue-500/25'
      }
    }
  }

  const getPriorityText = (dataString: string) => {
    const level = getPriorityLevel(dataString)
    switch (level) {
      case 3: return 'URGENTE'
      case 2: return 'PRIORITÁRIO'
      default: return 'NORMAL'
    }
  }

  const isInDateRange = (dataString: string) => {
    const data = new Date(dataString)
    const hoje = new Date()
    const ontem = new Date(hoje.getTime() - 24 * 60 * 60 * 1000)
    const semanaAtras = new Date(hoje.getTime() - 7 * 24 * 60 * 60 * 1000)

    switch (dateRange) {
      case 'hoje':
        return data.toDateString() === hoje.toDateString()
      case 'ontem':
        return data.toDateString() === ontem.toDateString()
      case 'semana':
        return data >= semanaAtras
      default:
        return true
    }
  }

  const filteredAndSortedChamadas = useMemo(() => {
    let filtered = chamadas.filter(chamada => {
      const matchesFilter = filter === 'todos' || chamada.status === filter
      const matchesSearch = searchTerm === '' || 
        chamada.mesa.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesDate = isInDateRange(chamada.data)
      return matchesFilter && matchesSearch && matchesDate
    })

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'prioridade':
          if (a.status === 'ativo' && b.status === 'resolvido') return -1
          if (a.status === 'resolvido' && b.status === 'ativo') return 1
          if (a.status === 'ativo' && b.status === 'ativo') {
            return getPriorityLevel(b.data) - getPriorityLevel(a.data)
          }
          return new Date(b.data).getTime() - new Date(a.data).getTime()
        case 'recente':
          return new Date(b.data).getTime() - new Date(a.data).getTime()
        case 'antigo':
          return new Date(a.data).getTime() - new Date(b.data).getTime()
        case 'mesa':
          return parseInt(a.mesa) - parseInt(b.mesa)
        default:
          return 0
      }
    })
  }, [chamadas, filter, searchTerm, sortBy, dateRange])

  const chamadasAtivas = chamadas.filter(chamada => chamada.status === 'ativo')
  const chamadasUrgentes = chamadasAtivas.filter(chamada => getPriorityLevel(chamada.data) === 3)
  const chamadasPrioritarias = chamadasAtivas.filter(chamada => getPriorityLevel(chamada.data) === 2)

  useEffect(() => {
    fetchChamadas()
    const interval = setInterval(fetchChamadas, 5000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <RefreshCw className="w-12 h-12 text-blue-600 animate-spin" />
          <p className="text-xl text-gray-700">Carregando chamadas...</p>
        </div>
      </div>
    )
  }

  // Interface Mobile Otimizada
  if (isMobile || viewType === 'mobile') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header Mobile Fixo */}
        <div className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Link href="/admin" className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg text-blue-600 transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-800">Chamadas</h1>
                  <p className="text-xs text-gray-500">Atendimento</p>
                </div>
              </div>
              <button
                onClick={fetchChamadas}
                className="p-2 bg-blue-600 rounded-lg text-white"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>

            {/* Estatísticas Compactas */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="bg-red-50 p-2 rounded-lg text-center">
                <div className="text-lg font-bold text-red-600">{chamadasUrgentes.length}</div>
                <div className="text-xs text-red-500">Urgentes</div>
              </div>
              <div className="bg-orange-50 p-2 rounded-lg text-center">
                <div className="text-lg font-bold text-orange-600">{chamadasPrioritarias.length}</div>
                <div className="text-xs text-orange-500">Prioritárias</div>
              </div>
              <div className="bg-green-50 p-2 rounded-lg text-center">
                <div className="text-lg font-bold text-green-600">{chamadasAtivas.length}</div>
                <div className="text-xs text-green-500">Total Ativas</div>
              </div>
            </div>

            {/* Filtros Rápidos + Data Mobile */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
              <button
                onClick={() => setFilter('ativo')}
                className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                  filter === 'ativo' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Ativas
              </button>
              <button
                onClick={() => setFilter('resolvido')}
                className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                  filter === 'resolvido' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Resolvidas
              </button>
              <button
                onClick={() => setFilter('todos')}
                className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                  filter === 'todos' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Todas
              </button>
              <select
                value={dateRange}
                onChange={e => setDateRange(e.target.value as 'hoje' | 'ontem' | 'semana' | 'todos')}
                className={`ml-2 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors min-w-[110px] border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  'bg-gray-200 text-gray-700 hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white'
                }`}
              >
                <option value="hoje">Hoje</option>
                <option value="ontem">Ontem</option>
                <option value="semana">Última semana</option>
                <option value="todos">Todos os dias</option>
              </select>
            </div>
          </div>
        </div>

        {/* Conteúdo Mobile */}
        <div className="px-4 py-4 space-y-3">
          {filteredAndSortedChamadas.length === 0 ? (
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-600 font-medium">Nenhuma chamada encontrada</p>
              <p className="text-gray-400 text-sm mt-1">Tudo limpo por aqui! 🎉</p>
            </div>
          ) : (
            filteredAndSortedChamadas.map((chamada) => {
              const colors = getPriorityColors(chamada.data)
              const isUrgent = getPriorityLevel(chamada.data) === 3
              const isResolving = resolvingIds.has(chamada._id)
              
              return (
                <div
                  key={chamada._id}
                  className={`bg-white rounded-xl p-4 shadow-lg border-l-4 transition-all duration-200 ${
                    chamada.status === 'ativo' 
                      ? `${colors.border} ${colors.glow} shadow-lg` 
                      : 'border-gray-300 opacity-60'
                  } ${isUrgent ? 'animate-pulse' : ''}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${colors.bg} ${colors.text}`}>
                        {chamada.mesa}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold text-gray-800 text-lg">
                            Mesa {chamada.mesa}
                          </h3>
                          {isUrgent && (
                            <Zap className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          {formatarData(chamada.data)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      {chamada.status === 'ativo' && (
                        <div className={`px-2 py-1 rounded-full text-xs font-bold ${colors.bg} ${colors.text} mb-1`}>
                          {getPriorityText(chamada.data)}
                        </div>
                      )}
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        {calcularTempoDecorrido(chamada.data)}
                      </div>
                    </div>
                  </div>
                  
                  {chamada.status === 'ativo' && (
                    <button
                      onClick={() => resolverChamada(chamada._id)}
                      disabled={isResolving}
                      className={`w-full py-3 rounded-xl font-bold text-white transition-all duration-200 flex items-center justify-center space-x-2 ${
                        isResolving 
                          ? 'bg-gray-400' 
                          : 'bg-green-600 hover:bg-green-700 active:bg-green-800 shadow-lg'
                      }`}
                    >
                      {isResolving ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          <span>Resolvendo...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          <span>RESOLVER CHAMADA</span>
                        </>
                      )}
                    </button>
                  )}
                  
                  {chamada.status === 'resolvido' && (
                    <div className="flex items-center justify-center py-2 text-green-600">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span className="font-medium">Resolvida</span>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    )
  }

  // Interface Desktop
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header Desktop */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg text-blue-600 transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Painel de Chamadas</h1>
                  <p className="text-sm text-gray-600">Atendimento em tempo real</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-red-100 px-3 py-2 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span className="text-red-800 font-semibold text-sm">
                    {chamadasUrgentes.length} Urgentes
                  </span>
                </div>
                <div className="flex items-center space-x-2 bg-orange-100 px-3 py-2 rounded-lg">
                  <Timer className="w-4 h-4 text-orange-600" />
                  <span className="text-orange-800 font-semibold text-sm">
                    {chamadasPrioritarias.length} Prioritárias
                  </span>
                </div>
                <div className="flex items-center space-x-2 bg-green-100 px-3 py-2 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-green-800 font-semibold text-sm">
                    {chamadasAtivas.length} Ativas
                  </span>
                </div>
              </div>
              <button
                onClick={fetchChamadas}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 shadow-md"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Atualizar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Barra de filtros Desktop */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6 border border-blue-100">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Buscar mesa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as FilterType)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ativo">Ativas</option>
              <option value="resolvido">Resolvidas</option>
              <option value="todos">Todas</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortType)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="prioridade">Por Prioridade</option>
              <option value="recente">Mais Recentes</option>
              <option value="antigo">Mais Antigas</option>
              <option value="mesa">Por Mesa</option>
            </select>

            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as 'hoje' | 'ontem' | 'semana' | 'todos')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="hoje">Hoje</option>
              <option value="ontem">Ontem</option>
              <option value="semana">Última semana</option>
              <option value="todos">Todos os dias</option>
            </select>
          </div>
        </div>

        {/* Tabela Desktop */}
        {filteredAndSortedChamadas.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-blue-100">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-lg text-gray-600">Nenhuma chamada encontrada</p>
            <p className="text-gray-500 mt-2">Tente ajustar os filtros</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mesa</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prioridade</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data/Hora</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tempo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAndSortedChamadas.map((chamada) => {
                    const colors = getPriorityColors(chamada.data)
                    const isUrgent = getPriorityLevel(chamada.data) === 3
                    
                    return (
                      <tr key={chamada._id} className={`hover:bg-gray-50 transition-colors ${isUrgent ? 'bg-red-50' : ''}`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${colors.bg} ${colors.text}`}>
                              {chamada.mesa}
                            </div>
                            <div className="ml-3">
                              <div className="flex items-center space-x-2">
                                <div className="text-sm font-medium text-gray-900">Mesa {chamada.mesa}</div>
                                {isUrgent && <Zap className="w-4 h-4 text-red-500" />}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            chamada.status === 'ativo' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {chamada.status === 'ativo' ? 'ATIVA' : 'RESOLVIDA'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {chamada.status === 'ativo' && (
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${colors.bg} ${colors.text}`}>
                              {getPriorityText(chamada.data)}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatarData(chamada.data)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1 text-gray-400" />
                            {calcularTempoDecorrido(chamada.data)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {chamada.status === 'ativo' && (
                            <button
                              onClick={() => resolverChamada(chamada._id)}
                              disabled={resolvingIds.has(chamada._id)}
                              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                            >
                              {resolvingIds.has(chamada._id) ? (
                                <RefreshCw className="w-4 h-4 animate-spin" />
                              ) : (
                                <CheckCircle className="w-4 h-4" />
                              )}
                              <span>
                                {resolvingIds.has(chamada._id) ? 'Resolvendo...' : 'Resolver'}
                              </span>
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}