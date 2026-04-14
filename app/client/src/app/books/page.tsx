import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getBooks } from "@/lib/site-content";

export const dynamic = "force-dynamic";

const bookGradients = [
  "linear-gradient(180deg, #30526b, #183246)",
  "linear-gradient(180deg, #6a4f40, #38261d)",
  "linear-gradient(180deg, #566144, #2e3723)",
  "linear-gradient(180deg, #765944, #432e21)",
  "linear-gradient(180deg, #4b506e, #23263a)",
];

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <div className="flex flex-col gap-14">
      <PageIntro
        eyebrow="Books"
        lede="This page is meant to feel slower and calmer than the project pages. Each entry keeps the focus on why the book still matters in practice."
        title="A reading shelf for the books that still affect how I write software."
      />

      <section className="grid gap-4 xl:grid-cols-2">
        {books.map((book, index) => (
          <Reveal delay={index * 60} key={book.title}>
            <Card className="h-full rounded-[1.8rem] border-border/70">
              <CardContent className="grid gap-4 p-4 sm:grid-cols-[148px_minmax(0,1fr)] sm:p-5">
                <div
                  className="flex min-h-52 flex-col justify-between rounded-[1.3rem] px-4 py-4 text-primary-foreground"
                  style={{ background: bookGradients[index % bookGradients.length] }}
                >
                  <span className="font-serif text-2xl leading-tight">{book.title}</span>
                  <span className="text-xs/6 opacity-90">{book.author}</span>
                </div>

                <div className="flex flex-col gap-4">
                  <CardHeader className="gap-4 px-0">
                    <Badge className="w-fit rounded-full px-3 py-1 uppercase tracking-[0.22em]" variant="outline">
                      Book note
                    </Badge>
                    <CardTitle className="font-serif text-3xl leading-none">{book.title}</CardTitle>
                    <CardDescription className="text-sm leading-7">{book.author}</CardDescription>
                  </CardHeader>
                  <p className="text-sm leading-7 text-muted-foreground">{book.summary}</p>
                  <p className="text-sm leading-7 text-foreground/92">{book.takeaway}</p>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
