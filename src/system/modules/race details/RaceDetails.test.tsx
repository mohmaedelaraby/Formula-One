import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import RaceDetails from './RaceDetails';
import LoadingPage from '../../shared/loadingState/LoadingPage';
import * as useRaceDetailsModule from './hooks/useRaceDeatails'; // Import the module
import { Result } from '../../types/Types';

jest.mock('../../shared/loadingState/LoadingPage', () => () => <div>Loading...</div>);

jest.mock('./hooks/useRaceDeatails', () => ({
  useRaceDetails: jest.fn(),
}));

jest.mock('./components/ChartsSection/ChartsSection', () => () => <div>ChartsSection</div>);

describe('RaceDetails Component', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
  });

  afterEach(() => {
    queryClient.clear();
    jest.clearAllMocks(); 
  });

  it('shows LoadingPage when isLoading is true', () => {
    (useRaceDetailsModule.useRaceDetails as jest.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
      RaceDetailsData: [],
      handleChangePage: jest.fn(),
      handleChangeRowsPerPage: jest.fn(),
      toggleView: jest.fn(),
      totalCount: 0,
      view: 'table',
      rowsPerPage: 20,
      page: 0,
    });

    render(
      <MemoryRouter initialEntries={['/results/2023/1']}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/results/:season/:round" element={<RaceDetails />} />
          </Routes>
        </QueryClientProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays Drivers data successfully when data is fetched', () => {
    (useRaceDetailsModule.useRaceDetails as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      RaceDetailsData: [
        {
          Results: [
            {
              Driver: {
                givenName: 'Lewis',
                familyName: 'Hamilton',
                nationality: 'British',
              },
              Constructor: { name: 'Mercedes' },
              position: '1',
            },
            {
              Driver: {
                givenName: 'Max',
                familyName: 'Verstappen',
                nationality: 'Dutch',
              },
              Constructor: { name: 'Red Bull' },
              position: '2',
            },
          ],
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

    render(
      <MemoryRouter initialEntries={['/results/2023/1']}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/results/:season/:round" element={<RaceDetails />} />
          </Routes>
        </QueryClientProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Lewis Hamilton')).toBeInTheDocument();
    expect(screen.getByText('Max Verstappen')).toBeInTheDocument();
    expect(screen.getByText('British')).toBeInTheDocument();
    expect(screen.getByText('Dutch')).toBeInTheDocument();
    expect(screen.getByText('Mercedes')).toBeInTheDocument();
    expect(screen.getByText('Red Bull')).toBeInTheDocument();
  });

  it('renders ChartsSection with correct Drivers data', () => {
    (useRaceDetailsModule.useRaceDetails  as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      RaceDetailsData: [
        {
          Results: [
            {
              Driver: {
                givenName: 'Lewis',
                familyName: 'Hamilton',
                nationality: 'British',
              },
              Constructor: { name: 'Mercedes' },
              position: '1',
            },
          ],
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
      <MemoryRouter initialEntries={['/results/2023/1']}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/results/:season/:round" element={<RaceDetails />} />
          </Routes>
        </QueryClientProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('ChartsSection')).toBeInTheDocument();
  });
});