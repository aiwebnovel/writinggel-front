import React from 'react';
import ReactDOM from 'react-dom';
import './root.css';
import App from './routes/App';
import { deepMerge } from 'grommet/utils';
import { grommet, Grommet } from 'grommet'

const customTheme = deepMerge(grommet, {
  global: {
    breakpoints: {
      xsmall: {
        value: 680,
        edgeSize: {
          none: '0px',
          small: '6px',
          medium: '12px',
          large: '24px',
        },
      },
      small: {
        value: 768,
        edgeSize: {
          none: '0px',
          small: '12px',
          medium: '24px',
          large: '48px',
        },
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Grommet theme={customTheme}>
    <App />
    </Grommet>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

