import { VendingMachineList } from "~/app/_components/vendingMachine/vendingMachineList";
import { api, HydrateClient } from "~/trpc/server";

export const dynamic = "force-dynamic";

export default async function VendingMachine() {
  await void api.vendingMachine.getAll.prefetch();
  await void api.location.getAll.prefetch();

  return (
    <HydrateClient>
      <VendingMachineList />
    </HydrateClient>
  );
}
