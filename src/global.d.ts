declare module '*.jpg';
declare module '*.png';
declare module '*.woff2';
declare module '*.woff';
declare module '*.ttf';
declare module '*.svg' {
  import React = require('react');

  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}

declare module WeatherApp {
  export interface Theme {
    light:{
      [key:string]:string
    },
    dark: {
      [key:string]:string
    },
  }
}

declare module '@emotion/styled' {
  import { CreateStyled } from '@emotion/styled/types/index.d'

  export * from '@emotion/styled/types/index.d'
  const customStyled: CreateStyled<WeatherApp.Theme>
  export default customStyled
}
