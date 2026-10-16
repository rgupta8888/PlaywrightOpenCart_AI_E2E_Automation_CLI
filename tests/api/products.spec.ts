import { test, expect } from "@playwright/test";
import { Routes } from "../../api/endpoints/routes";
import { RandomDataUtil } from "../../utils/dataGenerator";
import { expectStatus } from "../../utils/apiHelpers";

function buildUrl(template: string, params?: Record<string, string | number>): string {
    let url = `${Routes.BASE_URL}${template}`;
    if (params) {
        for (const [key, value] of Object.entries(params)) {
            url = url.replace(`{${key}}`, String(value));
        }
    }
    return url;
}

test.describe("Products API", () => {
    const sampleProductId = 1;
    const productLimit = 3;

    test("3. Get All Products @api @products", async ({ request }) => {
        const url = buildUrl(Routes.GET_ALL_PRODUCTS);
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);

        for (const product of body) {
            expect(product).toHaveProperty("id");
            expect(product).toHaveProperty("title");
            expect(product).toHaveProperty("price");
            expect(product).toHaveProperty("category");
            expect(product).toHaveProperty("image");
        }
    });

    test("4. Get Product by ID @api @products", async ({ request }) => {
        const url = buildUrl(Routes.GET_PRODUCT_BY_ID, { id: sampleProductId });
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty("id");
        expect(body.id).toBe(sampleProductId);
        expect(body).toHaveProperty("title");
        expect(body).toHaveProperty("price");
        expect(body).toHaveProperty("description");
        expect(body).toHaveProperty("category");
        expect(body).toHaveProperty("image");
    });

    test("5. Get Products with Limit @api @products", async ({ request }) => {
        const url = buildUrl(Routes.GET_PRODUCTS_WITH_LIMIT, { limit: productLimit });
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBe(productLimit);
    });

    test("6. Sort Products Ascending @api @products", async ({ request }) => {
        const url = buildUrl(Routes.GET_PRODUCTS_SORTED, { order: "asc" });
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);

        const ids = body.map((p: { id: number }) => p.id);
        for (let i = 1; i < ids.length; i++) {
            expect(ids[i]).toBeGreaterThanOrEqual(ids[i - 1]);
        }
    });

    test("7. Sort Products Descending @api @products", async ({ request }) => {
        const url = buildUrl(Routes.GET_PRODUCTS_SORTED, { order: "desc" });
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);

        const ids = body.map((p: { id: number }) => p.id);
        for (let i = 1; i < ids.length; i++) {
            expect(ids[i]).toBeLessThanOrEqual(ids[i - 1]);
        }
    });

    test("8. Get All Product Categories @api @products", async ({ request }) => {
        const url = buildUrl(Routes.GET_ALL_CATEGORIES);
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);
    });

    test("9. Get Products by Category @api @products", async ({ request }) => {
        const category = "electronics";
        const url = buildUrl(Routes.GET_PRODUCTS_BY_CATEGORY, { category });
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);
        for (const product of body) {
            expect(product.category.toLowerCase()).toBe(category);
        }
    });

    test("10. Product CRUD - Create @api @products @crud", async ({ request }) => {
        const productData = RandomDataUtil.generateProductPayload();
        const url = buildUrl(Routes.CREATE_PRODUCT);
        const resp = await request.post(url, { data: productData });
        await expectStatus(resp, 201);

        const body = await resp.json();
        expect(body).toHaveProperty("id");
        expect(typeof body.id).toBe("number");
        expect(body.title).toBe(productData.title);
        expect(Number(body.price)).toBe(productData.price);
    });

    test("11. Product CRUD - Update @api @products @crud", async ({ request }) => {
        const updateData = RandomDataUtil.generateUpdatedProductPayload();
        const url = buildUrl(Routes.UPDATE_PRODUCT, { id: sampleProductId });
        const resp = await request.put(url, { data: updateData });
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body.id).toBe(sampleProductId);
        expect(body.title).toContain("Updated ");
    });

    test("12. Product CRUD - Delete @api @products @crud", async ({ request }) => {
        const url = buildUrl(Routes.DELETE_PRODUCT, { id: sampleProductId });
        const resp = await request.delete(url);
        await expectStatus(resp, 200);
    });
});