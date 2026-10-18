import { NextResponse } from 'next/server';

export const maxDuration = 10; 

export async function POST(req) {
  try {
    const { url } = await req.json();

    if (!url || !url.startsWith('http')) {
      return NextResponse.json({ error: 'URL tidak valid. Harus diawali http:// atau https://' }, { status: 400 });
    }

    // Fetch dari server Vercel
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      timeout: 8000,
    });

    if (!response.ok) {
      throw new Error(`Gagal mengambil data. HTTP Status: ${response.status}`);
    }

    const html = await response.text();

    // Ekstrak CSS & JS
    const cssMatches = html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
    const cssLinks = html.match(/<link[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/gi) || [];
    const jsMatches = html.match(/<script[^>]*>([\s\S]*?)<\/script>/gi) || [];
    const jsLinks = html.match(/<script[^>]*src=["']([^"']+)["'][^>]*>/gi) || [];

    return NextResponse.json({
      html,
      css: cssMatches,
      cssUrls: cssLinks,
      js: jsMatches,
      jsUrls: jsLinks,
    });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  }
