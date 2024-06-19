import Link from "next/link";
import { Button } from "@/components/ui/button";
import GroupChatUndraw from "../../public/undraw-group-chat";
import OnlineConnectionUndraw from "../../public/undraw-online-connection";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col gap-8">
        <div className="flex justify-center gap-36 items-center">
          <div className="flex flex-col text-3xl">
            <p>
              Uma plataforma para <b>mineração</b>
            </p>
            <p>
              e <b>visualização</b> de <b>argumentos</b> em
            </p>
            <p>
              <b>discussões</b> em <b>redes sociais.</b>
            </p>
          </div>
          <GroupChatUndraw />
        </div>
        <div className="flex justify-center gap-36 items-center">
          <OnlineConnectionUndraw />
          <div className="flex flex-col gap-8">
            <div className="flex flex-col text-4xl items-center">
              <p>
                <b>Visualize</b> argumentos,
              </p>
              <p>
                <b>compreenda</b> discussões.
              </p>
            </div>
            <div className="flex justify-center">
              <Link href={"/resultados"}>
                <Button size={"lg"}>Ver resultados</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
