"use client";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getNftById } from "@/lib/nfts";
import Image from "next/image";

type OrderPayload = {
  productId: string;
  productName: string;
  amount: number;
  telegramUsername: string;
  totalPriceMMK: number;
  receiptUrl: string;
};

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get("productId") ?? undefined;
  const nft = useMemo(
    () => (productId ? getNftById(productId) : undefined),
    [productId]
  );

  const [telegramUsername, setTelegramUsername] = useState("");
  const [amount, setAmount] = useState(1);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    setSuccessMessage(null);
  }, [productId]);

  if (!nft) {
    return (
      <div className="mx-auto max-w-md px-4 pb-20 pt-8 text-center text-sm text-slate-300">
        <p>Missing or invalid product. Go back to Discover and choose an NFT.</p>
      </div>
    );
  }

  const totalPrice = nft.priceMMK * amount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!telegramUsername.trim()) {
      setError("Please enter your Telegram username.");
      return;
    }
    if (!receiptFile) {
      setError("Please upload your KBZ Pay payment receipt screenshot.");
      return;
    }

    try {
      setSubmitting(true);

      // In a real app, upload to storage (S3, etc.). For now, fake URL.
      const fakeReceiptUrl = `https://example.com/receipts/${encodeURIComponent(
        receiptFile.name
      )}`;

      const payload: OrderPayload = {
        productId: nft.id,
        productName: nft.name,
        amount,
        telegramUsername: telegramUsername.trim(),
        totalPriceMMK: totalPrice,
        receiptUrl: fakeReceiptUrl,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message ?? "Failed to submit order.");
      }

      setSuccessMessage(
        "Order submitted. We will verify your payment and send your NFT in Telegram."
      );
      setTelegramUsername("");
      setAmount(1);
      setReceiptFile(null);

      setTimeout(() => {
        router.push("/discover");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 pb-24 pt-6">
      <h1 className="text-lg font-semibold text-slate-100">
        Complete your order
      </h1>
      <p className="mt-1 text-xs text-slate-400">
        Confirm what you&apos;re buying, enter your Telegram username, and
        upload your KBZ Pay payment receipt.
      </p>

      {/* Summary card */}
      <div className="mt-4 flex gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-3 text-xs">
        <div className="h-16 w-16 overflow-hidden rounded-xl border border-slate-800">
          <Image
            src={nft.imageUrl}
            alt={nft.name}
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="text-slate-100">{nft.name}</div>
          <div className="mt-1 text-[11px] text-slate-400">
            Price: {nft.priceMMK.toLocaleString()} MMK · KBZ Pay:{" "}
            <span className="text-sky-300">{nft.kbzPayNumber}</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            Make sure you sent the payment before submitting this form.
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
        <div className="space-y-1">
          <label className="block text-slate-300">
            What are you buying?
          </label>
          <input
            type="text"
            value={nft.name}
            readOnly
            className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-slate-200 text-xs"
            placeholder="What are you buying?"
          />
          <p className="text-[11px] text-slate-500">
            This is auto‑filled from the NFT you selected (e.g. teddy bear, cake).
          </p>
        </div>

        <div className="space-y-1">
          <label className="block text-slate-300">
            Your Telegram username
          </label>
          <input
            type="text"
            value={telegramUsername}
            onChange={(e) => setTelegramUsername(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-slate-200 text-xs"
            placeholder="@yourusername"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-slate-300">Amount you are buying</label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setAmount((a) => Math.max(1, a - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-200"
            >
              -
            </button>
            <input
              type="number"
              min={1}
              value={amount}
              onChange={(e) =>
                setAmount(Math.max(1, Number(e.target.value) || 1))
              }
              className="w-16 rounded-lg border border-slate-800 bg-slate-900/80 px-2 py-1 text-center text-slate-200"
            />
            <button
              type="button"
              onClick={() => setAmount((a) => a + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-200"
            >
              +
            </button>
            <div className="ml-auto text-[11px] text-slate-400">
              Total:{" "}
              <span className="font-semibold text-slate-50">
                {totalPrice.toLocaleString()} MMK
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-slate-300">
            Payment receipt screenshot
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setReceiptFile(e.target.files ? e.target.files[0] : null)
            }
            className="block w-full text-[11px] text-slate-300 file:mr-2 file:rounded-lg file:border-0 file:bg-slate-800 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-slate-100"
          />
          <p className="text-[11px] text-slate-500">
            Upload the successful KBZ Pay payment screenshot.
          </p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/40 bg-red-950/40 px-3 py-2 text-[11px] text-red-200">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/40 px-3 py-2 text-[11px] text-emerald-200">
            {successMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-tr from-sky-500 to-violet-500 px-4 py-2 text-sm font-medium text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit order"}
        </button>
      </form>
    </div>
  );
}
