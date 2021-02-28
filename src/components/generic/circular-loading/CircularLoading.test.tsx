import React from "react";

import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";

import { CircularLoading } from "./CircularLoading";

describe("CircularLoading component", () => {
  it("should display a loading indicator", () => {
    render(<CircularLoading />);

    screen.getByRole("progressbar", { name: "circle-loading" });
  });
});
