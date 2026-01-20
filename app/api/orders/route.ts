import { NextRequest, NextResponse } from "next/server";

type OrderPayload = {
  productId: string;
  productName: string;
  amount: number;
  telegramUsername: string;
  totalPriceMMK: number;
  receiptUrl: string;
};

type OrderRecord = OrderPayload & {
  id: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
};

const ORDERS: OrderRecord[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as OrderPayload;

    if (
      !body.productId ||
      !body.productName ||
      !body.telegramUsername ||
      !body.amount ||
      !body.totalPriceMMK ||
      !body.receiptUrl
    ) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    const order: OrderRecord = {
      ...body,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    ORDERS.push(order);

    return NextResponse.json({ order }, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Invalid request." },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ orders: ORDERS });
}
