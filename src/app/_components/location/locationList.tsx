"use client";

import { Pencil, Plus, Trash } from "lucide-react";
import { useState } from "react";

import { DeleteModal } from "~/app/_components/deleteModal";
import { LocationModal } from "~/app/_components/location/locationModal";

import { Button } from "~/app/_components/ui/button/button";
import { Table } from "~/app/_components/ui/table/table";
import { api, type RouterOutputs } from "~/trpc/react";

type Location = RouterOutputs["location"]["getAll"][number];

export function LocationList() {
  const utils = api.useUtils();

  const [selectedLocation, setSelectedLocation] = useState({} as Location);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [locations] = api.location.getAll.useSuspenseQuery();

  const deleteLocation = api.location.delete.useMutation({
    onSuccess: async () => {
      await utils.location.invalidate();
    },
  });

  const englishName = new Intl.DisplayNames(["en"], { type: "region" });

  const handleUpdateOpen = (location: Location) => {
    setSelectedLocation(location);
    setIsModalOpen(true);
  };

  const handleAddOpen = () => {
    setSelectedLocation({} as Location);
    setIsModalOpen(true);
  };

  const handleDelete = async (shouldDelete: boolean) => {
    if (shouldDelete) await deleteLocation.mutateAsync({ id: selectedLocation.id });
    setIsDeleteModalOpen(false);
  };

  const handleDeleteOpen = (location: Location) => {
    setSelectedLocation(location);
    setIsDeleteModalOpen(true);
  };

  const columns = [
    { value: "Name" },
    { value: "Address" },
    { value: "City" },
    { value: "Province/State" },
    { value: "Country" },
    { value: "Postal/Zip" },
    { value: "Description" },
    { value: "Edit", srOnly: true },
    { value: "Delete", srOnly: true },
  ];

  const rows = locations?.map((l) => {
    return {
      id: l.id,
      cells: [
        { key: "name", value: l.name },
        {
          key: "address",
          value: `${l.unitSuite} ${l.streetNumber} ${l.streetName} ${l.suffix ?? ""} ${l.floorLevel ?? ""}`,
        },
        { key: "city", value: l.city },
        { key: "province", value: l.province ? englishName.of(l.province) : l.state },
        { key: "country", value: englishName.of(l.country) },
        { key: "postalCode", value: l.postalCode?.toUpperCase() ?? l.zip },
        { key: "description", value: l.description },
        {
          key: "edit",
          value: (
            <Button
              icon={<Pencil />}
              iconOnly
              label="Update"
              onClick={() => handleUpdateOpen(l)}
              size="sm"
            />
          ),
        },
        {
          key: "delete",
          value: (
            <Button
              icon={<Trash />}
              iconOnly
              label="Delete"
              onClick={() => handleDeleteOpen(l)}
              size="sm"
            />
          ),
        },
      ],
    };
  });

  return (
    <div className="flex flex-col w-full gap-4">
      <LocationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedLocation={selectedLocation}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        isPending={deleteLocation.isPending}
        message="Are you sure you want to delete this location?"
        onClose={() => setIsModalOpen(false)}
        onDelete={handleDelete}
        title="Delete Location"
      />
      <div className="flex justify-end">
        <Button icon={<Plus size="16" />} label="Add a Location" onClick={handleAddOpen} />
      </div>
      <Table columns={columns} id="location-list" rows={rows} />
    </div>
  );
}
