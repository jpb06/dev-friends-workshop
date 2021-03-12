import React from "react";

import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { setUseSquadsReturnValue } from "@tests/mocks/mockUseSquadQuery.mock";
import { DevFriendsContextWrapper } from "@tests/wrappers";

import { SquadFilter } from "./SquadFilter";

jest.mock("@api/useSquadsQuery");

const wrapper = DevFriendsContextWrapper();

describe("SquadFilter component", () => {
  it("should display nothing if there is no squads", () => {
    setUseSquadsReturnValue();

    render(<SquadFilter />, { wrapper });

    expect(screen.queryAllByRole("checkbox")).toHaveLength(0);
  });

  it("should display one checkbox per squad", () => {
    setUseSquadsReturnValue([
      { id: 1, squad: 1 },
      { id: 2, squad: 2 },
      { id: 3, squad: 3 },
    ]);

    render(<SquadFilter />, { wrapper });

    expect(screen.queryAllByRole("checkbox")).toHaveLength(3);
    screen.getByRole("checkbox", { name: "Squad 1" });
    screen.getByRole("checkbox", { name: "Squad 2" });
    screen.getByRole("checkbox", { name: "Squad 3" });
  });
});
