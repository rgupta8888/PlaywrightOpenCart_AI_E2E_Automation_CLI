export const Routes = {

    BASE_URL: process.env.DUMMY_JSON_API_BASE_URL || 'https://dummyjson.com',

    // =========================
    // Common / Utility Routes
    // =========================

    TEST: '/test',
    GET_IP: '/ip',
    GET_OPENAPI_SPEC: '/openapi.json',
    //GET_RESOURCE_WITH_DELAY: '/{resource}?delay={delay}',
    //GET_RESOURCE_WITH_LIMIT_SKIP_SELECT: '/{resource}?limit={limit}&skip={skip}&select={select}',

    // =========================
    // Authentication Routes
    // =========================

    AUTH_LOGIN: '/auth/login',
    AUTH_GET_ME: '/auth/me',
    AUTH_REFRESH: '/auth/refresh',

    // =========================
    // Product Routes
    // =========================

    GET_ALL_PRODUCTS: '/products',
    GET_PRODUCT_BY_ID: '/products/{id}',
    SEARCH_PRODUCTS: '/products/search?q={query}',
    //GET_PRODUCTS_WITH_LIMIT_SKIP: '/products?limit={limit}&skip={skip}',
    //GET_PRODUCTS_WITH_LIMIT_SKIP_SELECT: '/products?limit={limit}&skip={skip}&select={select}',
    GET_PRODUCTS_SORTED: '/products?sortBy={sortBy}&order={order}',
    GET_ALL_CATEGORIES: '/products/categories',
    GET_CATEGORY_LIST: '/products/category-list',
    GET_PRODUCTS_BY_CATEGORY: '/products/category/{category}',
    CREATE_PRODUCT: '/products/add',
    UPDATE_PRODUCT: '/products/{id}',
    DELETE_PRODUCT: '/products/{id}',

    // =========================
    // Cart Routes
    // =========================

    GET_ALL_CARTS: '/carts',
    GET_CART_BY_ID: '/carts/{id}',
    GET_CARTS_BY_USER: '/carts/user/{userId}',
    //GET_CARTS_WITH_LIMIT_SKIP: '/carts?limit={limit}&skip={skip}',
    GET_CARTS_SORTED: '/carts?sortBy={sortBy}&order={order}',
    CREATE_CART: '/carts/add',
    UPDATE_CART: '/carts/{id}',
    DELETE_CART: '/carts/{id}',

    // =========================
    // Recipe Routes
    // =========================

    GET_ALL_RECIPES: '/recipes',
    GET_RECIPE_BY_ID: '/recipes/{id}',
    SEARCH_RECIPES: '/recipes/search?q={query}',
    //GET_RECIPES_WITH_LIMIT_SKIP: '/recipes?limit={limit}&skip={skip}',
    GET_RECIPES_SORTED: '/recipes?sortBy={sortBy}&order={order}',
    GET_ALL_RECIPE_TAGS: '/recipes/tags',
    GET_RECIPES_BY_TAG: '/recipes/tag/{tag}',
    GET_RECIPES_BY_MEAL_TYPE: '/recipes/meal-type/{mealType}',
    CREATE_RECIPE: '/recipes/add',
    UPDATE_RECIPE: '/recipes/{id}',
    DELETE_RECIPE: '/recipes/{id}',

    // =========================
    // User Routes
    // =========================

    GET_ALL_USERS: '/users',
    GET_USER_BY_ID: '/users/{id}',
    SEARCH_USERS: '/users/search?q={query}',
    FILTER_USERS: '/users/filter?key={key}&value={value}',
    //GET_USERS_WITH_LIMIT_SKIP: '/users?limit={limit}&skip={skip}',
    //GET_USERS_WITH_LIMIT_SKIP_SELECT: '/users?limit={limit}&skip={skip}&select={select}',
    GET_USERS_SORTED: '/users?sortBy={sortBy}&order={order}',
    GET_USER_CARTS: '/users/{id}/carts',
    GET_USER_POSTS: '/users/{id}/posts',
    GET_USER_TODOS: '/users/{id}/todos',
    CREATE_USER: '/users/add',
    UPDATE_USER: '/users/{id}',
    DELETE_USER: '/users/{id}',

    // =========================
    // Post Routes
    // =========================

    GET_ALL_POSTS: '/posts',
    GET_POST_BY_ID: '/posts/{id}',
    SEARCH_POSTS: '/posts/search?q={query}',
    //GET_POSTS_WITH_LIMIT_SKIP: '/posts?limit={limit}&skip={skip}',
    //GET_POSTS_WITH_LIMIT_SKIP_SELECT: '/posts?limit={limit}&skip={skip}&select={select}',
    GET_POSTS_SORTED: '/posts?sortBy={sortBy}&order={order}',
    GET_ALL_POST_TAGS: '/posts/tags',
    GET_POST_TAG_LIST: '/posts/tag-list',
    GET_POSTS_BY_TAG: '/posts/tag/{tag}',
    GET_POSTS_BY_USER_ID: '/posts/user/{userId}',
    GET_POST_COMMENTS: '/posts/{id}/comments',
    CREATE_POST: '/posts/add',
    UPDATE_POST: '/posts/{id}',
    DELETE_POST: '/posts/{id}',

    // =========================
    // Comment Routes
    // =========================

    GET_ALL_COMMENTS: '/comments',
    GET_COMMENT_BY_ID: '/comments/{id}',
    //GET_COMMENTS_WITH_LIMIT_SKIP: '/comments?limit={limit}&skip={skip}',
    //GET_COMMENTS_WITH_LIMIT_SKIP_SELECT: '/comments?limit={limit}&skip={skip}&select={select}',
    GET_COMMENTS_SORTED: '/comments?sortBy={sortBy}&order={order}',
    GET_COMMENTS_BY_POST_ID: '/comments/post/{postId}',
    CREATE_COMMENT: '/comments/add',
    UPDATE_COMMENT: '/comments/{id}',
    DELETE_COMMENT: '/comments/{id}',

    // =========================
    // Todo Routes
    // =========================

    GET_ALL_TODOS: '/todos',
    GET_TODO_BY_ID: '/todos/{id}',
    GET_RANDOM_TODO: '/todos/random',
    //GET_TODOS_WITH_LIMIT_SKIP: '/todos?limit={limit}&skip={skip}',
    //GET_TODOS_SORTED: '/todos?sortBy={sortBy}&order={order}',
    GET_TODOS_BY_USER_ID: '/todos/user/{userId}',
    CREATE_TODO: '/todos/add',
    UPDATE_TODO: '/todos/{id}',
    DELETE_TODO: '/todos/{id}',

    // =========================
    // Quote Routes
    // =========================

    GET_ALL_QUOTES: '/quotes',
    GET_QUOTE_BY_ID: '/quotes/{id}',
    GET_RANDOM_QUOTE: '/quotes/random',
    //GET_QUOTES_WITH_LIMIT_SKIP: '/quotes?limit={limit}&skip={skip}',
    GET_QUOTES_SORTED: '/quotes?sortBy={sortBy}&order={order}',

    // =========================
    // Mock HTTP Routes
    // =========================

    /*GET_HTTP_STATUS: '/http/{statusCode}',
    GET_HTTP_STATUS_WITH_MESSAGE: '/http/{statusCode}/{message}',

    // =========================
    // Dynamic Image Routes
    // =========================

    GET_IMAGE_SQUARE: '/image/{size}',
    GET_IMAGE_CUSTOM_SIZE: '/image/{width}x{height}',
    GET_IMAGE_WITH_TEXT: '/image/{size}/?text={text}',
    GET_IMAGE_WITH_COLORS: '/image/{size}/{backgroundColor}/{textColor}',
    GET_IMAGE_WITH_FORMAT: '/image/{size}?type={format}',
    GET_IMAGE_WITH_FONT_FAMILY: '/image/{size}?fontFamily={fontFamily}',
    GET_IMAGE_WITH_FONT_SIZE: '/image/{size}?fontSize={fontSize}'
    */
}
