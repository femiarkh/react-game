import React from 'react';
import { ReactComponent as RSSchool } from '../assets/icons/rs_school.svg';

const Footer = () => (
  <div className="footer">
    <p>
      designed by{' '}
      <a
        className="footer__gh-link"
        href="https://github.com/femiarkh"
        target="_blank"
        rel="noreferrer"
      >
        femiarkh
      </a>
      &nbsp;at
    </p>
    <p className="footer__logo">
      <a href="https://rs.school/react/" target="_blank" rel="noreferrer">
        <RSSchool />
      </a>
    </p>
    <p>in 2021</p>
  </div>
);

export { Footer };
