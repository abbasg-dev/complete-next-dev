import Link from "next/link";
import { db } from "@/db";
import paths from "@/paths";
import CustomChip from "@/components/common/chip";

export default async function TopicList() {
  const topics = await db.topic.findMany();

  const renderedTopics = topics.map((topic) => (
    <div key={topic.id}>
      <Link href={paths.topicShow(topic.slug)}>
        <CustomChip>{topic.slug}</CustomChip>
      </Link>
    </div>
  ));

  return <div className="flex flex-row flex-wrap gap-2">{renderedTopics}</div>;
}
