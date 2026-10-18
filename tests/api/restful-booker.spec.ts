import { test, expect } from '@playwright/test';
import { bookerRoutes } from '../../api/endpoints/bookerRoutes';
import { RandomDataUtil } from '../../utils/dataGenerator';
import { meta , log } from 'reporting-labs';
import { bookerData } from '../../testdata/api/apiTestData';

function buildUrl(template: string, params?: Record<string, string | number>): string {
    let url = `${bookerRoutes.BASE_URL}${template}`;
    if (params) {
        for (const [key, value] of Object.entries(params)) {
            url = url.replace(`{${key}}`, String(value));
        }
    }
    return url;
}

async function getAuthToken(request: any): Promise<string> {
    const url = buildUrl(bookerRoutes.CREATE_TOKEN);
    const resp = await request.post(url, {
        data: {
            username: bookerData.credentials.valid.username,
            password: bookerData.credentials.valid.password,
        },
    });
    const body = await resp.json();
    return body.token;
}

test.describe('Restful Booker API Tests', () => {

    // ---------------------------------------------------------
    // Authentication
    // ---------------------------------------------------------

    test('1. Successful Authentication @api @booker', async ({ request }) => {
        
        meta({ priority: 'P1', severity: 'critical', owner: 'rahul', feature: 'login API', story: 'Login-231'});

        await log('Starting Successful Authentication Test');
        const url = buildUrl(bookerRoutes.CREATE_TOKEN);
        const payload = RandomDataUtil.generateRestfulBookerAuthPayload();

        const resp = await request.post(url, { data: payload });

        expect(resp.status()).toBe(200);

        const body = await resp.json();
        expect(body).toHaveProperty('token');
        expect(typeof body.token).toBe('string');
        expect(body.token.length).toBeGreaterThan(0);
        await log('Completed Successful Authentication Test');
    });

    test('2. Invalid Authentication @api @booker', async ({ request }) => {
        const url = buildUrl(bookerRoutes.CREATE_TOKEN);

        const resp = await request.post(url, {
            data: {
                username: RandomDataUtil.getUsername(),
                password: RandomDataUtil.getPassword(),
            },
        });

        expect(resp.status()).toBe(200);

        const body = await resp.json();
        expect(body).toHaveProperty('reason');
        expect(body.reason).toBe('Bad credentials');
    });

    // ---------------------------------------------------------
    // Booking - Read Operations
    // ---------------------------------------------------------

    test('3. Get All Bookings @api @booker', async ({ request }) => {
        const url = buildUrl(bookerRoutes.GET_ALL_BOOKING_IDS);

        const resp = await request.get(url);

        expect(resp.status()).toBe(200);

        const body = await resp.json();
        expect(Array.isArray(body)).toBeTruthy();
        expect(body.length).toBeGreaterThan(0);

        for (const item of body) {
            expect(item).toHaveProperty('bookingid');
            expect(typeof item.bookingid).toBe('number');
        }
    });

    test('4. Get Booking by ID @api @booker', async ({ request }) => {
        // First, create a booking to have a known ID
        const createUrl = buildUrl(bookerRoutes.CREATE_BOOKING);
        const bookingPayload = RandomDataUtil.generateBookingPayload();
        const createResp = await request.post(createUrl, { data: bookingPayload });
        expect(createResp.status()).toBe(200);
        const created = await createResp.json();
        const bookingId = created.bookingid;

        // Retrieve the booking by ID
        const getUrl = buildUrl(bookerRoutes.GET_BOOKING_BY_ID, { id: bookingId });
        const resp = await request.get(getUrl);

        expect(resp.status()).toBe(200);

        const body = await resp.json();
        expect(body).toHaveProperty('firstname');
        expect(body).toHaveProperty('lastname');
        expect(body).toHaveProperty('totalprice');
        expect(body).toHaveProperty('depositpaid');
        expect(body).toHaveProperty('bookingdates');
        expect(body.bookingdates).toHaveProperty('checkin');
        expect(body.bookingdates).toHaveProperty('checkout');
        expect(typeof body.totalprice).toBe('number');
        expect(typeof body.depositpaid).toBe('boolean');
    });

    test('5. Get Booking IDs by Name @api @booker', async ({ request }) => {
        // Create a booking with known name
        const createUrl = buildUrl(bookerRoutes.CREATE_BOOKING);
        const bookingPayload = RandomDataUtil.generateBookingPayload();
        const createResp = await request.post(createUrl, { data: bookingPayload });
        expect(createResp.status()).toBe(200);
        const created = await createResp.json();
        const { firstname, lastname } = created.booking;

        // Query by name
        const url = buildUrl(bookerRoutes.GET_BOOKINGS_BY_NAME, {
            firstname,
            lastname,
        });
        const resp = await request.get(url);

        expect(resp.status()).toBe(200);

        const body = await resp.json();
        expect(Array.isArray(body)).toBeTruthy();
        expect(body.length).toBeGreaterThan(0);

        for (const item of body) {
            expect(item).toHaveProperty('bookingid');
            expect(typeof item.bookingid).toBe('number');
        }
    });

    test('6. Get Booking IDs by Date Range @api @booker', async ({ request }) => {
        // Create a booking with known dates
        const createUrl = buildUrl(bookerRoutes.CREATE_BOOKING);
        const bookingPayload = RandomDataUtil.generateBookingPayload();
        const createResp = await request.post(createUrl, { data: bookingPayload });
        expect(createResp.status()).toBe(200);
        const created = await createResp.json();
        const { checkin, checkout } = created.booking.bookingdates;

        // Query by date range
        const url = buildUrl(bookerRoutes.GET_BOOKINGS_BY_DATE_RANGE, {
            checkin,
            checkout,
        });
        const resp = await request.get(url);

        expect(resp.status()).toBe(200);

        const body = await resp.json();
        expect(Array.isArray(body)).toBeTruthy();

        // The API may return 0 results if the date filter doesn't match;
        // validate structure when results are present
        for (const item of body) {
            expect(item).toHaveProperty('bookingid');
            expect(typeof item.bookingid).toBe('number');
        }
    });

    // ---------------------------------------------------------
    // Booking - CRUD Operations
    // ---------------------------------------------------------

    test('7. Booking CRUD - Create @api @booker', async ({ request }) => {
        const url = buildUrl(bookerRoutes.CREATE_BOOKING);
        const payload = RandomDataUtil.generateBookingPayload();

        const resp = await request.post(url, { data: payload });

        expect(resp.status()).toBe(200);

        const body = await resp.json();
        expect(body).toHaveProperty('bookingid');
        expect(typeof body.bookingid).toBe('number');
        expect(body.bookingid).toBeGreaterThan(0);

        expect(body).toHaveProperty('booking');
        expect(body.booking.firstname).toBe(payload.firstname);
        expect(body.booking.lastname).toBe(payload.lastname);
        expect(body.booking.totalprice).toBe(payload.totalprice);
        expect(body.booking.depositpaid).toBe(payload.depositpaid);
        expect(body.booking.bookingdates.checkin).toBe(payload.bookingdates.checkin);
        expect(body.booking.bookingdates.checkout).toBe(payload.bookingdates.checkout);
    });

    test('8. Booking CRUD - Update @api @booker', async ({ request }) => {
        // Create a booking first
        const createUrl = buildUrl(bookerRoutes.CREATE_BOOKING);
        const createPayload = RandomDataUtil.generateBookingPayload();
        const createResp = await request.post(createUrl, { data: createPayload });
        expect(createResp.status()).toBe(200);
        const created = await createResp.json();
        const bookingId = created.bookingid;

        // Get auth token
        const token = await getAuthToken(request);

        // Update the booking
        const updateUrl = buildUrl(bookerRoutes.UPDATE_BOOKING, { id: bookingId });
        const updatePayload = RandomDataUtil.generateUpdatedBookingPayload();
        const resp = await request.put(updateUrl, {
            data: updatePayload,
            headers: {
                Cookie: `token=${token}`,
            },
        });

        expect(resp.status()).toBe(200);

        const body = await resp.json();
        expect(body.firstname).toBe(updatePayload.firstname);
        expect(body.lastname).toBe(updatePayload.lastname);
        expect(body.totalprice).toBe(updatePayload.totalprice);
        expect(body.depositpaid).toBe(updatePayload.depositpaid);
    });

    test('9. Booking CRUD - Partial Update @api @booker', async ({ request }) => {
        // Create a booking first
        const createUrl = buildUrl(bookerRoutes.CREATE_BOOKING);
        const createPayload = RandomDataUtil.generateBookingPayload();
        const createResp = await request.post(createUrl, { data: createPayload });
        expect(createResp.status()).toBe(200);
        const created = await createResp.json();
        const bookingId = created.bookingid;

        // Get auth token
        const token = await getAuthToken(request);

        // Partially update the booking
        const patchUrl = buildUrl(bookerRoutes.PARTIAL_UPDATE_BOOKING, { id: bookingId });
        const patchPayload = RandomDataUtil.generatePartialBookingPayload();
        const resp = await request.patch(patchUrl, {
            data: patchPayload,
            headers: {
                Cookie: `token=${token}`,
            },
        });

        expect(resp.status()).toBe(200);

        const body = await resp.json();
        expect(body.firstname).toBe(patchPayload.firstname);
        expect(body.lastname).toBe(patchPayload.lastname);
    });

    test('10. Booking CRUD - Delete @api @booker', async ({ request }) => {
        // Create a booking first
        const createUrl = buildUrl(bookerRoutes.CREATE_BOOKING);
        const createPayload = RandomDataUtil.generateBookingPayload();
        const createResp = await request.post(createUrl, { data: createPayload });
        expect(createResp.status()).toBe(200);
        const created = await createResp.json();
        const bookingId = created.bookingid;

        // Get auth token
        const token = await getAuthToken(request);

        // Delete the booking
        const deleteUrl = buildUrl(bookerRoutes.DELETE_BOOKING, { id: bookingId });
        const resp = await request.delete(deleteUrl, {
            headers: {
                Cookie: `token=${token}`,
            },
        });

        expect(resp.status()).toBe(201);

        const body = await resp.text();
        expect(body).toBe('Created');
    });

    // ---------------------------------------------------------
    // End-to-End Workflow
    // ---------------------------------------------------------

    test('11. Booking CRUD Workflow @api @booker @e2e', async ({ request }) => {
        // 1) Create a booking
        const createUrl = buildUrl(bookerRoutes.CREATE_BOOKING);
        const createPayload = RandomDataUtil.generateBookingPayload();
        const createResp = await request.post(createUrl, { data: createPayload });
        expect(createResp.status()).toBe(200);
        const created = await createResp.json();
        expect(created).toHaveProperty('bookingid');
        const bookingId = created.bookingid;
        expect(typeof bookingId).toBe('number');

        // 2) Retrieve the same booking by ID
        const getUrl = buildUrl(bookerRoutes.GET_BOOKING_BY_ID, { id: bookingId });
        const getResp = await request.get(getUrl);
        expect(getResp.status()).toBe(200);
        const retrieved = await getResp.json();
        expect(retrieved.firstname).toBe(createPayload.firstname);
        expect(retrieved.lastname).toBe(createPayload.lastname);

        // 3) Update the same booking
        const token = await getAuthToken(request);
        const updatePayload = RandomDataUtil.generateUpdatedBookingPayload();
        const updateUrl = buildUrl(bookerRoutes.UPDATE_BOOKING, { id: bookingId });
        const updateResp = await request.put(updateUrl, {
            data: updatePayload,
            headers: {
                Cookie: `token=${token}`,
            },
        });
        expect(updateResp.status()).toBe(200);
        const updated = await updateResp.json();
        expect(updated.firstname).toBe(updatePayload.firstname);
        expect(updated.lastname).toBe(updatePayload.lastname);

        // 4) Delete the same booking
        const deleteUrl = buildUrl(bookerRoutes.DELETE_BOOKING, { id: bookingId });
        const deleteResp = await request.delete(deleteUrl, {
            headers: {
                Cookie: `token=${token}`,
            },
        });
        expect(deleteResp.status()).toBe(201);
        const deleteBody = await deleteResp.text();
        expect(deleteBody).toBe('Created');
    });
});