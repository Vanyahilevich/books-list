import "./styles.css";
import { useEffect, useState, FC } from "react";
import Card from "./Card";
import { Book, BookInformation, Review, User } from "./lib/types";
import { getBooks, getUsers, getReviews } from "./lib/api";

const toBookInformation = (
  book: Book,
  users: User[],
  reviews: Review[]
): BookInformation => {
  const author = users.find((user) => user.id === book.authorId) || {
    id: "unknown",
    name: "Unknown Author",
  };

  const bookReviews = book.reviewIds.map((reviewId) => {
    const review = reviews.find((r) => r.id === reviewId);
    const reviewer = users.find((user) => user.id === review?.userId) || {
      id: "unknown",
      name: "Unknown Reviewer",
    };
    return {
      id: review?.id || "unknown",
      text: review?.text || "No review text",
      user: reviewer,
    };
  });

  return {
    id: book.id,
    name: book.name || "Книга без названия",
    author,
    reviews: bookReviews,
    description: book.description,
  };
};

const App: FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [fetchedBooks, fetchedUsers, fetchedReviews] = await Promise.all([
        getBooks(),
        getUsers(),
        getReviews(),
      ]);
      setBooks(fetchedBooks);
      setUsers(fetchedUsers);
      setReviews(fetchedReviews);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Мои книги:</h1>
      {isLoading && <div>Загрузка...</div>}
      {!isLoading &&
        books.map((b) => (
          <Card key={b.id} book={toBookInformation(b, users, reviews)} />
        ))}
    </div>
  );
};

export default App;
