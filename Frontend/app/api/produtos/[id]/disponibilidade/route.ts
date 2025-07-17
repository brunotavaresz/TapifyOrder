// app/api/produtos/[id]/disponibilidade/route.ts
import { NextResponse } from 'next/server'

const API_BASE_URL = 'http://localhost:3001'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(`${API_BASE_URL}/produtos/${params.id}/disponibilidade`, {
      method: 'PATCH',
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
    console.error('Erro ao alterar disponibilidade:', error)
    return NextResponse.json(
      { error: 'Erro ao alterar disponibilidade do produto' },
      { status: 500 }
    )
  }
}