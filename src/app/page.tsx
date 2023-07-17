import { kv } from "@vercel/kv";
import { CampaignInfoMessage } from "./api/prices/campaign/qstash/route";

export default async function Home() {
  const cache = await kv.get<CampaignInfoMessage>("campaign");
  console.log(cache);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold text-center">
        {cache?.supplier} - {cache?.dateTime}
      </h1>
    </main>
  );
}
