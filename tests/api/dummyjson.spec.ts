import { test, expect } from '@playwright/test';
import { Routes } from '../../api/endpoints/dummyJsonroutes';
import { RandomDataUtil } from '../../utils/dataGenerator';
import { expectStatus } from '../../utils/apiHelpers';
import { dummyJsonData } from '../../testdata/api/apiTestData';

function buildUrl(template: string, params?: Record<string, string | number>): string {
    let url = `${Routes.BASE_URL}${template}`;
    if (params) {
        for (const [key, value] of Object.entries(params)) {
            url = url.replace(`{${key}}`, String(value));
        }
    }
    return url;
}

async function getAuthToken(request: any): Promise<{ accessToken: string; refreshToken: string }> {
    const url = buildUrl(Routes.AUTH_LOGIN);
    const resp = await request.post(url, {
        data: { username: dummyJsonData.credentials.valid.username, password: dummyJsonData.credentials.valid.password },
    });
    const body = await resp.json();
    return { accessToken: body.accessToken, refreshToken: body.refreshToken };
}

// =============================================================================
// Authentication
// =============================================================================

test.describe('Authentication', () => {

    test('1. Successful Login @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.AUTH_LOGIN);
        const resp = await request.post(url, {
            data: { username: dummyJsonData.credentials.valid.username, password: dummyJsonData.credentials.valid.password },
        });
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('accessToken');
        expect(typeof body.accessToken).toBe('string');
        expect(body.accessToken.length).toBeGreaterThan(0);
        expect(body).toHaveProperty('refreshToken');
        expect(typeof body.refreshToken).toBe('string');
    });

    test('2. Invalid Login @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.AUTH_LOGIN);
        const resp = await request.post(url, {
            data: {
                username: RandomDataUtil.getUsername(),
                password: RandomDataUtil.getPassword(),
            },
        });
        await expectStatus(resp, 400);

        const body = await resp.json();
        expect(body).toHaveProperty('message');
    });

    test('3. Get Authenticated User (Me) @api @dummyjson', async ({ request }) => {
        const { accessToken } = await getAuthToken(request);

        const url = buildUrl(Routes.AUTH_GET_ME);
        const resp = await request.get(url, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('id');
        expect(body).toHaveProperty('email');
        expect(body).toHaveProperty('firstName');
        expect(body).toHaveProperty('lastName');
    });

    test('4. Refresh Token @api @dummyjson', async ({ request }) => {
        const { refreshToken } = await getAuthToken(request);

        const url = buildUrl(Routes.AUTH_REFRESH);
        const resp = await request.post(url, {
            data: { refreshToken },
        });
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('accessToken');
        expect(typeof body.accessToken).toBe('string');
        expect(body.accessToken.length).toBeGreaterThan(0);
    });
});

// =============================================================================
// Products API
// =============================================================================

test.describe('Products API', () => {

    test('5. Get All Products @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.GET_ALL_PRODUCTS);
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('products');
        expect(Array.isArray(body.products)).toBe(true);
        expect(body.products.length).toBeGreaterThan(0);

        for (const product of body.products) {
            expect(product).toHaveProperty('id');
            expect(product).toHaveProperty('title');
            expect(product).toHaveProperty('price');
            expect(product).toHaveProperty('category');
            expect(product).toHaveProperty('thumbnail');
        }
    });

    test('6. Get Product by ID @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.GET_PRODUCT_BY_ID, { id: dummyJsonData.sampleIds.productId });
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('id');
        expect(body.id).toBe(dummyJsonData.sampleIds.productId);
    });

    test('7. Search Products @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.SEARCH_PRODUCTS, { query: dummyJsonData.searchQueries.product });
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('products');
        expect(Array.isArray(body.products)).toBe(true);
        expect(body.products.length).toBeGreaterThan(0);
    });

    test('8. Sort Products @api @dummyjson', async ({ request }) => {
        // Ascending
        const ascUrl = buildUrl(Routes.GET_PRODUCTS_SORTED, { sortBy: 'price', order: 'asc' });
        const ascResp = await request.get(ascUrl);
        await expectStatus(ascResp, 200);
        const ascBody = await ascResp.json();
        const ascPrices = ascBody.products.map((p: { price: number }) => p.price);
        for (let i = 1; i < ascPrices.length; i++) {
            expect(ascPrices[i]).toBeGreaterThanOrEqual(ascPrices[i - 1]);
        }

        // Descending
        const descUrl = buildUrl(Routes.GET_PRODUCTS_SORTED, { sortBy: 'price', order: 'desc' });
        const descResp = await request.get(descUrl);
        await expectStatus(descResp, 200);
        const descBody = await descResp.json();
        const descPrices = descBody.products.map((p: { price: number }) => p.price);
        for (let i = 1; i < descPrices.length; i++) {
            expect(descPrices[i]).toBeLessThanOrEqual(descPrices[i - 1]);
        }
    });

    test('9. Get All Product Categories @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.GET_ALL_CATEGORIES);
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);
    });

    test('10. Get Category List @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.GET_CATEGORY_LIST);
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);
        for (const entry of body) {
            expect(typeof entry).toBe('string');
        }
    });

    test('11. Get Products by Category @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.GET_PRODUCTS_BY_CATEGORY, { category: dummyJsonData.categories.productCategory });
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('products');
        expect(Array.isArray(body.products)).toBe(true);
        expect(body.products.length).toBeGreaterThan(0);
        for (const product of body.products) {
            expect(product.category).toBe('beauty');
        }
    });

    test('12. Product CRUD - Create @api @dummyjson', async ({ request }) => {
        const payload = RandomDataUtil.generateDummyJsonProductPayload();
        const url = buildUrl(Routes.CREATE_PRODUCT);
        const resp = await request.post(url, { data: payload });
        await expectStatus(resp, 201);

        const body = await resp.json();
        expect(body).toHaveProperty('id');
        expect(typeof body.id).toBe('number');
        expect(body.title).toBe(payload.title);
    });

    test('13. Product CRUD - Update @api @dummyjson', async ({ request }) => {
        // DummyJSON doesn't persist created items, so use a known real ID
        const updatePayload = RandomDataUtil.generateUpdatedDummyJsonProductPayload();
        const updateUrl = buildUrl(Routes.UPDATE_PRODUCT, { id: dummyJsonData.sampleIds.productId });
        const updateResp = await request.put(updateUrl, { data: updatePayload });
        await expectStatus(updateResp, 200);

        const body = await updateResp.json();
        expect(body.id).toBe(dummyJsonData.sampleIds.productId);
        expect(body.title).toContain('Updated ');
    });

    test('14. Product CRUD - Delete @api @dummyjson', async ({ request }) => {
        const deleteUrl = buildUrl(Routes.DELETE_PRODUCT, { id: dummyJsonData.sampleIds.productId });
        const deleteResp = await request.delete(deleteUrl);
        await expectStatus(deleteResp, 200);

        const body = await deleteResp.json();
        expect(body).toHaveProperty('isDeleted');
        expect(body.isDeleted).toBe(true);
    });
});

// =============================================================================
// Carts API
// =============================================================================

test.describe('Carts API', () => {

    test('15. Get All Carts @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.GET_ALL_CARTS);
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('carts');
        expect(Array.isArray(body.carts)).toBe(true);
        expect(body.carts.length).toBeGreaterThan(0);
    });

    test('16. Get Cart by ID @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.GET_CART_BY_ID, { id: dummyJsonData.sampleIds.cartId });
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('id');
        expect(body.id).toBe(dummyJsonData.sampleIds.cartId);
        expect(body).toHaveProperty('userId');
        expect(body).toHaveProperty('products');
        expect(Array.isArray(body.products)).toBe(true);
    });

    test('17. Get Carts by User @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.GET_CARTS_BY_USER, { userId: dummyJsonData.sampleIds.userId });
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('carts');
        expect(Array.isArray(body.carts)).toBe(true);
        for (const cart of body.carts) {
            expect(cart.userId).toBe(dummyJsonData.sampleIds.userId);
        }
    });

    test('18. Sort Carts @api @dummyjson', async ({ request }) => {
        const ascUrl = buildUrl(Routes.GET_CARTS_SORTED, { sortBy: 'id', order: 'asc' });
        const ascResp = await request.get(ascUrl);
        await expectStatus(ascResp, 200);
        const ascBody = await ascResp.json();
        const ascIds = ascBody.carts.map((c: { id: number }) => c.id);
        for (let i = 1; i < ascIds.length; i++) {
            expect(ascIds[i]).toBeGreaterThanOrEqual(ascIds[i - 1]);
        }

        const descUrl = buildUrl(Routes.GET_CARTS_SORTED, { sortBy: 'id', order: 'desc' });
        const descResp = await request.get(descUrl);
        await expectStatus(descResp, 200);
        const descBody = await descResp.json();
        const descIds = descBody.carts.map((c: { id: number }) => c.id);
        for (let i = 1; i < descIds.length; i++) {
            expect(descIds[i]).toBeLessThanOrEqual(descIds[i - 1]);
        }
    });

    test('19. Cart CRUD - Create @api @dummyjson', async ({ request }) => {
        const payload = RandomDataUtil.generateDummyJsonCartPayload(dummyJsonData.sampleIds.userId);
        const url = buildUrl(Routes.CREATE_CART);
        const resp = await request.post(url, { data: payload });
        await expectStatus(resp, 201);

        const body = await resp.json();
        expect(body).toHaveProperty('id');
        expect(typeof body.id).toBe('number');
        expect(body.userId).toBe(payload.userId);
        expect(body).toHaveProperty('products');
        expect(Array.isArray(body.products)).toBe(true);
    });

    test('20. Cart CRUD - Update @api @dummyjson', async ({ request }) => {
        const updatePayload = RandomDataUtil.generateUpdatedDummyJsonCartPayload(1);
        const updateUrl = buildUrl(Routes.UPDATE_CART, { id: dummyJsonData.sampleIds.cartId });
        const updateResp = await request.put(updateUrl, { data: updatePayload });
        await expectStatus(updateResp, 200);

        const body = await updateResp.json();
        expect(body.id).toBe(dummyJsonData.sampleIds.cartId);
    });

    test('21. Cart CRUD - Delete @api @dummyjson', async ({ request }) => {
        const deleteUrl = buildUrl(Routes.DELETE_CART, { id: dummyJsonData.sampleIds.cartId });
        const deleteResp = await request.delete(deleteUrl);
        await expectStatus(deleteResp, 200);

        const body = await deleteResp.json();
        expect(body).toHaveProperty('isDeleted');
        expect(body.isDeleted).toBe(true);
    });
});

// =============================================================================
// Recipes API
// =============================================================================

test.describe('Recipes API', () => {

    test('22. Get All Recipes @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.GET_ALL_RECIPES);
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('recipes');
        expect(Array.isArray(body.recipes)).toBe(true);
        expect(body.recipes.length).toBeGreaterThan(0);

        for (const recipe of body.recipes) {
            expect(recipe).toHaveProperty('id');
            expect(recipe).toHaveProperty('name');
            expect(recipe).toHaveProperty('cuisine');
            expect(recipe).toHaveProperty('difficulty');
        }
    });

    test('23. Get Recipe by ID @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.GET_RECIPE_BY_ID, { id: dummyJsonData.sampleIds.recipeId });
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('id');
        expect(body.id).toBe(dummyJsonData.sampleIds.recipeId);
        expect(body).toHaveProperty('name');
        expect(body).toHaveProperty('cuisine');
        expect(body).toHaveProperty('difficulty');
    });

    test('24. Search Recipes @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.SEARCH_RECIPES, { query: dummyJsonData.searchQueries.recipe });
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('recipes');
        expect(Array.isArray(body.recipes)).toBe(true);
        expect(body.recipes.length).toBeGreaterThan(0);
    });

    test('25. Sort Recipes @api @dummyjson', async ({ request }) => {
        const ascUrl = buildUrl(Routes.GET_RECIPES_SORTED, { sortBy: 'id', order: 'asc' });
        const ascResp = await request.get(ascUrl);
        await expectStatus(ascResp, 200);
        const ascBody = await ascResp.json();
        const ascIds = ascBody.recipes.map((r: { id: number }) => r.id);
        for (let i = 1; i < ascIds.length; i++) {
            expect(ascIds[i]).toBeGreaterThanOrEqual(ascIds[i - 1]);
        }

        const descUrl = buildUrl(Routes.GET_RECIPES_SORTED, { sortBy: 'id', order: 'desc' });
        const descResp = await request.get(descUrl);
        await expectStatus(descResp, 200);
        const descBody = await descResp.json();
        const descIds = descBody.recipes.map((r: { id: number }) => r.id);
        for (let i = 1; i < descIds.length; i++) {
            expect(descIds[i]).toBeLessThanOrEqual(descIds[i - 1]);
        }
    });

    test('26. Get All Recipe Tags @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.GET_ALL_RECIPE_TAGS);
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);
    });

    test('27. Get Recipes by Tag @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.GET_RECIPES_BY_TAG, { tag: dummyJsonData.categories.recipeTag });
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('recipes');
        expect(Array.isArray(body.recipes)).toBe(true);
        expect(body.recipes.length).toBeGreaterThan(0);
    });

    test('28. Get Recipes by Meal Type @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.GET_RECIPES_BY_MEAL_TYPE, { mealType: dummyJsonData.categories.mealType });
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('recipes');
        expect(Array.isArray(body.recipes)).toBe(true);
        expect(body.recipes.length).toBeGreaterThan(0);
    });

    test('29. Recipe CRUD - Create @api @dummyjson', async ({ request }) => {
        const payload = RandomDataUtil.generateDummyJsonRecipePayload();
        const url = buildUrl(Routes.CREATE_RECIPE);
        const resp = await request.post(url, { data: payload });
        await expectStatus(resp, 201);

        const body = await resp.json();
        expect(body).toHaveProperty('id');
        expect(typeof body.id).toBe('number');
        expect(body.name).toBe(payload.name);
    });

    test('30. Recipe CRUD - Update @api @dummyjson', async ({ request }) => {
        const updatePayload = RandomDataUtil.generateUpdatedDummyJsonRecipePayload();
        const updateUrl = buildUrl(Routes.UPDATE_RECIPE, { id: dummyJsonData.sampleIds.recipeId });
        const updateResp = await request.put(updateUrl, { data: updatePayload });
        await expectStatus(updateResp, 200);

        const body = await updateResp.json();
        expect(body.id).toBe(dummyJsonData.sampleIds.recipeId);
        expect(body.name).toContain('Updated ');
    });

    test('31. Recipe CRUD - Delete @api @dummyjson', async ({ request }) => {
        const deleteUrl = buildUrl(Routes.DELETE_RECIPE, { id: dummyJsonData.sampleIds.recipeId });
        const deleteResp = await request.delete(deleteUrl);
        await expectStatus(deleteResp, 200);

        const body = await deleteResp.json();
        expect(body).toHaveProperty('isDeleted');
        expect(body.isDeleted).toBe(true);
    });
});

// =============================================================================
// Users API
// =============================================================================

test.describe('Users API', () => {

    test('32. Get All Users @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.GET_ALL_USERS);
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('users');
        expect(Array.isArray(body.users)).toBe(true);
        expect(body.users.length).toBeGreaterThan(0);
    });

    test('33. Get User by ID @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.GET_USER_BY_ID, { id: dummyJsonData.sampleIds.userId });
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('id');
        expect(body.id).toBe(dummyJsonData.sampleIds.userId);
        expect(body).toHaveProperty('email');
        expect(body).toHaveProperty('firstName');
        expect(body).toHaveProperty('lastName');
    });

    test('34. Search Users @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.SEARCH_USERS, { query: dummyJsonData.searchQueries.user });
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('users');
        expect(Array.isArray(body.users)).toBe(true);
        expect(body.users.length).toBeGreaterThan(0);
    });

    test('35. Filter Users @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.FILTER_USERS, { key: dummyJsonData.filters.userKey, value: dummyJsonData.filters.userValue });
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('users');
        expect(Array.isArray(body.users)).toBe(true);
        for (const user of body.users) {
            expect(user.hair.color).toBe(dummyJsonData.filters.userValue);
        }
    });

    test('36. Sort Users @api @dummyjson', async ({ request }) => {
        const ascUrl = buildUrl(Routes.GET_USERS_SORTED, { sortBy: 'id', order: 'asc' });
        const ascResp = await request.get(ascUrl);
        await expectStatus(ascResp, 200);
        const ascBody = await ascResp.json();
        const ascIds = ascBody.users.map((u: { id: number }) => u.id);
        for (let i = 1; i < ascIds.length; i++) {
            expect(ascIds[i]).toBeGreaterThanOrEqual(ascIds[i - 1]);
        }

        const descUrl = buildUrl(Routes.GET_USERS_SORTED, { sortBy: 'id', order: 'desc' });
        const descResp = await request.get(descUrl);
        await expectStatus(descResp, 200);
        const descBody = await descResp.json();
        const descIds = descBody.users.map((u: { id: number }) => u.id);
        for (let i = 1; i < descIds.length; i++) {
            expect(descIds[i]).toBeLessThanOrEqual(descIds[i - 1]);
        }
    });

    test('37. Get User Carts @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.GET_USER_CARTS, { id: dummyJsonData.sampleIds.userId });
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('carts');
        expect(Array.isArray(body.carts)).toBe(true);
    });

    test('38. Get User Posts @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.GET_USER_POSTS, { id: dummyJsonData.sampleIds.userId });
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('posts');
        expect(Array.isArray(body.posts)).toBe(true);
    });

    test('39. Get User Todos @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.GET_USER_TODOS, { id: dummyJsonData.sampleIds.userId });
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('todos');
        expect(Array.isArray(body.todos)).toBe(true);
    });

    test('40. User CRUD - Create @api @dummyjson', async ({ request }) => {
        const payload = RandomDataUtil.generateDummyJsonUserPayload();
        const url = buildUrl(Routes.CREATE_USER);
        const resp = await request.post(url, { data: payload });
        await expectStatus(resp, 201);

        const body = await resp.json();
        expect(body).toHaveProperty('id');
        expect(typeof body.id).toBe('number');
        expect(body.firstName).toBe(payload.firstName);
    });

    test('41. User CRUD - Update @api @dummyjson', async ({ request }) => {
        const updatePayload = RandomDataUtil.generateUpdatedDummyJsonUserPayload();
        const updateUrl = buildUrl(Routes.UPDATE_USER, { id: dummyJsonData.sampleIds.userId });
        const updateResp = await request.put(updateUrl, { data: updatePayload });
        await expectStatus(updateResp, 200);

        const body = await updateResp.json();
        expect(body.id).toBe(dummyJsonData.sampleIds.userId);
        expect(body.firstName).toContain('Updated ');
    });

    test('42. User CRUD - Delete @api @dummyjson', async ({ request }) => {
        const deleteUrl = buildUrl(Routes.DELETE_USER, { id: dummyJsonData.sampleIds.userId });
        const deleteResp = await request.delete(deleteUrl);
        await expectStatus(deleteResp, 200);

        const body = await deleteResp.json();
        expect(body).toHaveProperty('isDeleted');
        expect(body.isDeleted).toBe(true);
    });
});

// =============================================================================
// Posts API
// =============================================================================

test.describe('Posts API', () => {

    test('43. Get All Posts @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.GET_ALL_POSTS);
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('posts');
        expect(Array.isArray(body.posts)).toBe(true);
        expect(body.posts.length).toBeGreaterThan(0);

        for (const post of body.posts) {
            expect(post).toHaveProperty('id');
            expect(post).toHaveProperty('title');
            expect(post).toHaveProperty('body');
            expect(post).toHaveProperty('userId');
        }
    });

    test('44. Get Post by ID @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.GET_POST_BY_ID, { id: dummyJsonData.sampleIds.postId });
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('id');
        expect(body.id).toBe(dummyJsonData.sampleIds.postId);
        expect(body).toHaveProperty('title');
        expect(body).toHaveProperty('body');
        expect(body).toHaveProperty('userId');
    });

    test('45. Search Posts @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.SEARCH_POSTS, { query: dummyJsonData.searchQueries.post });
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('posts');
        expect(Array.isArray(body.posts)).toBe(true);
        expect(body.posts.length).toBeGreaterThan(0);
    });

    test('46. Sort Posts @api @dummyjson', async ({ request }) => {
        const ascUrl = buildUrl(Routes.GET_POSTS_SORTED, { sortBy: 'id', order: 'asc' });
        const ascResp = await request.get(ascUrl);
        await expectStatus(ascResp, 200);
        const ascBody = await ascResp.json();
        const ascIds = ascBody.posts.map((p: { id: number }) => p.id);
        for (let i = 1; i < ascIds.length; i++) {
            expect(ascIds[i]).toBeGreaterThanOrEqual(ascIds[i - 1]);
        }

        const descUrl = buildUrl(Routes.GET_POSTS_SORTED, { sortBy: 'id', order: 'desc' });
        const descResp = await request.get(descUrl);
        await expectStatus(descResp, 200);
        const descBody = await descResp.json();
        const descIds = descBody.posts.map((p: { id: number }) => p.id);
        for (let i = 1; i < descIds.length; i++) {
            expect(descIds[i]).toBeLessThanOrEqual(descIds[i - 1]);
        }
    });

    test('47. Get All Post Tags @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.GET_ALL_POST_TAGS);
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);
    });

    test('48. Get Post Tag List @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.GET_POST_TAG_LIST);
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);
    });

    test('49. Get Posts by Tag @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.GET_POSTS_BY_TAG, { tag: dummyJsonData.categories.postTag });
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('posts');
        expect(Array.isArray(body.posts)).toBe(true);
        expect(body.posts.length).toBeGreaterThan(0);
    });

    test('50. Get Posts by User ID @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.GET_POSTS_BY_USER_ID, { userId: dummyJsonData.sampleIds.userId });
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('posts');
        expect(Array.isArray(body.posts)).toBe(true);
    });

    test('51. Get Post Comments @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.GET_POST_COMMENTS, { id: dummyJsonData.sampleIds.postId });
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('comments');
        expect(Array.isArray(body.comments)).toBe(true);
    });

    test('52. Post CRUD - Create @api @dummyjson', async ({ request }) => {
        const payload = RandomDataUtil.generateDummyJsonPostPayload(1);
        const url = buildUrl(Routes.CREATE_POST);
        const resp = await request.post(url, { data: payload });
        await expectStatus(resp, 201);

        const body = await resp.json();
        expect(body).toHaveProperty('id');
        expect(typeof body.id).toBe('number');
        expect(body.title).toBe(payload.title);
    });

    test('53. Post CRUD - Update @api @dummyjson', async ({ request }) => {
        const updatePayload = RandomDataUtil.generateUpdatedDummyJsonPostPayload(1);
        const updateUrl = buildUrl(Routes.UPDATE_POST, { id: dummyJsonData.sampleIds.postId });
        const updateResp = await request.put(updateUrl, { data: updatePayload });
        await expectStatus(updateResp, 200);

        const body = await updateResp.json();
        expect(body.id).toBe(dummyJsonData.sampleIds.postId);
        expect(body.title).toContain('Updated ');
    });

    test('54. Post CRUD - Delete @api @dummyjson', async ({ request }) => {
        const deleteUrl = buildUrl(Routes.DELETE_POST, { id: dummyJsonData.sampleIds.postId });
        const deleteResp = await request.delete(deleteUrl);
        await expectStatus(deleteResp, 200);

        const body = await deleteResp.json();
        expect(body).toHaveProperty('isDeleted');
        expect(body.isDeleted).toBe(true);
    });
});

// =============================================================================
// Comments API
// =============================================================================

test.describe('Comments API', () => {

    test('55. Get All Comments @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.GET_ALL_COMMENTS);
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('comments');
        expect(Array.isArray(body.comments)).toBe(true);
        expect(body.comments.length).toBeGreaterThan(0);

        for (const comment of body.comments) {
            expect(comment).toHaveProperty('id');
            expect(comment).toHaveProperty('body');
            expect(comment).toHaveProperty('postId');
            expect(comment).toHaveProperty('user');
        }
    });

    test('56. Get Comment by ID @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.GET_COMMENT_BY_ID, { id: dummyJsonData.sampleIds.commentId });
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('id');
        expect(body.id).toBe(dummyJsonData.sampleIds.commentId);
        expect(body).toHaveProperty('body');
        expect(body).toHaveProperty('postId');
    });

    test('57. Sort Comments @api @dummyjson', async ({ request }) => {
        const ascUrl = buildUrl(Routes.GET_COMMENTS_SORTED, { sortBy: 'id', order: 'asc' });
        const ascResp = await request.get(ascUrl);
        await expectStatus(ascResp, 200);
        const ascBody = await ascResp.json();
        const ascIds = ascBody.comments.map((c: { id: number }) => c.id);
        for (let i = 1; i < ascIds.length; i++) {
            expect(ascIds[i]).toBeGreaterThanOrEqual(ascIds[i - 1]);
        }

        const descUrl = buildUrl(Routes.GET_COMMENTS_SORTED, { sortBy: 'id', order: 'desc' });
        const descResp = await request.get(descUrl);
        await expectStatus(descResp, 200);
        const descBody = await descResp.json();
        const descIds = descBody.comments.map((c: { id: number }) => c.id);
        for (let i = 1; i < descIds.length; i++) {
            expect(descIds[i]).toBeLessThanOrEqual(descIds[i - 1]);
        }
    });

    test('58. Get Comments by Post ID @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.GET_COMMENTS_BY_POST_ID, { postId: dummyJsonData.sampleIds.postId });
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('comments');
        expect(Array.isArray(body.comments)).toBe(true);
        expect(body.comments.length).toBeGreaterThan(0);
    });

    test('59. Comment CRUD - Create @api @dummyjson', async ({ request }) => {
        const payload = RandomDataUtil.generateDummyJsonCommentPayload(dummyJsonData.sampleIds.postId);
        const url = buildUrl(Routes.CREATE_COMMENT);
        const resp = await request.post(url, { data: payload });
        await expectStatus(resp, 201);

        const body = await resp.json();
        expect(body).toHaveProperty('id');
        expect(typeof body.id).toBe('number');
        expect(body.body).toBe(payload.body);
    });

    test('60. Comment CRUD - Update @api @dummyjson', async ({ request }) => {
        const updatePayload = RandomDataUtil.generateUpdatedDummyJsonCommentPayload(dummyJsonData.sampleIds.postId);
        const updateUrl = buildUrl(Routes.UPDATE_COMMENT, { id: dummyJsonData.sampleIds.commentId });
        const updateResp = await request.put(updateUrl, { data: updatePayload });
        await expectStatus(updateResp, 200);

        const body = await updateResp.json();
        expect(body.id).toBe(dummyJsonData.sampleIds.commentId);
        expect(body.body).toContain('Updated ');
    });

    test('61. Comment CRUD - Delete @api @dummyjson', async ({ request }) => {
        const deleteUrl = buildUrl(Routes.DELETE_COMMENT, { id: dummyJsonData.sampleIds.commentId });
        const deleteResp = await request.delete(deleteUrl);
        await expectStatus(deleteResp, 200);

        const body = await deleteResp.json();
        expect(body).toHaveProperty('isDeleted');
        expect(body.isDeleted).toBe(true);
    });
});

// =============================================================================
// Todos API
// =============================================================================

test.describe('Todos API', () => {

    test('62. Get All Todos @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.GET_ALL_TODOS);
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('todos');
        expect(Array.isArray(body.todos)).toBe(true);
        expect(body.todos.length).toBeGreaterThan(0);

        for (const todo of body.todos) {
            expect(todo).toHaveProperty('id');
            expect(todo).toHaveProperty('todo');
            expect(todo).toHaveProperty('completed');
            expect(todo).toHaveProperty('userId');
        }
    });

    test('63. Get Todo by ID @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.GET_TODO_BY_ID, { id: dummyJsonData.sampleIds.todoId });
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('id');
        expect(body.id).toBe(dummyJsonData.sampleIds.todoId);
        expect(body).toHaveProperty('todo');
        expect(body).toHaveProperty('completed');
        expect(body).toHaveProperty('userId');
    });

    test('64. Get Random Todo @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.GET_RANDOM_TODO);
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('id');
        expect(body).toHaveProperty('todo');
        expect(body).toHaveProperty('completed');
    });

    test('65. Get Todos by User ID @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.GET_TODOS_BY_USER_ID, { userId: dummyJsonData.sampleIds.userId });
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('todos');
        expect(Array.isArray(body.todos)).toBe(true);
    });

    test('66. Todo CRUD - Create @api @dummyjson', async ({ request }) => {
        const payload = RandomDataUtil.generateDummyJsonTodoPayload(dummyJsonData.sampleIds.userId);
        const url = buildUrl(Routes.CREATE_TODO);
        const resp = await request.post(url, { data: payload });
        await expectStatus(resp, 201);

        const body = await resp.json();
        expect(body).toHaveProperty('id');
        expect(typeof body.id).toBe('number');
        expect(body.todo).toBe(payload.todo);
    });

    test('67. Todo CRUD - Update @api @dummyjson', async ({ request }) => {
        const updatePayload = RandomDataUtil.generateUpdatedDummyJsonTodoPayload(dummyJsonData.sampleIds.userId);
        const updateUrl = buildUrl(Routes.UPDATE_TODO, { id: dummyJsonData.sampleIds.todoId });
        const updateResp = await request.put(updateUrl, { data: updatePayload });
        await expectStatus(updateResp, 200);

        const body = await updateResp.json();
        expect(body.id).toBe(dummyJsonData.sampleIds.todoId);
        expect(body.todo).toContain('Updated ');
    });

    test('68. Todo CRUD - Delete @api @dummyjson', async ({ request }) => {
        const deleteUrl = buildUrl(Routes.DELETE_TODO, { id: dummyJsonData.sampleIds.todoId });
        const deleteResp = await request.delete(deleteUrl);
        await expectStatus(deleteResp, 200);

        const body = await deleteResp.json();
        expect(body).toHaveProperty('isDeleted');
        expect(body.isDeleted).toBe(true);
    });
});

// =============================================================================
// Quotes API
// =============================================================================

test.describe('Quotes API', () => {

    test('69. Get All Quotes @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.GET_ALL_QUOTES);
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('quotes');
        expect(Array.isArray(body.quotes)).toBe(true);
        expect(body.quotes.length).toBeGreaterThan(0);

        for (const quote of body.quotes) {
            expect(quote).toHaveProperty('id');
            expect(quote).toHaveProperty('quote');
            expect(quote).toHaveProperty('author');
        }
    });

    test('70. Get Quote by ID @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.GET_QUOTE_BY_ID, { id: dummyJsonData.sampleIds.quoteId });
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('id');
        expect(body.id).toBe(dummyJsonData.sampleIds.quoteId);
        expect(body).toHaveProperty('quote');
        expect(body).toHaveProperty('author');
    });

    test('71. Get Random Quote @api @dummyjson', async ({ request }) => {
        const url = buildUrl(Routes.GET_RANDOM_QUOTE);
        const resp = await request.get(url);
        await expectStatus(resp, 200);

        const body = await resp.json();
        expect(body).toHaveProperty('id');
        expect(body).toHaveProperty('quote');
        expect(body).toHaveProperty('author');
    });
});

// =============================================================================
// End-to-End Workflows
// =============================================================================

test.describe('E2E Workflows', () => {

    test('72. Product CRUD Workflow @api @e2e @dummyjson', async ({ request }) => {
        // DummyJSON doesn't persist created items, so use a known real ID for update/delete
        const prodId = dummyJsonData.sampleIds.productId;
        const updateData = RandomDataUtil.generateUpdatedDummyJsonProductPayload();
        const updateUrl = buildUrl(Routes.UPDATE_PRODUCT, { id: prodId });
        const updateResp = await request.put(updateUrl, { data: updateData });
        await expectStatus(updateResp, 200);
        const updated = await updateResp.json();
        expect(updated.title).toContain('Updated ');

        const deleteUrl = buildUrl(Routes.DELETE_PRODUCT, { id: prodId });
        const deleteResp = await request.delete(deleteUrl);
        await expectStatus(deleteResp, 200);
    });

    test('73. User CRUD Workflow @api @e2e @dummyjson', async ({ request }) => {
        const userId = dummyJsonData.sampleIds.userId;
        const updateData = RandomDataUtil.generateUpdatedDummyJsonUserPayload();
        const updateUrl = buildUrl(Routes.UPDATE_USER, { id: userId });
        const updateResp = await request.put(updateUrl, { data: updateData });
        await expectStatus(updateResp, 200);

        const deleteUrl = buildUrl(Routes.DELETE_USER, { id: userId });
        const deleteResp = await request.delete(deleteUrl);
        await expectStatus(deleteResp, 200);
    });

    test('74. Cart CRUD Workflow @api @e2e @dummyjson', async ({ request }) => {
        const cartId = dummyJsonData.sampleIds.cartId;
        const updateData = RandomDataUtil.generateUpdatedDummyJsonCartPayload(1);
        const updateUrl = buildUrl(Routes.UPDATE_CART, { id: cartId });
        const updateResp = await request.put(updateUrl, { data: updateData });
        await expectStatus(updateResp, 200);

        const deleteUrl = buildUrl(Routes.DELETE_CART, { id: cartId });
        const deleteResp = await request.delete(deleteUrl);
        await expectStatus(deleteResp, 200);
    });

    test('75. Recipe CRUD Workflow @api @e2e @dummyjson', async ({ request }) => {
        const recipeId = dummyJsonData.sampleIds.recipeId;
        const updateData = RandomDataUtil.generateUpdatedDummyJsonRecipePayload();
        const updateUrl = buildUrl(Routes.UPDATE_RECIPE, { id: recipeId });
        const updateResp = await request.put(updateUrl, { data: updateData });
        await expectStatus(updateResp, 200);

        const deleteUrl = buildUrl(Routes.DELETE_RECIPE, { id: recipeId });
        const deleteResp = await request.delete(deleteUrl);
        await expectStatus(deleteResp, 200);
    });

    test('76. Post CRUD Workflow @api @e2e @dummyjson', async ({ request }) => {
        const postId = dummyJsonData.sampleIds.postId;
        const updateData = RandomDataUtil.generateUpdatedDummyJsonPostPayload(1);
        const updateUrl = buildUrl(Routes.UPDATE_POST, { id: postId });
        const updateResp = await request.put(updateUrl, { data: updateData });
        await expectStatus(updateResp, 200);

        const deleteUrl = buildUrl(Routes.DELETE_POST, { id: postId });
        const deleteResp = await request.delete(deleteUrl);
        await expectStatus(deleteResp, 200);
    });

    test('77. Comment CRUD Workflow @api @e2e @dummyjson', async ({ request }) => {
        const commentId = 1;
        const updateData = RandomDataUtil.generateUpdatedDummyJsonCommentPayload(1);
        const updateUrl = buildUrl(Routes.UPDATE_COMMENT, { id: commentId });
        const updateResp = await request.put(updateUrl, { data: updateData });
        await expectStatus(updateResp, 200);

        const deleteUrl = buildUrl(Routes.DELETE_COMMENT, { id: commentId });
        const deleteResp = await request.delete(deleteUrl);
        await expectStatus(deleteResp, 200);
    });

    test('78. Todo CRUD Workflow @api @e2e @dummyjson', async ({ request }) => {
        const todoId = 1;
        const updateData = RandomDataUtil.generateUpdatedDummyJsonTodoPayload(1);
        const updateUrl = buildUrl(Routes.UPDATE_TODO, { id: todoId });
        const updateResp = await request.put(updateUrl, { data: updateData });
        await expectStatus(updateResp, 200);

        const deleteUrl = buildUrl(Routes.DELETE_TODO, { id: todoId });
        const deleteResp = await request.delete(deleteUrl);
        await expectStatus(deleteResp, 200);
    });
});