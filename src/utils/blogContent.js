const IMAGE_PATTERN = /^!\[(.*?)\]\((.*?)\)$/;

function stripMarkdown(text) {
  return text
    .replace(/!\[.*?\]\(.*?\)/g, '')     // images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links → label only
    .replace(/(\*\*|__)(.*?)\1/g, '$2')  // bold
    .replace(/(\*|_)(.*?)\1/g, '$2')     // italic
    .replace(/`([^`]+)`/g, '$1')         // inline code
    .replace(/^#{1,6}\s+/gm, '')         // headings
    .replace(/^>\s*/gm, '')              // blockquotes
    .replace(/^[-*+]\s+/gm, '')          // unordered list markers
    .replace(/^\d+\.\s+/gm, '')          // ordered list markers
    .replace(/---+/g, '')                // horizontal rules
    .replace(/\s+/g, ' ')
    .trim();
}

export function getExcerpt(content, length) {
  const blocks = content.split('\n\n');
  const firstTextBlock = blocks.find((block) => !IMAGE_PATTERN.test(block.trim()) && block.trim().length > 0);
  return stripMarkdown(firstTextBlock || '').slice(0, length);
}
