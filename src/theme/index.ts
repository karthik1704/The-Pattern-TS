import { Theme } from "@mui/material";
import { light } from "./lightTheme";
import { dark } from "./darkTheme";

export function getThemeByName(theme: string): Theme {
  return themeMap[theme];
}

const themeMap: { [key: string]: Theme } = {
  light,
  dark
};