import markdownToHtml from '../src/index';

describe('should preserve br tag', () => {
  test('should preserve br tag inside paragraph', () => {
    const html = markdownToHtml('foo<br>bar');
    expect(html).toMatch(/<p>foo<br>bar<\/p>/);
  });
  test('should preserve br tag inside table', () => {
    const tableString = [
      `| a | b |`,
      `| --- | --- |`,
      `| foo<br>bar | c |`,
    ].join('\n');
    const html = markdownToHtml(tableString);
    expect(html).toContain('foo<br>bar');
  });
  test('should escape br tag inside inline code', () => {
    const html = markdownToHtml('foo`<br>`bar');
    expect(html).toMatch(/<p>foo<code>&lt;br&gt;<\/code>bar<\/p>/);
  });
  test('should escape br tag inside code block', () => {
    const html = markdownToHtml('```\n<br>\n```');
    expect(html).toContain('&lt;br&gt;');
  });
});
