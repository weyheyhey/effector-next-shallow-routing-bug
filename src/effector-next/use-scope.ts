import { fork, Scope } from "effector";
import { useRef } from "react";

import { getClientScope, getServerScope } from "./get-scope";


export function useScope(values?: Record<string, unknown>) {
  const valuesRef = useRef<null | Record<string, unknown>>(null);
  const scopeRef = useRef<Scope>(fork());

  if (typeof window === "undefined") {
    return getServerScope(values);
  }

  // avoiding the update for shallow routing
  if (values !== valuesRef.current) {

    scopeRef.current = getClientScope(values);
    valuesRef.current = values ?? null;
  }

  return scopeRef.current as Scope;
}
