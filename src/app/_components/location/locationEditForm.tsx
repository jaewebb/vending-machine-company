"use client";

import { type SubmitEvent, useId, useState } from "react";
import { Button } from "~/app/_components/ui/button/button";
import { TextArea } from "~/app/_components/ui/input/textarea";
import { TextInput } from "~/app/_components/ui/input/textInput";
import { Select } from "~/app/_components/ui/select/select";

import provinces from "~/app/data/provinces";
import states from "~/app/data/states";
import territories from "~/app/data/territories";

import { api } from "~/trpc/react";

enum Country {
  Canada = "CA",
  UnitedStates = "US",
}

export function LocationEditForm({ id }: { id: number }) {
  const utils = api.useUtils();
  const uid = useId();

  const [location] = api.location.getById.useSuspenseQuery({ id });
  const [name, setName] = useState(location?.name ?? "");
  const [streetNumber, setStreetNumber] = useState(location?.streetNumber ?? "");
  const [streetName, setStreetName] = useState(location?.streetName ?? "");
  const [unitSuite, setUnitSuite] = useState(location?.unitSuite ?? "");
  const [floorLevel, setFloorLevel] = useState(location?.floorLevel ?? "");
  const [suffix, setSuffix] = useState(location?.suffix ?? "");
  const [city, setCity] = useState(location?.city ?? "");
  const [province, setProvince] = useState(location?.province ?? "");
  const [state, setState] = useState(location?.state ?? "");
  const [country, setCountry] = useState(location?.country ?? "CA");
  const [postalCode, setPostalCode] = useState(location?.postalCode ?? "");
  const [zip, setZip] = useState(location?.zip ?? "");
  const [description, setDescription] = useState(location?.description ?? "");

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

  const handleSetPostalCode = (value: string) => {
    setZip("");
    setPostalCode(value);
  };

  const handleSetProvince = (value: string) => {
    setState("");
    setProvince(value);
  };

  const handleSetState = (value: string) => {
    setProvince("");
    setState(value);
  };

  const handleSetZip = (value: string) => {
    setPostalCode("");
    setZip(value);
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    await updateLocation.mutateAsync({
      id,
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
  };

  return (
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
              onChange={(e) => handleSetProvince(e.target.value)}
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
              onChange={(e) => handleSetState(e.target.value)}
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
              onChange={handleSetPostalCode}
              required
              value={postalCode}
            />
          )}

          {country === Country.UnitedStates && (
            <TextInput label="Zip Code" name="zip" onChange={handleSetZip} required value={zip} />
          )}
        </div>
      </div>

      <TextArea
        label="Description"
        name="description"
        onChange={setDescription}
        value={description}
      />

      <Button
        disabled={updateLocation.isPending}
        form={uid}
        label={updateLocation.isPending ? "Updating" : "Update"}
        type="submit"
      />
    </form>
  );
}
