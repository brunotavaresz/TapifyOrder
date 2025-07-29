import { NextResponse } from 'next/server'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!

export async function GET(
  request: Request,
  { params }: { params: { categoria: string } }
) {
  try {
    const categoria = decodeURIComponent(params.categoria)
    
    console.log('Buscando produtos da categoria:', categoria)
    
    const response = await fetch(`${API_BASE_URL}/produtos/categoria/${encodeURIComponent(categoria)}`, {
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
    console.error('Erro ao buscar produtos por categoria:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar produtos por categoria' },
      { status: 500 }
    )
  }
}