"use client";

import { Pencil, Plus, Trash } from "lucide-react";
import { useMemo, useState } from "react";

import { DeleteModal } from "~/app/_components/deleteModal";
import { Button } from "~/app/_components/ui/button/button";
import { Table } from "~/app/_components/ui/table/table";
import { VendingMachineModal } from "~/app/_components/vendingMachine/vendingMachineModal";
import { api, type RouterOutputs } from "~/trpc/react";

type VendingMachine = RouterOutputs["vendingMachine"]["getAll"][number];

type SortField = keyof Pick<
  VendingMachine,
  | "name"
  | "manufacturer"
  | "model"
  | "serialNumber"
  | "hasTapReader"
  | "acceptsCash"
  | "notes"
  | "statusId"
  | "typeId"
  | "ownershipId"
>;

export function VendingMachineList() {
  const utils = api.useUtils();

  const [selectedVendingMachine, setSelectedVendingMachine] = useState({} as VendingMachine);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [currentSortDirection, setCurrentSortDirection] = useState("asc");
  const [currentSortField, setCurrentSortField] = useState("" as SortField);
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [currentStateFilter] = useState(new Set([1, 2]));

  const [locations] = api.location.getAll.useSuspenseQuery();
  const [vendingMachines] = api.vendingMachine.getAll.useSuspenseQuery();

  const vendingMachineRows = useMemo(() => {
    let items = [...vendingMachines];
    items = items.filter((item) => {
      return currentStateFilter.has(item.statusId);
    });

    if (currentSortField) {
      items = items.sort((a, b) => {
        const aValue = a?.[currentSortField];
        const bValue = b?.[currentSortField];

        if (aValue === null && bValue === null) return 0;
        if (aValue === null) return 1;
        if (bValue === null) return -1;

        if (typeof aValue === "string" && bValue === "string") {
          if (aValue?.trim().toLowerCase() < bValue?.trim().toLowerCase())
            return currentSortDirection === "asc" ? -1 : 1;
          if (aValue?.trim().toLowerCase() > bValue?.trim().toLowerCase())
            return currentSortDirection === "asc" ? 1 : -1;
          return 0;
        } else {
          if (aValue < bValue) return currentSortDirection === "asc" ? -1 : 1;
          if (aValue > bValue) return currentSortDirection === "asc" ? 1 : -1;
          return 0;
        }
      });
    }

    items = items.filter((item) => {
      return (
        item.name?.trim().toLowerCase().includes(currentSearchTerm) ||
        item.manufacturer?.trim().toLowerCase().includes(currentSearchTerm) ||
        item.model?.trim().toLowerCase().includes(currentSearchTerm) ||
        item.serialNumber?.trim().toLowerCase().includes(currentSearchTerm) ||
        item.notes?.trim().toLowerCase().includes(currentSearchTerm)
      );
    });
    return items;
  }, [
    vendingMachines,
    currentSortDirection,
    currentSortField,
    currentSearchTerm,
    currentStateFilter,
  ]);

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

  const handleColumnClicked = (newSortField: string) => {
    if (newSortField === currentSortField)
      setCurrentSortDirection(currentSortDirection === "asc" ? "desc" : "asc");
    if (newSortField !== currentSortField) setCurrentSortField(newSortField as SortField);
  };

  const columns = [
    { label: "Name", value: "name", onClick: handleColumnClicked },
    { label: "Manufacturer", value: "manufacturer", onClick: handleColumnClicked },
    { label: "Model", value: "model", onClick: handleColumnClicked },
    { label: "Serial Number", value: "serialNumber", onClick: handleColumnClicked },
    { label: "Has Tap Reader", value: "hasTapReader", onClick: handleColumnClicked },
    { label: "Accepts Cash", value: "acceptsCash", onClick: handleColumnClicked },
    // { label: 'Installation Date'},
    // { label: 'Last Serviced At'},
    { label: "Notes" },
    { label: "Status", value: "status", onClick: handleColumnClicked },
    { label: "Location" },
    { label: "Type", value: "type", onClick: handleColumnClicked },
    { label: "Ownership", value: "ownership", onClick: handleColumnClicked },
    { label: "Edit", srOnly: true },
    { label: "Delete", srOnly: true },
  ];

  const rows = vendingMachineRows?.map((vm) => {
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
              kind="iconOnly"
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
      <Table
        columns={columns}
        id="vending-machine-list"
        rows={rows}
        searchValue={currentSearchTerm}
        setSearchValue={setCurrentSearchTerm}
      />
    </div>
  );
}
