import { apiBaseUrl } from "../../config/backend";

export function getGearIconOriginUrl(iconId: string) {
  return new URL(`/gears/${iconId}/icon/origin`, apiBaseUrl);
}
