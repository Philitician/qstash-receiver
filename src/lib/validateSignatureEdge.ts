// next.js api wrapper
import { Receiver } from "@upstash/qstash";

export const verifySignature = async (request: Request) => {
  const qstashReceiver = new Receiver({
    currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY!,
    nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY!,
  });

  return await qstashReceiver.verify({
    signature: request.headers.get("upstash-signature")!,
    body: await request.text(),
  });
};
