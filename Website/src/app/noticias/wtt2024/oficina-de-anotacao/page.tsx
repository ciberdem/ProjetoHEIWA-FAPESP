import Link from "next/link";
import Image from "next/image";

const doccanoLink = "https://github.com/doccano/doccano";

export default function Page() {
  return (
    <main>
      <div className="flex flex-col w-2/3">
        <div className="pb-4">
          <h1 className="text-primary pb-0">
            WTT 2024: Oficina de anotação de dados de redes sociais
          </h1>
          <h3 className="text-foreground/50">Publicado em 14/04/2024</h3>
        </div>
        <div className="flex flex-col">
          <div className="indent-8 text-justify">
            Na manhã de 02 de Abril de 2024, os membros do Projeto HEIWA
            conduziram uma oficina de anotação de base de dados no WTT 2024, o
            Workshop de Tendências Tecnológicas, realizado pela Faculdade de
            Computação e Informática da Universidade Presbiteriana Mackenzie. O
            objetivo era, com a ajuda do público, classificar aspectos da base
            de dados utilizada pelo projeto.
          </div>
          <div className="flex justify-center">
            <Image
              className="pt-4 pb-2"
              src="/wtt2024/oficina-anotacao/firstpic.jpg"
              alt="Oficina de anotação"
              width={(1 / 2) * 1600}
              height={(1 / 2) * 900}
            />
          </div>
          <div className="flex justify-center text-xs font-semibold pb-8">
            Membros do Projeto HEIWA e participantes da oficina de anotação
          </div>
          <div className="indent-8 text-justify">
            Realizou-se um recorte de aproximadamente 800 tweets a serem
            anotados pelos participantes da oficina. Os tweets estavam
            contextualizados no dia 08 de Janeiro de 2023, marcado pela invasão
            aos Três Poderes em Brasília. Foram feitos três diferentes tipos de
            anotação para cada tweet:{" "}
            <strong className="font-semibold">
              Reconhecimento de entidades nomeadas
            </strong>
            , <strong className="font-semibold">detecção de ironia</strong> e{" "}
            <strong className="font-semibold">detecção de posição</strong>. A
            ferramenta de anotação utilizada foi o{" "}
            <Link href={doccanoLink} target="_blank">
              <strong className="font-semibold">doccano</strong>
            </Link>
            .
          </div>

          <div className="flex justify-center">
            <Image
              className="pb-2 pt-8"
              src="/wtt2024/oficina-anotacao/secpic.jpg"
              alt="Oficina de anotação"
              width={(1 / 2) * 1200}
              height={(1 / 2) * 1005}
            />
          </div>
          <div className="flex justify-center text-xs font-semibold pb-4">
            Apresentação do objetivo e processo de anotação em datasets
          </div>
        </div>
      </div>
    </main>
  );
}
