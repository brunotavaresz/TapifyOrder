// app/api/carrinho/[clienteId]/route.ts
import { NextResponse } from 'next/server'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!


export async function GET(
  request: Request,
  { params }: { params: { clienteId: string } }
) {
  try {
    const response = await fetch(`${API_BASE_URL}/carrinho/${params.clienteId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        // Carrinho não encontrado, retornar carrinho vazio
        return NextResponse.json({
          clienteId: params.clienteId,
          itens: []
        })
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Erro ao buscar carrinho:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar carrinho' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { clienteId: string } }
) {
  try {
    const body = await request.json()
    
    const response = await fetch(`${API_BASE_URL}/carrinho/${params.clienteId}`, {
      method: 'PUT',
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
    console.error('Erro ao atualizar carrinho:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar carrinho' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { clienteId: string } }
) {
  try {
    const response = await fetch(`${API_BASE_URL}/carrinho/${params.clienteId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return NextResponse.json({ message: 'Carrinho limpo com sucesso' })
  } catch (error) {
    console.error('Erro ao limpar carrinho:', error)
    return NextResponse.json(
      { error: 'Erro ao limpar carrinho' },
      { status: 500 }
    )
  }
}