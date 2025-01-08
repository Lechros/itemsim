import { imageBaseUrl } from "../../config/backend";

export function getGearIconUrl(iconId: string) {
  return new URL(`/gears/icon/${iconId}.png`, imageBaseUrl);
}
