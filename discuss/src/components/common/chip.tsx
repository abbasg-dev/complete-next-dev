"use client";

import { Chip } from "@nextui-org/react";

interface CustomChipProps {
  children: React.ReactNode;
}

export default function CustomChip({ children }: CustomChipProps) {
  return (
    <Chip color="warning" variant="shadow">
      {children}
    </Chip>
  );
}
