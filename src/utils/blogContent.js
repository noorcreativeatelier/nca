// Blog post content is a single string with blocks separated by a blank line.
// A block can be plain text, or an inline image written as ![caption](url).
const IMAGE_PATTERN = /^!\[(.*?)\]\((.*?)\)$/;

export function parseContentBlock(block) {
  const match = IMAGE_PATTERN.exec(block.trim());
  return match ? { type: 'image', alt: match[1], src: match[2] } : { type: 'text', text: block };
}

export function getExcerpt(content, length) {
  const firstTextBlock = content.split('\n\n').find((block) => !IMAGE_PATTERN.test(block.trim()));
  return (firstTextBlock || '').trim().slice(0, length);
}
