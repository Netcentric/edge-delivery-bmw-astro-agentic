export default function decorate(block) {
  block.classList.add('fullbleed');

  const row = block.firstElementChild;
  if (!row) return;

  const [imageCell, contentCell, buttonCell] = row.children;
  const image = imageCell?.querySelector('picture');
  const button = buttonCell?.querySelector('a');

  const imageHtml = image ? image.outerHTML : (imageCell?.innerHTML ?? '');
  const contentHtml = contentCell?.innerHTML ?? '';

  let buttonHtml = '';
  if (button) {
    button.className = 'button herosection__cta icon-download';
    buttonHtml = button.outerHTML;
  } else if (buttonCell?.textContent?.trim()) {
    buttonHtml = `<span class="button herosection__cta icon-download">${buttonCell.innerHTML}</span>`;
  }

  const newHtml = `
    <div class="herosection__image">
      ${imageHtml}
    </div>
    <div class="herosection__body">
      ${contentHtml}
      ${buttonHtml}
    </div>
  `;

  block.innerHTML = newHtml;
}
