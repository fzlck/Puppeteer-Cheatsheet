# Puppeteer-Cheatsheet
A collection of Puppeteer code snippets for web scraping, browser automation, and testing.
For this cheatsheet, the `assert` library is used for assertions and verifying expected behaviour.

## Contents

- [Progress Bars](#progress-bars)
- [Clicking Elements](#clicking-elements)


## Progress Bars

### Check if a Progress Bar is Full

```javascript
  const progressBar = await page.$('.progress-bar');
  const attributes = await progressBar.evaluate((el) => ({
    style: el.getAttribute('style'),
  }));
  const loadingComplete = attributes.style.includes('width: 100%');
  assert.strictEqual(loadingComplete, true);
```

## Clicking Elements

### by selector

```javascript
  await page.evaluateHandle((selector) => $(`${selector}`)[0].click(), '#elementId');
```
