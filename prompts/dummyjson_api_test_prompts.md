# DummyJSON REST API – API Test Prompts

**Base URL:** `https://dummyjson.com`

## Common Requirements

For every prompt:

- Create a **Playwright API test using TypeScript**.
- Use the existing Playwright project/framework structure.
- Use Playwright's `request` fixture / APIRequestContext according to the existing project framework.
- Use the existing `Routes` constants from `api/endpoints/dummyJsonroutes.ts` when the project already defines them.
- Do not invent route names that are not present in the project.
- Keep request construction, response parsing, and assertions clear for beginners.
- Validate status codes, response structure, and important business fields.
- Add meaningful test and assertion messages.
- Avoid weak assertions such as checking only that a response exists.
- Use API response data as input to later operations in workflow tests.
- Keep independent tests independent; do not rely on another test's execution order unless the prompt explicitly requires a workflow.
- For CRUD tests, use deterministic test data and capture returned IDs.
- Where the API's behavior is not guaranteed by the supplied test material, validate the response contract rather than adding unsupported assumptions.

---

# Authentication

## 1. Successful Login

Create a Playwright API test using TypeScript to verify successful authentication.

1. Use `AUTH_LOGIN` from `Routes`.
2. Send a POST request with valid username and password (use `emilys` / `emilyspass` or the project's configured test credentials).
3. Verify status code `200`.
4. Parse the JSON response.
5. Verify that `accessToken` exists.
6. Verify that `accessToken` is a non-empty string.
7. Verify that `refreshToken` exists.

### Expected Result

Status `200` is returned and a non-empty authentication token is provided.

---

## 2. Invalid Login

Create a Playwright API test using TypeScript to verify authentication failure.

1. Use `AUTH_LOGIN` from `Routes`.
2. Send invalid username and password.
3. Verify status code `400`.
4. Parse the response.
5. Verify the response contains an error message.

### Expected Result

Status `400` is returned with the expected authentication error.

---

## 3. Get Authenticated User (Me)

Create a Playwright API test to retrieve the authenticated user's details.

1. Use `AUTH_GET_ME` from `Routes`.
2. First, obtain a valid access token using the login endpoint.
3. Send a GET request with the `Authorization: Bearer {token}` header.
4. Verify status `200`.
5. Verify the response contains user details such as `id`, `email`, `firstName`, `lastName`.

### Expected Result

The authenticated user's details are returned successfully.

---

## 4. Refresh Token

Create a Playwright API test to refresh an authentication token.

1. Use `AUTH_REFRESH` from `Routes`.
2. First, obtain a valid refresh token using the login endpoint.
3. Send a POST request with the refresh token.
4. Verify status `200`.
5. Verify that a new `accessToken` is returned.

### Expected Result

A new access token is returned after refreshing.

---

# Products API

## 5. Get All Products

Create a Playwright API test to retrieve all products.

1. Use `GET_ALL_PRODUCTS` from `Routes`.
2. Send a GET request.
3. Verify status `200`.
4. Verify the response body contains a `products` array.
5. Verify that the array contains at least one product.
6. Validate important fields such as:
   - `id`
   - `title`
   - `price`
   - `category`
   - `thumbnail`

### Expected Result

A non-empty product array is returned with the expected product structure.

---

## 6. Get Product by ID

Create a Playwright API test to retrieve one product.

1. Use `GET_PRODUCT_BY_ID` from `Routes`.
2. Select a valid product ID.
3. Replace the `{id}` path parameter.
4. Send a GET request.
5. Verify status `200`.
6. Verify the returned `id` matches the requested ID.
7. Validate the important product properties.

### Expected Result

The requested product is returned and its ID matches the requested ID.

---

## 7. Search Products

Create a Playwright API test to search for products.

1. Use `SEARCH_PRODUCTS` from `Routes`.
2. Send a GET request with a valid search query.
3. Verify status `200`.
4. Verify the response contains a `products` array.
5. Verify that at least one product matches the search query.

### Expected Result

Products matching the search query are returned.

---

## 8. Sort Products

Create Playwright API tests to verify product sorting.

1. Use `GET_PRODUCTS_SORTED` from `Routes`.
2. Test both ascending and descending sorting (e.g. `sortBy=price&order=asc` and `sortBy=price&order=desc`).
3. Verify status `200` for each request.
4. Extract product prices.
5. Verify the prices follow the requested sort order.

### Expected Result

Product prices follow the requested ascending or descending order.

---

## 9. Get All Product Categories

Create a Playwright API test to retrieve all product categories.

1. Use `GET_ALL_CATEGORIES` from `Routes`.
2. Send a GET request.
3. Verify status `200`.
4. Verify the response is an array.
5. Verify the category list is not empty.

### Expected Result

A non-empty category array is returned.

---

## 10. Get Category List

Create a Playwright API test to retrieve the product category list with slugs.

1. Use `GET_CATEGORY_LIST` from `Routes`.
2. Send a GET request.
3. Verify status `200`.
4. Verify the response is an array.
5. Verify each category entry contains a `slug` and `name`.

### Expected Result

A non-empty category list with slugs is returned.

---

## 11. Get Products by Category

Create a Playwright API test to retrieve products for a specific category.

1. Use `GET_PRODUCTS_BY_CATEGORY` from `Routes`.
2. Use a valid category slug such as `beauty` or `fragrances`.
3. Replace `{category}` with the selected category.
4. Send a GET request.
5. Verify status `200`.
6. Verify the response contains a `products` array.
7. Verify every returned product has the requested category.

### Expected Result

Products for the requested category are returned and each product belongs to that category.

---

## 12. Product CRUD – Create

Create a Playwright API test to create a product.

1. Use `CREATE_PRODUCT` from `Routes`.
2. Send a POST request with valid product data.
3. Verify status `201`.
4. Parse the response.
5. Verify a product ID is returned.
6. Verify the response contains the submitted product information.

### Expected Result

The product creation request succeeds and a product ID is returned.

---

## 13. Product CRUD – Update

Create a Playwright API test to update an existing product.

1. Use `UPDATE_PRODUCT` from `Routes`.
2. First, create a product to obtain a valid ID.
3. Send a PUT request with updated product information.
4. Verify status `200`.
5. Verify the response contains the updated values.
6. Verify the returned product ID matches the requested ID.

### Expected Result

The update request succeeds and the response reflects the requested changes.

---

## 14. Product CRUD – Delete

Create a Playwright API test to delete a product.

1. Use `DELETE_PRODUCT` from `Routes`.
2. First, create a product to obtain a valid ID.
3. Send a DELETE request.
4. Verify status `200`.
5. Verify the response indicates the product was deleted.

### Expected Result

The delete request is processed successfully.

---

# Carts API

## 15. Get All Carts

Create a Playwright API test to retrieve all carts.

1. Use `GET_ALL_CARTS` from `Routes`.
2. Send a GET request.
3. Verify status `200`.
4. Verify the response body contains a `carts` array.
5. Verify the array is not empty.

### Expected Result

A non-empty cart array is returned.

---

## 16. Get Cart by ID

Create a Playwright API test to retrieve a specific cart.

1. Use `GET_CART_BY_ID` from `Routes`.
2. Select a valid cart ID.
3. Replace `{id}`.
4. Send a GET request.
5. Verify status `200`.
6. Verify the returned cart ID matches the requested ID.

### Expected Result

The requested cart is returned with the correct ID.

---

## 17. Get Carts by User

Create a Playwright API test to retrieve carts belonging to a specific user.

1. Use `GET_CARTS_BY_USER` from `Routes`.
2. Provide a valid user ID.
3. Send a GET request.
4. Verify status `200`.
5. Verify the response contains a `carts` array.
6. Verify returned carts belong to the requested user.

### Expected Result

The requested user's carts are returned.

---

## 18. Sort Carts

Create Playwright API tests to verify cart sorting.

1. Use `GET_CARTS_SORTED` from `Routes`.
2. Test ascending and descending sorting.
3. Verify status `200` for each request.
4. Extract cart IDs.
5. Verify IDs are sorted according to the requested order.

### Expected Result

Cart IDs follow the requested sort order.

---

## 19. Cart CRUD – Create

Create a Playwright API test to create a cart.

1. Use `CREATE_CART` from `Routes`.
2. Send a POST request containing a valid user ID and products list.
3. Verify status `201`.
4. Verify a cart ID is returned.
5. Verify the response contains the expected user ID and products.

### Expected Result

The cart is created successfully and its returned data matches the submitted data.

---

## 20. Cart CRUD – Update

Create a Playwright API test to update an existing cart.

1. Use `UPDATE_CART` from `Routes`.
2. First, create a cart to obtain a valid ID.
3. Send a PUT request with updated cart information.
4. Verify status `200`.
5. Verify the response reflects the updated values.

### Expected Result

The cart update succeeds and the requested changes are reflected.

---

## 21. Cart CRUD – Delete

Create a Playwright API test to delete an existing cart.

1. Use `DELETE_CART` from `Routes`.
2. First, create a cart to obtain a valid ID.
3. Send a DELETE request.
4. Verify status `200`.
5. Verify the response indicates the cart was deleted.

### Expected Result

The cart deletion request is processed successfully.

---

# Recipes API

## 22. Get All Recipes

Create a Playwright API test to retrieve all recipes.

1. Use `GET_ALL_RECIPES` from `Routes`.
2. Send a GET request.
3. Verify status `200`.
4. Verify the response body contains a `recipes` array.
5. Verify the array is not empty.
6. Validate important fields such as `id`, `name`, `cuisine`, `difficulty`.

### Expected Result

A non-empty recipe array is returned with the expected recipe structure.

---

## 23. Get Recipe by ID

Create a Playwright API test to retrieve a specific recipe.

1. Use `GET_RECIPE_BY_ID` from `Routes`.
2. Select a valid recipe ID.
3. Replace `{id}`.
4. Send a GET request.
5. Verify status `200`.
6. Verify the returned recipe ID matches the requested ID.

### Expected Result

The requested recipe is returned with the correct ID.

---

## 24. Search Recipes

Create a Playwright API test to search for recipes.

1. Use `SEARCH_RECIPES` from `Routes`.
2. Send a GET request with a valid search query.
3. Verify status `200`.
4. Verify the response contains a `recipes` array.
5. Verify that at least one recipe matches the search query.

### Expected Result

Recipes matching the search query are returned.

---

## 25. Sort Recipes

Create Playwright API tests to verify recipe sorting.

1. Use `GET_RECIPES_SORTED` from `Routes`.
2. Test ascending and descending sorting.
3. Verify status `200` for each request.
4. Verify the results follow the requested sort order.

### Expected Result

Recipes follow the requested sort order.

---

## 26. Get All Recipe Tags

Create a Playwright API test to retrieve all recipe tags.

1. Use `GET_ALL_RECIPE_TAGS` from `Routes`.
2. Send a GET request.
3. Verify status `200`.
4. Verify the response is an array.
5. Verify the array is not empty.

### Expected Result

A non-empty recipe tags array is returned.

---

## 27. Get Recipes by Tag

Create a Playwright API test to retrieve recipes for a specific tag.

1. Use `GET_RECIPES_BY_TAG` from `Routes`.
2. Use a valid tag such as `Italian` or `Dessert`.
3. Replace `{tag}` with the selected tag.
4. Send a GET request.
5. Verify status `200`.
6. Verify the response contains a `recipes` array.
7. Verify the array is not empty.

### Expected Result

Recipes for the requested tag are returned.

---

## 28. Get Recipes by Meal Type

Create a Playwright API test to retrieve recipes for a specific meal type.

1. Use `GET_RECIPES_BY_MEAL_TYPE` from `Routes`.
2. Use a valid meal type such as `Breakfast` or `Dinner`.
3. Replace `{mealType}` with the selected meal type.
4. Send a GET request.
5. Verify status `200`.
6. Verify the response contains a `recipes` array.
7. Verify the array is not empty.

### Expected Result

Recipes for the requested meal type are returned.

---

## 29. Recipe CRUD – Create

Create a Playwright API test to create a recipe.

1. Use `CREATE_RECIPE` from `Routes`.
2. Send a POST request with valid recipe data.
3. Verify status `201`.
4. Verify a recipe ID is returned.
5. Verify the response contains the submitted recipe information.

### Expected Result

The recipe creation request succeeds and a recipe ID is returned.

---

## 30. Recipe CRUD – Update

Create a Playwright API test to update an existing recipe.

1. Use `UPDATE_RECIPE` from `Routes`.
2. First, create a recipe to obtain a valid ID.
3. Send a PUT request with updated recipe information.
4. Verify status `200`.
5. Verify the response contains the updated values.

### Expected Result

The update request succeeds and the response reflects the requested changes.

---

## 31. Recipe CRUD – Delete

Create a Playwright API test to delete a recipe.

1. Use `DELETE_RECIPE` from `Routes`.
2. First, create a recipe to obtain a valid ID.
3. Send a DELETE request.
4. Verify status `200`.
5. Verify the response indicates the recipe was deleted.

### Expected Result

The delete request is processed successfully.

---

# Users API

## 32. Get All Users

Create a Playwright API test to retrieve all users.

1. Use `GET_ALL_USERS` from `Routes`.
2. Send a GET request.
3. Verify status `200`.
4. Verify the response body contains a `users` array.
5. Verify the array is not empty.

### Expected Result

A non-empty user array is returned.

---

## 33. Get User by ID

Create a Playwright API test to retrieve a specific user.

1. Use `GET_USER_BY_ID` from `Routes`.
2. Select a valid user ID.
3. Replace `{id}`.
4. Send a GET request.
5. Verify status `200`.
6. Verify the returned user ID matches the requested ID.

### Expected Result

The requested user is returned with the correct ID.

---

## 34. Search Users

Create a Playwright API test to search for users.

1. Use `SEARCH_USERS` from `Routes`.
2. Send a GET request with a valid search query.
3. Verify status `200`.
4. Verify the response contains a `users` array.
5. Verify that at least one user matches the search query.

### Expected Result

Users matching the search query are returned.

---

## 35. Filter Users

Create a Playwright API test to filter users by a specific key/value.

1. Use `FILTER_USERS` from `Routes`.
2. Use a valid key such as `hair.color` and a valid value such as `Brown`.
3. Replace `{key}` and `{value}`.
4. Send a GET request.
5. Verify status `200`.
6. Verify the response contains a `users` array.
7. Verify the filtered results match the requested criteria.

### Expected Result

Filtered users matching the requested criteria are returned.

---

## 36. Sort Users

Create Playwright API tests to verify user sorting.

1. Use `GET_USERS_SORTED` from `Routes`.
2. Test ascending and descending sorting.
3. Verify status `200` for each request.
4. Extract user IDs.
5. Verify the IDs follow the requested sort order.

### Expected Result

User IDs follow the requested ascending or descending order.

---

## 37. Get User Carts

Create a Playwright API test to retrieve carts for a specific user.

1. Use `GET_USER_CARTS` from `Routes`.
2. Provide a valid user ID.
3. Replace `{id}`.
4. Send a GET request.
5. Verify status `200`.
6. Verify the response contains a `carts` array.

### Expected Result

The requested user's carts are returned.

---

## 38. Get User Posts

Create a Playwright API test to retrieve posts for a specific user.

1. Use `GET_USER_POSTS` from `Routes`.
2. Provide a valid user ID.
3. Replace `{id}`.
4. Send a GET request.
5. Verify status `200`.
6. Verify the response contains a `posts` array.

### Expected Result

The requested user's posts are returned.

---

## 39. Get User Todos

Create a Playwright API test to retrieve todos for a specific user.

1. Use `GET_USER_TODOS` from `Routes`.
2. Provide a valid user ID.
3. Replace `{id}`.
4. Send a GET request.
5. Verify status `200`.
6. Verify the response contains a `todos` array.

### Expected Result

The requested user's todos are returned.

---

## 40. User CRUD – Create

Create a Playwright API test to create a user.

1. Use `CREATE_USER` from `Routes`.
2. Send a POST request with valid user information.
3. Verify status `201`.
4. Verify a generated user ID is returned.
5. Validate the returned user information.

### Expected Result

The user is created successfully and a user ID is returned.

---

## 41. User CRUD – Update

Create a Playwright API test to update a user.

1. Use `UPDATE_USER` from `Routes`.
2. First, create a user to obtain a valid ID.
3. Send a PUT request with updated user information.
4. Verify status `200`.
5. Verify the response contains the updated values.

### Expected Result

The update request succeeds and the response contains the requested changes.

---

## 42. User CRUD – Delete

Create a Playwright API test to delete a user.

1. Use `DELETE_USER` from `Routes`.
2. First, create a user to obtain a valid ID.
3. Send a DELETE request.
4. Verify status `200`.
5. Verify the response indicates the user was deleted.

### Expected Result

The delete request is processed successfully.

---

# Posts API

## 43. Get All Posts

Create a Playwright API test to retrieve all posts.

1. Use `GET_ALL_POSTS` from `Routes`.
2. Send a GET request.
3. Verify status `200`.
4. Verify the response body contains a `posts` array.
5. Verify the array is not empty.
6. Validate important fields such as `id`, `title`, `body`, `userId`.

### Expected Result

A non-empty post array is returned with the expected post structure.

---

## 44. Get Post by ID

Create a Playwright API test to retrieve a specific post.

1. Use `GET_POST_BY_ID` from `Routes`.
2. Select a valid post ID.
3. Replace `{id}`.
4. Send a GET request.
5. Verify status `200`.
6. Verify the returned post ID matches the requested ID.

### Expected Result

The requested post is returned with the correct ID.

---

## 45. Search Posts

Create a Playwright API test to search for posts.

1. Use `SEARCH_POSTS` from `Routes`.
2. Send a GET request with a valid search query.
3. Verify status `200`.
4. Verify the response contains a `posts` array.
5. Verify that at least one post matches the search query.

### Expected Result

Posts matching the search query are returned.

---

## 46. Sort Posts

Create Playwright API tests to verify post sorting.

1. Use `GET_POSTS_SORTED` from `Routes`.
2. Test ascending and descending sorting.
3. Verify status `200` for each request.
4. Verify the results follow the requested sort order.

### Expected Result

Posts follow the requested sort order.

---

## 47. Get All Post Tags

Create a Playwright API test to retrieve all post tags.

1. Use `GET_ALL_POST_TAGS` from `Routes`.
2. Send a GET request.
3. Verify status `200`.
4. Verify the response is an array.
5. Verify the array is not empty.

### Expected Result

A non-empty post tags array is returned.

---

## 48. Get Post Tag List

Create a Playwright API test to retrieve the post tag list.

1. Use `GET_POST_TAG_LIST` from `Routes`.
2. Send a GET request.
3. Verify status `200`.
4. Verify the response is an array.
5. Verify the array is not empty.

### Expected Result

A non-empty post tag list is returned.

---

## 49. Get Posts by Tag

Create a Playwright API test to retrieve posts for a specific tag.

1. Use `GET_POSTS_BY_TAG` from `Routes`.
2. Use a valid tag.
3. Replace `{tag}` with the selected tag.
4. Send a GET request.
5. Verify status `200`.
6. Verify the response contains a `posts` array.
7. Verify the array is not empty.

### Expected Result

Posts for the requested tag are returned.

---

## 50. Get Posts by User ID

Create a Playwright API test to retrieve posts by a specific user.

1. Use `GET_POSTS_BY_USER_ID` from `Routes`.
2. Provide a valid user ID.
3. Replace `{userId}`.
4. Send a GET request.
5. Verify status `200`.
6. Verify the response contains a `posts` array.

### Expected Result

The requested user's posts are returned.

---

## 51. Get Post Comments

Create a Playwright API test to retrieve comments for a specific post.

1. Use `GET_POST_COMMENTS` from `Routes`.
2. Select a valid post ID.
3. Replace `{id}`.
4. Send a GET request.
5. Verify status `200`.
6. Verify the response contains a `comments` array.

### Expected Result

Comments for the requested post are returned.

---

## 52. Post CRUD – Create

Create a Playwright API test to create a post.

1. Use `CREATE_POST` from `Routes`.
2. Send a POST request with valid post data.
3. Verify status `201`.
4. Verify a post ID is returned.
5. Verify the response contains the submitted post information.

### Expected Result

The post creation request succeeds and a post ID is returned.

---

## 53. Post CRUD – Update

Create a Playwright API test to update an existing post.

1. Use `UPDATE_POST` from `Routes`.
2. First, create a post to obtain a valid ID.
3. Send a PUT request with updated post information.
4. Verify status `200`.
5. Verify the response contains the updated values.

### Expected Result

The update request succeeds and the response reflects the requested changes.

---

## 54. Post CRUD – Delete

Create a Playwright API test to delete a post.

1. Use `DELETE_POST` from `Routes`.
2. First, create a post to obtain a valid ID.
3. Send a DELETE request.
4. Verify status `200`.
5. Verify the response indicates the post was deleted.

### Expected Result

The delete request is processed successfully.

---

# Comments API

## 55. Get All Comments

Create a Playwright API test to retrieve all comments.

1. Use `GET_ALL_COMMENTS` from `Routes`.
2. Send a GET request.
3. Verify status `200`.
4. Verify the response body contains a `comments` array.
5. Verify the array is not empty.
6. Validate important fields such as `id`, `body`, `postId`, `userId`.

### Expected Result

A non-empty comment array is returned with the expected comment structure.

---

## 56. Get Comment by ID

Create a Playwright API test to retrieve a specific comment.

1. Use `GET_COMMENT_BY_ID` from `Routes`.
2. Select a valid comment ID.
3. Replace `{id}`.
4. Send a GET request.
5. Verify status `200`.
6. Verify the returned comment ID matches the requested ID.

### Expected Result

The requested comment is returned with the correct ID.

---

## 57. Sort Comments

Create Playwright API tests to verify comment sorting.

1. Use `GET_COMMENTS_SORTED` from `Routes`.
2. Test ascending and descending sorting.
3. Verify status `200` for each request.
4. Verify the results follow the requested sort order.

### Expected Result

Comments follow the requested sort order.

---

## 58. Get Comments by Post ID

Create a Playwright API test to retrieve comments for a specific post.

1. Use `GET_COMMENTS_BY_POST_ID` from `Routes`.
2. Provide a valid post ID.
3. Replace `{postId}`.
4. Send a GET request.
5. Verify status `200`.
6. Verify the response contains a `comments` array.
7. Verify the array is not empty.

### Expected Result

Comments for the requested post are returned.

---

## 59. Comment CRUD – Create

Create a Playwright API test to create a comment.

1. Use `CREATE_COMMENT` from `Routes`.
2. Send a POST request with valid comment data.
3. Verify status `201`.
4. Verify a comment ID is returned.
5. Verify the response contains the submitted comment information.

### Expected Result

The comment creation request succeeds and a comment ID is returned.

---

## 60. Comment CRUD – Update

Create a Playwright API test to update an existing comment.

1. Use `UPDATE_COMMENT` from `Routes`.
2. First, create a comment to obtain a valid ID.
3. Send a PUT request with updated comment information.
4. Verify status `200`.
5. Verify the response contains the updated values.

### Expected Result

The update request succeeds and the response reflects the requested changes.

---

## 61. Comment CRUD – Delete

Create a Playwright API test to delete a comment.

1. Use `DELETE_COMMENT` from `Routes`.
2. First, create a comment to obtain a valid ID.
3. Send a DELETE request.
4. Verify status `200`.
5. Verify the response indicates the comment was deleted.

### Expected Result

The delete request is processed successfully.

---

# Todos API

## 62. Get All Todos

Create a Playwright API test to retrieve all todos.

1. Use `GET_ALL_TODOS` from `Routes`.
2. Send a GET request.
3. Verify status `200`.
4. Verify the response body contains a `todos` array.
5. Verify the array is not empty.
6. Validate important fields such as `id`, `todo`, `completed`, `userId`.

### Expected Result

A non-empty todo array is returned with the expected todo structure.

---

## 63. Get Todo by ID

Create a Playwright API test to retrieve a specific todo.

1. Use `GET_TODO_BY_ID` from `Routes`.
2. Select a valid todo ID.
3. Replace `{id}`.
4. Send a GET request.
5. Verify status `200`.
6. Verify the returned todo ID matches the requested ID.

### Expected Result

The requested todo is returned with the correct ID.

---

## 64. Get Random Todo

Create a Playwright API test to retrieve a random todo.

1. Use `GET_RANDOM_TODO` from `Routes`.
2. Send a GET request.
3. Verify status `200`.
4. Verify the response contains a `todo` field.
5. Verify the response contains an `id` field.

### Expected Result

A random todo is returned with the expected structure.

---

## 65. Get Todos by User ID

Create a Playwright API test to retrieve todos for a specific user.

1. Use `GET_TODOS_BY_USER_ID` from `Routes`.
2. Provide a valid user ID.
3. Replace `{userId}`.
4. Send a GET request.
5. Verify status `200`.
6. Verify the response contains a `todos` array.

### Expected Result

The requested user's todos are returned.

---

## 66. Todo CRUD – Create

Create a Playwright API test to create a todo.

1. Use `CREATE_TODO` from `Routes`.
2. Send a POST request with valid todo data.
3. Verify status `201`.
4. Verify a todo ID is returned.
5. Verify the response contains the submitted todo information.

### Expected Result

The todo creation request succeeds and a todo ID is returned.

---

## 67. Todo CRUD – Update

Create a Playwright API test to update an existing todo.

1. Use `UPDATE_TODO` from `Routes`.
2. First, create a todo to obtain a valid ID.
3. Send a PUT request with updated todo information.
4. Verify status `200`.
5. Verify the response contains the updated values.

### Expected Result

The update request succeeds and the response reflects the requested changes.

---

## 68. Todo CRUD – Delete

Create a Playwright API test to delete a todo.

1. Use `DELETE_TODO` from `Routes`.
2. First, create a todo to obtain a valid ID.
3. Send a DELETE request.
4. Verify status `200`.
5. Verify the response indicates the todo was deleted.

### Expected Result

The delete request is processed successfully.

---

# Quotes API

## 69. Get All Quotes

Create a Playwright API test to retrieve all quotes.

1. Use `GET_ALL_QUOTES` from `Routes`.
2. Send a GET request.
3. Verify status `200`.
4. Verify the response body contains a `quotes` array.
5. Verify the array is not empty.
6. Validate important fields such as `id`, `quote`, `author`.

### Expected Result

A non-empty quote array is returned with the expected quote structure.

---

## 70. Get Quote by ID

Create a Playwright API test to retrieve a specific quote.

1. Use `GET_QUOTE_BY_ID` from `Routes`.
2. Select a valid quote ID.
3. Replace `{id}`.
4. Send a GET request.
5. Verify status `200`.
6. Verify the returned quote ID matches the requested ID.

### Expected Result

The requested quote is returned with the correct ID.

---

## 71. Get Random Quote

Create a Playwright API test to retrieve a random quote.

1. Use `GET_RANDOM_QUOTE` from `Routes`.
2. Send a GET request.
3. Verify status `200`.
4. Verify the response contains a `quote` field.
5. Verify the response contains an `author` field.

### Expected Result

A random quote is returned with the expected structure.

---

# End-to-End API Workflows

## 72. Product CRUD Workflow

Create a Playwright API test using TypeScript that validates the complete Product CRUD workflow.

Execute these operations in sequence:

1. Create a product using `CREATE_PRODUCT`.
2. Verify status `201`.
3. Extract the returned product ID.
4. Update the same product using `UPDATE_PRODUCT`.
5. Verify status `200`.
6. Verify the updated product values.
7. Delete the same product using `DELETE_PRODUCT`.
8. Verify status `200`.

Use the product ID returned by the create operation for both update and delete.

### Expected Result

The create → update → delete workflow completes successfully using the same generated product ID.

---

## 73. User CRUD Workflow

Create a Playwright API test using TypeScript that validates the complete User CRUD workflow.

Execute these operations in sequence:

1. Create a user using `CREATE_USER`.
2. Verify status `201`.
3. Extract the returned user ID.
4. Update the same user using `UPDATE_USER`.
5. Verify status `200`.
6. Verify the updated user information.
7. Delete the same user using `DELETE_USER`.
8. Verify status `200`.

Use response data from each step as input for the next operation.

### Expected Result

The create → update → delete workflow completes successfully using the same generated user ID.

---

## 74. Cart CRUD Workflow

Create a Playwright API test using TypeScript that validates the complete Cart CRUD workflow.

Execute these operations in sequence:

1. Create a cart using `CREATE_CART`.
2. Verify status `201`.
3. Extract the returned cart ID.
4. Update the same cart using `UPDATE_CART`.
5. Verify status `200`.
6. Verify the updated cart values.
7. Delete the same cart using `DELETE_CART`.
8. Verify status `200`.

Use the generated cart ID for both update and delete.

### Expected Result

The create → update → delete workflow completes successfully using the same generated cart ID.

---

## 75. Recipe CRUD Workflow

Create a Playwright API test using TypeScript that validates the complete Recipe CRUD workflow.

Execute these operations in sequence:

1. Create a recipe using `CREATE_RECIPE`.
2. Verify status `201`.
3. Extract the returned recipe ID.
4. Update the same recipe using `UPDATE_RECIPE`.
5. Verify status `200`.
6. Verify the updated recipe values.
7. Delete the same recipe using `DELETE_RECIPE`.
8. Verify status `200`.

Use the generated recipe ID for both update and delete.

### Expected Result

The create → update → delete workflow completes successfully using the same generated recipe ID.

---

## 76. Post CRUD Workflow

Create a Playwright API test using TypeScript that validates the complete Post CRUD workflow.

Execute these operations in sequence:

1. Create a post using `CREATE_POST`.
2. Verify status `201`.
3. Extract the returned post ID.
4. Update the same post using `UPDATE_POST`.
5. Verify status `200`.
6. Verify the updated post values.
7. Delete the same post using `DELETE_POST`.
8. Verify status `200`.

Use the generated post ID for both update and delete.

### Expected Result

The create → update → delete workflow completes successfully using the same generated post ID.

---

## 77. Comment CRUD Workflow

Create a Playwright API test using TypeScript that validates the complete Comment CRUD workflow.

Execute these operations in sequence:

1. Create a comment using `CREATE_COMMENT`.
2. Verify status `201`.
3. Extract the returned comment ID.
4. Update the same comment using `UPDATE_COMMENT`.
5. Verify status `200`.
6. Verify the updated comment values.
7. Delete the same comment using `DELETE_COMMENT`.
8. Verify status `200`.

Use the generated comment ID for both update and delete.

### Expected Result

The create → update → delete workflow completes successfully using the same generated comment ID.

---

## 78. Todo CRUD Workflow

Create a Playwright API test using TypeScript that validates the complete Todo CRUD workflow.

Execute these operations in sequence:

1. Create a todo using `CREATE_TODO`.
2. Verify status `201`.
3. Extract the returned todo ID.
4. Update the same todo using `UPDATE_TODO`.
5. Verify status `200`.
6. Verify the updated todo values.
7. Delete the same todo using `DELETE_TODO`.
8. Verify status `200`.

Use the generated todo ID for both update and delete.

### Expected Result

The create → update → delete workflow completes successfully using the same generated todo ID.

---

# Final Implementation Quality Criteria

The generated API tests must:

- Use TypeScript and Playwright API testing.
- Follow the existing project's `Routes` structure from `api/endpoints/dummyJsonroutes.ts`.
- Validate both status codes and response content.
- Use strong assertions for important fields.
- Produce useful failure messages.
- Avoid duplicated setup where the existing framework already provides fixtures.
- Keep independent tests isolated.
- Use response chaining only where the prompt explicitly defines a workflow.
- Keep the implementation simple enough for beginners to understand.