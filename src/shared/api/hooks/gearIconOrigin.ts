"use client";

import useSWR from "swr";
import { getGearIconOriginUrl } from "../endpoints/gearIconOrigin";

export function useGearIconOrigin(iconId: string) {
  const url = getGearIconOriginUrl(iconId).toString();
  const { data, error, isLoading } = useSWR<[number, number]>(url);

  return {
    origin: data,
    error,
    isLoading,
  };
}
