import { LocationEditForm } from "~/app/_components/location/locationEditForm";

export default async function LocationDetails({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;

  return <LocationEditForm id={id} />;
}
