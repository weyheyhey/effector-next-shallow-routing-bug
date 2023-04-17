import type { AppProps } from "next/app";
import { EffectorNext } from "@effector/next";

//import { EffectorNext } from "../effector-next";

export default function App({
  Component,
  pageProps,
}: AppProps<{ values: Record<string, unknown> }>) {
  const {
    /**
     * This is the `values` that is result of `serialize(scope)`
     * and was passed to props in the `getServerSideProps` (or other) function
     */
    values,
  } = pageProps;

  return (
    <EffectorNext values={values}>
      <Component />
    </EffectorNext>
  );
}