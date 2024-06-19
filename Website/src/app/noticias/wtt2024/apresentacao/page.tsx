import Image from "next/image";
import Link from "next/link";

const wttVideo = "https://www.youtube.com/watch?v=wkD-mxCbf-I";

export default function Page() {
  return (
    <main>
      <div className="flex flex-col w-2/3">
        <div className="pb-4">
          <h1 className="text-primary pb-0">
            WTT 2024: Apresentação do Projeto HEIWA
          </h1>
          <h3 className="text-foreground/50">Publicado em 14/04/2024</h3>
        </div>
        <div className="flex flex-col">
          <div className="indent-8 text-justify">
            Em 03 de Abril de 2024, quarta-feira, o Projeto HEIWA realizou sua
            apresentação no Workshop de Tendências Tecnológicas 2024, organizado
            pela Faculdade de Computação e Informática da Universidade
            Presbiteriana Mackenzie.
          </div>
          <div className="flex justify-center">
            <Image
              className="py-4 pb-2"
              src="/wtt2024/apresentacao/firstpic.jpg"
              alt="Oficina de anotação"
              width={1280}
              height={694}
            />
          </div>
          <div className="flex justify-center text-xs font-semibold pb-8">
            Membros do Projeto HEIWA em apresentação sobre o projeto no WTT 2024
          </div>
          <div className="indent-8 text-justify">
            Ao longo da palestra, os membros apresentaram a proposta, o
            planejamento realizado e as ações tomadas pelas diferentes frentes
            do projeto, bem como os desafios e avanços de cada um dos membros em
            suas respectivas atribuições.
          </div>
          <div className="indent-8 text-justify pt-4 pb-8">
            A apresentação do Projeto HEIWA no WTT foi gravada e está disponível{" "}
            <Link
              href={wttVideo}
              className="font-semibold text-primary"
              target="_blank"
            >
              neste link
            </Link>
            .
          </div>
        </div>
      </div>
    </main>
  );
}
