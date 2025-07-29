// app/api/chamadas/[id]/resolvido/route.ts
import { type NextRequest, NextResponse } from "next/server"

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json({ error: "ID da chamada é obrigatório" }, { status: 400 })
    }

    // Fazer requisição para o backend Express
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL!
    const response = await fetch(`${backendUrl}/chamadas/${id}/resolvido`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: "Chamada não encontrada" }, { status: 404 })
      }
      const errorData = await response.text()
      console.error("Erro do backend:", errorData)
      throw new Error(`Erro do backend: ${response.status}`)
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Erro ao resolver chamada:", error)
    return NextResponse.json({ error: "Erro ao atualizar chamada" }, { status: 500 })
  }
}