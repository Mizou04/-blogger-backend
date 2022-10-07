export const mockPresenterMethod = jest.fn();
const mock = jest.fn().mockImplementation(() => {
  return {present: mockPresenterMethod};
});

export default mock;