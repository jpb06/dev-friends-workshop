import { RequestHandler, rest } from "msw";

import { changeDevSquadUrl } from "@api/main-backend/config";
import { isNumber } from "@logic/regex";
import { Dev } from "@owntypes/dev.interface";
import { Squad } from "@owntypes/squad.interface";

interface ChangeSquadBody {
  idDev: string;
  idSquad: string;
}

export const mockApiChangeDevSquad = (
  devs: Array<Dev>,
  squads: Array<Squad>
): RequestHandler =>
  rest.post<ChangeSquadBody, any>(changeDevSquadUrl, async (req, res, ctx) => {
    const isRequestValid =
      isNumber(req.body.idDev) && isNumber(req.body.idSquad);
    if (!isRequestValid)
      return res(ctx.status(400), ctx.json("Invalid request"));

    const devId = parseInt(req.body.idDev, 10);
    const squadId = parseInt(req.body.idSquad, 10);

    const dev = devs.find((el) => el.id === devId);
    if (!dev) return res(ctx.status(404), ctx.json("Dev not found"));

    const squad = squads.find((el) => el.id === squadId);
    if (!squad) return res(ctx.status(404), ctx.json("Squad not found"));

    return res(
      ctx.status(200),
      ctx.json(`${dev.firstName} moved to squad ${squad.squad}`)
    );
  });
