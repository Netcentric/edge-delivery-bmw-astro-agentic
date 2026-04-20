export default function decorate(block) {
  const row = block.firstElementChild;
  if (!row) return;

  const [logoDiv, titleDiv, buttonDiv] = row.children;
  const headerLogo = logoDiv?.querySelector('picture');
  const headerTitle = titleDiv?.querySelector('h1');
  const headerButton = buttonDiv?.querySelector('a');

  const logoHtml = headerLogo ? headerLogo.outerHTML : (logoDiv?.innerHTML ?? '');
  const titleHtml = headerTitle ? headerTitle.outerHTML : (titleDiv?.innerHTML ?? '');

  let buttonHtml = '';
  if (headerButton) {
    headerButton.classList.add('headersection__button');
    buttonHtml = headerButton.outerHTML;
  } else if (buttonDiv && buttonDiv.textContent.trim()) {
    buttonHtml = `<span class="headersection__button">${buttonDiv.innerHTML}</span>`;
  }

  block.innerHTML = `
    <div class="headersection__logo">
      ${logoHtml}
    </div>
    <div class="headersection__title">
      ${titleHtml}
    </div>
    ${buttonHtml}
  `;
}
