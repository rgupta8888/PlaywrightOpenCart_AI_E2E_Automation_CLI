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

test.describe("Users API", () => {
    const sampleUserId = fakeStoreData.sampleIds.userId;
    const userLimit = fakeStoreData.sampleIds.limit;

    test("13. Get All Users @api @users", async ({ request }) => {
        const url = buildUrl(Routes.GET_ALL_USERS);
        const resp = await request.get(url);
        await expectStatus(resp, 200);
        const body = await resp.json();
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);
    });

    test("14. Get User by ID @api @users", async ({ request }) => {
        const url = buildUrl(Routes.GET_USER_BY_ID, { id: sampleUserId });
        const resp = await request.get(url);
        await expectStatus(resp, 200);
        const body = await resp.json();
        expect(body.id).toBe(sampleUserId);
        expect(body).toHaveProperty("email");
        expect(body).toHaveProperty("username");
        expect(body).toHaveProperty("name");
        expect(body).toHaveProperty("address");
        expect(body).toHaveProperty("phone");
    });

    test("15. Get Users with Limit @api @users", async ({ request }) => {
        const url = buildUrl(Routes.GET_USERS_WITH_LIMIT, { limit: userLimit });
        const resp = await request.get(url);
        await expectStatus(resp, 200);
        const body = await resp.json();
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBe(userLimit);
    });

    test("16. Sort Users @api @users", async ({ request }) => {
        const ascUrl = buildUrl(Routes.GET_USERS_SORTED, { order: "asc" });
        const ascResp = await request.get(ascUrl);
        await expectStatus(ascResp, 200);
        const ascBody = await ascResp.json();
        expect(Array.isArray(ascBody)).toBe(true);
        const ascIds = ascBody.map((u: { id: number }) => u.id);
        for (let i = 1; i < ascIds.length; i++) {
            expect(ascIds[i]).toBeGreaterThanOrEqual(ascIds[i - 1]);
        }

        const descUrl = buildUrl(Routes.GET_USERS_SORTED, { order: "desc" });
        const descResp = await request.get(descUrl);
        await expectStatus(descResp, 200);
        const descBody = await descResp.json();
        expect(Array.isArray(descBody)).toBe(true);
        const descIds = descBody.map((u: { id: number }) => u.id);
        for (let i = 1; i < descIds.length; i++) {
            expect(descIds[i]).toBeLessThanOrEqual(descIds[i - 1]);
        }
    });

    test("17. User CRUD - Create @api @users @crud", async ({ request }) => {
        const userData = RandomDataUtil.generateUserPayload();
        const url = buildUrl(Routes.CREATE_USER);
        const resp = await request.post(url, { data: userData });
        await expectStatus(resp, 201);
        const body = await resp.json();
        expect(body).toHaveProperty("id");
        expect(typeof body.id).toBe("number");
    });

    test("18. User CRUD - Update @api @users @crud", async ({ request }) => {
        const updateData = RandomDataUtil.generateUserUpdatePayload();
        const url = buildUrl(Routes.UPDATE_USER, { id: sampleUserId });
        const resp = await request.put(url, { data: updateData });
        await expectStatus(resp, 200);
    });

    test("19. User CRUD - Delete @api @users @crud", async ({ request }) => {
        const url = buildUrl(Routes.DELETE_USER, { id: sampleUserId });
        const resp = await request.delete(url);
        await expectStatus(resp, 200);
    });
});
