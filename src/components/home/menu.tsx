import Image from "next/image";
import Link from "next/link";
import { BsArrowUpRightCircleFill } from "react-icons/bs";

export function Menu() {
  return (
    <div className="flex justify-between items-center">
      <Link href="https://www.lastra.app">
        <Image
          src="/assets/logo-lastra-branco.svg"
          alt="logo"
          width={126}
          height={70}
        />
      </Link>
      <div>
        <Link
          href="https://use.lastra.app/signup"
          target="_blank"
          className="flex justify-between items-center rounded-full border-white border-[1px] px-2 py-2  text-white"
        >
          <span className="ml-4 mr-8">Criar Conta</span>
          <BsArrowUpRightCircleFill className="text-white" size={22} />
        </Link>
      </div>
    </div>
  );
}
