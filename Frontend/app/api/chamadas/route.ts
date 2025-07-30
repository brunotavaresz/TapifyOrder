// app/api/chamadas/route.ts
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar dados obrigatórios
    if (!body.mesa || !body.tipo) {
      return NextResponse.json({ error: "Mesa e tipo são obrigatórios" }, { status: 400 })
    }

    // Fazer requisição para o backend Express
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL! || "http://localhost:3001"
    const response = await fetch(`${backendUrl}/chamadas/chamar-empregado`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mesa: body.mesa,
        tipo: body.tipo,
        observacao: body.observacao || "",
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error("Erro do backend:", errorData)
      throw new Error(`Erro do backend: ${response.status}`)
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Erro ao chamar garçom:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
  
}

export async function GET(request: NextRequest) {
  try {
    // Fazer requisição para o backend Express
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL! || "http://localhost:3001"
    const response = await fetch(`${backendUrl}/chamadas`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error("Erro do backend:", errorData)
      throw new Error(`Erro do backend: ${response.status}`)
    }

    const chamadas = await response.json()
    return NextResponse.json(chamadas)
  } catch (error) {
    console.error("Erro ao buscar chamadas:", error)
    return NextResponse.json({ error: "Erro ao buscar chamadas" }, { status: 500 })
  }
}