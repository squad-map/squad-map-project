import theme from './theme';

interface Flexbox {
  dir: 'row' | 'column';
  jc: string;
  ai: string;
}

export const flexbox = ({ dir = 'row', jc, ai }: Partial<Flexbox>) => `
  display: flex;
  flex-direction: ${dir};
  justify-content: ${jc};
  align-items: ${ai};
`;

export const inlineFlexbox = ({ dir = 'row', jc, ai }: Partial<Flexbox>) => `
display: inline-flex;
flex-direction: ${dir};
justify-content: ${jc};
align-items: ${ai};
`;

/* typography */
type FontWeight = 400 | 700;
export const typoDisplay = (fontWeight: FontWeight) => `
  font-size: ${theme.fontSize.display};
  font-weight: ${fontWeight};
`;

export const typoLarge = (fontWeight: FontWeight) => `
  font-size: ${theme.fontSize.lg};
  font-weight: ${fontWeight};
`;

export const typoMedium = (fontWeight: FontWeight) => `
  font-size: ${theme.fontSize.md};
  font-weight: ${fontWeight};
`;

export const typoSmall = (fontWeight: FontWeight) => `
  font-size: ${theme.fontSize.sm};
  font-weight: ${fontWeight};
`;

export const typoXSmall = (fontWeight: FontWeight) => `
  font-size: ${theme.fontSize.xs};
  font-weight: ${fontWeight};
`;
