# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/users.spec.ts >> Users API >> 17. User CRUD - Create @api @users @crud
- Location: tests/api/users.spec.ts:72:9

# Error details

```
Error: expect(received).toHaveProperty(path)

Expected path: "username"
Received path: []

Received value: {"id": 1}
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import { Routes } from "../../api/endpoints/routes";
  3  | import { RandomDataUtil } from "../../utils/dataGenerator";
  4  | 
  5  | function buildUrl(template: string, params?: Record<string, string | number>): string {
  6  |     let url = `${Routes.BASE_URL}${template}`;
  7  |     if (params) {
  8  |         for (const [key, value] of Object.entries(params)) {
  9  |             url = url.replace(`{${key}}`, String(value));
  10 |         }
  11 |     }
  12 |     return url;
  13 | }
  14 | 
  15 | test.describe("Users API", () => {
  16 |     const sampleUserId = 1;
  17 |     const userLimit = 2;
  18 | 
  19 |     test("13. Get All Users @api @users", async ({ request }) => {
  20 |         const url = buildUrl(Routes.GET_ALL_USERS);
  21 |         const resp = await request.get(url);
  22 |         expect(resp.status()).toBe(200);
  23 |         const body = await resp.json();
  24 |         expect(Array.isArray(body)).toBe(true);
  25 |         expect(body.length).toBeGreaterThan(0);
  26 |     });
  27 | 
  28 |     test("14. Get User by ID @api @users", async ({ request }) => {
  29 |         const url = buildUrl(Routes.GET_USER_BY_ID, { id: sampleUserId });
  30 |         const resp = await request.get(url);
  31 |         expect(resp.status()).toBe(200);
  32 |         const body = await resp.json();
  33 |         expect(body.id).toBe(sampleUserId);
  34 |         expect(body).toHaveProperty("email");
  35 |         expect(body).toHaveProperty("username");
  36 |         expect(body).toHaveProperty("name");
  37 |         expect(body).toHaveProperty("address");
  38 |         expect(body).toHaveProperty("phone");
  39 |     });
  40 | 
  41 |     test("15. Get Users with Limit @api @users", async ({ request }) => {
  42 |         const url = buildUrl(Routes.GET_USERS_WITH_LIMIT, { limit: userLimit });
  43 |         const resp = await request.get(url);
  44 |         expect(resp.status()).toBe(200);
  45 |         const body = await resp.json();
  46 |         expect(Array.isArray(body)).toBe(true);
  47 |         expect(body.length).toBe(userLimit);
  48 |     });
  49 | 
  50 |     test("16. Sort Users @api @users", async ({ request }) => {
  51 |         const ascUrl = buildUrl(Routes.GET_USERS_SORTED, { order: "asc" });
  52 |         const ascResp = await request.get(ascUrl);
  53 |         expect(ascResp.status()).toBe(200);
  54 |         const ascBody = await ascResp.json();
  55 |         expect(Array.isArray(ascBody)).toBe(true);
  56 |         const ascIds = ascBody.map((u: { id: number }) => u.id);
  57 |         for (let i = 1; i < ascIds.length; i++) {
  58 |             expect(ascIds[i]).toBeGreaterThanOrEqual(ascIds[i - 1]);
  59 |         }
  60 | 
  61 |         const descUrl = buildUrl(Routes.GET_USERS_SORTED, { order: "desc" });
  62 |         const descResp = await request.get(descUrl);
  63 |         expect(descResp.status()).toBe(200);
  64 |         const descBody = await descResp.json();
  65 |         expect(Array.isArray(descBody)).toBe(true);
  66 |         const descIds = descBody.map((u: { id: number }) => u.id);
  67 |         for (let i = 1; i < descIds.length; i++) {
  68 |             expect(descIds[i]).toBeLessThanOrEqual(descIds[i - 1]);
  69 |         }
  70 |     });
  71 | 
  72 |     test("17. User CRUD - Create @api @users @crud", async ({ request }) => {
  73 |         const userData = RandomDataUtil.generateUserPayload();
  74 |         const url = buildUrl(Routes.CREATE_USER);
  75 |         const resp = await request.post(url, { data: userData });
  76 |         expect(resp.status()).toBe(201);
  77 |         const body = await resp.json();
  78 |         expect(body).toHaveProperty("id");
  79 |         expect(typeof body.id).toBe("number");
  80 |         // FakeStoreAPI only echoes back id and username, not email
> 81 |         expect(body).toHaveProperty("username");
     |                      ^ Error: expect(received).toHaveProperty(path)
  82 |     });
  83 | 
  84 |     test("18. User CRUD - Update @api @users @crud", async ({ request }) => {
  85 |         const updateData = RandomDataUtil.generateUserUpdatePayload();
  86 |         const url = buildUrl(Routes.UPDATE_USER, { id: sampleUserId });
  87 |         const resp = await request.put(url, { data: updateData });
  88 |         expect(resp.status()).toBe(200);
  89 |     });
  90 | 
  91 |     test("19. User CRUD - Delete @api @users @crud", async ({ request }) => {
  92 |         const url = buildUrl(Routes.DELETE_USER, { id: sampleUserId });
  93 |         const resp = await request.delete(url);
  94 |         expect(resp.status()).toBe(200);
  95 |     });
  96 | });
  97 | 
```