# link-header-pagination

[![NPM version](https://badge.fury.io/js/link-header-pagination.svg)](https://www.npmjs.com/package/link-header-pagination) [![CI](https://github.com/gilbarbara/link-header-pagination/actions/workflows/main.yml/badge.svg)](https://github.com/gilbarbara/link-header-pagination/actions/workflows/main.yml) [![link-header-pagination](https://badgen.net/bundlephobia/minzip/link-header-pagination?label=size)](https://bundlephobia.com/result?p=link-header-pagination) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=gilbarbara_link-header-pagination&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=gilbarbara_link-header-pagination) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=gilbarbara_link-header-pagination&metric=coverage)](https://sonarcloud.io/summary/new_code?id=gilbarbara_link-header-pagination)

Generate LinkHeader pagination

## Setup

```bash
npm install link-header-pagination
```

## Usage

```typescript
import linkHeaderPagination from 'link-header-pagination';

const headers = linkHeaderPagination({ limit: 20, page: 1,  total: 100 });

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

**linkHeader(options: LinkHeaderPaginationOptions): LinkHeaderPaginationResult**

<details>
  <summary>Type Definition</summary>

  ```typescript
interface LinkHeaderLinks {
  rel: string;
  url: string;
}

interface LinkHeaderPaginationOptions {
  baseUrl?: string;
  limit: number;
  links?: LinkHeaderLinks[];
  page: number;
  query?: Record<string, string | number | boolean>;
  total: number;
}

interface LinkHeaderPaginationResult {
  Link: string;
  'X-Items-From': string;
  'X-Items-Per-Page': string;
  'X-Items-To': string;
  'X-Items-Total': string;
}
  ```
</details>

## Show your support

Give a ⭐️ if this project helped you!

## License

Copyright © 2022 [Gil Barbara <gilbarbara@gmail.com>](https://github.com/gilbarbara).  
This project is [MIT](https://github.com/gilbarbara/link-header-pagination/blob/master/LICENSE) licensed.
