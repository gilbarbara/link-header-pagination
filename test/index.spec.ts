import linkHeaderPagination from '../src';

describe('linkHeaderPagination', () => {
  it.each([
    { page: 1, perPage: 20, total: 0 },
    {
      page: 2,
      perPage: 20,
      total: 40,
      links: [{ url: 'https://example.com/docs', rel: 'documentation' }],
    },
    { page: 1, perPage: 100, total: 100 },
    { page: 1, perPage: 20, total: 40 },
    { page: 2, perPage: 30, total: 40 },
    { page: 3, perPage: 12, total: 100 },
    { page: 10, perPage: 20, total: 24 },
  ])(
    'should work with { page: "$page", perPage: "$perPage", total: "$total" }',
    ({ links, page, perPage, total }) => {
      expect(linkHeaderPagination({ links, page, perPage, total })).toMatchSnapshot();
    },
  );
});
