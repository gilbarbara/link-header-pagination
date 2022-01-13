# link-header-pagination

[![NPM version](https://badge.fury.io/js/link-header-pagination.svg)](https://www.npmjs.com/package/link-header-pagination) [![CI](https://github.com/gilbarbara/link-header-pagination/actions/workflows/main.yml/badge.svg)](https://github.com/gilbarbara/link-header-pagination/actions/workflows/main.yml) [![link-header-pagination](https://badgen.net/bundlephobia/minzip/link-header-pagination?label=size)](https://bundlephobia.com/result?p=link-header-pagination) [![Maintainability](https://api.codeclimate.com/v1/badges/dd65293d635516756db3/maintainability)](https://codeclimate.com/github/gilbarbara/link-header-pagination/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/dd65293d635516756db3/test_coverage)](https://codeclimate.com/github/gilbarbara/link-header-pagination/test_coverage)

Generate LinkHeader pagination

## Setup

```bash
npm install link-header-pagination
```

## Usage

```typescript
import linkHeaderPagination from 'link-header-pagination';

const headers = linkHeaderPagination({ page: 1, perPage: 20, total: 100 });

/*
{
  Link: '</?page=1>; rel="current", </?page=2>; rel="next", </?page=5>; rel="last"',
  'X-Items-From': '1',
  'X-Items-Per-Page': '20',
  'X-Items-To': '20',
  'X-Items-Total': '100'
}
*/
```

## API

**linkHeader(options: LinkHeaderPaginationOptions): Record\<string, string>**

<details>
  <summary>Type Definition</summary>

  ```typescript
interface LinkHeaderLinks {
  rel: string;
  url: string;
}

interface LinkHeaderPaginationOptions {
  links?: LinkHeaderLinks[];
  page: number;
  perPage: number;
  total: number;
}
  ```
</details>

## Show your support

Give a ⭐️ if this project helped you!

## License

Copyright © 2022 [Gil Barbara <gilbarbara@gmail.com>](https://github.com/gilbarbara).  
This project is [MIT](https://github.com/gilbarbara/link-header-pagination/blob/master/LICENSE) licensed.

