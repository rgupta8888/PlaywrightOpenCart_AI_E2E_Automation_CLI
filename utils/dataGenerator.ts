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
}