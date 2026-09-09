import { siteConfig } from '@/config/site'

interface SEOProps {
  title: string
  description: string
  path?: string
}

export function SEO({ title, description, path = '/' }: SEOProps) {
  const fullTitle = title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:image" content="/logo.png" />
      <link rel="canonical" href={path} />
    </>
  )
}
