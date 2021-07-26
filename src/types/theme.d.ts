import { Theme } from '@material-ui/core/styles';

declare module '@material-ui/styles' {
    export interface DefaultTheme extends Theme {}
}
