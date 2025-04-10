"use client";

import {
  Combobox,
  Pill,
  PillsInput,
  Text,
  useCombobox,
  Box,
} from "@mantine/core";
import React, { useRef, useState } from "react";
import { z } from "zod";

const emailSchema = z.string().email();

interface EmailPillsMultiInputProps {
  label: string;
  placeholder?: string;
  disabled?: boolean;
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
  helperText?: boolean;
  data?: string[];
  creatable?: boolean;
}

const EmailPillsMultiInput: React.FC<EmailPillsMultiInputProps> = ({
  label,
  placeholder = "Enter emails or select from options",
  value,
  disabled = false,
  onChange,
  error,
  helperText = true,
  data = [],
  creatable = true,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");
  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      setSearch("");
    },
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const addItem = (item: string) => {
    const trimmedItem = item.trim().toLowerCase();
    if (!trimmedItem) return;

    try {
      emailSchema.parse(trimmedItem);
      if (!value.includes(trimmedItem)) {
        onChange([...value, trimmedItem]);
      }
      setSearch("");
    } catch (error) {
      console.error("Invalid email:", error);
    }
  };

  const removeItem = (item: string) => {
    onChange(value.filter((v) => v !== item));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value.trim();

    if ((event.key === "Enter" || event.key === ",") && inputValue) {
      event.preventDefault();
      addItem(inputValue);
    }

    if (event.key === "Backspace" && inputValue === "" && value.length > 0) {
      event.preventDefault();
      removeItem(value[value.length - 1]);
    }
  };

  const filteredOptions = data
    .filter((item) => !value.includes(item.toLowerCase()))
    .filter((item) => item.toLowerCase().includes(search.toLowerCase()));

  const shouldShowCreateOption =
    creatable &&
    search.trim() !== "" &&
    !data.some((item) => item.toLowerCase() === search.toLowerCase()) &&
    !value.includes(search.toLowerCase());

  const options = [
    ...(shouldShowCreateOption ? [`Invite "${search}"`] : []),
    ...filteredOptions,
  ];

  const handleOptionSubmit = (val: string) => {
    if (val.startsWith('Invite "') && val.endsWith('"')) {
      addItem(search);
    } else {
      addItem(val);
    }
    combobox.closeDropdown();
  };

  return (
    <Box>
      <Combobox
        store={combobox}
        onOptionSubmit={handleOptionSubmit}
        withinPortal
        position="bottom"
        middlewares={{ flip: true, shift: true }}
      >
        <Combobox.Target>
          <PillsInput
            label={label}
            error={error}
            disabled={disabled}
            onClick={() => combobox.openDropdown()}
          >
            <Pill.Group>
              {value.map((item) => (
                <Pill
                  key={item}
                  withRemoveButton
                  onRemove={() => removeItem(item)}
                >
                  {item}
                </Pill>
              ))}

              <Combobox.EventsTarget>
                <PillsInput.Field
                  ref={inputRef}
                  placeholder={placeholder}
                  value={search}
                  onChange={(event) => {
                    setSearch(event.currentTarget.value);
                    combobox.openDropdown();
                    combobox.updateSelectedOptionIndex();
                  }}
                  onKeyDown={handleKeyDown}
                  onFocus={() => combobox.openDropdown()}
                  onBlur={() => combobox.closeDropdown()}
                />
              </Combobox.EventsTarget>
            </Pill.Group>
          </PillsInput>
        </Combobox.Target>

        <Combobox.Dropdown hidden={options.length === 0}>
          <Combobox.Options mah={200} style={{ overflowY: "auto" }}>
            {options.map((option) => (
              <Combobox.Option value={option} key={option}>
                {option}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>

      {helperText && (
        <Text size="xs" c="dimmed" mt={4}>
          {creatable ? (
            <>
              Type to add new emails or select from options. Press <b>Enter</b>{" "}
              or <b>,</b> to add. Press <b>Backspace</b> to remove items.
            </>
          ) : (
            "Select from available options. Press Backspace to remove items."
          )}
        </Text>
      )}
    </Box>
  );
};

export default EmailPillsMultiInput;
