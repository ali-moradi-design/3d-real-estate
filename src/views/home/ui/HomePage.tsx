import { SelectedUnitProvider } from '@/entities/unit';
import { BookVisit } from '@/widgets/book-visit';
import { Building } from '@/widgets/building';
import { Gallery } from '@/widgets/gallery';
import { Hero } from '@/widgets/hero';
import { SiteFooter } from '@/widgets/site-footer';
import { SiteHeader } from '@/widgets/site-header';
import { TourSection } from '@/widgets/tour';

// A server component: only the tour and the booking form are interactive.
// They share the chosen residence through SelectedUnitProvider, so changing it
// re-renders those two sections and nothing else.
export function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <Hero />
        <SelectedUnitProvider>
          <TourSection />
          <Building />
          <Gallery />
          <BookVisit />
        </SelectedUnitProvider>
      </main>
      <SiteFooter />
    </>
  );
}
