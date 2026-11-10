import Image from "next/image";
import { about } from "@/lib/data";

export function TeamPhoto() {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[32px] bg-[#E8F1F8] shadow-soft-lg ring-2 ring-white sm:aspect-[16/9]">
        <Image
          src={about.teamImage}
          alt={about.teamImageAlt}
          fill
          quality={90}
          loading="lazy"
          className="object-cover object-center"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>
    </div>
  );
}
