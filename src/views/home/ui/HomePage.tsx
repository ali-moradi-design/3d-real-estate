import { site } from '@/shared/config';

export function HomePage() {
  return (
    <main>
      <h1>{site.name}</h1>
      <p>{site.tagline}</p>
    </main>
  );
}
