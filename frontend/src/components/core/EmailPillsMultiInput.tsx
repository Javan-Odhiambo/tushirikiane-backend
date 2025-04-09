"use client";

import { Pill, PillsInput, Text } from "@mantine/core";
import React, { useRef } from "react";
import { z } from "zod";

const emailSchema = z.string().email();

interface EmailPillsMultiInputProps {
  label: string;
  placeholder?: string;
  disabled: boolean;
  emails: string[];
  onChange: (emails: string[]) => void;
  error?: string;
  helperText?: boolean;
}

const EmailPillsMultiInput: React.FC<EmailPillsMultiInputProps> = ({
  label,
  placeholder = "Enter an email (Press Enter or , to add)",
  emails,
  disabled,
  onChange,
  error,
  helperText = true,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const addEmail = (email: string) => {
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) return;
    
    try {
      emailSchema.parse(trimmedEmail);
      if (!emails.includes(trimmedEmail)) {
        onChange([...emails, trimmedEmail]);
      }
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeEmail = (email: string) => {
    onChange(emails.filter((e) => e !== email));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value.trim();
    
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addEmail(inputValue);
    }
    
    if (
      event.key === "Backspace" &&
      inputValue === "" &&
      emails.length > 0
    ) {
      event.preventDefault();
      removeEmail(emails[emails.length - 1]);
    }
  };

  return (
    <>
      <PillsInput
        label={label}
        error={error}
        disabled={disabled}
      >
        {emails.map((email) => (
          <Pill
            key={email}
            withRemoveButton
            onRemove={() => removeEmail(email)}
          >
            {email}
          </Pill>
        ))}
        <PillsInput.Field
          ref={inputRef}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
        />
      </PillsInput>
      {helperText && (
        <Text size="xs" c="gray">
          Press <b>Enter</b> or <b>,</b> to add an email. Press{" "}
          <b>Backspace</b> to remove the last email.
        </Text>
      )}
    </>
  );
};

export default EmailPillsMultiInput;


