# IndiGo One-Way Flight Booking -- E2E Test Prompts

**Application URL:** `https://www.goindigo.in/`

## Common Requirements

For every prompt:

-   Create a **Playwright web E2E test using TypeScript**.
-   Use the existing Playwright project/framework structure.
-   Use the existing Page Object Model, fixtures, utilities, and
    test-data patterns where they already exist in the project.
-   Keep the test readable and understandable for beginners.
-   Use Playwright locators based on accessible roles, labels,
    placeholders, and stable attributes wherever possible.
-   Do not use XPath.
-   Avoid fixed timeouts where a Playwright auto-waiting assertion or
    locator wait can be used.
-   Validate important page content and workflow state instead of
    checking only that an element exists.
-   Handle date selection dynamically using the current date; do not
    hardcode a date that will become invalid.
-   Use valid test passenger details and do not use real personal
    information.
-   Do not complete payment or create a real booking. Stop before any
    payment submission or final booking confirmation.
-   If the website presents a CAPTCHA, OTP, access restriction, or other
    anti-automation challenge, do not attempt to bypass it; report the
    test as blocked by that challenge.
-   If the website UI changes, inspect the current page and update
    locators to match the actual UI instead of inventing selectors.
-   Keep this scope limited to the E2E workflow below. Do not create API
    tests, schema tests, or additional test cases.

------------------------------------------------------------------------

# One-Way Flight Booking E2E Workflow

## 1. Search and Select a One-Way Flight

Create a Playwright E2E test using TypeScript to verify the one-way
flight search and selection workflow on IndiGo.

1.  Open `https://www.goindigo.in/`.
2.  Verify that the **Flights**, **IndiGo Cards**, and **Hotels** menu
    options are displayed on the home page.
3.  Select **One Way** as the trip type.
4.  Select any valid departure city and arrival city that are different
    from each other.
5.  Verify that the selected departure and arrival destinations are
    displayed correctly in the search form.
6.  Select a departure date within the next 7 calendar days from the
    current date, using a date that is selectable in the calendar.
7.  Select **1 Adult** and **1 Senior Citizen** in the passenger
    selector.
8.  Verify that the passenger selector reflects one adult and one senior
    citizen.
9.  Complete any required passenger-selector confirmation action, such
    as **Done**, if displayed.
10. Click **Search Flights**.
11. Verify that the flight selection page is displayed.
12. Verify that the departure city and arrival city on the flight
    selection page match the destinations selected on the home page.
13. Verify that the selected departure date is displayed correctly on
    the flight selection page.
14. Verify that available flight options are displayed. If no flights
    are available for the selected route and date, report the test as
    blocked by unavailable test data rather than selecting an invalid
    option.
15. Identify the lowest-priced available **Economy** fare among the
    displayed eligible flight options and select it. Compare the
    displayed payable fare consistently across the available Economy
    options; do not assume the first result is the cheapest.
16. Open **View Details** for the selected flight.
17. Verify that the flight details show the correct source and
    destination.
18. Verify that the selected flight and fare details are displayed.
19. Click **Next** to continue.
20. Click **Confirm and Proceed** if that action is displayed.
21. Verify that the passenger details page is displayed.
22. Enter valid test details for the adult passenger in the required
    adult passenger fields.
23. Enter valid test details for the senior citizen passenger in the
    required senior citizen passenger fields if the page requests them.
24. Verify that the entered passenger details are accepted by the form
    and that no passenger-detail validation errors are displayed.
25. Accept the displayed terms and conditions checkbox, if required.
26. Click **Proceed** to continue.
27. Verify that the workflow advances to the next expected page or
    displays the expected next-step state.
28. Stop before payment submission or final booking confirmation. Do not
    make a real booking or payment.

### Expected Result

The user can search for a one-way flight with one adult and one senior
citizen, view available flights, select the lowest-priced available
Economy fare, verify the route details, proceed to passenger details,
enter valid test passenger information, accept the required terms, and
advance to the next step without completing payment or final booking
confirmation.

### Test Data and Execution Notes

-   **From:** Use any valid airport/city available in the current IndiGo
    search form.
-   **To:** Use a different valid airport/city available in the current
    IndiGo search form.
-   **Departure date:** Dynamically choose a selectable date from
    tomorrow through the next 7 calendar days, inclusive where supported
    by the calendar.
-   **Passengers:** 1 Adult and 1 Senior Citizen.
-   **Adult passenger:** Use synthetic test data that satisfies the
    form's required-field validation.
-   **Senior citizen passenger:** Use synthetic details for a passenger
    aged 60 or older, if date of birth is required.
-   **Fare selection:** Select the lowest displayed available Economy
    fare for the chosen route and date. Re-evaluate fares from the
    current results rather than relying on a fixed price.
-   **Senior citizen fare:** The availability of a senior-citizen
    discount may depend on the route, fare, and departure date. Verify
    the selected passenger category and displayed fare without assuming
    a discount is always available.
-   **Safety:** Do not enter payment details, submit a payment, or
    finalize a booking.

------------------------------------------------------------------------
