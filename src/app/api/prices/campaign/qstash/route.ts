import { kv } from "@vercel/kv";

import { verifySignature } from "@/lib/validateSignatureEdge";

export const runtime = "nodejs";

export interface CampaignInfoMessage {
  supplier: string;
  dateTime: string;
}

export const POST = async (request: Request) => {
  const isValid = await verifySignature(request.clone());
  if (!isValid)
    return new Response("Unauthorized", {
      status: 401,
      statusText: "Unauthorized",
    });

  const body = (await request.json()) as CampaignInfoMessage;

  const res = await kv.set("campaign", body);

  console.log("published to kv", body, res);

  return new Response("ok");
};
