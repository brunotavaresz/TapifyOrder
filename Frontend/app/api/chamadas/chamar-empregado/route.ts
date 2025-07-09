// app/api/chamadas/chamar-empregado/route.ts
import { NextResponse } from 'next/server'

const API_BASE_URL = 'http://localhost:3001'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const response = await fetch(`${API_BASE_URL}/chamadas/chamar-empregado`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Erro ao chamar empregado:', error)
    return NextResponse.json(
      { error: 'Erro ao chamar empregado' },
      { status: 500 }
    )
  }
}