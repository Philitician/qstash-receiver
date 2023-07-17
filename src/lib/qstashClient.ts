import { CampaignInfoMessage } from "@/app/api/prices/campaign/qstash/route";

export type CampaignInfoBody = Omit<CampaignInfoMessage, "dateTime"> & {
  dateTime: Date;
};

export type Body = CampaignInfoBody;

export const qstashClient = async (topic: string, body: Body) =>
  await fetch(`${process.env.QSTASH_URL}/${topic}`, {
    body: JSON.stringify(body),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.QSTASH_TOKEN}`,
      "Upstash-Not-Before": Math.round(
        body.dateTime.getTime() / 1000
      ).toString(),
    },
  });
