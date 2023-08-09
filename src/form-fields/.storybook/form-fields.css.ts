import { style } from '@vanilla-extract/css';

export const container = style({ margin: '0 auto', display: 'flex', justifyContent: 'space-between', padding: '16px' });

export const form = style({
  width: '500px',
  display: 'flex',
  flexFlow: 'column nowrap',
  gap: '26px',
  marginRight: '20px',
});

export const preview = style({
  width: '500px',
  height: '500px',
  background: '#f2f2f2',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexFlow: 'column nowrap',
  borderRadius: '20px',
});
