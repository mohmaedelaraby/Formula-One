import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import Seasons from './Seasons';
import LoadingPage from '../../shared/loadingState/LoadingPage';
import * as useSeasonsModule from './hooks/useSeasons'; // Import the module

// Mock the LoadingPage component
jest.mock('../../shared/loadingState/LoadingPage', () => () => <div>Loading...</div>);

// Mock the useSeasons hook
jest.mock('./hooks/useSeasons', () => ({
  useSeasons: jest.fn(),
}));

describe('Seasons Component', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    // Create a new QueryClient instance before each test
    queryClient = new QueryClient();
  });

  afterEach(() => {
    // Clear the QueryClient instance after each test
    queryClient.clear();
  });

  it('shows LoadingPage when isLoading is true', () => {
    // Mock the useSeasons hook to return isLoading as true
    (useSeasonsModule.useSeasons as jest.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
      SeasonData: [],
      handleChangePage: jest.fn(),
      handleChangeRowsPerPage: jest.fn(),
      toggleView: jest.fn(),
      totalCount: 0,
      view: 'table',
      rowsPerPage: 10,
      page: 0,
    });

    // Render the Seasons component with necessary providers
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Seasons />
        </QueryClientProvider>
      </MemoryRouter>
    );

    // Assert that the LoadingPage component is rendered
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows LoadingPage when isError is true', () => {
    // Mock the useSeasons hook to return isError as true
    (useSeasonsModule.useSeasons as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      SeasonData: [],
      handleChangePage: jest.fn(),
      handleChangeRowsPerPage: jest.fn(),
      toggleView: jest.fn(),
      totalCount: 0,
      view: 'table',
      rowsPerPage: 10,
      page: 0,
    });

    // Render the Seasons component with necessary providers
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Seasons />
        </QueryClientProvider>
      </MemoryRouter>
    );

    // Assert that the LoadingPage component is rendered
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});