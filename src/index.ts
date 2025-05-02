export interface LinkHeaderLinks {
  rel: string;
  url: string;
}

export interface LinkHeaderPaginationOptions {
  baseUrl?: string;
  limit: number;
  links?: LinkHeaderLinks[];
  page: number;
  query?: Record<string, string | number | boolean>;
  total: number;
}

export interface LinkHeaderPaginationResult {
  Link: string;
  'X-Items-From': string;
  'X-Items-Per-Page': string;
  'X-Items-To': string;
  'X-Items-Total': string;
}

export default function linkHeaderPagination(
  options: LinkHeaderPaginationOptions,
): LinkHeaderPaginationResult {
  const { baseUrl = '/', limit, links, page, query = {}, total } = options;
  const headers: Partial<LinkHeaderPaginationResult> = {};
  const headerLinks = [];

  // Build query string from query object
  const queryParams = new URLSearchParams();

  // Add page parameter separately since we'll modify it for different links
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null) {
      queryParams.append(key, String(value));
    }
  }

  // Helper function to generate URL with page number
  const getPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(queryParams);

    params.set('page', String(pageNumber));

    return `${baseUrl}?${params.toString()}`;
  };

  const last = Math.ceil(total / limit);
  const previous = page - 1 < last ? page - 1 : last;
  const next = page + 1;

  if (last) {
    headerLinks.push(`<${getPageUrl(page)}>; rel="current"`);

    if (previous > 0) {
      headerLinks.push(`<${getPageUrl(1)}>; rel="first"`, `<${getPageUrl(previous)}>; rel="prev"`);
    }

    if (next <= last) {
      headerLinks.push(`<${getPageUrl(next)}>; rel="next"`, `<${getPageUrl(last)}>; rel="last"`);
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

  let from: string | number = (page - 1) * limit + 1;
  let to = page * limit;

  if (from > total || !total) {
    from = 0;
  }

  if (!from) {
    to = 0;
  } else if (to > total) {
    to = total;
  }

  headers['X-Items-From'] = `${from || '0'}`;
  headers['X-Items-Per-Page'] = `${limit}`;
  headers['X-Items-To'] = `${to || '0'}`;
  headers['X-Items-Total'] = `${total}`;

  return headers as LinkHeaderPaginationResult;
}
