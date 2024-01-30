import Image from "next/image";
import Link from "next/link";
import { FiArrowUp } from "react-icons/fi";

export function Footer() {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center px-8">
      <Link href="https://www.lastra.app">
        <Image
          src="/assets/logo-lastra-branco.svg"
          alt="logo"
          width={126}
          height={70}
        />
      </Link>
      <div className="text-gray-200 flex flex-col text-xs">
        <span className="pb-4">Todos os direitos reservados</span>
        <Link
          href="/termos/politica-de-privacidade"
          className="hover:text-orange-400"
        >
          Política de Privacidade
        </Link>
        <Link className="hover:text-blue-400" href="/termos/e-condicoes-de-uso">
          Termos de Uso
        </Link>
      </div>
      <a
        href="#"
        className="text-gray-200 bg-neutral-600 rounded-full px-8 py-2 flex items-center justify-center"
      >
        voltar ao topo
        <FiArrowUp className="ml-4" />
      </a>
    </div>
  );
}
