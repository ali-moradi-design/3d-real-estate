import styles from './Gallery.module.css';

const images = [
  { src: '/images/gallery-1.jpg', alt: 'Loft living area from the sofa side', large: true },
  { src: '/images/gallery-2.jpg', alt: 'Two-bedroom dining table set for six' },
  { src: '/images/gallery-3.jpg', alt: 'Smoked oak floor with sunlight from the window' },
  { src: '/images/gallery-4.jpg', alt: 'Corner window of the two-bedroom unit' },
  { src: '/images/gallery-5.jpg', alt: 'Floor-to-ceiling window of the loft' },
] as const;

export function Gallery() {
  return (
    <section className={styles.section} id="gallery" aria-labelledby="gallery-title">
      <div className={styles.wrap}>
        <p className={styles.eyebrow}>Gallery</p>
        <h2 id="gallery-title">Rooms, up close.</h2>
        <ul className={styles.grid}>
          {images.map((img) => (
            <li key={img.src} data-large={'large' in img}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.alt} width={1600} height={900} loading="lazy" />
            </li>
          ))}
        </ul>
        <p className={styles.note}>Images are real-time renders of the 3D scene.</p>
      </div>
    </section>
  );
}
