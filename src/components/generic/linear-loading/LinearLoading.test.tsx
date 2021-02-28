import React from "react";

import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";

import { LinearLoading } from "./LinearLoading";

describe("LinearLoading component", () => {
  it("should display a loading indicator", () => {
    render(<LinearLoading />);

    screen.getByRole("progressbar", { name: "linear-loading" });
  });
});
