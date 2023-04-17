import { fork, sample, createEvent, serialize, allSettled } from "effector";
import type { GetServerSidePropsContext } from "next";
import { useUnit } from "effector-react";
import NextLink from "next/link";

import { setOs, $os, $nextOs, changeOsLinkPressed, OS } from "../model";

const pageRequested = createEvent<GetServerSidePropsContext>();

sample({
  clock: pageRequested.map(({ query }) => (query.os ?? "mac") as OS),
  target: setOs,
});

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const scope = fork();

  await allSettled(pageRequested, { scope, params: ctx });

  if (!ctx.query.os) {
    return {
      redirect: {
        permanent: false,
        destination: `/?os=mac`,
      },
    };
  }

  return {
    props: {
      // This is the `values` that is used at `_app.tsx` via EffectorNext provider
      values: serialize(scope),
    },
  };
};

export default function Home() {
  const { os, nextOs, handleClick } = useUnit({ os: $os, nextOs: $nextOs, handleClick: changeOsLinkPressed });

  const nextOsHref = `/?os=${nextOs}`;

  return (
    <>
      <h1>Next app</h1>
      <div>
        <div>Current OS: {os}</div>
        <NextLink shallow href={nextOsHref} onClick={handleClick}>
          Go to next os: {nextOs}
        </NextLink>
      </div>
    </>
  );
}
