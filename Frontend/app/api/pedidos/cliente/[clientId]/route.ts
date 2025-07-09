// app/api/pedidos/cliente/[clienteId]/route.ts
import { NextResponse } from 'next/server'

const API_BASE_URL = 'http://localhost:3001'

export async function GET(
  request: Request,
  { params }: { params: { clienteId: string } }
) {
  try {
    const response = await fetch(`${API_BASE_URL}/pedidos/cliente/${params.clienteId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Erro ao buscar pedidos do cliente:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar pedidos do cliente' },
      { status: 500 }
    )
  }
}