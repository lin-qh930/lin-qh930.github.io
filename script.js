'use strict';
async function copyText(text, status) {
  try {
    if (!navigator.clipboard) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(text);
    status.textContent = 'Copied';
  } catch {
    status.textContent = 'Please select and copy the text.';
  }
}
const copyEmail = document.getElementById('copy-email');
if (copyEmail) copyEmail.addEventListener('click', () => copyText('linqiheng6930@ruc.edu.cn', document.getElementById('email-status')));
document.querySelectorAll('.copy-citation').forEach(button => {
  button.addEventListener('click', () => {
    const container = button.closest('details');
    copyText(container.querySelector('pre').textContent, container.querySelector('.copy-status'));
  });
});
const printCV = document.getElementById('print-cv');
if (printCV) printCV.addEventListener('click', () => window.print());

// One theme selector filters each output format in its own section.
const themeBrowser = document.querySelector('.theme-browser');
if (themeBrowser) {
  themeBrowser.hidden = false;
  const controls = [...themeBrowser.querySelectorAll('[data-filter]')];
  const records = [...document.querySelectorAll('.publication[data-theme], .talk[data-theme]')];
  const gallery = document.querySelector('.conference-gallery');
  const status = themeBrowser.querySelector('.filter-status');
  const groups = [
    {container: document.querySelector('.publication-list'), selector: '.publication', format: 'published works'},
    {container: document.querySelector('.talk-list'), selector: '.talk', format: 'conference presentations'}
  ];
  for (const group of groups) {
    group.section = group.container.closest('section');
    group.navLink = document.querySelector(`.section-nav a[href="#${group.section.id}"]`);
  }
  const selectTheme = key => {
    controls.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === key)));
    records.forEach(record => { record.hidden = key !== 'all' && record.dataset.theme !== key; });
    const counts = groups.map(group => {
      const count = [...group.container.querySelectorAll(group.selector)].filter(record => !record.hidden).length;
      group.section.hidden = count === 0;
      if (group.navLink) group.navLink.hidden = count === 0;
      return count;
    });
    if (gallery) gallery.hidden = key !== 'all';
    const visibleFormats = groups.flatMap((group, i) => counts[i] ? [`${counts[i]} ${group.format}`] : []);
    status.textContent = `Showing ${visibleFormats.join(' and ')}.`;
  };
  controls.forEach(button => button.addEventListener('click', () => selectTheme(button.dataset.filter)));
  selectTheme('all');
}
