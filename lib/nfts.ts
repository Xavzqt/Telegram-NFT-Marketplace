export type NftItem = {
  id: string;
  name: string;
  description: string;
  priceMMK: number;
  imageUrl: string;
  backdropColor: string;
  tags: string[];
  externalLink?: string;
  kbzPayNumber: string;
};

export const NFT_ITEMS: NftItem[] = [
  {
    id: "teddy-bear",
    name: "Teddy Bear Gift",
    description:
      "Cute animated teddy bear Telegram NFT, perfect for birthdays and cozy vibes.",
    priceMMK: 8000,
    imageUrl:
      "https://dummyimage.com/600x400/1f2937/e5e7eb&text=Teddy+Bear+NFT",
    backdropColor: "#1D3557",
    tags: ["Cute", "Birthday", "Gift"],
    externalLink: "https://t.me/",
    kbzPayNumber: "09-123456789",
  },
  {
    id: "cake-party",
    name: "Cake Party NFT",
    description:
      "Colorful cake celebration NFT to send sweet vibes on special days.",
    priceMMK: 12000,
    imageUrl:
      "https://dummyimage.com/600x400/3b0764/e5e7eb&text=Cake+Party+NFT",
    backdropColor: "#3B0764",
    tags: ["Food", "Birthday", "Party"],
    externalLink: "https://t.me/",
    kbzPayNumber: "09-123456789",
  },
  {
    id: "galaxy-card",
    name: "Galaxy Greeting Card",
    description:
      "Galaxy themed Telegram NFT for sci‑fi and space lovers.",
    priceMMK: 15000,
    imageUrl:
      "https://dummyimage.com/600x400/020617/e5e7eb&text=Galaxy+Card+NFT",
    backdropColor: "#020617",
    tags: ["Galaxy", "Premium", "Gift"],
    externalLink: "https://t.me/",
    kbzPayNumber: "09-123456789",
  },
];

export function getNftById(id: string): NftItem | undefined {
  return NFT_ITEMS.find((n) => n.id === id);
}
