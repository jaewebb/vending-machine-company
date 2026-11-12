"use client";

import { Pencil } from "lucide-react";
import { useId } from "react";

import { Button } from "~/app/_components/ui/button/button";
import { Modal } from "~/app/_components/ui/modal/modal";

interface DeleteModalProps {
  id?: string;
  isOpen: boolean;
  isPending: boolean;
  message: string;
  title: string;
  onClose: () => void;
  onDelete: (shouldDelete: boolean) => void;
}

export function DeleteModal({
  id,
  isOpen,
  isPending,
  message,
  title,
  onClose,
  onDelete,
}: DeleteModalProps) {
  const uid = useId();
  return (
    <Modal
      footer={
        <Button
          disabled={isPending}
          form={id ?? uid}
          icon={<Pencil size="16" />}
          label={isPending ? "Deleting" : "Delete"}
          onClick={() => onDelete(true)}
        />
      }
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      title={title}
    >
      <div>{message}</div>
    </Modal>
  );
}
