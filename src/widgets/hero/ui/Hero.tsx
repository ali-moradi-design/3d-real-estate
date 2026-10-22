import { site } from '@/shared/config';
import { LinkButton } from '@/shared/ui';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.image}
        src="/images/hero.jpg"
        alt="A bright living room with a sofa, armchairs and a floor-to-ceiling window"
        width={1920}
        height={1080}
        fetchPriority="high"
      />
      <div className={styles.shade} />
      <div className={styles.content}>
        <p className={styles.eyebrow}>Pre-sale · 24 residences · Harbor District</p>
        <h1 id="hero-title">{site.tagline}</h1>
        <p className={styles.lead}>
          Step inside two Northlight residences in 3D. Select a hotspot to see materials, sizes and
          the price of each unit.
        </p>
        <div className={styles.actions}>
          <LinkButton href="#tour">Explore the residences</LinkButton>
          <LinkButton variant="ghost" href="#book">
            Book a visit
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
