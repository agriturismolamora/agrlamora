import Image, { type ImageProps } from "next/image";

const LOGO_SRC = "/images/logo/logo-bianco-agriturismo-la-mora.png";

/* next/image + logo La Mora in filigrana, in basso a destra: piccolo,
   opacità 45%, pointer-events:none (non intercetta click, hover o zoom
   della foto sotto) e aria-hidden (l'alt resta quello della foto).

   Solo per le foto REALI della struttura e del territorio fotografato dal
   titolare. Esclusi di proposito: blog, loghi, mappe, foto di terzi con
   credito (Wikimedia), foto Google/Facebook, ritratti.

   Con `fill` la filigrana si posiziona nello stesso contenitore relativo
   dell'immagine (che next/image già richiede); senza `fill` l'immagine
   viene avvolta in uno span relativo inline-block. */
export function WatermarkedImage({ className, alt, ...props }: ImageProps) {
  const mark = (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute bottom-[3%] right-[3%] z-[1] w-[14%] min-w-[38px] max-w-[84px] select-none opacity-45 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]"
    >
      <Image src={LOGO_SRC} alt="" width={1448} height={1086} sizes="84px" className="h-auto w-full" draggable={false} />
    </span>
  );

  if (props.fill) {
    return (
      <>
        <Image className={className} alt={alt} {...props} />
        {mark}
      </>
    );
  }
  return (
    <span className="relative inline-block max-w-full">
      <Image className={className} alt={alt} {...props} />
      {mark}
    </span>
  );
}
