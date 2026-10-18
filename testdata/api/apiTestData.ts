import { DataProvider } from '../../utils/DataReader';
import path from 'path';

const FAKESTORE_PATH = path.resolve(__dirname, './fakestore_testdata.json');
const BOOKER_PATH = path.resolve(__dirname, './booker_testdata.json');
const DUMMYJSON_PATH = path.resolve(__dirname, './dummyjson_testdata.json');

export const fakeStoreData = DataProvider.readJson(FAKESTORE_PATH) as {
    credentials: { valid: { username: string; password: string } };
    sampleIds: { productId: number; userId: number; cartId: number; limit: number };
    dateRange: { startDate: string; endDate: string };
    categories: { validCategory: string };
};

export const bookerData = DataProvider.readJson(BOOKER_PATH) as {
    credentials: { valid: { username: string; password: string } };
    sampleIds: { bookingId: number };
    names: { firstName: string; lastName: string };
    dateRange: { checkin: string; checkout: string };
};

export const dummyJsonData = DataProvider.readJson(DUMMYJSON_PATH) as {
    credentials: { valid: { username: string; password: string } };
    sampleIds: { productId: number; userId: number; cartId: number; recipeId: number; postId: number; commentId: number; todoId: number; quoteId: number };
    searchQueries: { product: string; user: string; post: string; recipe: string };
    filters: { userKey: string; userValue: string };
    categories: { productCategory: string; recipeTag: string; mealType: string; postTag: string };
};