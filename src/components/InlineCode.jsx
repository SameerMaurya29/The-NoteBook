import { splitInlineCode } from "@/lib/inlineCode";
export default function InlineCode({ children }) {
  return splitInlineCode(children).map((part, index) => part.code
    ? <code key={index} className="inline-code">{part.text}</code>
    : part.text);
}
