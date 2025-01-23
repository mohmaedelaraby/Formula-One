import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import RacesPerSeason from './RacesPerSeason';
import LoadingPage from '../../shared/loadingState/LoadingPage';
import * as useRacePerSeasonsModule from './hooks/useRacePerSeason'; // Import the module
import { Races } from '../../types/Types';

// Mock the LoadingPage component
jest.mock('../../shared/loadingState/LoadingPage', () => () => <div>Loading...</div>);

// Mock the useRacePerSeasons hook
jest.mock('./hooks/useRacePerSeason', () => ({
  useRacePerSeasons: jest.fn(),
}));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Keep other exports
  useNavigate: () => mockNavigate, // Mock useNavigate
  useParams: () => ({ season: '2023' }), // Mock useParams
}));

describe('RacesPerSeason Component', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
  });

  afterEach(() => {
    
    queryClient.clear();
    jest.clearAllMocks();
  });

  // Test Case 1: Loading Component Displayed While isLoading
  it('shows LoadingPage when isLoading is true inside Races Page', () => {
    (useRacePerSeasonsModule.useRacePerSeasons as jest.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
      RaceData: [],
      handleChangePage: jest.fn(),
      handleChangeRowsPerPage: jest.fn(),
      toggleView: jest.fn(),
      totalCount: 0,
      view: 'table',
      rowsPerPage: 20,
      page: 0,
    });

    render(
      <MemoryRouter initialEntries={['/races/2023']}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/races/:season" element={<RacesPerSeason />} />
          </Routes>
        </QueryClientProvider>
      </MemoryRouter>
    );

    // Assert that the LoadingPage component is rendered
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });


  it('displays Races data successfully when data is fetched', () => {
   
    (useRacePerSeasonsModule.useRacePerSeasons as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      RaceData: [
        {
          season: '2023',
          round: '1',
          raceName: 'Race 1',
          Circuit: { circuitName: 'Circuit 1' },
          date: '2023-01-01',
        },
        {
          season: '2023',
          round: '2',
          raceName: 'Race 2',
          Circuit: { circuitName: 'Circuit 2' },
          date: '2023-02-01',
        },
      ],
      handleChangePage: jest.fn(),
      handleChangeRowsPerPage: jest.fn(),
      toggleView: jest.fn(),
      totalCount: 2,
      view: 'table',
      rowsPerPage: 20,
      page: 0,
    });

    // Render the RacesPerSeason component with necessary providers
    render(
      <MemoryRouter initialEntries={['/races/2023']}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/races/:season" element={<RacesPerSeason />} />
          </Routes>
        </QueryClientProvider>
      </MemoryRouter>
    );

    // Assert that the data is displayed
    expect(screen.getByText('Race 1')).toBeInTheDocument();
    expect(screen.getByText('Race 2')).toBeInTheDocument();
    expect(screen.getByText('Circuit 1')).toBeInTheDocument();
    expect(screen.getByText('Circuit 2')).toBeInTheDocument();
  });


  it('navigates to the correct route when a race is clicked', async () => {
   
    (useRacePerSeasonsModule.useRacePerSeasons as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      RaceData: [
        {
          season: '2023',
          round: '1',
          raceName: 'Race 1',
          Circuit: { circuitName: 'Circuit 1' },
          date: '2023-01-01',
        },
      ],
      handleChangePage: jest.fn(),
      handleChangeRowsPerPage: jest.fn(),
      toggleView: jest.fn(),
      totalCount: 1,
      view: 'table',
      rowsPerPage: 20,
      page: 0,
    });

    
    render(
      <MemoryRouter initialEntries={['/races/2023']}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/races/:season" element={<RacesPerSeason />} />
          </Routes>
        </QueryClientProvider>
      </MemoryRouter>
    );

    // Simulate clicking on the race
    const raceCell = screen.getByText('Race 1');
    await userEvent.click(raceCell);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        '/results/2023/1?name=Race%201'
      );
    });
  });
});