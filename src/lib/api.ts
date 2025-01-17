import { books, reviews, users } from "./mocks";
import { Book, Review, User } from "./types";

const getAsync = <T>(value: T[]): Promise<T[]> => {
  return new Promise((res) => {
    setTimeout(() => res(value), Math.random() * 1000);
  });
};

export const getBooks = (): Promise<Book[]> => getAsync(books);
export const getUsers = (): Promise<User[]> => getAsync(users);
export const getReviews = (): Promise<Review[]> => getAsync(reviews);
