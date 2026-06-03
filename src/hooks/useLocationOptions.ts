import { useEffect, useState } from "react";
import axios from "axios";

import { getLocationFilterOptions } from "../Services/locations";
import type { LocationFilterOptions } from "../Services/locations";

/** Carrega (uma vez) os valores reais de tipo e dimensão para os filtros. */
export function useLocationOptions(): LocationFilterOptions {
  const [options, setOptions] = useState<LocationFilterOptions>({
    types: [],
    dimensions: [],
  });

  useEffect(() => {
    const controller = new AbortController();

    getLocationFilterOptions(controller.signal)
      .then(setOptions)
      .catch((err) => {
        if (!axios.isCancel(err)) {
          // Sem opções dinâmicas os selects apenas ficam vazios; a busca por nome segue funcionando.
        }
      });

    return () => controller.abort();
  }, []);

  return options;
}
