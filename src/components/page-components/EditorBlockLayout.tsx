"use client";

import DOMPurify from "isomorphic-dompurify";

type Props = {
  blockContent?: string | null;
  fieldGroupName?: string | null;
};

export default function EditorBlockLayout({ blockContent }: Props) {
  if (!blockContent) return null;

  const sanitizedHtml = DOMPurify.sanitize(blockContent);

  return (
    <section id="editor-content" className="editor-block bg-sb-black">
        <div className="w-full max-w-[1600px] mx-auto px-6 py-12 md:py-24">
        <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
        </div>
    </section>
  );
}
