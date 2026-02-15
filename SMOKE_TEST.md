# Smoke Test Checklist

## Commands

```bash
npm i
npm run dev
```

## Test URLs

- `http://localhost:3000/`
- `http://localhost:3000/kitchen-remodeling/`
- `http://localhost:3000/kitchen-remodeling/greenwich-ct/`

## Verify

- Title and meta description are present for each valid page.
- CMS sections render according to `section.type`.
- Unknown section types are ignored without breaking the page.
- Breadcrumbs render correctly for nested routes.
- If API responds `404`, frontend route returns Next.js `notFound()` page.
