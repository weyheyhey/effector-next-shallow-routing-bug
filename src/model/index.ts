import { createEvent, createStore } from "effector";
import { MouseEvent } from "react";

export type OS = "win" | "mac";

export const setOs = createEvent<OS>();
export const changeOsLinkPressed = createEvent<MouseEvent<HTMLAnchorElement>>();

export const $os = createStore<null | OS>(null);
export const $nextOs = $os.map(chooseNextOs);

$os.on(setOs, (_, os) => os);
$os.on(changeOsLinkPressed, (currentOs) => chooseNextOs(currentOs));


function chooseNextOs(os: null | OS): OS {
  return os === null || os === "win" ? "mac" : "win";
}