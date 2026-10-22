import { site } from '@/shared/config';
import { LinkButton } from '@/shared/ui';
import styles from './SiteHeader.module.css';

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <a className={styles.brand} href="#top" aria-label={`${site.name}, top of page`}>
        {site.shortName.toUpperCase()}
      </a>
      <nav aria-label="Main">
        <ul>
          <li>
            <a href="#tour">Residences</a>
          </li>
          <li>
            <a href="#building">Building</a>
          </li>
          <li>
            <a href="#gallery">Gallery</a>
          </li>
          <li>
            <a href="#book">Contact</a>
          </li>
        </ul>
      </nav>
      <LinkButton variant="ghost" href="#book" className={styles.cta}>
        Book a visit
      </LinkButton>
    </header>
  );
}
