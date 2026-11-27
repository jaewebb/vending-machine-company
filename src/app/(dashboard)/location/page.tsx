import { LocationList } from "~/app/_components/location/locationList";
import { api, HydrateClient } from "~/trpc/server";

export const dynamic = "force-dynamic";

export default async function Location() {
  await api.location.getAll.prefetch();

  return (
    <HydrateClient>
      <LocationList />
    </HydrateClient>
  );
}
