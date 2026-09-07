import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import HomePage from '../pages/HomePage';
import Navbar from '../components/Navbar';
import ShopPage from '../pages/ShopPage';
import AdminPage from '../pages/AdminPage';

describe('HomePage', () => {
  test('renders Coffee R Us branding', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('heading', { name: /coffee r us/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/the go to store for your coffee needs/i)
    ).toBeInTheDocument();
  });
});

describe('Navbar', () => {
  test('renders primary navigation links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /shop/i })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /admin portal/i })
    ).toBeInTheDocument();
  });
});

describe('ShopPage', () => {
  test('filters via search input callback', async () => {
    const user = userEvent.setup();
    const setSearchQuery = jest.fn();

    render(
      <MemoryRouter>
        <ShopPage
          filteredProducts={[
            {
              id: 1,
              name: 'Morning Blend',
              description: 'Smooth',
              origin: 'Location 1',
              image: 'https://example.com/a.jpg',
              price: 10,
            },
          ]}
          loading={false}
          error=""
          searchQuery=""
          setSearchQuery={setSearchQuery}
          selectedLocations={[]}
          toggleLocation={jest.fn()}
        />
      </MemoryRouter>
    );

    await user.type(screen.getByRole('searchbox'), 'Morning');
    expect(setSearchQuery).toHaveBeenCalled();
    expect(screen.getByText('Morning Blend')).toBeInTheDocument();
  });
});

describe('AdminPage', () => {
  test('shows validation errors for empty submit', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <AdminPage />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText(/coffee name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/description is required/i)).toBeInTheDocument();
    expect(screen.getByText(/image url is required/i)).toBeInTheDocument();
    expect(screen.getByText(/enter a valid price/i)).toBeInTheDocument();
  });
});