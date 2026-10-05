---
name: Core API Page
description: Wire a Next.js page to a Core Service REST endpoint using the shared apiClient, with form, list, pagination, and ApiError handling.
---

## Workflow

1. Add types + functions in `src/lib/api/<resource>.ts` using `apiClient` from `src/lib/api/client.ts`.
   Match backend DTO field names exactly (e.g. `TenantResponse`, `PageResponse`).
2. Build the page under `src/app/(app)/<resource>/page.tsx` as a `"use client"` component.
   Follow `src/app/(app)/users/page.tsx`: form state, `ApiError` status mapping
   (400 validation, 409 duplicate, 404 not found), list with Previous/Next pagination.
3. Add the link in `src/components/app-navigation.tsx`.
4. Add `src/lib/api/<resource>.test.ts`: stub `fetch` with `vi.stubGlobal`,
   assert URL + method + body, and `ApiError` status for 409/400.
5. Run `npx tsc --noEmit` and `npm run test` from `apps/web`.
