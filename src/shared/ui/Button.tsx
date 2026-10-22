import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

type Variant = 'solid' | 'ghost';

export function LinkButton({
  variant = 'solid',
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant }) {
  return <a className={`${styles.button} ${styles[variant]} ${className ?? ''}`} {...props} />;
}

export function Button({
  variant = 'solid',
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      type="button"
      className={`${styles.button} ${styles[variant]} ${className ?? ''}`}
      {...props}
    />
  );
}
