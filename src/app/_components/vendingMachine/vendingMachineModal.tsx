"use client";

// import { format } from "date-fns";
import { type SubmitEvent, useEffect, useId, useState } from "react";
import { Button } from "~/app/_components/ui/button/button";
import { Checkbox } from "~/app/_components/ui/input/checkbox";
// import { DatePicker } from "~/app/_components/ui/input/datePicker";
import { TextArea } from "~/app/_components/ui/input/textarea";
import { TextInput } from "~/app/_components/ui/input/textInput";
import { Modal } from "~/app/_components/ui/modal/modal";
import { Select } from "~/app/_components/ui/select/select";
import { api, type RouterOutputs } from "~/trpc/react";

type Location = RouterOutputs["location"]["getAll"][number];
type VendingMachine = RouterOutputs["vendingMachine"]["getAll"][number];

interface VendingMachineModalProps {
  isOpen: boolean;
  locations: Array<Location>;
  selectedVendingMachine?: VendingMachine;
  onClose: () => void;
}

export function VendingMachineModal({
  isOpen,
  locations,
  selectedVendingMachine,
  onClose,
}: VendingMachineModalProps) {
  const utils = api.useUtils();
  const uid = useId();
  const [name, setName] = useState(selectedVendingMachine?.name ?? "");
  const [manufacturer, setManufacturer] = useState(selectedVendingMachine?.manufacturer ?? "");
  const [model, setModel] = useState(selectedVendingMachine?.model ?? "");
  const [serialNumber, setSerialNumber] = useState(selectedVendingMachine?.serialNumber ?? "");
  const [hasTapReader, setHasTapReader] = useState(selectedVendingMachine?.hasTapReader ?? false);
  const [acceptsCash, setAcceptsCash] = useState(selectedVendingMachine?.acceptsCash ?? false);
  // const [installationDate, setInstallationDate] = useState(
  //   selectedVendingMachine?.installationDate ?? undefined,
  // );
  // const [lastServicedAt, setLastServicedAt] = useState(
  //   selectedVendingMachine?.lastServicedAt ?? undefined,
  // );
  const [notes, setNotes] = useState(selectedVendingMachine?.notes ?? "");
  const [statusId, setStatusId] = useState(selectedVendingMachine?.statusId ?? -1);
  const [locationId, setLocationId] = useState(selectedVendingMachine?.locationId ?? -1);
  const [typeId, setTypeId] = useState(selectedVendingMachine?.typeId ?? -1);
  const [ownershipId, setOwnershipId] = useState(selectedVendingMachine?.ownershipId ?? -1);
  const isUpdate = selectedVendingMachine?.id;

  const locationIdOptions = locations.map((l: Location) => {
    return { label: l.name, value: l.id };
  });

  const createVendingMachine = api.vendingMachine.create.useMutation({
    onSuccess: async () => {
      await utils.vendingMachine.invalidate();
      setName("");
    },
  });

  const updateVendingMachine = api.vendingMachine.update.useMutation({
    onSuccess: async () => {
      await utils.vendingMachine.invalidate();
    },
  });

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isUpdate)
      await updateVendingMachine.mutateAsync({
        id: selectedVendingMachine.id,
        name,
        manufacturer,
        model,
        serialNumber,
        hasTapReader,
        acceptsCash,
        // installationDate,
        // lastServicedAt,
        notes,
        statusId,
        locationId,
        typeId,
        ownershipId,
      });
    else
      await createVendingMachine.mutateAsync({
        name,
        manufacturer,
        model,
        serialNumber,
        hasTapReader,
        acceptsCash,
        // installationDate,
        // lastServicedAt,
        notes,
        statusId,
        locationId,
        typeId,
        ownershipId,
      });

    onClose();
  };

  useEffect(() => {
    setName(selectedVendingMachine?.name ?? "");
  }, [selectedVendingMachine]);

  return (
    <Modal
      footer={
        <Button
          disabled={isUpdate ? updateVendingMachine.isPending : createVendingMachine.isPending}
          form={uid}
          label={
            isUpdate
              ? updateVendingMachine.isPending
                ? "Updating"
                : "Update"
              : createVendingMachine.isPending
                ? "Adding"
                : "Add"
          }
          type="submit"
        />
      }
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title={isUpdate ? "Update Vending Machine" : "Add Vending Machine"}
    >
      <form className="flex flex-col gap-4" id={uid} onSubmit={(e) => handleSubmit(e)}>
        <div className="md:w-1/2 w-full pr-2">
          <TextInput
            label="Vending Machine Name"
            name="name"
            onChange={setName}
            placeholder="Give a name or label to this Vending Machine"
            required
            value={name}
          />
        </div>
        <div className="flex md:flex-row flex-col gap-4">
          <TextInput
            label="Manufacturer"
            name="manufacturer"
            onChange={setManufacturer}
            value={manufacturer}
          />
          <TextInput label="Model" name="model" onChange={setModel} value={model} />
          <TextInput
            label="Serial Number"
            name="serialNumber"
            onChange={setSerialNumber}
            value={serialNumber}
          />
        </div>

        <div className="flex md:flex-row flex-col gap-4">
          <Checkbox
            label="Has Tap Reader"
            name="hasTapReader"
            onChange={setHasTapReader}
            value={hasTapReader}
          />
          <Checkbox
            label="Accepts Cash"
            name="acceptsCash"
            onChange={setAcceptsCash}
            value={acceptsCash}
          />
        </div>
        {/* <div className="flex gap-4">
          <DatePicker
            label="Installation Date"
            max={format(Date.now(), "yyyy-MM-dd")}
            name="installationDate"
            onChange={setInstallationDate}
            value={installationDate}
          />
          <DatePicker
            label="LastServicedAt"
            max={format(Date.now(), "yyyy-MM-dd")}
            name="lastServicedAt"
            onChange={setLastServicedAt}
            value={lastServicedAt}
          />
        </div> */}
        <div className="flex md:flex-row flex-col gap-4">
          <Select
            label="Location"
            name="location"
            onChange={(locationId) => setLocationId(Number(locationId))}
            options={locationIdOptions}
            selectOptionValue={-1}
            value={locationId}
          />
          <Select
            label="Status"
            name="status"
            onChange={(statusId) => setStatusId(Number(statusId))}
            options={[
              { label: "Active", value: 1 },
              { label: "Inactive", value: 2 },
              { label: "Out of Order", value: 3 },
            ]}
            selectOptionValue={-1}
            value={statusId}
          />
          <Select
            label="Type"
            name="type"
            onChange={(typeId) => setTypeId(Number(typeId))}
            options={[
              { label: "Ambient", value: 1 },
              { label: "Refrigerated beverage", value: 2 },
              { label: "Refrigerated food", value: 3 },
              { label: "Hot beverage", value: 4 },
              { label: "Hot water dispenser", value: 5 },
            ]}
            selectOptionValue={-1}
            value={typeId}
          />
          <Select
            label="Ownership Type"
            name="ownership"
            onChange={(ownershipId) => setOwnershipId(Number(ownershipId))}
            options={[
              { label: "Owned", value: 1 },
              { label: "Customer Rental", value: 2 },
              { label: "Customer Supplied", value: 3 },
            ]}
            selectOptionValue={-1}
            value={ownershipId}
          />
        </div>

        <TextArea label="Notes" name="notes" onChange={setNotes} value={notes} />
      </form>
    </Modal>
  );
}
