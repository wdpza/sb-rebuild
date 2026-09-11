This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Page schema (JSON-LD)

Paste a JSON-LD object into the CMS schema textarea exposed by GraphQL as
`shared.schema`. Use raw JSON without HTML `<script>` tags or Markdown fences:

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "About us",
  "url": "https://example.com/about"
}
```

Replace the example values with the page's details. An array of schema objects
or an object containing `@graph` is also supported.

The regular page (`/[slug]`, including `/home`), service (`/service/[slug]`),
article (`/article/[slug]`), and case study (`/case-study/[slug]`) templates
already pass this field to `src/components/shared/JsonLd.tsx`. It renders an
`application/ld+json` script in the server-rendered page HTML. Empty or malformed
JSON and values other than objects or non-empty arrays of objects are omitted.
This checks the JSON structure, not the validity of individual schema properties.

To verify a published change, view the page source and search for
`application/ld+json`. Routes that do not fetch `shared.schema`, such as article
listings and the standalone terms and WHOIS pages, do not use this field.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
