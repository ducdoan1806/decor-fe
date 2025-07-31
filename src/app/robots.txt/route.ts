import { NextResponse } from 'next/server'
export const revalidate = 86400 
export async function GET() {
  const host = process.env.NEXT_PUBLIC_SITE_URL || 'https://ankidecor.com.vn'
  const isProd = process.env.NODE_ENV === 'production'
  const rules = isProd
    ? `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /cart/\nDisallow: /checkout/\nDisallow: /account/\nDisallow: /search/\nDisallow: /*?*\nSitemap: ${host}/sitemap.xml`
    : `User-agent: *\nDisallow: /`

  return new NextResponse(rules, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=86400',
    },
  })
}