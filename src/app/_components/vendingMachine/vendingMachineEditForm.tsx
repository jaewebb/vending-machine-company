"use client";

import { type SubmitEvent, useId, useState } from "react";
import { Button } from "~/app/_components/ui/button/button";
import { Checkbox } from "~/app/_components/ui/input/checkbox";
import { TextArea } from "~/app/_components/ui/input/textarea";
import { TextInput } from "~/app/_components/ui/input/textInput";
import { Select } from "~/app/_components/ui/select/select";

import { api } from "~/trpc/react";

export function VendingMachineEditForm({ id }: { id: number }) {
  const utils = api.useUtils();
  const uid = useId();

  const [vendingMachine] = api.vendingMachine.getById.useSuspenseQuery({ id });
  const [name, setName] = useState(vendingMachine?.name ?? "");
  const [manufacturer, setManufacturer] = useState(vendingMachine?.manufacturer ?? "");
  const [model, setModel] = useState(vendingMachine?.model ?? "");
  const [serialNumber, setSerialNumber] = useState(vendingMachine?.serialNumber ?? "");
  const [hasTapReader, setHasTapReader] = useState(vendingMachine?.hasTapReader ?? false);
  const [acceptsCash, setAcceptsCash] = useState(vendingMachine?.acceptsCash ?? false);
  const [notes, setNotes] = useState(vendingMachine?.notes ?? "");
  const [statusId, setStatusId] = useState(vendingMachine?.statusId ?? -1);
  const [locationId, setLocationId] = useState(vendingMachine?.locationId ?? -1);
  const [typeId, setTypeId] = useState(vendingMachine?.typeId ?? -1);
  const [ownershipId, setOwnershipId] = useState(vendingMachine?.ownershipId ?? -1);

  const [locations] = api.location.getAll.useSuspenseQuery();
  const [ownerships] = api.ownership.getAll.useSuspenseQuery();
  const [statuses] = api.status.getAll.useSuspenseQuery();
  const [vendingMachineTypes] = api.vendingMachineType.getAll.useSuspenseQuery();

  const locationIdOptions = locations.map((l) => {
    return { label: l.name, value: l.id };
  });

  const ownershipOptions = ownerships.map((o) => {
    return { label: o.type, value: o.id };
  });

  const statusOptions = statuses.map((s) => {
    return { label: s.status, value: s.id };
  });

  const typeOptions = vendingMachineTypes.map((vmt) => {
    return { label: vmt.name, value: vmt.id };
  });

  const updateVendingMachine = api.vendingMachine.update.useMutation({
    onSuccess: async () => {
      await utils.vendingMachine.invalidate();
    },
  });

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    await updateVendingMachine.mutateAsync({
      id,
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
  };

  return (
    <form className="flex flex-col md:gap-4 gap-2" id={uid} onSubmit={(e) => handleSubmit(e)}>
      <div className="lg:w-1/2 w-full lg:pr-2 pr-0">
        <TextInput
          label="Vending Machine Name"
          name="name"
          onChange={setName}
          placeholder="Give a name or label to this Vending Machine"
          required
          value={name}
        />
      </div>
      <div className="flex lg:flex-row flex-col md:gap-4 gap-2">
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

      <div className="flex lg:flex-row flex-col md:gap-4 gap-2">
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
      <div className="flex lg:flex-row flex-col md:gap-4 gap-2">
        <Select
          label="Location"
          name="location"
          onChange={(e) => setLocationId(Number(e.target.value))}
          options={locationIdOptions}
          required
          selectOptionValue={-1}
          value={locationId}
        />
        <Select
          label="Status"
          name="status"
          onChange={(e) => setStatusId(Number(e.target.value))}
          options={statusOptions}
          required
          selectOptionValue={-1}
          value={statusId}
        />
        <Select
          label="Type"
          name="type"
          onChange={(e) => setTypeId(Number(e.target.value))}
          options={typeOptions}
          required
          selectOptionValue={-1}
          value={typeId}
        />
        <Select
          label="Ownership Type"
          name="ownership"
          onChange={(e) => setOwnershipId(Number(e.target.value))}
          options={ownershipOptions}
          required
          selectOptionValue={-1}
          value={ownershipId}
        />
      </div>

      <TextArea label="Notes" name="notes" onChange={setNotes} value={notes} />
      <Button
        disabled={updateVendingMachine.isPending}
        form={uid}
        label={updateVendingMachine.isPending ? "Updating" : "Update"}
        type="submit"
      />
    </form>
  );
}
