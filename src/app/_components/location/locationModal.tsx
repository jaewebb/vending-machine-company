"use client";

import { type SubmitEvent, useId, useState } from "react";
import { Button } from "~/app/_components/ui/button/button";
import { TextArea } from "~/app/_components/ui/input/textarea";
import { TextInput } from "~/app/_components/ui/input/textInput";
import { Modal } from "~/app/_components/ui/modal/modal";
import { Select } from "~/app/_components/ui/select/select";

import provinces from "~/app/data/provinces";
import states from "~/app/data/states";
import territories from "~/app/data/territories";

import { api } from "~/trpc/react";

enum Country {
  Canada = "CA",
  UnitedStates = "US",
}

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LocationModal({ isOpen, onClose }: LocationModalProps) {
  const utils = api.useUtils();
  const uid = useId();

  const [name, setName] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [unitSuite, setUnitSuite] = useState("");
  const [floorLevel, setFloorLevel] = useState("");
  const [suffix, setSuffix] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("CA");
  const [postalCode, setPostalCode] = useState("");
  const [zip, setZip] = useState("");
  const [description, setDescription] = useState("");

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

  return (
    <Modal
      footer={
        <Button
          disabled={createLocation.isPending}
          form={uid}
          label={createLocation.isPending ? "Adding" : "Add"}
          type="submit"
        />
      }
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title={"Add Location"}
    >
      <form className="flex flex-col md:gap-4 gap-2" id={uid} onSubmit={(e) => handleSubmit(e)}>
        <div className="lg:w-1/2 w-full 2xl:pr-2 pr-0">
          <TextInput
            label="Location Name"
            name="name"
            onChange={setName}
            placeholder="Give a name or label to this location"
            required
            value={name}
          />
        </div>

        <div className="flex 3xl:flex-row flex-col md:gap-4 gap-2">
          <div className="flex lg:flex-row flex-col md:gap-4 gap-2 3xl:w-2/3 w-full">
            <div className="flex sm:flex-row flex-col md:gap-4 gap-2 3xl:w-2/3 lg:w-1/2 w-full">
              <TextInput
                label="Unit/Suite"
                name="unitSuite"
                onChange={setUnitSuite}
                value={unitSuite}
              />
              <TextInput
                label="Street Number"
                name="streetNumber"
                onChange={setStreetNumber}
                required
                value={streetNumber}
              />
            </div>
            <div className="3xl:w-1/3 lg:w-1/2 w-full">
              <TextInput
                label="Street Name"
                name="streetName"
                onChange={setStreetName}
                required
                value={streetName}
              />
            </div>
          </div>
          <div className="flex sm:flex-row flex-col md:gap-4 gap-2 2xl:w-1/2 w-full 3xl:pr-0 2xl:pr-2 pr-0">
            <TextInput label="Suffix" name="suffix" onChange={setSuffix} value={suffix} />
            <TextInput
              label="Floor/Level"
              name="floorLevel"
              onChange={setFloorLevel}
              value={floorLevel}
            />
          </div>
        </div>

        <div className="flex 2xl:flex-row flex-col md:gap-4 gap-2">
          <div className="flex lg:flex-row flex-col md:gap-4 gap-2 2xl:w-1/2 w-full">
            <TextInput label="City" name="city" onChange={setCity} required value={city} />

            {country === Country.Canada && (
              <Select
                label="Province/Territory"
                name="province"
                onChange={(e) => setProvince(e.target.value)}
                options={[
                  { id: 1, label: "Provinces", options: provinces },
                  { id: 2, label: "Territories", options: territories },
                ]}
                value={province}
              />
            )}
            {country === Country.UnitedStates && (
              <Select
                label="State"
                name="state"
                onChange={(e) => setState(e.target.value)}
                options={states}
                value={state}
              />
            )}
          </div>
          <div className="flex lg:flex-row flex-col md:gap-4 gap-2 2xl:w-1/2 w-full">
            <Select
              label="Country"
              name="country"
              onChange={(e) => handleSetCountry(e.target.value)}
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
              />
            )}

            {country === Country.UnitedStates && (
              <TextInput label="Zip Code" name="zip" onChange={setZip} required value={zip} />
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
