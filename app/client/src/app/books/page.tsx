import { BookShelfCard } from "@/components/prototype-ui";
import { getBooks } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <div className="page-wrapper">
      <section className="section">
        <div className="container">
          <div className="section-label">Books</div>
          <h1 className="section-title">Current shelf.</h1>
          <p className="section-sub">Continuous learning sits underneath the architectural mindset. These are the books shaping how I build.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 16 }}>
            {books.map((book, index) => (
              <BookShelfCard book={book} index={index} key={book.title} />
            ))}
          </div>
          <div style={{ height: 8, background: "var(--secondary)", borderRadius: "0 0 4px 4px", border: "1px solid var(--border)", borderTop: "2px solid var(--border-strong)" }} />
        </div>
      </section>
    </div>
  );
}
