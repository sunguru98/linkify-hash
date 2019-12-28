# linkify-hash

![NPM Version](https://img.shields.io/npm/v/linkify-hash?style=flat-square)
[![Travis Build](https://img.shields.io/travis/com/sunguru98/linkify-hash?style=flat-square)](https://travis-ci.com/sunguru98/linkify-hash)
![NPM Downloads](https://img.shields.io/npm/dw/linkify-hash?style=flat-square)
![MIT License](https://img.shields.io/github/license/sunguru98/linkify-hash?style=flat-square?style=flat-square)

> Link your Github commit hashes

## Table of Contents

1. [Installation](#installation)
2. [Example](#example)
3. [Usage](#usage)
4. [Related](#related)
5. [License](#license)

## Installation

---

```bash
$ npm install linkify-hash
```

## Example

---

```javascript
const linkifyHash = require("linkify-hash");
const commitHash = '0d7ad26e00ff42e6971f3eb3081503fffd48fe98'

const options = {
  userName: 'sunguru98'
  repoName: 'AlgoLoad',
  attributes: {
    class: 'commitHash',
    target: '_blank'
  }
}

const htmlString = linkifyHash(commitHash, options)
// <a href='https://github.com/sunguru98/AlgoLoad/commit/0d7ad26e00ff42e6971f3eb3081503fffd48fe98'

const fragment = linkifyHash(commitHash, {
  ...options,
  type: 'hash'
})

document.body.appendChild(fragment)
```

## API

---

### linkifyHash(hashString, [options])

#### hashString

Type: `string`
Hash string available in commit.

#### options

Type: `object`

1. userName - `string`
2. repoName - `string`
3. attributes - `object`
   - class - `string`
   - multiple - `string` | `number` | `boolean` | `string[]`
   - target - `string`
4. baseUrl - `string`
   - default - https://github.com
5. type - `string`
   - default - "string"
   - string gives a normal string with HTML
   - dom gives a DocumentFragment with HTML

## Related

---

- [create-html-element](https://github.com/sindresorhus/create-html-element) - Create HTML Element
- [jest](https://github.com/facebook/jest) - Jest
- [JSDOM](https://github.com/jsdom/jsdom) - Javascript DOM in Node.js

## License

---

MIT © [Sundeep Charan Ramkumar](https://sundeepcharan.com "Personal website")
