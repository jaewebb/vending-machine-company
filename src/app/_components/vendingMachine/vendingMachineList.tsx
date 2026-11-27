"use client";

import { Pencil, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { DeleteModal } from "~/app/_components/deleteModal";
import { Button } from "~/app/_components/ui/button/button";
import { Table } from "~/app/_components/ui/table/table";
import { VendingMachineModal } from "~/app/_components/vendingMachine/vendingMachineModal";
import { api, type RouterOutputs } from "~/trpc/react";

type VendingMachine = RouterOutputs["vendingMachine"]["getAll"][number];

const AddLocationMessage = () => {
  return (
    <p>
      Add a new <Link href="/location">location</Link> first, because a vending machine requires a
      location.
    </p>
  );
};

const NoDataMessage = ({
  hasLocations,
  children,
}: {
  hasLocations: boolean;
  children: React.ReactNode;
}) => {
  return (
    <>
      <p>There are no vending machines to show. Try adding a new one.</p>
      {!hasLocations && <AddLocationMessage />}
      {hasLocations && children}
    </>
  );
};

export function VendingMachineList() {
  const utils = api.useUtils();

  const [selectedVendingMachine, setSelectedVendingMachine] = useState({} as VendingMachine);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // const [currentStateFilter] = useState(new Set([1, 2]));

  const [locations] = api.location.getAll.useSuspenseQuery();
  const [ownerships] = api.ownership.getAll.useSuspenseQuery();
  const [statuses] = api.status.getAll.useSuspenseQuery();
  const [vendingMachines] = api.vendingMachine.getAll.useSuspenseQuery();
  const [vendingMachineTypes] = api.vendingMachineType.getAll.useSuspenseQuery();

  // const vendingMachineRows = useMemo(() => {
  //   let items = [...vendingMachines];
  //   items = items.filter((item) => {
  //     return currentStateFilter.has(item.statusId);
  //   });
  //   return items;
  // }, [vendingMachines]);

  const deleteVendingMachine = api.vendingMachine.delete.useMutation({
    onSuccess: async () => {
      await utils.vendingMachine.invalidate();
    },
  });

  const handleAddOpen = () => {
    setIsModalOpen(true);
  };

  const handleDelete = async (shouldDelete: boolean) => {
    if (shouldDelete) await deleteVendingMachine.mutateAsync({ id: selectedVendingMachine.id });
    setIsDeleteModalOpen(false);
  };

  const handleDeleteOpen = (vendingMachine: VendingMachine) => {
    setSelectedVendingMachine(vendingMachine);
    setIsDeleteModalOpen(true);
  };

  const hasLocations = Boolean(locations?.length);

  const columns = [
    { label: "Name", value: "name", isSortable: true, isSearchable: true },
    { label: "Manufacturer", value: "manufacturer", isSortable: true, isSearchable: true },
    { label: "Model", value: "model", isSortable: true, isSearchable: true },
    { label: "Serial Number", value: "serialNumber", isSortable: true, isSearchable: true },
    { label: "Has Tap Reader", value: "hasTapReader", isSortable: true },
    { label: "Accepts Cash", value: "acceptsCash", isSortable: true },
    // { label: 'Installation Date'},
    // { label: 'Last Serviced At'},
    { label: "Notes", value: "notes", isSearchable: true },
    { label: "Status", value: "status", isSortable: true },
    { label: "Location" },
    { label: "Type", value: "type", isSortable: true },
    { label: "Ownership", value: "ownership", isSortable: true },
    { label: "Edit", srOnly: true },
    { label: "Delete", srOnly: true },
  ];

  const rows = vendingMachines?.map((vm) => {
    return {
      id: vm.id,
      cells: [
        {
          key: "name",
          value: (
            <Link className="hover:underline" href={`/location/${vm.id}`}>
              {vm.name}
            </Link>
          ),
        },
        { key: "manufacturer", value: vm.manufacturer },
        { key: "model", value: vm.model },
        { key: "serialNumber", value: vm.serialNumber },
        { key: "hasTapReader", value: vm.hasTapReader ? "Yes" : "No" },
        { key: "acceptsCash", value: vm.acceptsCash ? "Yes" : "No" },
        // { key: "installationDate", value: vm.installationDate },
        // { key: "lastServicedAt", value: vm.lastServicedAt },
        { key: "notes", value: vm.notes },
        { key: "statusId", value: statuses.find((s) => s.id === vm.statusId)?.status },
        { key: "locationId", value: locations.find((l) => l.id === vm.locationId)?.name },
        { key: "typeId", value: vendingMachineTypes.find((vmt) => vmt.id === vm.typeId)?.name },
        { key: "ownershipId", value: ownerships.find((o) => o.id === vm.ownershipId)?.type },
        {
          key: "edit",
          value: (
            <Link
              aria-label="Edit vending machine"
              className="hover:underline"
              href={`/vendingMachine/${vm.id}`}
            >
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
              onClick={() => handleDeleteOpen(vm)}
              size="sm"
            />
          ),
        },
      ],
    };
  });

  return (
    <>
      <VendingMachineModal
        isOpen={isModalOpen}
        locations={locations}
        onClose={() => setIsModalOpen(false)}
        ownerships={ownerships}
        selectedVendingMachine={selectedVendingMachine}
        statuses={statuses}
        vendingMachineTypes={vendingMachineTypes}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        isPending={deleteVendingMachine.isPending}
        message="Are you sure you want to delete this vending machine?"
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDelete}
        title="Delete Vending Machine"
      />
      <div className="flex flex-col w-full md:gap-4 gap-2">
        <Table
          columns={columns}
          id="vending-machine-list"
          noDataMessage={
            <NoDataMessage hasLocations={hasLocations}>
              <div className="flex w-1/3">
                <Button
                  disabled={!hasLocations}
                  icon={<Plus size="16" />}
                  label="Add a Vending Machine"
                  onClick={handleAddOpen}
                />
              </div>
            </NoDataMessage>
          }
          rows={rows}
          tableOptions={
            <Button
              disabled={!hasLocations}
              icon={<Plus size="16" />}
              label="Add a Vending Machine"
              onClick={handleAddOpen}
            />
          }
        />
      </div>
    </>
  );
}
