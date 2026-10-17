# Utility Files – Prompts

**Target folder:** `utils/`

## Common Requirements

For every prompt below:

- Create the file in the existing `utils/` folder using TypeScript.
- Use only the existing dependencies already present in `package.json` (`@faker-js/faker`, `mysql2`, `dotenv`, `csv-parse`, `xlsx`).
- Do not add any other methods, classes, interfaces, types, constants, dependencies, validation, logging, or functionality beyond what the prompt specifies.
- Do not change the class names, method names, parameter names, return structures, values, or behavior specified below.
- Use clean, beginner-friendly TypeScript suitable for a Playwright automation framework.
- Do not create any additional files.
- Return only the complete code for the requested file.

---

# 1. Create `helper.ts`

## Prompt

Create or update a file named `helper.ts` in the existing folder `utils`.

Create and export a class named `Helper` with exactly these static methods:

### 1.1 `convertPriceToNumber(price: string): number`

- Remove all characters from the input except digits and the decimal point.
- Convert the resulting value to a number.
- Return the number.

### 1.2 `getProductDetails()`

Return exactly this object structure:

- `productName: "MacBook"`
- `productQuantity: "1"`
- `totalPrice: "$602.00"`

### 1.3 `getLoginDetails()`

Return exactly this object structure:

- `email: "pavanol@xyz.com"`
- `password: "test@123"`

## Expected Result

A `utils/helper.ts` file exporting the `Helper` class with the three specified static methods, used for price conversion and fixed test data.

---

# 2. Create `dataGenerator.ts`

## Prompt

Create or update a file named `dataGenerator.ts` in the existing folder `utils`.

Use the existing `@faker-js/faker` dependency. Import Faker exactly from:

`@faker-js/faker`

Create and export a class named `RandomDataUtil`.

### 2.1 Person

Implement exactly these static methods:

- `getFirstName(): string`
- `getLastName(): string`
- `getFullName(): string`
- `getEmail(): string`
- `getPhoneNumber(): string`
- `getUsername(): string`
- `getPassword(length: number = 10): string`
- `getCountry(): string`
- `getState(): string`
- `getCity(): string`
- `getStreet(): string`
- `getStreetAddress(): string`
- `getZipCode(): string`
- `getLatitude(): string`
- `getLongitude(): string`

Use the corresponding Faker person, internet, and location APIs.

### 2.2 Date & Time

Implement exactly these static methods:

- `getCurrentDate(): string`
- `getRecentDate(days: number = 10): string`
- `getFutureDate(years: number = 1): string`
- `getPastDate(years: number = 1): string`

Use ISO date formatting so the returned value is in `YYYY-MM-DD` format.

### 2.3 Commerce

Implement exactly these static methods:

- `getProductName(): string`
- `getProductDescription(): string`
- `getProductPrice(): string`
- `getDepartment(): string`
- `getImageUrl(): string`
- `getNumber(): number`

For product price, generate a Faker commerce price between `1` and `500` with `2` decimal places.

For `getNumber()`, generate a random integer between `1` and `999`.

### 2.4 API Payload Generators

Reference link: https://documenter.getpostman.com/view/4790112/2sBY4WnGCZ

Implement exactly these static methods:

- `generateInvalidLoginPayload()`
- `generateProductPayload()`
- `generateUpdatedProductPayload()`
- `generateUserPayload()`
- `generateUserUpdatePayload()`
- `generateCartPayload(userId: number)`
- `generateUpdatedCartPayload(userId: number)`

Required return structures:

- `generateInvalidLoginPayload()` must return:
  - `username` generated using `getUsername()`
  - `password` generated using `getPassword()`

- `generateProductPayload()` must return:
  - `title`
  - `price` as a number
  - `description`
  - `image`
  - `category` in lowercase

- `generateUpdatedProductPayload()` must return the same product payload structure, but the title must start with `Updated `.

- `generateUserPayload()` must return this structure:
  - `email`
  - `username`
  - `password`
  - `name`
    - `firstname`
    - `lastname`
  - `address`
    - `city`
    - `street`
    - `number`
    - `zipcode`
    - `geolocation`
      - `lat`
      - `long`
  - `phone`

- `generateUserUpdatePayload()` must return the same user structure, with the username prefixed with `updated-`.

- `generateCartPayload(userId: number)` and `generateUpdatedCartPayload(userId: number)` must return:
  - `userId`
  - `date` in `YYYY-MM-DD` format
  - `products`
    - `productId`
    - `quantity`

Use the existing methods within `RandomDataUtil` wherever applicable instead of duplicating Faker logic.


### 2.5 Restful Booker API Payload Generators

Reference link: https://restful-booker.herokuapp.com/apidoc/index.html

Use the existing `@faker-js/faker` dependency and the existing methods within `RandomDataUtil` wherever applicable.

Implement exactly these additional static methods:

* `generateRestfulBookerAuthPayload()`
* `generateBookingPayload()`
* `generateUpdatedBookingPayload()`
* `generatePartialBookingPayload()`

Required return structures:

* `generateRestfulBookerAuthPayload()` must return:

  * `username: "admin"`
  * `password: "password123"`

* `generateBookingPayload()` must return:

  * `firstname`
  * `lastname`
  * `totalprice` as a number
  * `depositpaid` as a boolean
  * `bookingdates`

    * `checkin` in `YYYY-MM-DD` format
    * `checkout` in `YYYY-MM-DD` format, later than `checkin`
  * `additionalneeds`

* `generateUpdatedBookingPayload()` must return the same booking payload structure, with the `firstname` prefixed with `Updated`.

* `generatePartialBookingPayload()` must return:

  * `firstname` prefixed with `Updated`
  * `lastname`

These payloads are intended for the Restful Booker API endpoints:

* `POST /auth` — Generate an authentication token.
* `POST /booking` — Create a booking.
* `GET /booking` — Retrieve booking IDs.
* `GET /booking/{id}` — Retrieve a booking by ID.
* `PUT /booking/{id}` — Update a complete booking.
* `PATCH /booking/{id}` — Partially update a booking.
* `DELETE /booking/{id}` — Delete a booking.

The API requests themselves must be implemented in Playwright API tests, not in `RandomDataUtil`.

Do not add API request methods, HTTP clients, additional classes, interfaces, types, constants, dependencies, or files.

### Expected Result

The existing `utils/dataGenerator.ts` file exports `RandomDataUtil` with its existing methods and the four additional Restful Booker payload generators, supporting CRUD API testing using Playwright.

### 2.6 DummyJSON API Payload Generators

Reference link: https://dummyjson.com/docs

Use the existing `@faker-js/faker` dependency and the existing methods within `RandomDataUtil` wherever applicable.

Implement exactly these additional static methods:

* `generateDummyJsonAuthPayload()`
* `generateDummyJsonProductPayload()`
* `generateUpdatedDummyJsonProductPayload()`
* `generateDummyJsonCartPayload(userId: number)`
* `generateUpdatedDummyJsonCartPayload(userId: number)`
* `generateDummyJsonRecipePayload()`
* `generateUpdatedDummyJsonRecipePayload()`
* `generateDummyJsonUserPayload()`
* `generateUpdatedDummyJsonUserPayload()`
* `generateDummyJsonPostPayload(userId: number)`
* `generateUpdatedDummyJsonPostPayload(userId: number)`
* `generateDummyJsonCommentPayload(postId: number)`
* `generateUpdatedDummyJsonCommentPayload(postId: number)`
* `generateDummyJsonTodoPayload(userId: number)`
* `generateUpdatedDummyJsonTodoPayload(userId: number)`

Required return structures:

* `generateDummyJsonAuthPayload()` must return:
  * `username` generated using `getUsername()`
  * `password` generated using `getPassword()`

* `generateDummyJsonProductPayload()` must return:
  * `title`
  * `description`
  * `price` as a number
  * `discountPercentage` as a number
  * `rating` as a number
  * `stock` as a number
  * `brand`
  * `category` in lowercase
  * `thumbnail`
  * `images` as an array of two image URLs

* `generateUpdatedDummyJsonProductPayload()` must return the same product payload structure, with the `title` prefixed with `Updated `.

* `generateDummyJsonCartPayload(userId: number)` must return:
  * `userId`
  * `products` as an array of objects with:
    * `id`
    * `quantity`

* `generateUpdatedDummyJsonCartPayload(userId: number)` must return the same cart payload structure.

* `generateDummyJsonRecipePayload()` must return:
  * `name`
  * `ingredients` as an array of strings
  * `instructions` as an array of strings
  * `prepTimeMinutes` as a number
  * `cookTimeMinutes` as a number
  * `servings` as a number
  * `difficulty` — one of `easy`, `medium`, or `hard`
  * `cuisine`
  * `caloriesPerServing` as a number
  * `tags` as an array of strings
  * `userId` as `1`
  * `image`
  * `mealType` — one of `Breakfast`, `Lunch`, `Dinner`, `Snack`, or `Dessert`

* `generateUpdatedDummyJsonRecipePayload()` must return the same recipe payload structure, with the `name` prefixed with `Updated `.

* `generateDummyJsonUserPayload()` must return:
  * `firstName`
  * `lastName`
  * `email`
  * `password`
  * `phone`
  * `username`

* `generateUpdatedDummyJsonUserPayload()` must return the same user payload structure, with the `firstName` prefixed with `Updated `.

* `generateDummyJsonPostPayload(userId: number)` must return:
  * `title`
  * `body`
  * `userId`
  * `tags` as an array of strings

* `generateUpdatedDummyJsonPostPayload(userId: number)` must return the same post payload structure, with the `title` prefixed with `Updated `.

* `generateDummyJsonCommentPayload(postId: number)` must return:
  * `body`
  * `postId`
  * `userId` as `1`

* `generateUpdatedDummyJsonCommentPayload(postId: number)` must return the same comment payload structure, with the `body` prefixed with `Updated `.

* `generateDummyJsonTodoPayload(userId: number)` must return:
  * `todo`
  * `completed` as `false`
  * `userId`

* `generateUpdatedDummyJsonTodoPayload(userId: number)` must return the same todo payload structure, with the `todo` prefixed with `Updated `.

These payloads are intended for the DummyJSON API endpoints defined in `api/endpoints/dummyJsonroutes.ts`:

* `POST /auth/login` — Authenticate a user.
* `POST /products/add` — Create a product.
* `PUT /products/{id}` — Update a product.
* `POST /carts/add` — Create a cart.
* `PUT /carts/{id}` — Update a cart.
* `POST /recipes/add` — Create a recipe.
* `PUT /recipes/{id}` — Update a recipe.
* `POST /users/add` — Create a user.
* `PUT /users/{id}` — Update a user.
* `POST /posts/add` — Create a post.
* `PUT /posts/{id}` — Update a post.
* `POST /comments/add` — Create a comment.
* `PUT /comments/{id}` — Update a comment.
* `POST /todos/add` — Create a todo.
* `PUT /todos/{id}` — Update a todo.

The API requests themselves must be implemented in Playwright API tests, not in `RandomDataUtil`.

Do not add API request methods, HTTP clients, additional classes, interfaces, types, constants, dependencies, or files.

### Expected Result

The existing `utils/dataGenerator.ts` file exports `RandomDataUtil` with its existing methods and the fifteen additional DummyJSON payload generators, supporting CRUD API testing using Playwright.

---

# 3. Create `dbClient.ts`

## Prompt

Create a new file named `dbClient.ts` in the existing folder `utils`.

Use the existing `mysql2` and `dotenv` dependencies.

Import:

- `mysql` from `mysql2/promise`
- `dotenv` from `dotenv`

Call:

`dotenv.config()`

Create and export exactly one asynchronous function:

`executeQuery(sql: string, params?: any[])`

The function must:

1. Create a MySQL connection using `mysql.createConnection()`.
2. Read the following connection details from environment variables:
   - `DB_HOST`
   - `DB_PORT`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`
3. Convert `DB_PORT` to a number when it is available. If it is not available, use `undefined`.
4. Execute the SQL statement using `connection.execute(sql, params)`.
5. Store the returned result.
6. Close the database connection using `await connection.end()`.
7. Return the query result.

Use a single database connection for each `executeQuery()` call.

Do not implement connection pooling.

Do not add transactions, retry logic, logging, custom error handling, validation, classes, interfaces, types, additional functions, or additional database functionality.

## Expected Result

A `utils/dbClient.ts` file exporting an `executeQuery()` function that runs a parameterized SQL query against the configured MySQL database and returns the result.

---

# 4. Create `DataReader.ts`

## Prompt

Create a new file named `DataReader.ts` in the existing folder `utils`.

Use the existing dependencies:

- `fs`
- `csv-parse`
- `xlsx`

Create and export a class named `DataProvider`.

Implement exactly these three static methods:

### 4.1 `readJson(filePath: string)`

- Read the JSON file using `fs.readFileSync(filePath, 'utf8')`.
- Parse the file contents using `JSON.parse()`.
- Return the parsed data.

### 4.2 `readCsv(filePath: string)`

- Read the CSV file using `fs.readFileSync(filePath)`.
- Parse the CSV using `parse()` from `csv-parse/sync`.
- Use these parsing options:
  - `columns: true`
  - `skip_empty_lines: true`
- Return the parsed data.

### 4.3 `readExcel(filePath: string)`

- Read the Excel workbook using `XLSX.readFile(filePath)`.
- Select the first worksheet using `workbook.SheetNames[0]`.
- Get that worksheet from `workbook.Sheets[sheetName]`.
- Convert the worksheet to JSON data using `XLSX.utils.sheet_to_json(worksheet, { header: 1 })`.
- Return the resulting data.

Do not add support for additional file formats.

Do not add sheet-name parameters.

Do not add additional methods, classes, interfaces, types, constants, validation, logging, error handling, or functionality.

## Expected Result

A `utils/DataReader.ts` file exporting the `DataProvider` class with three static methods for reading JSON, CSV, and Excel test data files.

---

## Final Implementation Quality Criteria

The generated utility files must:

- Exist in the `utils/` folder with the exact file names specified.
- Include the four additional Restful Booker payload generators in `RandomDataUtil` without modifying existing utility methods or adding new files or dependencies.
- Export the exact class and function names specified (`Helper`, `RandomDataUtil`, `executeQuery`, `DataProvider`).
- Match the specified method signatures and return structures exactly.
- Reuse existing dependencies only; do not install or invent new ones.
- Use internal `RandomDataUtil` methods instead of duplicating Faker logic where applicable.
- Be simple enough for beginners to understand.
- Be free of extra functionality, logging, or error handling not requested.
