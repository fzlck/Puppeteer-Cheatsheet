# Puppeteer-Cheatsheet
A collection of Puppeteer code snippets for web scraping, browser automation, and testing.
For this cheatsheet, the `assert` library is used for assertions and verifying expected behaviour.

## Contents

- [Progress Bars](#progress-bars)
- [Clicking Elements](#clicking-elements)
- [Getting Elements](#getting-elements)
- [Checking Element Visibility](#checking-element-visibility)

## Progress Bars

#### check if a progress bar has completed loading

```javascript
  const progressBar = await page.$('.progress-bar');
  const attributes = await progressBar.evaluate((el) => ({
    style: el.getAttribute('style'),
  }));
  const loadingComplete = attributes.style.includes('width: 100%');
  assert.strictEqual(loadingComplete, true);
```

## Clicking Elements

#### Click an element by selector

```javascript
  await page.evaluateHandle((selector) => $(`${selector}`)[0].click(), '#elementId');
```

## Getting Elements

#### Getting a handle by #id

```javascript
page.evaluateHandle((id) => document.getElementById(id), '#id');
```

### Getting a handle by selector

```javascript
page.evaluateHandle((querySelector) => document.querySelector(querySelector), selector);
```

## Checking Element Visibility

#### Check if an element exists by selector

```javascript
const isElementVisible = async (page, selectorArg) => {
  let ok = true;
  try {
    await page.waitForFunction((selector) => $(selector).length === 1, {}, selectorArg);
  } catch (error) {
    ok = false;
  }
  assert.strictEqual(ok, true);
};
```

#### Check if an element does not exist by selector

```javascript
const isElementNotVisible = async (page, selectorArg) => {
  let ok = true;
  try {
    await page.waitForFunction((selector) => $(selector).length === 0, {}, selectorArg);
  } catch (error) {
    ok = false;
  }
  assert.strictEqual(ok, true);
};
```
