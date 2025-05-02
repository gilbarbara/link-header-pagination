import linkHeaderPagination, { LinkHeaderPaginationOptions } from '../src';

describe('linkHeaderPagination', () => {
  const baseUrl = 'https://api.example.com/v1/';

  it('generates correct headers for basic pagination', () => {
    const options: LinkHeaderPaginationOptions = {
      page: 1,
      limit: 10,
      total: 25,
    };

    expect(linkHeaderPagination(options)).toMatchSnapshot();
  });

  it('includes baseUrl and query parameters in links', () => {
    const options: LinkHeaderPaginationOptions = {
      page: 1,
      limit: 10,
      total: 30,
      query: {
        sort: 'name',
        order: 'desc',
        filter: 'active',
      },
      baseUrl,
    };

    expect(linkHeaderPagination(options)).toMatchSnapshot();
  });

  it('overrides page parameter in query', () => {
    const options: LinkHeaderPaginationOptions = {
      page: 2,
      limit: 5,
      total: 15,
      query: {
        page: 999, // This should be ignored
        sort: 'date',
      },
      baseUrl,
    };

    expect(linkHeaderPagination(options)).toMatchSnapshot();
  });

  // Test with special characters in query parameters
  it('properly encodes special characters in query parameters', () => {
    const options: LinkHeaderPaginationOptions = {
      page: 1,
      limit: 10,
      total: 20,
      query: {
        search: 'test & example',
        category: 'books+movies',
      },
      baseUrl,
    };

    expect(linkHeaderPagination(options)).toMatchSnapshot();
  });

  // Test with boolean and number values in query
  it('converts boolean and number values to strings in query', () => {
    const options: LinkHeaderPaginationOptions = {
      page: 1,
      limit: 10,
      total: 20,
      query: {
        active: true,
        count: 42,
        showDeleted: false,
      },
      baseUrl,
    };

    expect(linkHeaderPagination(options)).toMatchSnapshot();
  });

  // Test with custom links
  it('includes custom links when provided', () => {
    const options: LinkHeaderPaginationOptions = {
      page: 1,
      limit: 10,
      total: 20,
      links: [
        { rel: 'canonical', url: 'https://example.com/resource' },
        { rel: 'alternate', url: 'https://example.com/resource.json' },
      ],
      baseUrl,
    };

    expect(linkHeaderPagination(options)).toMatchSnapshot();
  });

  // Test edge cases
  it('handles empty total', () => {
    const options: LinkHeaderPaginationOptions = {
      page: 1,
      limit: 10,
      total: 0,
    };

    expect(linkHeaderPagination(options)).toMatchSnapshot();
  });

  it('handles page beyond available data', () => {
    const options: LinkHeaderPaginationOptions = {
      page: 5,
      limit: 10,
      total: 20,
    };

    expect(linkHeaderPagination(options)).toMatchSnapshot();
  });

  it('handles last page', () => {
    const options: LinkHeaderPaginationOptions = {
      page: 3,
      limit: 10,
      total: 25,
    };

    expect(linkHeaderPagination(options)).toMatchSnapshot();
  });

  // Test null or undefined values in query are ignored
  it('ignores null or undefined values in query', () => {
    const options: LinkHeaderPaginationOptions = {
      page: 1,
      limit: 10,
      total: 20,
      query: {
        filter: 'active',
        nullValue: null as any,
        undefinedValue: undefined as any,
      },
      baseUrl,
    };

    expect(linkHeaderPagination(options)).toMatchSnapshot();
  });
});
