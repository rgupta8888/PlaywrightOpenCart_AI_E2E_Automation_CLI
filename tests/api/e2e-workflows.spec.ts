import { test, expect } from "@playwright/test";
import { Routes } from "../../api/endpoints/routes";
import { RandomDataUtil } from "../../utils/dataGenerator";
import { expectStatus } from "../../utils/apiHelpers";
import { fakeStoreData } from "../../testdata/api/apiTestData";

function buildUrl(template: string, params?: Record<string, string | number>): string {
    let url = `${Routes.BASE_URL}${template}`;
    if (params) {
        for (const [key, value] of Object.entries(params)) {
            url = url.replace(`{${key}}`, String(value));
        }
    }
    return url;
}

test.describe("E2E Workflows", () => {
    test("32. Product CRUD Workflow @api @e2e @products", async ({ request }) => {
        const productData = RandomDataUtil.generateProductPayload();
        const createUrl = buildUrl(Routes.CREATE_PRODUCT);
        const createResp = await request.post(createUrl, { data: productData });
        await expectStatus(createResp, 201);
        const createdProduct = await createResp.json();
        expect(createdProduct).toHaveProperty("id");
        const productId = createdProduct.id;

        const updateData = RandomDataUtil.generateUpdatedProductPayload();
        const updateUrl = buildUrl(Routes.UPDATE_PRODUCT, { id: productId });
        const updateResp = await request.put(updateUrl, { data: updateData });
        await expectStatus(updateResp, 200);
        const updatedProduct = await updateResp.json();
        expect(updatedProduct.title).toContain("Updated ");

        const deleteUrl = buildUrl(Routes.DELETE_PRODUCT, { id: productId });
        const deleteResp = await request.delete(deleteUrl);
        await expectStatus(deleteResp, 200);
    });

    test("33. User CRUD Workflow @api @e2e @users", async ({ request }) => {
        const userData = RandomDataUtil.generateUserPayload();
        const createUrl = buildUrl(Routes.CREATE_USER);
        const createResp = await request.post(createUrl, { data: userData });
        await expectStatus(createResp, 201);
        const createdUser = await createResp.json();
        expect(createdUser).toHaveProperty("id");
        const userId = createdUser.id;

        const updateData = RandomDataUtil.generateUserUpdatePayload();
        const updateUrl = buildUrl(Routes.UPDATE_USER, { id: userId });
        const updateResp = await request.put(updateUrl, { data: updateData });
        await expectStatus(updateResp, 200);

        const deleteUrl = buildUrl(Routes.DELETE_USER, { id: userId });
        const deleteResp = await request.delete(deleteUrl);
        await expectStatus(deleteResp, 200);
    });

    test("34. Cart CRUD Workflow @api @e2e @carts", async ({ request }) => {
        const cartData = RandomDataUtil.generateCartPayload(1);
        const createUrl = buildUrl(Routes.CREATE_CART);
        const createResp = await request.post(createUrl, { data: cartData });
        await expectStatus(createResp, 201);
        const createdCart = await createResp.json();
        expect(createdCart).toHaveProperty("id");
        expect(createdCart.userId).toBe(cartData.userId);
        expect(createdCart).toHaveProperty("products");
        const cartId = createdCart.id;

        const updateData = RandomDataUtil.generateUpdatedCartPayload(1);
        const updateUrl = buildUrl(Routes.UPDATE_CART, { id: cartId });
        const updateResp = await request.put(updateUrl, { data: updateData });
        await expectStatus(updateResp, 200);

        const deleteUrl = buildUrl(Routes.DELETE_CART, { id: cartId });
        const deleteResp = await request.delete(deleteUrl);
        await expectStatus(deleteResp, 200);
    });
});
