import { renderHook } from '@testing-library/react-hooks';
import { DevFriendsContextWrapper } from '@tests/wrappers';

import { useReportOnErrors } from './useReportOnErrors';

const setSelectedSquadsMock = jest.fn();
const setStateMock = jest.fn();
const wrapper = DevFriendsContextWrapper(setSelectedSquadsMock, setStateMock);

describe("useReportOnErrors hook", () => {
  it("should not change the status if there is no errors", () => {
    renderHook(() => useReportOnErrors(false), {
      wrapper,
    });

    expect(setStateMock).toHaveBeenCalledTimes(0);
  });

  it("should set status as errored if there is errors", () => {
    renderHook(() => useReportOnErrors(true), {
      wrapper,
    });

    expect(setStateMock).toHaveBeenCalledTimes(1);
    expect(setStateMock).toHaveBeenCalledWith("errored");
  });
});
