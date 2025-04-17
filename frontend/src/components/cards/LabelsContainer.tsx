"use client";

import { useCreateLabel } from "@/lib/mutations/labels";
import { useGetLabels } from "@/lib/queries/labels";
import { createLabelSchema, T_CreateLabelSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ActionIcon,
  Button,
  ColorPicker,
  Group,
  Menu,
  ScrollArea,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IconCollection } from "../core/IconCollection";

const LabelsContainer = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [showForm, setShowForm] = useState(false);

  const { workSpacesSlug, boardsSlug } = useParams<{
    workSpacesSlug: string;
    boardsSlug: string;
  }>();

  const { data: labels } = useGetLabels(workSpacesSlug, boardsSlug);

  const { mutate: createLabel, isPending: isPendingCreateLabel } =
    useCreateLabel(workSpacesSlug, boardsSlug, () => {
      form.reset();
      setShowForm(false);
    });

  const form = useForm<T_CreateLabelSchema>({
    resolver: zodResolver(createLabelSchema),
    defaultValues: {
      name: "",
      color: "#228be6",
    },
  });

  const handleOnCreateLabelSubmit = (values: T_CreateLabelSchema) => {
    createLabel(values);
  };

  return (
    <Menu opened={opened} onClose={close} width={250}>
      <Menu.Target>
        <Group gap="xs">
          <Text>Labels</Text>
          <ActionIcon onClick={open} variant="subtle">
            <IconCollection.Create />
          </ActionIcon>
        </Group>
      </Menu.Target>

      <Menu.Dropdown>
        <ScrollArea.Autosize mah={300} type="scroll">
          <Stack p="xs" gap="sm">
            {showForm ? (
              <form onSubmit={form.handleSubmit(handleOnCreateLabelSubmit)}>
                <Stack gap="xs">
                  <TextInput
                    placeholder="Label name"
                    {...form.register("name")}
                    error={form.formState.errors.name?.message}
                  />
                  <ColorPicker
                    format="hex"
                    fullWidth
                    swatchesPerRow={7}
                    value={form.watch("color")}
                    onChange={(color) => form.setValue("color", color)}
                  />
                  <Group justify="flex-end" mt="xs">
                    <Button
                      size="xs"
                      variant="subtle"
                      onClick={() => {
                        form.reset();
                        setShowForm(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      size="xs"
                      loading={isPendingCreateLabel}
                    >
                      Add
                    </Button>
                  </Group>
                </Stack>
              </form>
            ) : (
              <Button
                fullWidth
                size="xs"
                variant="light"
                onClick={() => setShowForm(true)}
              >
                + Create New Label
              </Button>
            )}

            {labels?.map((l, index) => (
              <Menu.Item
                key={index}
                onClick={() => console.log("Clicked:", l.id)}
                bg={l.color}
              >
                <Text c="white">{l.name}</Text>
              </Menu.Item>
            ))}
          </Stack>
        </ScrollArea.Autosize>
      </Menu.Dropdown>
    </Menu>
  );
};

export default LabelsContainer;
