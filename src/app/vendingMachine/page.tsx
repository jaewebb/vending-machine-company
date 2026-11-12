import { api, HydrateClient } from "~/trpc/server";

import { VendingMachineList } from "~/app/_components/vendingMachine/vendingMachineList";

export const dynamic = 'force-dynamic';

export default async function VendingMachine() {
  await void api.vendingMachine.getAll.prefetch();
  await void api.location.getAll.prefetch();

  return (
    <HydrateClient>
      <div className="flex grow px-4 py-16">
        <VendingMachineList />
      </div>
    </HydrateClient>
  );
}
