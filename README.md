# WaveInit Bug Finder

Playwright + Cucumber + TypeScript automation framework for WaveInit.

## Prerequisites

- Node.js 22.23.2
- npm 11+

## Setup

```bash
git clone <repository-url>
cd WaveInit_Bug_Finder

nvm use 22.23.2
npm ci
Run Tests
npm test

Run specific tags:

npm run register
npm run prasanna
npm run reshma
npm run haritha

Run tests in parallel:

npm run parallel

Generate report:

npm run report

Run tests and generate report:

npm run test:report
Node Version

This project requires Node.js 22.23.2.

The required version is defined in:

.nvmrc
package.json
package-lock.json

Do not change dependency versions without checking compatibility with the project Node.js version.


---

## 6. What you commit to GitHub

Commit these:

```text
.nvmrc
package.json
package-lock.json
README.md

Do not commit:

node_modules/

Your .gitignore should contain:

node_modules/
reports/
.env
Final developer workflow
Clone
  ↓
Read README
  ↓
nvm use 22.23.2
  ↓
npm ci
  ↓
Run tests
  ↓
Make changes
  ↓
Run tests
  ↓
Commit package changes only when intentional
  ↓
Push / PR
