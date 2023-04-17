import { createElement, ReactNode } from "react";
import { Provider } from "effector-react";

import { useScope } from "./use-scope";

export function EffectorNext({
  values,
  children,
}: {
  values?: Record<string, unknown>;
  children: ReactNode;
}) {
  const scope = useScope(values);

  return createElement(Provider, { value: scope }, children);
}