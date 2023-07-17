import { qstashClient } from "@/lib/qstashClient";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const supplier = request.nextUrl.searchParams.get("supplier");
  if (!supplier) return new Response("Missing supplier", { status: 400 });

  // create a date time which is at midnight the next day
  const dateTime = new Date();
  dateTime.setDate(dateTime.getDate() + 1);
  dateTime.setHours(0, 0, 0, 0);

  const body = {
    supplier,
    dateTime,
  };

  const res = await qstashClient("campaign", body);

  console.log("published to qstash", body, await res.json());

  return new Response("ok");
}
