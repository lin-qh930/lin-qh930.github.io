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
