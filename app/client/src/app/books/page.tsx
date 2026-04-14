import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { getBooks } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="Books"
        title="A small reading shelf for the books that still influence how I think."
        lede="This section is designed like a reading room instead of a bullet list. Each entry carries the main idea I still use when writing software."
      />

      <section className="section-block">
        <div className="book-room">
          {books.map((book, index) => (
            <Reveal className="book-card" delay={index * 60} key={book.title}>
              <div className={`book-cover tone-${(index % 5) + 1}`}>
                <span>{book.title}</span>
                <small>{book.author}</small>
              </div>
              <div className="book-card-copy">
                <p className="mini-label">Book note</p>
                <h2>{book.title}</h2>
                <p className="supporting-text">{book.author}</p>
                <p>{book.summary}</p>
                <div className="takeaway-block">
                  <p className="mini-label">Why it stays</p>
                  <p>{book.takeaway}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
