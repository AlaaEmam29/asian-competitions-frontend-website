import type {} from '@mui/material/themeCssVarsAugmentation'
import { ThemeOptions, PaletteMode } from '@mui/material/styles'
import { getDesignTokens } from './themePrimitives'
import {
  inputsCustomizations,
  dataDisplayCustomizations,
  navigationCustomizations,
  surfacesCustomizations,
} from './customizations'

export default function getBlogTheme(mode: PaletteMode): ThemeOptions {
  //@ts-ignore
  return {
    ...getDesignTokens(mode),
    components: {
      ...inputsCustomizations,
      ...dataDisplayCustomizations,
      ...navigationCustomizations,
      ...surfacesCustomizations,
    },
  }
}
