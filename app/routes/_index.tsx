import type { MetaFunction } from "@remix-run/node";
import "../../tailwind.css";

export const meta: MetaFunction = () => {
  return [
    { title: "Star Wars Challenge" },
    { name: "description", content: "Remix Star Wars" },
  ];
};

export default function Index() {
  return (
    <div
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}
    ></div>
  );
}
