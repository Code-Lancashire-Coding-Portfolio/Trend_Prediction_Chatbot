// src/app/api/chat/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Forward to Python backend (which handles both LLM and ONS data)
    const response = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error processing chat request:', error);
    return NextResponse.json({ 
      message: 'Sorry, our chatbot service is currently unavailable.',
      chartData: null
    }, { status: 200 });
  }
}