export interface LinkHeaderLinks {
  rel: string;
  url: string;
}

export interface LinkHeaderPaginationOptions {
  links?: LinkHeaderLinks[];
  page: number;
  perPage: number;
  total: number;
}

export default function linkHeaderPagination(options: LinkHeaderPaginationOptions) {
  const { links, page, perPage, total } = options;
  const headers: Record<string, string> = {};
  const headerLinks = [];

  const last = Math.ceil(total / perPage);
  const previous = page - 1 < last ? page - 1 : last;
  const next = page + 1;

  if (last) {
    headerLinks.push(`</?page=${page}>; rel="current"`);

    if (previous > 0) {
      headerLinks.push('</?page=1>; rel="first"', `</?page=${previous}>; rel="prev"`);
    }

    if (next <= last) {
      headerLinks.push(`</?page=${next}>; rel="next"`, `</?page=${last}>; rel="last"`);
    }
  }

  if (links?.length) {
    for (const link of links) {
      headerLinks.push(`<${link.url}>; rel="${link.rel}"`);
    }
  }

  if (headerLinks.length) {
    headers.Link = headerLinks.join(', ');
  }

  let from: string | number = (page - 1) * perPage + 1;
  let to = page * perPage;

  if (from > total || !total) {
    from = 0;
  }

  if (!from) {
    to = 0;
  } else if (to > total) {
    to = total;
  }

  headers['X-Items-From'] = `${from || ''}`;
  headers['X-Items-Per-Page'] = `${perPage}`;
  headers['X-Items-To'] = `${to || ''}`;
  headers['X-Items-Total'] = `${total}`;

  return headers;
}
