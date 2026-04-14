import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { getBooks } from "@/lib/site-content";

export const dynamic = "force-dynamic";

const bookColors = ["#2f5d8a", "#6a4f40", "#38614f", "#7a5d42", "#4d5478"];

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <div className="flex flex-col gap-10">
      <PageIntro
        eyebrow="Books"
        lede="Five books I keep returning to when thinking about software quality and system design."
        title="Books"
      />

      <section className="grid gap-4 md:grid-cols-2">
        {books.map((book, index) => (
          <Reveal delay={index * 40} key={book.title}>
            <Card>
              <CardContent className="flex gap-4 p-5">
                <div
                  aria-hidden="true"
                  className="mt-1 h-24 w-4 shrink-0 rounded-full"
                  style={{ backgroundColor: bookColors[index % bookColors.length] }}
                />
                <div className="flex flex-col gap-2">
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight">{book.title}</h2>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                  </div>
                  <p className="text-sm leading-7 text-muted-foreground">{book.summary}</p>
                  <p className="text-sm leading-7 text-foreground/85">{book.takeaway}</p>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
