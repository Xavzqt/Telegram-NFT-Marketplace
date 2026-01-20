import Link from "next/link";
import { NFT_ITEMS } from "@/lib/nfts";

const TAGS = ["All", "Cute", "Food", "Birthday", "Galaxy", "Premium"];

export default function DiscoverPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-20 pt-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-slate-100">
            Discover Telegram NFTs
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Browse curated Telegram NFT gifts. Tap a card to see details and
            KBZ Pay info.
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 text-[11px]">
        {TAGS.map((tag) => (
          <button
            key={tag}
            className={`rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-slate-300`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {NFT_ITEMS.map((nft) => (
          <Link
            key={nft.id}
            href={`/nft/${nft.id}`}
            className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-3 transition hover:border-sky-500/80 hover:bg-slate-900/80"
          >
            <div
              className="relative aspect-[4/3] overflow-hidden rounded-xl"
              style={{ backgroundColor: nft.backdropColor }}
            >
              <img
                src={nft.imageUrl}
                alt={nft.name}
                className="h-full w-full object-cover opacity-90 transition group-hover:scale-105 group-hover:opacity-100"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent" />
              <div className="pointer-events-none absolute bottom-2 left-2 flex gap-1 text-[10px]">
                {nft.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-950/70 px-2 py-0.5 text-slate-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-3">
              <div className="text-xs font-semibold text-slate-100">
                {nft.name}
              </div>
              <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                <span>{nft.priceMMK.toLocaleString()} MMK</span>
                <span className="text-sky-300">View details →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
