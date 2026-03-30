/**
 * Logo Component Premium — SoftConection
 * Logo grande, animada, responsiva
 */

import React from 'react';
import { cn } from '@/lib/utils';
import logo from '@/assets/logo.png';

interface LogoProps {
  size?: 'small' | 'medium' | 'large' | 'xl';
  animated?: boolean;
  variant?: 'light' | 'dark' | 'auto';
  showWordmark?: boolean;
  compactOnMobile?: boolean;
  className?: string;
  href?: string;
  onClick?: () => void;
}

const sizeMap = {
  small: { logo: 'h-8 w-auto', text: 'text-sm' },
  medium: { logo: 'h-10 w-auto', text: 'text-base' },
  large: { logo: 'h-14 w-auto', text: 'text-xl' },
  xl: { logo: 'h-20 w-auto', text: 'text-2xl' },
};

export const Logo: React.FC<LogoProps> = ({
  size = 'large',
  animated = true,
  variant = 'auto',
  showWordmark,
  compactOnMobile = false,
  className,
  href = '/',
  onClick,
}) => {
  const sizes = sizeMap[size];
  const shouldShowWordmark = showWordmark ?? (size === 'large' || size === 'xl');

  const glowClass = animated
    ? 'group-hover:drop-shadow-[0_0_28px_rgba(0,211,255,0.8)] transition-all duration-500'
    : '';

  const content = (
    <div className={cn('group flex items-center gap-3', className)}>
      <img
        src={logo}
        alt="SoftConection"
        className={cn('object-contain', sizes.logo, glowClass)}
      />

      {shouldShowWordmark && (
        <div className={cn('flex flex-col gap-0.5', compactOnMobile && 'hidden sm:flex')}>
          <span className={cn('font-display font-bold tracking-tight text-foreground', sizes.text)}>
            SoftConection
          </span>
          <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
            Solucoes TI
          </span>
        </div>
      )}
    </div>
  );

  // Se tiver href, renderizar como link
  if (href) {
    return (
      <a href={href} className="hover:opacity-80 transition-opacity">
        {content}
      </a>
    );
  }

  // Se tiver onClick, renderizar como button
  if (onClick) {
    return (
      <button onClick={onClick} className="hover:opacity-80 transition-opacity">
        {content}
      </button>
    );
  }

  return content;
};

export default Logo;
