const fs = require('fs');
const vm = require('vm');

// Strip chrome API listeners; keep pure functions cleanText/htmlToMarkdown.
let src = fs.readFileSync('extension-clean-copy/background.js', 'utf8');
src = src.split('/* ── Pro: custom cleanup rules')[0];

const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(src, sandbox);

const assert = require('assert');
const t1 = sandbox.cleanText('  \u201Csmart\u201D  \u00A0  text\u200B  ');
assert.strictEqual(t1, '"smart" text', 'cleanText');
console.log('cleanText OK:', JSON.stringify(t1));

const md = sandbox.htmlToMarkdown(
  '<h2>Title</h2><p>Hello <strong>world</strong> and <a href="https://x.com">link</a>.</p>' +
  '<ul><li>one</li><li>two</li></ul><pre><code>if (a &lt; b) {}</code></pre>'
);
console.log('--- markdown output ---');
console.log(md);
assert(md.startsWith('## Title'), 'h2');
assert(/\*\*world\*\*/.test(md), 'bold');
assert(/\[link\]\(https:\/\/x\.com\)/.test(md), 'link');
assert(/- one/.test(md) && /- two/.test(md), 'list');
assert(/```/.test(md) && /if \(a < b\) \{\}/.test(md), 'code block + entity unescape');
console.log('htmlToMarkdown OK');

// Table conversion (iteration 135)
const tbl = sandbox.htmlToMarkdown(
  '<table><thead><tr><th>Name</th><th>Price</th></tr></thead>' +
  '<tbody><tr><td>A &amp; B</td><td>$9</td></tr><tr><td>C</td><td>p|q</td></tr></tbody></table>'
);
assert(tbl.startsWith('| Name | Price |'), 'table header row');
assert(/\|\s*---\s*\|\s*---\s*\|/.test(tbl), 'table separator');
assert(tbl.includes('| A & B | $9 |'), 'table body row + entity unescape');
assert(tbl.includes('p\\|q'), 'pipe escaped in cell');

const tbl2 = sandbox.htmlToMarkdown(
  '<table><tr><th>H1</th><th>H2</th></tr><tr><td colspan="2">wide</td></tr></table>'
);
assert(tbl2.includes('| wide |  |') || tbl2.includes('| wide | |'), 'colspan padding: ' + JSON.stringify(tbl2));

const tbl3 = sandbox.htmlToMarkdown(
  '<table><tr><th>H</th></tr><tr><td><strong>b</strong> <a href="x">l</a></td></tr></table>'
);
assert(tbl3.includes('| **b** [l](x) |'), 'inline markup inside cell: ' + JSON.stringify(tbl3));
console.log('table conversion OK');
