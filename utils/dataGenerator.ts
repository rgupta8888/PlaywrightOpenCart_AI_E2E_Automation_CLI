import { faker } from "@faker-js/faker";

export class RandomDataUtil {
    // 2.1 Person
    static getFirstName(): string {
        return faker.person.firstName();
    }

    static getLastName(): string {
        return faker.person.lastName();
    }

    static getFullName(): string {
        return faker.person.fullName();
    }

    static getEmail(): string {
        return faker.internet.email();
    }

    static getPhoneNumber(): string {
        return faker.phone.number();
    }

    static getUsername(): string {
        return faker.internet.username();
    }

    static getPassword(length: number = 10): string {
        return faker.internet.password({ length });
    }

    static getCountry(): string {
        return faker.location.country();
    }

    static getState(): string {
        return faker.location.state();
    }

    static getCity(): string {
        return faker.location.city();
    }

    static getStreet(): string {
        return faker.location.street();
    }

    static getStreetAddress(): string {
        return faker.location.streetAddress();
    }

    static getZipCode(): string {
        return faker.location.zipCode();
    }

    static getLatitude(): string {
        return faker.location.latitude().toString();
    }

    static getLongitude(): string {
        return faker.location.longitude().toString();
    }

    // 2.2 Date & Time
    static getCurrentDate(): string {
        return faker.date.recent().toISOString().split("T")[0];
    }

    static getRecentDate(days: number = 10): string {
        return faker.date.recent({ days }).toISOString().split("T")[0];
    }

    static getFutureDate(years: number = 1): string {
        return faker.date.future({ years }).toISOString().split("T")[0];
    }

    static getPastDate(years: number = 1): string {
        return faker.date.past({ years }).toISOString().split("T")[0];
    }

    // 2.3 Commerce
    static getProductName(): string {
        return faker.commerce.productName();
    }

    static getProductDescription(): string {
        return faker.commerce.productDescription();
    }

    static getProductPrice(): string {
        return faker.commerce.price({ min: 1, max: 500, dec: 2 });
    }

    static getDepartment(): string {
        return faker.commerce.department();
    }

    static getImageUrl(): string {
        return faker.image.url();
    }

    static getNumber(): number {
        return faker.number.int({ min: 1, max: 999 });
    }

    // 2.4 API Payload Generators
    static generateInvalidLoginPayload() {
        return {
            username: this.getUsername(),
            password: this.getPassword(),
        };
    }

    static generateProductPayload() {
        return {
            title: this.getProductName(),
            price: Number(this.getProductPrice()),
            description: this.getProductDescription(),
            image: this.getImageUrl(),
            category: this.getDepartment().toLowerCase(),
        };
    }

    static generateUpdatedProductPayload() {
        const payload = this.generateProductPayload();
        return {
            ...payload,
            title: `Updated ${payload.title}`,
        };
    }

    static generateUserPayload() {
        return {
            email: this.getEmail(),
            username: this.getUsername(),
            password: this.getPassword(),
            name: {
                firstname: this.getFirstName(),
                lastname: this.getLastName(),
            },
            address: {
                city: this.getCity(),
                street: this.getStreet(),
                number: this.getNumber(),
                zipcode: this.getZipCode(),
                geolocation: {
                    lat: this.getLatitude(),
                    long: this.getLongitude(),
                },
            },
            phone: this.getPhoneNumber(),
        };
    }

    static generateUserUpdatePayload() {
        const payload = this.generateUserPayload();
        return {
            ...payload,
            username: `updated-${payload.username}`,
        };
    }

    static generateCartPayload(userId: number) {
        return {
            userId,
            date: this.getCurrentDate(),
            products: [
                {
                    productId: this.getNumber(),
                    quantity: this.getNumber(),
                },
            ],
        };
    }

    static generateUpdatedCartPayload(userId: number) {
        return {
            userId,
            date: this.getCurrentDate(),
            products: [
                {
                    productId: this.getNumber(),
                    quantity: this.getNumber(),
                },
            ],
        };
    }

    // 2.5 Restful Booker API Payload Generators
    static generateRestfulBookerAuthPayload() {
        return {
            username: "admin",
            password: "password123",
        };
    }

    static generateBookingPayload() {
        const checkin = this.getCurrentDate();
        const checkout = this.getFutureDate(1);
        return {
            firstname: this.getFirstName(),
            lastname: this.getLastName(),
            totalprice: this.getNumber(),
            depositpaid: faker.datatype.boolean(),
            bookingdates: {
                checkin,
                checkout,
            },
            additionalneeds: faker.lorem.word(),
        };
    }

    static generateUpdatedBookingPayload() {
        const payload = this.generateBookingPayload();
        return {
            ...payload,
            firstname: `Updated ${payload.firstname}`,
        };
    }

    static generatePartialBookingPayload() {
        return {
            firstname: `Updated ${this.getFirstName()}`,
            lastname: this.getLastName(),
        };
    }

    // 2.6 DummyJSON API Payload Generators
    //
    // Reference: https://dummyjson.com/docs
    //
    // These payloads are intended for the DummyJSON API endpoints defined in
    // api/endpoints/dummyJsonroutes.ts. The API requests themselves must be
    // implemented in Playwright API tests, not in RandomDataUtil.

    static generateDummyJsonAuthPayload() {
        return {
            username: this.getUsername(),
            password: this.getPassword(),
        };
    }

    static generateDummyJsonProductPayload() {
        return {
            title: this.getProductName(),
            description: this.getProductDescription(),
            price: Number(this.getProductPrice()),
            discountPercentage: faker.number.int({ min: 5, max: 50 }),
            rating: faker.number.int({ min: 1, max: 5 }),
            stock: faker.number.int({ min: 1, max: 200 }),
            brand: faker.lorem.word(),
            category: this.getDepartment().toLowerCase(),
            thumbnail: this.getImageUrl(),
            images: [this.getImageUrl(), this.getImageUrl()],
        };
    }

    static generateUpdatedDummyJsonProductPayload() {
        const payload = this.generateDummyJsonProductPayload();
        return {
            ...payload,
            title: `Updated ${payload.title}`,
        };
    }

    static generateDummyJsonCartPayload(userId: number) {
        return {
            userId,
            products: [
                {
                    id: this.getNumber(),
                    quantity: this.getNumber(),
                },
            ],
        };
    }

    static generateUpdatedDummyJsonCartPayload(userId: number) {
        return {
            userId,
            products: [
                {
                    id: this.getNumber(),
                    quantity: this.getNumber(),
                },
            ],
        };
    }

    static generateDummyJsonRecipePayload() {
        return {
            name: faker.lorem.words(3),
            ingredients: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
            instructions: [faker.lorem.sentence(), faker.lorem.sentence()],
            prepTimeMinutes: faker.number.int({ min: 5, max: 60 }),
            cookTimeMinutes: faker.number.int({ min: 10, max: 120 }),
            servings: faker.number.int({ min: 1, max: 8 }),
            difficulty: faker.helpers.arrayElement(['easy', 'medium', 'hard']),
            cuisine: faker.lorem.word(),
            caloriesPerServing: faker.number.int({ min: 100, max: 800 }),
            tags: [faker.lorem.word(), faker.lorem.word()],
            userId: 1,
            image: this.getImageUrl(),
            mealType: faker.helpers.arrayElement(['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert']),
        };
    }

    static generateUpdatedDummyJsonRecipePayload() {
        const payload = this.generateDummyJsonRecipePayload();
        return {
            ...payload,
            name: `Updated ${payload.name}`,
        };
    }

    static generateDummyJsonUserPayload() {
        return {
            firstName: this.getFirstName(),
            lastName: this.getLastName(),
            email: this.getEmail(),
            password: this.getPassword(),
            phone: this.getPhoneNumber(),
            username: this.getUsername(),
        };
    }

    static generateUpdatedDummyJsonUserPayload() {
        const payload = this.generateDummyJsonUserPayload();
        return {
            ...payload,
            firstName: `Updated ${payload.firstName}`,
        };
    }

    static generateDummyJsonPostPayload(userId: number) {
        return {
            title: faker.lorem.sentence(),
            body: faker.lorem.paragraph(),
            userId,
            tags: [faker.lorem.word(), faker.lorem.word()],
        };
    }

    static generateUpdatedDummyJsonPostPayload(userId: number) {
        const payload = this.generateDummyJsonPostPayload(userId);
        return {
            ...payload,
            title: `Updated ${payload.title}`,
        };
    }

    static generateDummyJsonCommentPayload(postId: number) {
        return {
            body: faker.lorem.sentence(),
            postId,
            userId: 1,
        };
    }

    static generateUpdatedDummyJsonCommentPayload(postId: number) {
        const payload = this.generateDummyJsonCommentPayload(postId);
        return {
            ...payload,
            body: `Updated ${payload.body}`,
        };
    }

    static generateDummyJsonTodoPayload(userId: number) {
        return {
            todo: faker.lorem.sentence(),
            completed: false,
            userId,
        };
    }

    static generateUpdatedDummyJsonTodoPayload(userId: number) {
        const payload = this.generateDummyJsonTodoPayload(userId);
        return {
            ...payload,
            todo: `Updated ${payload.todo}`,
        };
    }
}