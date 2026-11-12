#!/usr/bin/env -S node
import {
  col,
  fn,
  lit,
  Migration,
  MigrationCLI,
  primaryKey,
  sql,
} from "@prisma/orm-postgres/migration";
import type { Contract as End } from "../../snapshots/0334144a6e6492d4e641f01695a130e92a4776f506b4aee8b2277397b4fd421f/contract";
import endContract from "../../snapshots/0334144a6e6492d4e641f01695a130e92a4776f506b4aee8b2277397b4fd421f/contract.json" with {
  type: "json",
};

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: "public" }),
      this.createTable({
        schema: "public",
        table: "Company",
        columns: [
          col("createdAt", "timestamp(3)", {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: "pg/timestamp-string@1", typeParams: { precision: 3 } },
          }),
          col("id", "SERIAL", { notNull: true, codecRef: { codecId: "pg/int4@1" } }),
          col("isDeleted", "bool", {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: "pg/bool@1" },
          }),
          col("name", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("updatedAt", "timestamp(3)", {
            notNull: true,
            codecRef: { codecId: "pg/timestamp-string@1", typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(["id"])],
      }),
      this.createTable({
        schema: "public",
        table: "CompanyLocation",
        columns: [
          col("companyId", "int4", { notNull: true, codecRef: { codecId: "pg/int4@1" } }),
          col("createdAt", "timestamp(3)", {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: "pg/timestamp-string@1", typeParams: { precision: 3 } },
          }),
          col("id", "SERIAL", { notNull: true, codecRef: { codecId: "pg/int4@1" } }),
          col("isDeleted", "bool", {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: "pg/bool@1" },
          }),
          col("locationId", "int4", { notNull: true, codecRef: { codecId: "pg/int4@1" } }),
          col("updatedAt", "timestamp(3)", {
            notNull: true,
            codecRef: { codecId: "pg/timestamp-string@1", typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(["id"])],
      }),
      this.createTable({
        schema: "public",
        table: "Contact",
        columns: [
          col("companyId", "int4", { notNull: true, codecRef: { codecId: "pg/int4@1" } }),
          col("createdAt", "timestamp(3)", {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: "pg/timestamp-string@1", typeParams: { precision: 3 } },
          }),
          col("email", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("firstName", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("id", "SERIAL", { notNull: true, codecRef: { codecId: "pg/int4@1" } }),
          col("isDeleted", "bool", {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: "pg/bool@1" },
          }),
          col("lastName", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("notes", "text", { codecRef: { codecId: "pg/text@1" } }),
          col("phone", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("updatedAt", "timestamp(3)", {
            notNull: true,
            codecRef: { codecId: "pg/timestamp-string@1", typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(["id"])],
      }),
      this.createTable({
        schema: "public",
        table: "Item",
        columns: [
          col("barcode", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("brand", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("cost", "numeric(65,30)", {
            notNull: true,
            codecRef: { codecId: "pg/numeric@1", typeParams: { precision: 65, scale: 30 } },
          }),
          col("createdAt", "timestamp(3)", {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: "pg/timestamp-string@1", typeParams: { precision: 3 } },
          }),
          col("description", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("id", "SERIAL", { notNull: true, codecRef: { codecId: "pg/int4@1" } }),
          col("isDeleted", "bool", {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: "pg/bool@1" },
          }),
          col("name", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("storageId", "int4", { notNull: true, codecRef: { codecId: "pg/int4@1" } }),
          col("typeId", "int4", { notNull: true, codecRef: { codecId: "pg/int4@1" } }),
          col("updatedAt", "timestamp(3)", {
            notNull: true,
            codecRef: { codecId: "pg/timestamp-string@1", typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(["id"])],
      }),
      this.createTable({
        schema: "public",
        table: "ItemType",
        columns: [
          col("createdAt", "timestamp(3)", {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: "pg/timestamp-string@1", typeParams: { precision: 3 } },
          }),
          col("id", "SERIAL", { notNull: true, codecRef: { codecId: "pg/int4@1" } }),
          col("isDeleted", "bool", {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: "pg/bool@1" },
          }),
          col("name", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("updatedAt", "timestamp(3)", {
            notNull: true,
            codecRef: { codecId: "pg/timestamp-string@1", typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(["id"])],
      }),
      this.createTable({
        schema: "public",
        table: "Location",
        columns: [
          col("city", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("country", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("createdAt", "timestamp(3)", {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: "pg/timestamp-string@1", typeParams: { precision: 3 } },
          }),
          col("description", "text", { codecRef: { codecId: "pg/text@1" } }),
          col("floorLevel", "text", { codecRef: { codecId: "pg/text@1" } }),
          col("id", "SERIAL", { notNull: true, codecRef: { codecId: "pg/int4@1" } }),
          col("isDeleted", "bool", {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: "pg/bool@1" },
          }),
          col("name", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("number", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("postalCode", "text", { codecRef: { codecId: "pg/text@1" } }),
          col("province", "text", { codecRef: { codecId: "pg/text@1" } }),
          col("state", "text", { codecRef: { codecId: "pg/text@1" } }),
          col("streetName", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("suffix", "text", { codecRef: { codecId: "pg/text@1" } }),
          col("unitSuite", "text", { codecRef: { codecId: "pg/text@1" } }),
          col("updatedAt", "timestamp(3)", {
            notNull: true,
            codecRef: { codecId: "pg/timestamp-string@1", typeParams: { precision: 3 } },
          }),
          col("zip", "text", { codecRef: { codecId: "pg/text@1" } }),
        ],
        constraints: [primaryKey(["id"])],
      }),
      this.createTable({
        schema: "public",
        table: "LocationItem",
        columns: [
          col("createdAt", "timestamp(3)", {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: "pg/timestamp-string@1", typeParams: { precision: 3 } },
          }),
          col("expiryDate", "timestamp(3)", {
            codecRef: { codecId: "pg/timestamp-string@1", typeParams: { precision: 3 } },
          }),
          col("id", "SERIAL", { notNull: true, codecRef: { codecId: "pg/int4@1" } }),
          col("isActive", "bool", {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: "pg/bool@1" },
          }),
          col("isDeleted", "bool", {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: "pg/bool@1" },
          }),
          col("itemId", "int4", { notNull: true, codecRef: { codecId: "pg/int4@1" } }),
          col("locationId", "int4", { notNull: true, codecRef: { codecId: "pg/int4@1" } }),
          col("price", "numeric(65,30)", {
            notNull: true,
            codecRef: { codecId: "pg/numeric@1", typeParams: { precision: 65, scale: 30 } },
          }),
          col("quantity", "int4", { notNull: true, codecRef: { codecId: "pg/int4@1" } }),
          col("updatedAt", "timestamp(3)", {
            notNull: true,
            codecRef: { codecId: "pg/timestamp-string@1", typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(["id"])],
      }),
      this.createTable({
        schema: "public",
        table: "Ownership",
        columns: [
          col("createdAt", "timestamp(3)", {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: "pg/timestamp-string@1", typeParams: { precision: 3 } },
          }),
          col("id", "SERIAL", { notNull: true, codecRef: { codecId: "pg/int4@1" } }),
          col("isDeleted", "bool", {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: "pg/bool@1" },
          }),
          col("type", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("updatedAt", "timestamp(3)", {
            notNull: true,
            codecRef: { codecId: "pg/timestamp-string@1", typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(["id"])],
      }),
      this.createTable({
        schema: "public",
        table: "Status",
        columns: [
          col("createdAt", "timestamp(3)", {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: "pg/timestamp-string@1", typeParams: { precision: 3 } },
          }),
          col("id", "SERIAL", { notNull: true, codecRef: { codecId: "pg/int4@1" } }),
          col("isDeleted", "bool", {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: "pg/bool@1" },
          }),
          col("status", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("updatedAt", "timestamp(3)", {
            notNull: true,
            codecRef: { codecId: "pg/timestamp-string@1", typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(["id"])],
      }),
      this.createTable({
        schema: "public",
        table: "Storage",
        columns: [
          col("createdAt", "timestamp(3)", {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: "pg/timestamp-string@1", typeParams: { precision: 3 } },
          }),
          col("id", "SERIAL", { notNull: true, codecRef: { codecId: "pg/int4@1" } }),
          col("isDeleted", "bool", {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: "pg/bool@1" },
          }),
          col("type", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("updatedAt", "timestamp(3)", {
            notNull: true,
            codecRef: { codecId: "pg/timestamp-string@1", typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(["id"])],
      }),
      this.createTable({
        schema: "public",
        table: "VendingItem",
        columns: [
          col("column", "text", { codecRef: { codecId: "pg/text@1" } }),
          col("createdAt", "timestamp(3)", {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: "pg/timestamp-string@1", typeParams: { precision: 3 } },
          }),
          col("expiryDate", "timestamp(3)", {
            codecRef: { codecId: "pg/timestamp-string@1", typeParams: { precision: 3 } },
          }),
          col("id", "SERIAL", { notNull: true, codecRef: { codecId: "pg/int4@1" } }),
          col("isDeleted", "bool", {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: "pg/bool@1" },
          }),
          col("itemId", "int4", { notNull: true, codecRef: { codecId: "pg/int4@1" } }),
          col("price", "numeric(65,30)", {
            notNull: true,
            codecRef: { codecId: "pg/numeric@1", typeParams: { precision: 65, scale: 30 } },
          }),
          col("quantity", "int4", { notNull: true, codecRef: { codecId: "pg/int4@1" } }),
          col("selection", "text", { codecRef: { codecId: "pg/text@1" } }),
          col("updatedAt", "timestamp(3)", {
            notNull: true,
            codecRef: { codecId: "pg/timestamp-string@1", typeParams: { precision: 3 } },
          }),
          col("vendingMachineId", "int4", { notNull: true, codecRef: { codecId: "pg/int4@1" } }),
        ],
        constraints: [primaryKey(["id"])],
      }),
      this.createTable({
        schema: "public",
        table: "VendingMachine",
        columns: [
          col("acceptsCash", "bool", { default: lit(false), codecRef: { codecId: "pg/bool@1" } }),
          col("createdAt", "timestamp(3)", {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: "pg/timestamp-string@1", typeParams: { precision: 3 } },
          }),
          col("hasTapReader", "bool", { default: lit(false), codecRef: { codecId: "pg/bool@1" } }),
          col("id", "SERIAL", { notNull: true, codecRef: { codecId: "pg/int4@1" } }),
          col("installationDate", "timestamp(3)", {
            codecRef: { codecId: "pg/timestamp-string@1", typeParams: { precision: 3 } },
          }),
          col("isDeleted", "bool", {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: "pg/bool@1" },
          }),
          col("lastServicedAt", "timestamp(3)", {
            codecRef: { codecId: "pg/timestamp-string@1", typeParams: { precision: 3 } },
          }),
          col("locationId", "int4", { notNull: true, codecRef: { codecId: "pg/int4@1" } }),
          col("manufacturer", "text", { codecRef: { codecId: "pg/text@1" } }),
          col("model", "text", { codecRef: { codecId: "pg/text@1" } }),
          col("name", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("notes", "text", { codecRef: { codecId: "pg/text@1" } }),
          col("ownershipId", "int4", { notNull: true, codecRef: { codecId: "pg/int4@1" } }),
          col("serialNumber", "text", { codecRef: { codecId: "pg/text@1" } }),
          col("statusId", "int4", { notNull: true, codecRef: { codecId: "pg/int4@1" } }),
          col("typeId", "int4", { notNull: true, codecRef: { codecId: "pg/int4@1" } }),
          col("updatedAt", "timestamp(3)", {
            notNull: true,
            codecRef: { codecId: "pg/timestamp-string@1", typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(["id"])],
      }),
      this.createTable({
        schema: "public",
        table: "VendingMachineType",
        columns: [
          col("createdAt", "timestamp(3)", {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: "pg/timestamp-string@1", typeParams: { precision: 3 } },
          }),
          col("description", "text", { codecRef: { codecId: "pg/text@1" } }),
          col("id", "SERIAL", { notNull: true, codecRef: { codecId: "pg/int4@1" } }),
          col("isDeleted", "bool", {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: "pg/bool@1" },
          }),
          col("name", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("updatedAt", "timestamp(3)", {
            notNull: true,
            codecRef: { codecId: "pg/timestamp-string@1", typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(["id"])],
      }),
      this.createIndex({
        schema: "public",
        table: "Company",
        index: "Company_name_idx",
        columns: ["name"],
      }),
      this.createIndex({
        schema: "public",
        table: "CompanyLocation",
        index: "CompanyLocation_companyId_locationId_key",
        columns: ["companyId", "locationId"],
        extras: { unique: true },
      }),
      this.createIndex({
        schema: "public",
        table: "CompanyLocation",
        index: "CompanyLocation_locationId_idx",
        columns: ["locationId"],
      }),
      this.createIndex({
        schema: "public",
        table: "Contact",
        index: "Contact_lastName_idx",
        columns: ["lastName"],
      }),
      this.createIndex({
        schema: "public",
        table: "Item",
        index: "Item_name_idx",
        columns: ["name"],
      }),
      this.createIndex({
        schema: "public",
        table: "ItemType",
        index: "ItemType_name_idx",
        columns: ["name"],
      }),
      this.createIndex({
        schema: "public",
        table: "Location",
        index: "Location_streetName_idx",
        columns: ["streetName"],
      }),
      this.createIndex({
        schema: "public",
        table: "LocationItem",
        index: "LocationItem_itemId_idx",
        columns: ["itemId"],
      }),
      this.createIndex({
        schema: "public",
        table: "LocationItem",
        index: "LocationItem_locationId_itemId_key",
        columns: ["locationId", "itemId"],
        extras: { unique: true },
      }),
      this.createIndex({
        schema: "public",
        table: "Ownership",
        index: "Ownership_type_idx",
        columns: ["type"],
      }),
      this.createIndex({
        schema: "public",
        table: "Status",
        index: "Status_status_idx",
        columns: ["status"],
      }),
      this.createIndex({
        schema: "public",
        table: "Storage",
        index: "Storage_type_idx",
        columns: ["type"],
      }),
      this.createIndex({
        schema: "public",
        table: "VendingMachine",
        index: "VendingMachine_name_idx",
        columns: ["name"],
      }),
      this.createIndex({
        schema: "public",
        table: "VendingMachineType",
        index: "VendingMachineType_name_idx",
        columns: ["name"],
      }),
      this.addForeignKey({
        schema: "public",
        table: "CompanyLocation",
        foreignKey: {
          name: "CompanyLocation_companyId_fkey",
          columns: ["companyId"],
          references: { schema: "public", table: "Company", columns: ["id"] },
          onDelete: "restrict",
          onUpdate: "cascade",
        },
      }),
      this.addForeignKey({
        schema: "public",
        table: "CompanyLocation",
        foreignKey: {
          name: "CompanyLocation_locationId_fkey",
          columns: ["locationId"],
          references: { schema: "public", table: "Location", columns: ["id"] },
          onDelete: "restrict",
          onUpdate: "cascade",
        },
      }),
      this.addForeignKey({
        schema: "public",
        table: "Contact",
        foreignKey: {
          name: "Contact_companyId_fkey",
          columns: ["companyId"],
          references: { schema: "public", table: "Company", columns: ["id"] },
          onDelete: "restrict",
          onUpdate: "cascade",
        },
      }),
      this.addForeignKey({
        schema: "public",
        table: "Item",
        foreignKey: {
          name: "Item_storageId_fkey",
          columns: ["storageId"],
          references: { schema: "public", table: "Storage", columns: ["id"] },
          onDelete: "restrict",
          onUpdate: "cascade",
        },
      }),
      this.addForeignKey({
        schema: "public",
        table: "Item",
        foreignKey: {
          name: "Item_typeId_fkey",
          columns: ["typeId"],
          references: { schema: "public", table: "ItemType", columns: ["id"] },
          onDelete: "restrict",
          onUpdate: "cascade",
        },
      }),
      this.addForeignKey({
        schema: "public",
        table: "LocationItem",
        foreignKey: {
          name: "LocationItem_locationId_fkey",
          columns: ["locationId"],
          references: { schema: "public", table: "Location", columns: ["id"] },
          onDelete: "restrict",
          onUpdate: "cascade",
        },
      }),
      this.addForeignKey({
        schema: "public",
        table: "LocationItem",
        foreignKey: {
          name: "LocationItem_itemId_fkey",
          columns: ["itemId"],
          references: { schema: "public", table: "Item", columns: ["id"] },
          onDelete: "restrict",
          onUpdate: "cascade",
        },
      }),
      this.addForeignKey({
        schema: "public",
        table: "VendingItem",
        foreignKey: {
          name: "VendingItem_vendingMachineId_fkey",
          columns: ["vendingMachineId"],
          references: { schema: "public", table: "VendingMachine", columns: ["id"] },
          onDelete: "restrict",
          onUpdate: "cascade",
        },
      }),
      this.addForeignKey({
        schema: "public",
        table: "VendingItem",
        foreignKey: {
          name: "VendingItem_itemId_fkey",
          columns: ["itemId"],
          references: { schema: "public", table: "Item", columns: ["id"] },
          onDelete: "restrict",
          onUpdate: "cascade",
        },
      }),
      this.addForeignKey({
        schema: "public",
        table: "VendingMachine",
        foreignKey: {
          name: "VendingMachine_statusId_fkey",
          columns: ["statusId"],
          references: { schema: "public", table: "Status", columns: ["id"] },
          onDelete: "restrict",
          onUpdate: "cascade",
        },
      }),
      this.addForeignKey({
        schema: "public",
        table: "VendingMachine",
        foreignKey: {
          name: "VendingMachine_locationId_fkey",
          columns: ["locationId"],
          references: { schema: "public", table: "Location", columns: ["id"] },
          onDelete: "restrict",
          onUpdate: "cascade",
        },
      }),
      this.addForeignKey({
        schema: "public",
        table: "VendingMachine",
        foreignKey: {
          name: "VendingMachine_typeId_fkey",
          columns: ["typeId"],
          references: { schema: "public", table: "VendingMachineType", columns: ["id"] },
          onDelete: "restrict",
          onUpdate: "cascade",
        },
      }),
      this.addForeignKey({
        schema: "public",
        table: "VendingMachine",
        foreignKey: {
          name: "VendingMachine_ownershipId_fkey",
          columns: ["ownershipId"],
          references: { schema: "public", table: "Ownership", columns: ["id"] },
          onDelete: "restrict",
          onUpdate: "cascade",
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
