import { modelCredits, site } from '@/shared/config';
import styles from './SiteFooter.module.css';

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <p>
          © 2026 {site.name}. A fictional brand for a portfolio demo. No real property is offered.
        </p>
        <details className={styles.credits} id="credits">
          <summary>Credits</summary>
          <p>
            3D models are CC0 (public domain) from{' '}
            <a href="https://polyhaven.com" rel="noreferrer">
              Poly Haven
            </a>
            . The room, lighting and layout are built in code. The 3D approach builds on the MIT
            licensed{' '}
            <a href="https://github.com/pmndrs/examples" rel="noreferrer">
              pmndrs examples
            </a>
            .
          </p>
          <ul>
            {modelCredits.map((m) => (
              <li key={m.id}>
                <a href={`https://polyhaven.com/a/${m.id}`} rel="noreferrer">
                  {m.name}
                </a>{' '}
                by {m.author}, CC0
              </li>
            ))}
          </ul>
        </details>
      </div>
    </footer>
  );
}
