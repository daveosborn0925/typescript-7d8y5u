import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const urlInput = document.getElementById('url-input') as HTMLInputElement;
  const generateHtmlTextBtn = document.getElementById('generate-html-text') as HTMLButtonElement;
  const textContainer = document.getElementById('text-container') as HTMLElement;

  generateHtmlTextBtn.addEventListener('click', () => {
    const url = urlInput.value;
    if (url) {
      fetchHtmlAndDisplayText(url);
    } else {
      alert('Please enter a valid URL.');
    }
  });

  async function fetchHtmlAndDisplayText(url: string): Promise<void> {
    try {
      const response = await fetch(url);
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const text = doc.body.innerText;

      textContainer.textContent = text;
    } catch (error) {
      console.error('Failed to fetch HTML content:', error);
      alert('Failed to fetch HTML content. Please make sure the URL is correct and the page is accessible.');
    }
  }
});
