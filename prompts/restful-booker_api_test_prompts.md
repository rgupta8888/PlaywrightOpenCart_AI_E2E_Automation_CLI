# Restful Booker API -- API Test Prompts

**Base URL:** `https://restful-booker.herokuapp.com`

## Common Requirements

For every prompt:

-   Create a **Playwright API test using TypeScript**.
-   Use the existing Playwright project/framework structure.
-   Use Playwright's `request` fixture / APIRequestContext according to
    the existing project framework.
-   Use the existing bookerRoutes constants when the project already defines
    them.
-   Do not invent bookerRoutes names that are not present in the project.
-   Keep request construction, response parsing, and assertions clear
    for beginners.
-   Validate status codes, response structure, and important business
    fields.
-   Add meaningful test and assertion messages.
-   Avoid weak assertions such as checking only that a response exists.
-   Use API response data as input to later operations in workflow
    tests.
-   Keep independent tests independent; do not rely on another test's
    execution order unless the prompt explicitly requires a workflow.
-   For CRUD tests, use deterministic test data and capture returned
    IDs.
-   Where the API's behavior is not guaranteed by the supplied test
    material, validate the response contract rather than adding
    unsupported assumptions.

------------------------------------------------------------------------

# Authentication

## 1. Successful Authentication

Create a Playwright API test using TypeScript to verify successful
authentication.

1.  Use the authentication bookerRoutes constant from `bookerRoutes`.
2.  Send a POST request with valid username and password.
3.  Verify status code `200`.
4.  Parse the JSON response.
5.  Verify that `token` exists.
6.  Verify that `token` is a non-empty string.

### Expected Result

Status `200` is returned and a non-empty authentication token is
provided.

------------------------------------------------------------------------

## 2. Invalid Authentication

Create a Playwright API test using TypeScript to verify authentication
failure.

1.  Use the authentication route constant from `Routes`.
2.  Send invalid username and password.
3.  Verify the documented unsuccessful authentication response.
4.  Parse the response.
5.  Verify the response indicates authentication failure.

### Expected Result

The authentication request is rejected with the expected authentication
failure response.

------------------------------------------------------------------------

# Booking API

## 3. Get All Bookings

Create a Playwright API test to retrieve all bookings.

1.  Use the route constant for retrieving all bookings from `bookerRoutes`.
2.  Send a GET request.
3.  Verify status `200`.
4.  Verify the response body is an array.
5.  Validate the booking IDs returned in the response.

### Expected Result

A booking array is returned with booking IDs.

------------------------------------------------------------------------

## 4. Get Booking by ID

Create a Playwright API test to retrieve one booking.

1.  Use the route constant for retrieving a booking by ID from `bookerRoutes`.
2.  Select a valid booking ID.
3.  Replace the `{id}` path parameter.
4.  Send a GET request.
5.  Verify status `200`.
6.  Validate the important booking properties.
     - `firstname`
    - `lastname`
    - `totalprice`
    - `depositpaid`
    - `bookingdates`:
          {"checkin" :
           "checkout"}                                  `    

### Expected Result

The requested booking is returned with the expected booking details.

------------------------------------------------------------------------

## 5. Get Booking IDs by Name

Create a Playwright API test to retrieve bookings by name.

1.  Use the route constant for retrieving all bookings from `bookerRoutes`.
2.  Provide a valid first name and last name using the supported query
    parameters.
3.  Send a GET request.
4.  Verify status `200`.
5.  Verify the response body is an array.
6.  Verify the returned booking IDs.

### Expected Result

The response contains booking IDs matching the requested name.

------------------------------------------------------------------------

## 6. Get Booking IDs by Date Range

Create a Playwright API test to retrieve bookings by check-in and
check-out dates.

1.  Use the route constant for retrieving all bookings from `bookerRoutes`.
2.  Provide valid check-in and check-out dates using the supported query
    parameters.
3.  Send a GET request.
4.  Verify status `200`.
5.  Verify the response body is an array.
6.  Verify the returned booking IDs.

### Expected Result

The response contains booking IDs matching the requested date filters.

------------------------------------------------------------------------

## 7. Booking CRUD -- Create

Create a Playwright API test to create a booking.

1.  Use the route constant for creating a booking from `bookerRoutes`.
2.  Send a POST request with valid booking data.
3.  Verify status `200`.
4.  Parse the response.
5.  Verify a booking ID is returned.
6.  Verify the response contains the submitted booking information.

### Expected Result

The booking creation request succeeds and a booking ID is returned.

------------------------------------------------------------------------

## 8. Booking CRUD -- Update

Create a Playwright API test to update an existing booking.

1.  Use the route constant for updating a booking from `bookerRoutes`.
2.  Select a valid booking ID.
3.  Authenticate the request using the token or authentication format
    supported by the API.
4.  Send a PUT request with updated booking information.
5.  Verify status `200`.
6.  Verify the response contains the updated values.

### Expected Result

The update request succeeds and the response reflects the requested
changes.

------------------------------------------------------------------------

## 9. Booking CRUD -- Partial Update

Create a Playwright API test to partially update an existing booking.

1.  Use the route constant for partially updating a booking from
    `Routes`.
2.  Select a valid booking ID.
3.  Authenticate the request using the token or authentication format
    supported by the API.
4.  Send a PATCH request with updated booking information.
5.  Verify status `200`.
6.  Verify the response contains the updated values.

### Expected Result

The partial update request succeeds and the response reflects the
requested changes.

------------------------------------------------------------------------

## 10. Booking CRUD -- Delete

Create a Playwright API test to delete an existing booking.

1.  Use the route constant for deleting a booking from `bookerRoutes`.
2.  Select a valid booking ID.
3.  Authenticate the request using the token or authentication format
    supported by the API.
4.  Send a DELETE request.
5.  Verify the documented successful status code.
6.  Validate the response body where applicable.

### Expected Result

The booking deletion request is processed successfully.

------------------------------------------------------------------------

# End-to-End API Workflows

## 11. Booking CRUD Workflow

Create a Playwright API test using TypeScript that validates the
complete Booking CRUD workflow.

Execute these operations in sequence:

1.  Create a booking using the create booking route constant.
2.  Verify status `200`.
3.  Extract the returned booking ID.
4.  Retrieve the same booking using the booking-by-ID route constant.
5.  Verify status `200`.
6.  Update the same booking using the update booking route constant.
7.  Verify status `200`.
8.  Verify the updated booking values.
9.  Delete the same booking using the delete booking route constant.
10. Verify the documented successful status code.

Use the booking ID returned by the create operation for retrieve,
update, and delete.

### Expected Result

The create → retrieve → update → delete workflow completes successfully
using the same generated booking ID.

------------------------------------------------------------------------

# Final Implementation Quality Criteria

The generated API tests must:

-   Use TypeScript and Playwright API testing.
-   Follow the existing project's route constants structure.
-   Validate both status codes and response content.
-   Use strong assertions for important fields.
-   Produce useful failure messages.
-   Avoid duplicated setup where the existing framework already provides
    fixtures.
-   Keep independent tests isolated.
-   Use response chaining only where the prompt explicitly defines a
    workflow.
-   Keep the implementation simple enough for beginners to understand.
