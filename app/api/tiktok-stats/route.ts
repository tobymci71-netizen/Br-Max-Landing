import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 })
  }

  const accessKey = process.env.SOCIAL_KIT_ACCESS_KEY

  if (!accessKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  try {
    const encodedUrl = encodeURIComponent(url)
    const apiUrl = `https://api.socialkit.dev/tiktok/stats?access_key=${accessKey}&url=${encodedUrl}`

    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching TikTok stats:', error)
    return NextResponse.json({ error: 'Failed to fetch TikTok stats' }, { status: 500 })
  }
}
