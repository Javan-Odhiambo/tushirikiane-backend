"use client";

import { Checkbox } from "@mantine/core";
import React from "react";

interface StatusCheckBoxProps {
  isChecked: boolean;
  handleOnChange: () => void;
}

const StatusCheckBox: React.FC<StatusCheckBoxProps> = ({
  isChecked,
  handleOnChange,
}) => {
  return (
    <Checkbox onChange={handleOnChange} radius={"xl"} checked={isChecked} />
  );
};

export default StatusCheckBox;
