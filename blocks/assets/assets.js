export default function decorate(block) {
  const rows = block.children;

  const blockContent = document.createElement('div');
  blockContent.classList.add('assets__content');

  for (const row of rows) {
    const columns = row.querySelectorAll('div');
    console.log('assets row columns', row.innerHTML);
    const rowNode = document.createElement('div');
    rowNode.classList.add('assets__row');

    const imageLeft = columns[0]?.querySelector('picture');
    const imageRight = columns[1]?.querySelector('picture');
    const buttonLink = columns[2]?.querySelector('a');

    if (imageLeft) {
      rowNode.classList.add('assets__row--image-left');
      columns[0].classList.add('assets__column--image');
      columns[1].classList.add('assets__column--text');
    } else if (imageRight) {
      rowNode.classList.add('assets__row--image-right');
      columns[0].classList.add('assets__column--text');
      columns[1].classList.add('assets__column--image');
    }

    if (buttonLink) {
      buttonLink.classList.add('button');
      buttonLink.classList.add('icon--download');
      columns[2].classList.add('assets__buttons');
      if (imageLeft) {
        columns[1].append(columns[2]);
      } else {
        columns[0].append(columns[2]);
      }
    }

    rowNode.append(columns[0]);
    rowNode.append(columns[1]);

    blockContent.append(rowNode);
  }

  block.textContent = '';
  block.append(blockContent);
}
