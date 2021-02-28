import { RequestHandler, rest } from "msw";
import { Dev } from "types/dev.interface";

import { isNumber } from "@logic/regex";
import { Squad } from "@owntypes/squad.interface";

import { changeDevSquadUrl } from "../../api/rest/api.config";

interface ChangeSquadBody {
  devId: any;
  squadId: any;
}

export const mockApiChangeDevSquad = (
  devs: Array<Dev>,
  squads: Array<Squad>
): RequestHandler =>
  rest.post<ChangeSquadBody, any>(changeDevSquadUrl, async (req, res, ctx) => {
    const isRequestValid =
      isNumber(req.body.devId) && isNumber(req.body.squadId);
    if (!isRequestValid)
      return res(ctx.status(400), ctx.json("Invalid request"));

    const devId = parseInt(req.body.devId, 10);
    const squadId = parseInt(req.body.squadId, 10);

    const dev = devs.find((el) => el.id === devId);
    if (!dev) return res(ctx.status(404), ctx.json("Dev not found"));

    const squad = squads.find((el) => el.id === squadId);
    if (!squad) return res(ctx.status(404), ctx.json("Squad not found"));

    return res(
      ctx.status(200),
      ctx.json(`${dev.firstName} moved to squad ${squad.squad}`)
    );
  });
