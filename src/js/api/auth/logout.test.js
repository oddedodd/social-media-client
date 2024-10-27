/**
 * @jest-environment node
 */

import { logout } from './logout.js';
import { remove } from '../../storage/index.js';

// Mock the storage module
jest.mock('../../storage/index.js', () => ({
  remove: jest.fn(),
}));

/**
 * Test suite for the logout function
 */
describe('logout function', () => {
  /**
   * Reset the mock before each test run
   */
  beforeEach(() => {
    remove.mockReset();
  });

  /**
   * Test case: Verify that logout removes token and profile from local storage
   */
  it('should remove token and profile from local storage on logout', () => {
    logout();

    expect(remove).toHaveBeenCalledWith('token');
    expect(remove).toHaveBeenCalledWith('profile');
  });

  /**
   * Test case: Ensure logout function can be called multiple times without throwing an error
   */
  it('should not throw an error when called multiple times', () => {
    expect(() => {
      logout();
      logout();
    }).not.toThrow();

    expect(remove).toHaveBeenCalledTimes(4);
    expect(remove).toHaveBeenCalledWith('token');
    expect(remove).toHaveBeenCalledWith('profile');
  });
});
