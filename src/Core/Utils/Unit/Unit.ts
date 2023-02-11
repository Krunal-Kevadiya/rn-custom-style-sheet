import { UnitEnum } from './UnitTypes';

export function toPx(value: number, units: UnitEnum | String): number {
  switch (units) {
    case UnitEnum.Em:
      return value * 16;
    case UnitEnum.Rem:
      return value * 16;
    case UnitEnum.Cm:
      return (value * 96) / 2.54;
    case UnitEnum.Mm:
      return (value * 96) / 2.54 / 10;
    case UnitEnum.In:
      return value * 96;
    case UnitEnum.Pt:
      return value * 72;
    case UnitEnum.Pc:
      return (value * 72) / 12;
    default:
      return value;
  }
}
