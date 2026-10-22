'use client';

import { useState } from 'react';
import type { UnitId } from '@/entities/unit';
import { BookVisit } from '@/widgets/book-visit';
import { Building } from '@/widgets/building';
import { Gallery } from '@/widgets/gallery';
import { Hero } from '@/widgets/hero';
import { SiteFooter } from '@/widgets/site-footer';
import { SiteHeader } from '@/widgets/site-header';
import { TourSection } from '@/widgets/tour';

export function HomePage() {
  // The chosen residence is shared by the tour and the booking form.
  const [unitId, setUnitId] = useState<UnitId>('loft');

  return (
    <>
      <SiteHeader />
      <main id="top">
        <Hero />
        <TourSection unitId={unitId} onUnitChange={setUnitId} />
        <Building />
        <Gallery />
        <BookVisit unitId={unitId} onUnitChange={setUnitId} />
      </main>
      <SiteFooter />
    </>
  );
}
