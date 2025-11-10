import React from 'react';

const logo = 'assets/logo.png';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <img src={logo} alt="LMS Platform Logo" className={className} />
  );
};

export default Logo;