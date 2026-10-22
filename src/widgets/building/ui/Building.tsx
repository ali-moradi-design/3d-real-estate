import styles from './Building.module.css';

const stats = [
  { value: '24', label: 'Residences' },
  { value: '42–120', label: 'Square meters' },
  { value: '6', label: 'Floors' },
  { value: 'Q3 2027', label: 'Handover' },
] as const;

const amenities = [
  {
    title: 'Rooftop garden',
    text: 'A shared terrace with harbor views and a summer kitchen.',
  },
  {
    title: 'Wellness room',
    text: 'Sauna, plunge pool and a quiet lounge for residents.',
  },
  {
    title: 'Smart and efficient',
    text: 'Heat pumps, a solar roof and EV charging in the garage.',
  },
] as const;

export function Building() {
  return (
    <section className={styles.section} id="building" aria-labelledby="building-title">
      <div className={styles.wrap}>
        <p className={styles.eyebrow}>The building</p>
        <h2 id="building-title">Twenty-four residences, one quiet block.</h2>
        <p className={styles.lead}>
          Light-filled apartments from 42 to 120 m², above a shared garden courtyard.
        </p>
        <dl className={styles.stats}>
          {stats.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
        <ul className={styles.amenities}>
          {amenities.map((a) => (
            <li key={a.title}>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
