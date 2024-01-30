import clsx from "clsx";
import Link from "next/link";
import { IconType } from "react-icons";
import socialData from "@/data/social.json";

type FollowLinkProps = {
  net: "facebook" | "x" | "linkedin" | "youtube" | "telegram";
  Icon: IconType;
  children?: React.ReactNode;
  className?: string;
  iconClassName?: string;
};

export function FollowLink({
  net,
  Icon,
  children,
  className,
  iconClassName,
}: FollowLinkProps) {
  return (
    <Link
      className={clsx("hover:opacity-80 flex items-center gap-2", className)}
      target="_blank"
      href={`${socialData[net].link}`}
    >
      <Icon className={clsx(`text-2xl text-neutral-600`, iconClassName)} />
      {children}
    </Link>
  );
}
