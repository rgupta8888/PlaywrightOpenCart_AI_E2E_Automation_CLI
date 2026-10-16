import { test, expect } from "@playwright/test";
import { Routes } from "../../api/endpoints/routes";
import Ajv from "ajv";
import * as productSchema from "../../api/schemas/product_api_schema.json";
import * as userSchema from "../../api/schemas/user_api_schema.json";
import * as cartSchema from "../../api/schemas/cart_api_schema.json";
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

const ajv = new Ajv();

function validateSchema(responseBody: unknown, schema: object): boolean {
    const validate = ajv.compile(schema);
    return !!validate(responseBody);
}

test.describe("JSON Schema Validation", () => {
    test("29. Product Response Schema @api @schema", async ({ request }) => {
        const url = buildUrl(Routes.GET_PRODUCT_BY_ID, { id: 1 });
        const resp = await request.get(url);
        await expectStatus(resp, 200);
        const body = await resp.json();
        expect(validateSchema(body, productSchema)).toBe(true);
    });

    test("30. User Response Schema @api @schema", async ({ request }) => {
        const url = buildUrl(Routes.GET_USER_BY_ID, { id: 1 });
        const resp = await request.get(url);
        await expectStatus(resp, 200);
        const body = await resp.json();
        expect(validateSchema(body, userSchema)).toBe(true);
    });

    test("31. Cart Response Schema @api @schema", async ({ request }) => {
        const url = buildUrl(Routes.GET_CART_BY_ID, { id: 1 });
        const resp = await request.get(url);
        await expectStatus(resp, 200);
        const body = await resp.json();
        expect(validateSchema(body, cartSchema)).toBe(true);
    });
});
