import { renderHook } from '@testing-library/react-hooks';
import { DevFriendsContextWrapper } from '@tests/wrappers';

import { useReportOnReady } from './useReportOnReady';

const setSelectedSquadsMock = jest.fn();
const setStateMock = jest.fn();
const wrapper = DevFriendsContextWrapper(setSelectedSquadsMock, setStateMock);

describe("useReportOnErrors hook", () => {
  it("should not change the status if there is no data", () => {
    renderHook(() => useReportOnReady(), {
      wrapper,
    });

    expect(setStateMock).toHaveBeenCalledTimes(0);
  });

  it("should set status to ready if there is some data", () => {
    renderHook(() => useReportOnReady([]), {
      wrapper,
    });

    expect(setStateMock).toHaveBeenCalledTimes(1);
    expect(setStateMock).toHaveBeenCalledWith("ready");
  });
});
