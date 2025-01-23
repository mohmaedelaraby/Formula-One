import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import Seasons from './Seasons';
import LoadingPage from '../../shared/loadingState/LoadingPage';
import * as useSeasonsModule from './hooks/useSeasons';

// Mock the LoadingPage component
jest.mock('../../shared/loadingState/LoadingPage', () => () => <div>Loading...</div>);

// Mock the useSeasons hook
jest.mock('./hooks/useSeasons', () => ({
  useSeasons: jest.fn(),
}));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
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
    jest.clearAllMocks(); // Clear all mocks after each test
  });

  it('shows LoadingPage when isLoading is true', () => {
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

    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Seasons />
        </QueryClientProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays Seasons data successfully when data is fetched', () => {
    (useSeasonsModule.useSeasons as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      SeasonData: [
        { season: '2023', url: 'http://example.com/2023' },
        { season: '2022', url: 'http://example.com/2022' },
      ],
      handleChangePage: jest.fn(),
      handleChangeRowsPerPage: jest.fn(),
      toggleView: jest.fn(),
      totalCount: 2,
      view: 'table',
      rowsPerPage: 10,
      page: 0,
    });

    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Seasons />
        </QueryClientProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
  });

  it('navigates to the correct route when a season is clicked', async () => {
    (useSeasonsModule.useSeasons as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      SeasonData: [{ season: '2023', url: 'http://example.com/2023' }],
      handleChangePage: jest.fn(),
      handleChangeRowsPerPage: jest.fn(),
      toggleView: jest.fn(),
      totalCount: 1,
      view: 'table',
      rowsPerPage: 10,
      page: 0,
    });

    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Seasons />
        </QueryClientProvider>
      </MemoryRouter>
    );

    const seasonCell = screen.getByText('2023');
    await userEvent.click(seasonCell);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/races/2023');
    });
  });
});