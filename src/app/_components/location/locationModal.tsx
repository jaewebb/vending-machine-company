"use client";

import { type SubmitEvent, useEffect, useId, useState } from "react";
import { Button } from "~/app/_components/ui/button/button";
import { TextArea } from "~/app/_components/ui/input/textarea";
import { TextInput } from "~/app/_components/ui/input/textInput";
import { Modal } from "~/app/_components/ui/modal/modal";
import { Select } from "~/app/_components/ui/select/select";

import provinces from "~/app/data/provinces";
import states from "~/app/data/states";
import territories from "~/app/data/territories";
import { api, type RouterOutputs } from "~/trpc/react";

enum Country {
  Canada = "CA",
  UnitedStates = "US",
}

type Location = RouterOutputs["location"]["getAll"][number];

interface LocationModalProps {
  isOpen: boolean;
  selectedLocation?: Location;
  onClose: () => void;
}

export function LocationModal({ isOpen, selectedLocation, onClose }: LocationModalProps) {
  const utils = api.useUtils();
  const uid = useId();

  const [name, setName] = useState(selectedLocation?.name ?? "");
  const [streetNumber, setStreetNumber] = useState(selectedLocation?.streetNumber ?? "");
  const [streetName, setStreetName] = useState(selectedLocation?.streetName ?? "");
  const [unitSuite, setUnitSuite] = useState(selectedLocation?.unitSuite ?? "");
  const [floorLevel, setFloorLevel] = useState(selectedLocation?.floorLevel ?? "");
  const [suffix, setSuffix] = useState(selectedLocation?.suffix ?? "");
  const [city, setCity] = useState(selectedLocation?.city ?? "");
  const [province, setProvince] = useState(selectedLocation?.province ?? "");
  const [state, setState] = useState(selectedLocation?.state ?? "");
  const [country, setCountry] = useState(selectedLocation?.country ?? "CA");
  const [postalCode, setPostalCode] = useState(selectedLocation?.postalCode ?? "");
  const [zip, setZip] = useState(selectedLocation?.zip ?? "");
  const [description, setDescription] = useState(selectedLocation?.description ?? "");

  const isUpdate = selectedLocation?.id;

  const createLocation = api.location.create.useMutation({
    onSuccess: async () => {
      await utils.location.invalidate();
      setName("");
      setStreetNumber("");
      setStreetName("");
      setUnitSuite("");
      setFloorLevel("");
      setSuffix("");
      setCity("");
      setProvince("");
      setState("");
      setCountry("CA");
      setPostalCode("");
      setZip("");
      setDescription("");
    },
  });

  const updateLocation = api.location.update.useMutation({
    onSuccess: async () => {
      await utils.location.invalidate();
    },
  });

  const handleSetCountry = (value: string) => {
    if (country === value) return;

    setPostalCode("");
    setZip("");
    setProvince("");
    setState("");
    setCountry(value);
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isUpdate)
      await updateLocation.mutateAsync({
        id: selectedLocation.id,
        name,
        streetNumber,
        streetName,
        unitSuite,
        floorLevel,
        suffix,
        city,
        province,
        state,
        country,
        postalCode,
        zip,
        description,
      });
    else
      await createLocation.mutateAsync({
        name,
        streetNumber,
        streetName,
        unitSuite,
        floorLevel,
        suffix,
        city,
        province,
        state,
        country,
        postalCode,
        zip,
        description,
      });

    onClose();
  };

  useEffect(() => {
    setName(selectedLocation?.name ?? "");
    setStreetNumber(selectedLocation?.streetNumber ?? "");
    setStreetName(selectedLocation?.streetName ?? "");
    setUnitSuite(selectedLocation?.unitSuite ?? "");
    setFloorLevel(selectedLocation?.floorLevel ?? "");
    setSuffix(selectedLocation?.suffix ?? "");
    setCity(selectedLocation?.city ?? "");
    setProvince(selectedLocation?.province ?? "");
    setState(selectedLocation?.state ?? "");
    setCountry(selectedLocation?.country ?? "CA");
    setPostalCode(selectedLocation?.postalCode ?? "");
    setZip(selectedLocation?.zip ?? "");
    setDescription(selectedLocation?.description ?? "");
  }, [selectedLocation]);

  return (
    <Modal
      footer={
        <Button
          disabled={isUpdate ? updateLocation.isPending : createLocation.isPending}
          form={uid}
          label={
            isUpdate
              ? updateLocation.isPending
                ? "Updating"
                : "Update"
              : createLocation.isPending
                ? "Adding"
                : "Add"
          }
          type="submit"
        />
      }
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title={isUpdate ? "Update Location" : "Add Location"}
    >
      <form className="flex flex-col grow gap-4" id={uid} onSubmit={(e) => handleSubmit(e)}>
        <div className="w-1/2 pr-2">
          <TextInput
            label="Location Name"
            name="name"
            onChange={setName}
            placeholder="Give a name or label to this location"
            required
            value={name}
          />
        </div>

        <div className="flex gap-4">
          <div className="flex grow gap-4 w-2/3">
            <TextInput
              label="Unit/Suite"
              name="unitSuite"
              onChange={setUnitSuite}
              value={unitSuite}
              width="sm"
            />
            <TextInput
              label="Street Number"
              name="streetNumber"
              onChange={setStreetNumber}
              required
              value={streetNumber}
              width="md"
            />
            <div className="w-full">
              <TextInput
                label="Street Name"
                name="streetName"
                onChange={setStreetName}
                required
                value={streetName}
              />
            </div>
          </div>
          <div className="flex grow gap-4 w-1/3">
            <TextInput
              label="Suffix"
              name="suffix"
              onChange={setSuffix}
              value={suffix}
              width="md"
            />
            <TextInput
              label="Floor/Level"
              name="floorLevel"
              onChange={setFloorLevel}
              value={floorLevel}
            />
          </div>
        </div>

        <div className="flex grow gap-4">
          <div className="flex grow gap-4 w-1/2">
            <div className="w-full">
              <TextInput label="City" name="city" onChange={setCity} required value={city} />
            </div>

            {country === Country.Canada && (
              <Select
                label="Province/Territory"
                name="province"
                onChange={setProvince}
                options={[
                  { id: 1, label: "Provinces", options: provinces },
                  { id: 2, label: "Territories", options: territories },
                ]}
                value={province}
                width="md"
              />
            )}
            {country === Country.UnitedStates && (
              <Select
                label="State"
                name="state"
                onChange={setState}
                options={states}
                value={state}
                width="md"
              />
            )}
          </div>
          <div className="flex grow gap-4 w-1/2">
            <Select
              label="Country"
              name="country"
              onChange={handleSetCountry}
              options={[
                { label: "Canada", value: "CA" },
                { label: "United States", value: "US" },
              ]}
              value={country}
            />

            {country === Country.Canada && (
              <TextInput
                label="Postal Code"
                name="postalCode"
                onChange={setPostalCode}
                required
                value={postalCode}
                width="md"
              />
            )}

            {country === Country.UnitedStates && (
              <TextInput
                label="Zip Code"
                name="zip"
                onChange={setZip}
                required
                value={zip}
                width="md"
              />
            )}
          </div>
        </div>

        <TextArea
          label="Description"
          name="description"
          onChange={setDescription}
          value={description}
        />
      </form>
    </Modal>
  );
}
