# albertobas.com

[![Apache 2.0 licensed](https://img.shields.io/badge/License-Apache_2.0-yellow.svg)](https://github.com/albertobas/albertobas.com/blob/main/LICENSE)

## About

This is my personal website, where I publish articles and side-projects. The code is mostly written in Typescript using Next.js, a React.js framework.

The page is in both dark and light mode and uses the `prefers-color-scheme` CSS media feature to select between both.

Furthermore, this website is entirely translated to spanish.

## Technical details

- **Framework**: [Next.js](https://nextjs.org/)
- **Deployment**: [Vercel](https://vercel.com)
- **Content**: [MDX](https://github.com/mdx-js/mdx)
- **Styling**: [PostCSS](https://postcss.org)

## Overview

- `src/components/*`: React.js components in `.tsx`.
- `src/data/*`: MDX files used for pages in **blog** and **projects**.
- `src/pages/*`: static pages.
- `src/styles/*`: CSSModules files, postcss mixins and a global css file.
- `src/utils/*`: helper functions, interfaces, hooks, contexts, constants and dictionaries used in some translations and options lists.
- `lang/*`: JSON files used as a source for translations. The JSON file corresponding to the `defaultLocale` is generated running `npm run extract-languages`.
- `compiled-lang/*`: JSON files generated running `npm run compile-languages`, obtaining translations from `lang/*` and used for formatting messages.
- `scripts/*`: Javascript files used for creating an RSS feed and a sitemap in the `postbuild` script.
- `public/*`: static assets.

## Running locally

```bash
$ git clone https://github.com/albertobas/albertobas.com.git
$ cd albertobas.com
$ npm i
$ npm run dev
```
