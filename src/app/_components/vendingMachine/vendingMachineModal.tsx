"use client";

// import { format } from "date-fns";
import { type SubmitEvent, useId, useState } from "react";
import { Button } from "~/app/_components/ui/button/button";
import { Checkbox } from "~/app/_components/ui/input/checkbox";
// import { DatePicker } from "~/app/_components/ui/input/datePicker";
import { TextArea } from "~/app/_components/ui/input/textarea";
import { TextInput } from "~/app/_components/ui/input/textInput";
import { Modal } from "~/app/_components/ui/modal/modal";
import { Select } from "~/app/_components/ui/select/select";
import { api, type RouterOutputs } from "~/trpc/react";

type Location = RouterOutputs["location"]["getAll"][number];
type Ownership = RouterOutputs["ownership"]["getAll"][number];
type Status = RouterOutputs["status"]["getAll"][number];
type VendingMachineType = RouterOutputs["vendingMachineType"]["getAll"][number];

interface VendingMachineModalProps {
  isOpen: boolean;
  locations: Array<Location>;
  ownerships: Array<Ownership>;
  statuses: Array<Status>;
  vendingMachineTypes: Array<VendingMachineType>;
  onClose: () => void;
}

export function VendingMachineModal({
  isOpen,
  locations,
  ownerships,
  statuses,
  vendingMachineTypes,
  onClose,
}: VendingMachineModalProps) {
  const utils = api.useUtils();
  const uid = useId();
  const [name, setName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [hasTapReader, setHasTapReader] = useState(false);
  const [acceptsCash, setAcceptsCash] = useState(false);
  // const [installationDate, setInstallationDate] = useState(
  //   undefined,
  // );
  // const [lastServicedAt, setLastServicedAt] = useState(
  //   undefined,
  // );
  const [notes, setNotes] = useState("");
  const [statusId, setStatusId] = useState(-1);
  const [locationId, setLocationId] = useState(-1);
  const [typeId, setTypeId] = useState(-1);
  const [ownershipId, setOwnershipId] = useState(-1);

  const locationIdOptions = locations.map((l) => {
    return { label: l.name, value: l.id };
  });

  const createVendingMachine = api.vendingMachine.create.useMutation({
    onSuccess: async () => {
      await utils.vendingMachine.invalidate();
      setName("");
    },
  });

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

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

  const ownershipOptions = ownerships.map((o) => {
    return { label: o.type, value: o.id };
  });

  const statusOptions = statuses.map((s) => {
    return { label: s.status, value: s.id };
  });

  const typeOptions = vendingMachineTypes.map((vmt) => {
    return { label: vmt.name, value: vmt.id };
  });

  return (
    <Modal
      footer={
        <Button
          disabled={createVendingMachine.isPending}
          form={uid}
          label={createVendingMachine.isPending ? "Adding" : "Add"}
          type="submit"
        />
      }
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title="Add Vending Machine"
    >
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
        {/* <div className="flex md:gap-4 gap-2">
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
      </form>
    </Modal>
  );
}
