import clsx from "clsx";
import Link from "next/link";
import { IconType } from "react-icons";
import socialData from "@/data/social.json";

type ShareLinkProps = {
  net: "facebook" | "x" | "linkedin" | "whatsapp" | "telegram";
  text: string;
  Icon: IconType;
  children?: React.ReactNode;
  className?: string;
  iconClassName?: string;
};

export function ShareLink({
  net,
  text,
  Icon,
  children,
  className,
  iconClassName,
}: ShareLinkProps) {
  const encodedText = encodeURIComponent(text);
  return (
    <Link
      className={clsx("hover:opacity-80 flex items-center gap-2", className)}
      target="_blank"
      href={`${socialData[net].share}${encodedText}`}
    >
      <Icon className={clsx(`text-2xl text-neutral-600`, iconClassName)} />
      {children}
    </Link>
  );
}
