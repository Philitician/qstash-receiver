import { qstashClient } from "@/lib/qstashClient";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const supplier = request.nextUrl.searchParams.get("supplier");
  if (!supplier) return new Response("Missing supplier", { status: 400 });

  const body = {
    supplier,
    dateTime: new Date(),
  };
  const res = await qstashClient("campaign", body);

  console.log("published to qstash", body, await res.json());

  return new Response("ok");
}
