import Link from "next/link";
import Image from "next/image";
import routes from "@/lib/routes";
import MapsEmbed from "./embed-map";
import contacts from "@/lib/contacts";
import MackLogo from "../../public/logos/mack-logo";
import FapespLogo from "../../public/logos/fapesp-logo";

const fapespLink = "https://fapesp.br/";
const mackLink = "https://www.mackenzie.br/";
const mackCloudLink = "https://mackcloud.mackenzie.br/";
const ciberdemEmail = "ciberdem@mackenzie.br";

export default function FooterNav() {
  return (
    <nav className="container pb-2">
      <div className="flex justify-between border-t pt-2">
        <div className="flex gap-32 text-foreground">
          <div className="flex flex-col">
            <h2>Navegação</h2>
            {routes.map((route) => (
              <Link
                key={route.label}
                href={route.path}
                className="text-foreground/80 transition-colors hover:text-foreground"
              >
                {route.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col">
            <h2>Contato</h2>
            {contacts.map((contact) => (
              <Link
                target="_blank"
                key={contact.label}
                href={contact.path}
                className="text-foreground/80 transition-colors hover:text-foreground"
              >
                {contact.label}
              </Link>
            ))}
            <Link
              target="_blank"
              href={`mailto:${ciberdemEmail}`}
              className="text-foreground/80 transition-colors hover:text-foreground"
            >
              E-mail
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h2>Apoio</h2>
            <Link target="_blank" href={fapespLink}>
              <FapespLogo />
            </Link>
            <div className="flex items-center justify-between">
              <Link target="_blank" href={mackLink}>
                <MackLogo />
              </Link>
              <Link target="_blank" href={mackCloudLink}>
                <Image
                  src="/logos/mackcloud.png"
                  alt="Mack Cloud Logo"
                  width={70}
                  height={70}
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center pb-2">
          <h2 className="pb-1">Onde estamos</h2>
          <MapsEmbed />
        </div>
      </div>
    </nav>
  );
}
