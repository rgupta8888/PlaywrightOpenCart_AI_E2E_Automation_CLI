
export const bookerRoutes = {

    BASE_URL: 'https://restful-booker.herokuapp.com',

    // =========================
    // Health Check Routes
    // =========================

    HEALTH_CHECK: '/ping',

    // =========================
    // Authentication Routes
    // =========================

    CREATE_TOKEN: '/auth',

    // =========================
    // Booking Routes
    // =========================

    GET_ALL_BOOKING_IDS: '/booking',
    GET_BOOKING_BY_ID: '/booking/{id}',

    // Booking Filters
    GET_BOOKINGS_BY_FIRST_NAME: '/booking?firstname={firstname}',
    GET_BOOKINGS_BY_LAST_NAME: '/booking?lastname={lastname}',
    GET_BOOKINGS_BY_CHECKIN_DATE: '/booking?checkin={checkin}',
    GET_BOOKINGS_BY_CHECKOUT_DATE: '/booking?checkout={checkout}',
    GET_BOOKINGS_BY_NAME: '/booking?firstname={firstname}&lastname={lastname}',
    GET_BOOKINGS_BY_DATE_RANGE: '/booking?checkin={checkin}&checkout={checkout}',

    // Booking CRUD Operations
    CREATE_BOOKING: '/booking',
    UPDATE_BOOKING: '/booking/{id}',
    PARTIAL_UPDATE_BOOKING: '/booking/{id}',
    DELETE_BOOKING: '/booking/{id}',

};