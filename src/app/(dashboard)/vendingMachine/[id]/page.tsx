import { VendingMachineEditForm } from "~/app/_components/vendingMachine/vendingMachineEditForm";

export default async function VendingMachineDetails({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  return <VendingMachineEditForm id={id} />;
}
