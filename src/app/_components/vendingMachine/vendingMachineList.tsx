"use client";

import { Pencil, Plus, Trash } from "lucide-react";
import { useState } from "react";

import { DeleteModal } from "~/app/_components/deleteModal";
import { Button } from "~/app/_components/ui/button/button";
import { Table } from "~/app/_components/ui/table/table";
import { VendingMachineModal } from "~/app/_components/vendingMachine/vendingMachineModal";
import { api, type RouterOutputs } from "~/trpc/react";

type VendingMachine = RouterOutputs["vendingMachine"]["getAll"][number];

export function VendingMachineList() {
  const utils = api.useUtils();

  const [selectedVendingMachine, setSelectedVendingMachine] = useState({} as VendingMachine);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [locations] = api.location.getAll.useSuspenseQuery();
  const [vendingMachines] = api.vendingMachine.getAll.useSuspenseQuery();

  const deleteVendingMachine = api.vendingMachine.delete.useMutation({
    onSuccess: async () => {
      await utils.vendingMachine.invalidate();
    },
  });

  const handleUpdateOpen = (vendingMachine: VendingMachine) => {
    setSelectedVendingMachine(vendingMachine);
    setIsModalOpen(true);
  };

  const handleAddOpen = () => {
    setSelectedVendingMachine({} as VendingMachine);
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

  const columns = [
    { value: "Name" },
    { value: "Manufacturer" },
    { value: "Model" },
    { value: "Serial Number" },
    { value: "Has Tap Reader" },
    { value: "Accepts Cash" },
    // { value: 'Installation Date'},
    // { value: 'Last Serviced At'},
    { value: "Notes" },
    { value: "Status" },
    { value: "Location" },
    { value: "Type" },
    { value: "Ownership" },
    { value: "Edit", srOnly: true },
    { value: "Delete", srOnly: true },
  ];

  const rows = vendingMachines?.map((vm) => {
    return {
      id: vm.id,
      cells: [
        { key: "name", value: vm.name },
        { key: "manufacturer", value: vm.manufacturer },
        { key: "model", value: vm.model },
        { key: "serialNumber", value: vm.serialNumber },
        { key: "hasTapReader", value: vm.hasTapReader ? "Yes" : "No" },
        { key: "acceptsCash", value: vm.acceptsCash ? "Yes" : "No" },
        // { key: "installationDate", value: vm.installationDate },
        // { key: "lastServicedAt", value: vm.lastServicedAt },
        { key: "notes", value: vm.notes },
        { key: "statusId", value: vm.statusId },
        { key: "locationId", value: vm.locationId },
        { key: "typeId", value: vm.typeId },
        { key: "ownershipId", value: vm.ownershipId },
        {
          key: "edit",
          value: (
            <Button
              icon={<Pencil />}
              iconOnly
              label="Update"
              onClick={() => handleUpdateOpen(vm)}
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
              onClick={() => handleDeleteOpen(vm)}
              size="sm"
            />
          ),
        },
      ],
    };
  });

  return (
    <div className="flex flex-col w-full gap-4">
      <VendingMachineModal
        isOpen={isModalOpen}
        locations={locations}
        onClose={() => setIsModalOpen(false)}
        selectedVendingMachine={selectedVendingMachine}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        isPending={deleteVendingMachine.isPending}
        message="Are you sure you want to delete this vending machine?"
        onClose={() => setIsModalOpen(false)}
        onDelete={handleDelete}
        title="Delete Vending Machine"
      />
      <div className="flex justify-end">
        <Button icon={<Plus size="16" />} label="Add a Vending Machine" onClick={handleAddOpen} />
      </div>
      <Table columns={columns} id="vending-machine-list" rows={rows} />
    </div>
  );
}
