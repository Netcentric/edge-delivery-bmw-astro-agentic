export default function decorate(block) {
  block.classList.add('fullbleed');

  const [brandRow, infoRow, socialsRow] = block.children;
  const brandContent = brandRow?.firstElementChild ?? brandRow;
  const logo = brandContent?.querySelector('picture');

  const rawBrandLabel = brandContent
    ? Array.from(brandContent.childNodes)
      .filter((node) => node.nodeType === Node.TEXT_NODE)
      .map((node) => node.textContent?.trim() ?? '')
      .join(' ')
      .trim()
    : '';
  const brandLabel = rawBrandLabel || (brandContent?.textContent?.trim() ?? '');

  const infoParagraphs = Array.from(infoRow?.querySelectorAll('p') ?? []);
  const infoHtml = infoParagraphs.map((paragraph, index) => {
    const paragraphClone = paragraph.cloneNode(true);
    paragraphClone.querySelectorAll('a').forEach((link) => {
      link.classList.remove('button');
    });
    const isCopyright = /^\s*©/u.test(paragraphClone.textContent ?? '')
      || index === infoParagraphs.length - 1;
    const copyClass = isCopyright ? ' class="footersection__copy"' : '';
    return `<p${copyClass}>${paragraphClone.innerHTML}</p>`;
  }).join('');

  const socialItems = Array.from(socialsRow?.children ?? [])
    .map((cell) => cell.querySelector('picture'))
    .filter(Boolean);
  const socialsHtml = socialItems
    .map((icon) => `<li class="footersection__social-item">${icon.outerHTML}</li>`)
    .join('');

  const newHtml = `
    <div class="footersection__brand">
      ${logo ? logo.outerHTML : ''}
      <span class="footersection__brand-label">${brandLabel}</span>
    </div>
    <div class="footersection__info">
      ${infoHtml}
    </div>
    <ul class="footersection__socials">
      ${socialsHtml}
    </ul>
  `;

  block.innerHTML = newHtml;
}
