import VideoEmbed from "@/components/embed-video";
import beforepic from "@/lib/firstparagraphs";
import Image from "next/image";

export default function Sobre() {
  return (
    <main>
      <div className="flex flex-col gap-2">
        <div className="pb-4">
          <div className="text-5xl text-primary font-bold pb-2">
            Projeto HEIWA
          </div>

          <div className="text-2xl text-foreground/90">
            <div>Plataforma para Mineração e Visualização</div>
            <div>de Argumentos em discussões em Redes Sociais</div>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-center pb-2 pt-8">
              <VideoEmbed />
            </div>
            <div className="flex flex-col">
              <div className="flex justify-center text-xs font-semibold">
                Palestra: Grupo de Pesquisa e Inovação em Ciberdemocracia e
                Projeto Heiwa-Mineração e Visualização de Discussões em Redes
                Sociais
              </div>
              <div className="flex justify-center text-xs">
                Workshop de Tendências Tecnológicas WTT 2023 - Universidade
                Presbiteriana Mackenzie - 04/04/2023. Profa. Renata Araujo,
                coordenadora do CIBERDEM
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-justify indent-8">
          {beforepic.map((paragraph) => (
            <div key={paragraph.id}>{paragraph.text}</div>
          ))}
          <div className="flex justify-center py-4">
            <Image
              src="/about.png"
              alt="Representação de etapas do projeto."
              width={(1 / 1.5) * 832}
              height={(1 / 1.5) * 217}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
