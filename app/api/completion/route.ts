import { StreamingTextResponse, CohereStream } from 'ai';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json()


  const body = JSON.stringify({
    prompt,
    model: 'command-nightly',
    max_tokens: 300,
    stop_sequences: [],
    temperature: 0.9,
    return_likelihoods: 'NONE',
    stream: true,
  })

  const response = await fetch('https://api.cohere.ai/v1/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
    },
    body: body,
  });

  if (!response.ok) {
    return new NextResponse(JSON.stringify(await response.text()), { status: response.status })
  }

  const stream = CohereStream(response)

  return new StreamingTextResponse(stream)
}