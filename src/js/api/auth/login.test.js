/**
 * @jest-environment node
 */

import { login } from './login.js';
import { save } from '../../storage/save.js';

// Mock the storage module
jest.mock('../../storage/save.js', () => ({
  save: jest.fn(),
}));

// Mock the global fetch function
global.fetch = jest.fn();

/**
 * Test suite for the login function
 */
describe('login function', () => {
  /**
   * Reset the mocks before each test
   */
  beforeEach(() => {
    fetch.mockReset();
    save.mockReset();
  });

  /**
   * Test case: Verify that login saves token and profile on successful login
   */
  it('should save token and profile on successful login', async () => {
    // Setting up a fake successful response from the server
    const mockResponse = {
      ok: true,
      json: async () => ({
        accessToken: 'token',
        name: 'oddedodd',
      }),
    };

    fetch.mockResolvedValueOnce(mockResponse);

    // Login credentials
    const email = 'odde@stud.noroff.no';
    const password = 'testpassoword123';
    const accessToken = 'token';
    const userProfile = {
      name: 'oddedodd',
    };

    await login(email, password);

    expect(save).toHaveBeenCalledWith('token', accessToken);
    expect(save).toHaveBeenCalledWith('profile', userProfile);
  });

  /**
   * Test case: Verify that login throws an error on login failure
   */
  it('should throw an error on login failure', async () => {
    // We're setting up a fake failed response from the server
    const mockResponse = {
      ok: false,
      statusText: 'Unauthorized',
    };

    fetch.mockResolvedValueOnce(mockResponse);

    // Incorrect login credentials
    const email = 'wrongUser@stud.noroff.no';
    const password = 'wrongPassword';

    await expect(login(email, password)).rejects.toThrow('Unauthorized');
    expect(save).not.toHaveBeenCalled();
  });
});
