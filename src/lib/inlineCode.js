// Only paired single backticks are interpreted; everything else stays literal.
export function splitInlineCode(text) {
  if (typeof text !== "string") return [{ code: false, text: text ?? "" }];
  const parts = [];
  const regex = /(?<!`)`([^`\n]+)`(?!`)/g;
  let offset = 0;
  for (const match of text.matchAll(regex)) {
    if (match.index > offset) parts.push({ code: false, text: text.slice(offset, match.index) });
    parts.push({ code: true, text: match[1] });
    offset = match.index + match[0].length;
  }
  if (offset < text.length) parts.push({ code: false, text: text.slice(offset) });
  return parts;
}
