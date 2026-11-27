"use client";

import { Pencil, Plus, Trash } from "lucide-react";
import Link from "next/link";
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

  // const locationRows = useMemo(() => {
  //   let items = [...locations];
  //   // items = items.filter((item) => {
  //   //   return currentStateFilter.has(item.statusId);
  //   // });
  //   return items;
  // }, [locations]);

  const deleteLocation = api.location.delete.useMutation({
    onSuccess: async () => {
      await utils.location.invalidate();
    },
  });

  const englishName = new Intl.DisplayNames(["en"], { type: "region" });

  const handleAddOpen = () => {
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
    { label: "Name", value: "name", isSortable: true, isSearchable: true },
    { label: "Address", value: "address", isSearchable: true },
    { label: "City", value: "city", isSortable: true, isSearchable: true },
    { label: "Province/State", value: "province", isSearchable: true },
    { label: "Country", value: "country", isSortable: true, isSearchable: true },
    { label: "Postal/Zip", value: "postalCode", isSearchable: true },
    { label: "Description", value: "description", isSearchable: true },
    { label: "Edit", srOnly: true },
    { label: "Delete", srOnly: true },
  ];

  const rows = locations?.map((l) => {
    return {
      id: l.id,
      cells: [
        {
          key: "name",
          value: (
            <Link className="hover:underline" href={`/location/${l.id}`}>
              {l.name}
            </Link>
          ),
        },
        {
          key: "address",
          value: `${l.unitSuite} ${l.streetNumber} ${l.streetName} ${l.suffix ?? ""} ${l.floorLevel ?? ""}`,
        },
        { key: "city", value: l.city },
        { key: "province", value: l.province ? englishName.of(l.province) : l.state },
        { key: "country", value: englishName.of(l.country) },
        { key: "postalCode", value: l.postalCode ? l.postalCode.toUpperCase() : l.zip },
        { key: "description", value: l.description },
        {
          key: "edit",
          value: (
            <Link aria-label="Edit location" className="hover:underline" href={`/location/${l.id}`}>
              <Pencil size="16" />
            </Link>
          ),
        },
        {
          key: "delete",
          value: (
            <Button
              icon={<Trash size="16" />}
              kind="iconOnly"
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
    <>
      <LocationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        isPending={deleteLocation.isPending}
        message="Are you sure you want to delete this location?"
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDelete}
        title="Delete Location"
      />
      <div className="flex flex-col w-full md:gap-4 gap-2">
        <Table
          columns={columns}
          id="location-list"
          noDataMessage={
            <div className="flex flex-col md:gap-4 gap-2 w-1/3">
              <p>There are no locations to show. Try adding a new one.</p>
              <Button icon={<Plus size="16" />} label="Add a Location" onClick={handleAddOpen} />
            </div>
          }
          rows={rows}
          tableOptions={
            <Button icon={<Plus size="16" />} label="Add a Location" onClick={handleAddOpen} />
          }
        />
      </div>
    </>
  );
}
