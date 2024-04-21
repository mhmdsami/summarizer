import { json, ActionFunction, MetaFunction } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export const meta: MetaFunction = () => {
  return [
    { title: "Text Summarization" },
    { name: "description", content: "Summarize your texts!" },
  ];
};

type ActionData = {
  summary: string;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const text = formData.get("text");

  if (!text || typeof text !== "string") {
    return;
  }

  const res = await fetch(`${process.env.API_BASE_URL}/summarize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  const data = await res.json();

  return json({ summary: data.summary });
};

export default function Index() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();

  const [content, setContent] = useState("");

  useEffect(() => {
    if (actionData?.summary && navigation.state === "loading") {
      toast.success("Content summarized!");
    }
  }, [actionData]);

  return (
    <>
      <nav className="p-10">
        <h1 className="text-xl font-bold text-yellow-400">summarizer</h1>
      </nav>
      <main className="h-[80vh]">
        <Form
          className="h-full flex flex-col items-center justify-center gap-5"
          method="POST"
        >
          <div className="flex flex-col w-1/2 gap-2">
            <textarea
              name="text"
              className="h-72 bg-gray-100/5 p-4 ring-1 ring-inset ring-gray-100/10 rounded-xl resize-none focus:outline-none"
              placeholder="Enter text to summarize..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={1000}
            />
            <span className="self-end text-sm text-gray-400">
              {content.length} characters
            </span>
          </div>
          <button
            className="flex items-center justify-center text-sm font-semibold text-[#252529] bg-yellow-400 rounded-lg disabled:text-black/50 w-24 h-8"
            disabled={!content.length || navigation.state === "submitting"}
          >
            {navigation.state === "submitting" ? <Loader2 className="animate-spin" /> : "Summarize"}
          </button>
          <div className="flex flex-col w-1/2 gap-2">
            <textarea
              readOnly
              value={actionData?.summary}
              className="h-48 bg-gray-100/5 p-4 ring-1 ring-inset ring-gray-100/10 rounded-xl resize-none focus:outline-none"
              placeholder="Summary will appear here..."
              onClick={(e) =>
                actionData?.summary &&
                navigator.clipboard.writeText(actionData.summary)
              }
            />
            <span className="self-end text-sm text-gray-400">
              {actionData?.summary.length || 0} characters
            </span>
          </div>
        </Form>
      </main>
    </>
  );
}
