import { notFound } from "next/navigation";
import Link from "next/link";
import { getNftById } from "@/lib/nfts";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NftDetailPage({ params }: Props) {
  const { id } = await params; // 👈 unwrap the Promise
  const nft = getNftById(id);

  if (!nft) return notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 pb-24 pt-6">
      <Link
        href="/discover"
        className="text-[11px] text-slate-400 hover:text-slate-200"
      >
        ← Back to Discover
      </Link>

      <div className="mt-4 flex flex-col gap-5 sm:flex-row">
        <div className="sm:w-1/2">
          <div
            className="overflow-hidden rounded-2xl border border-slate-800"
            style={{ backgroundColor: nft.backdropColor }}
          >
            <img
              src={nft.imageUrl}
              alt={nft.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="sm:w-1/2">
          <h1 className="text-lg font-semibold text-slate-100">
            {nft.name}
          </h1>
          <p className="mt-1 text-xs text-slate-400">{nft.description}</p>

          <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
            {nft.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-900/70 px-2 py-0.5 text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Price</span>
              <span className="font-semibold text-slate-50">
                {nft.priceMMK.toLocaleString()} MMK
              </span>
            </div>
            {nft.externalLink && (
              <div className="mt-2 flex items-center justify-between">
                <span className="text-slate-300">External link</span>
                <a
                  href={nft.externalLink}
                  target="_blank"
                  className="text-sky-300 hover:underline"
                >
                  Open →
                </a>
              </div>
            )}
          </div>

          <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-100">
                Pay with KBZ Pay
              </span>
            </div>
            <div className="mt-2 text-[11px] text-slate-300">
              Send{" "}
              <span className="font-semibold text-slate-50">
                {nft.priceMMK.toLocaleString()} MMK
              </span>{" "}
              to this KBZ Pay number:
            </div>
            <div className="mt-2 text-sm font-semibold text-sky-300">
              {nft.kbzPayNumber}
            </div>
            <p className="mt-2 text-[11px] text-slate-400">
              After payment, tap “Buy now” and upload your payment receipt and
              Telegram username. The seller will verify and send the NFT
              manually in Telegram.
            </p>
          </div>

          <Link
            href={`/checkout?productId=${nft.id}`}
            className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-tr from-sky-500 to-violet-500 px-4 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-sky-500/30"
          >
            Buy now
          </Link>
        </div>
      </div>
    </div>
  );
}
