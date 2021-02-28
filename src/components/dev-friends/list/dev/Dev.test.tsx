import React from "react";

import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Dev } from "./Dev";
import { getDevDescription } from "./logic/getDevDescription";

describe("Dev component", () => {
  const onSelected = jest.fn();

  it("should display a dev", () => {
    const firstName = "Yolo man";
    const squad = 1;

    render(
      <Dev id={1} firstName={firstName} squad={squad} onSelected={onSelected} />
    );

    screen.getByRole("dev", { name: getDevDescription({ firstName, squad }) });
  });

  it("should display a picture for the dev", () => {
    const firstName = "Yolo man";
    const squad = 1;

    render(
      <Dev id={1} firstName={firstName} squad={squad} onSelected={onSelected} />
    );

    screen.getByRole("img", { name: firstName });
  });

  it("should call onSelected when clicked", () => {
    const firstName = "Yolo man";
    const squad = 1;

    render(
      <Dev id={1} firstName={firstName} squad={squad} onSelected={onSelected} />
    );

    const button = screen.getByRole("img", { name: firstName });
    userEvent.click(button);

    expect(onSelected).toHaveBeenCalledTimes(1);
  });
});
