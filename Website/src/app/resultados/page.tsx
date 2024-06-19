import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import results from "@/lib/results";
import { Badge } from "@/components/ui/badge";
import { FileSymlink } from "lucide-react";

export default function Resultados() {
  return (
    <main>
      <div className="flex justify-between items-center">
        <h1 className="text-primary">Resultados</h1>
        <div>
          <Badge
            variant={"default"}
            className="text-sm font-light hover:bg-primary"
          >
            Mais recentes
          </Badge>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-2/3">
        {results.map((result) => (
          <Link href={result.link} key={result.id}>
            <Card className="flex flex-row items-center p-4 gap-4 transition-shadow duration-300 hover:shadow-md">
              <div>
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={`/news-img/`}
                    alt={`Imagem do resultado ${result.id}`}
                  />
                  <AvatarFallback>
                    <FileSymlink />
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardContent className="flex flex-col p-0">
                <div className="text-xl font-semibold">{result.title}</div>
                <div className="text-base">{result.authors}</div>
                <div className="text-sm text-foreground/70">{result.date}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
