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
