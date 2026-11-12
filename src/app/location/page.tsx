import { api, HydrateClient } from "~/trpc/server";

import { LocationList } from "~/app/_components/location/locationList";

export const dynamic = 'force-dynamic';

export default async function Location() {
  await api.location.getAll.prefetch();

  return (
    <HydrateClient>
      <div className="flex grow px-4 py-16">
        <LocationList />
      </div>
    </HydrateClient>
  );
}
