import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { getBooks } from "@/lib/site-content";

export const dynamic = "force-dynamic";

const bookColors = ["#2f5d8a", "#6a4f40", "#38614f", "#7a5d42", "#4d5478"];

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <div className="flex flex-col gap-16">
      <PageIntro
        eyebrow="Bookshelf"
        lede="A small shelf of books I keep returning to when thinking about software quality, architecture, and engineering judgment."
        title="Current shelf"
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {books.map((book, index) => (
          <Reveal delay={index * 40} key={book.title}>
            <Card>
              <CardContent className="flex h-full flex-col gap-6 p-6">
                <div
                  className="flex aspect-[3/4] items-end rounded-[0.55rem] p-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]"
                  style={{
                    background: `linear-gradient(160deg, ${bookColors[index % bookColors.length]} 0%, #111827 100%)`,
                  }}
                >
                  <div className="flex flex-col gap-2">
                    <p className="text-[0.56rem] font-semibold uppercase tracking-[0.28em] text-white/70">Book note</p>
                    <h2 className="font-serif text-[1.9rem] leading-tight tracking-[-0.03em]">{book.title}</h2>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-medium text-foreground">{book.author}</p>
                  <p className="text-sm leading-7 text-muted-foreground">{book.summary}</p>
                  <p className="text-sm leading-7 text-foreground/88">{book.takeaway}</p>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
