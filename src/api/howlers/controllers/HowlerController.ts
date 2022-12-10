import { Controller, Get, Path, Route, Tags } from "tsoa";
import Howler from "../models/Howler";
import RealHowlerServices from "../services/RealHowlerServices";
import { PopulatedHowler } from "../models/PopulatedHowler";

@Route("howlers")
@Tags("Howler")
export class HowlerController extends Controller {
  /** Get howler by ID */
  @Get("{howlerId}")
  async getHowler(@Path() howlerId: string): Promise<Howler | null> {
    if (!howlerId) throw new Error();
    const howler = await new RealHowlerServices().getHowler(howlerId);
    if (!howler) throw new Error();
    return howler;
  }

  /** Get and populate howler by ID */
  @Get("{howlerId}/populated")
  async getPopulatedHowler(@Path() howlerId: string): Promise<PopulatedHowler | null> {
    if (!howlerId) throw new Error();
    const howler = await new RealHowlerServices().getHowler(howlerId);
    if (!howler) throw new Error();
    return await howler.populate();
  }

  /** Get and populate all howlers */
  @Get()
  async getPopulatedHowlers(): Promise<PopulatedHowler[] | null> {
    const howlers = await new RealHowlerServices().getHowlers();

    for (const howler of howlers) {
      await howler.populate();
    }

    return howlers;
  }
}
