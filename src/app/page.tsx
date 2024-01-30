import Link from "next/link";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import Image from "next/image";
import { Metadata } from "next";
import { BlogListHomeUltimosPosts } from "@/components/blog/blog-list-home-ultimos-posts";
import { BlogListHomeMaisLidas } from "@/components/blog/blog-list-home-mais-lidas";

export const metadata: Metadata = {
  title: "Blog da Criptomaníacos",
  description: "Simplificando o mundo das criptomoedas desde 2018",
};

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between flex-1">
      <div className="bg-neutral-950 w-full flex-1">
        <div className="container py-8 md:py-16">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 gap-4 flex flex-col">
              <h2 className="border-l-8 border-purple-500 pl-4 text-2xl">
                Últimos Posts
              </h2>
              <BlogListHomeUltimosPosts />
            </div>

            <div className="lg:w-1/4">
              <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-4 flex flex-col gap-4">
                <h3 className="text-xl ">
                  Junte-se aos mais de 1800 clientes da Lastra
                </h3>
                <p className="text-neutral-400">
                  Uma plataforma global para investir nas estratégias vencedoras
                  do mercado de criptomoedas.
                </p>

                <Link
                  href="https://use.lastra.app/signup"
                  target="_blank"
                  className="flex justify-between items-center bg-brand-purple-500 rounded-full px-2 py-2  text-neutral-900 max-w-[180px]"
                >
                  <span className="ml-4 mr-4">Criar Conta</span>
                  <BsArrowUpRightCircleFill
                    className="text-neutral-900"
                    size={24}
                  />
                </Link>
              </div>
              <div className="bg-neutral-800 rounded-lg overflow-hidden border border-neutral-700 flex flex-col gap-2 mt-4">
                <h3 className=" text-neutral-100  p-4">Mais lidos</h3>
                <BlogListHomeMaisLidas />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
