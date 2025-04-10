"use client";

import { useCreateList } from "@/lib/mutations/lists";
import { createListSchema, T_CreateListSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ActionIcon,
  Button,
  Group,
  Paper,
  Stack,
  TextInput
} from "@mantine/core";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { IconCollection } from "../core/IconCollection";

interface CreateListFormProps {
  onClose: () => void;
}

interface CreateListFormProps {
  onClose: () => void;
}

const CreateListForm = ({ onClose }: CreateListFormProps) => {
  const form = useForm<T_CreateListSchema>({
    resolver: zodResolver(createListSchema),
    defaultValues: {
      name: "",
    },
  });

  const { workSpacesSlug, boardsSlug } = useParams<{
    workSpacesSlug: string;
    boardsSlug: string;
  }>();

  const { mutate: createCard, isPending } = useCreateList(
    workSpacesSlug,
    boardsSlug,
    () => form.reset()
  );

  const handleOnSubmit = (values: T_CreateListSchema) => {
    createCard(values);
  };

  return (
    <Paper withBorder p="xs" h={"fit-content"}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
        <Stack gap="xs">
          <TextInput
            label="List name"
            placeholder="Enter list name"
            error={form.formState.errors.name?.message}
            {...form.register("name")}
            disabled={isPending}
          />

          <Group justify="end">
            <Group gap="xs">
              <ActionIcon
                size="sm"
                onClick={onClose}
                variant="subtle"
                color="red"
                disabled={isPending}
              >
                <IconCollection.Close size={16} />
              </ActionIcon>
              <Button
                type="submit"
                size="xs"
                variant="filled"
                loading={isPending}
              >
                Add
              </Button>
            </Group>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
};

export default CreateListForm;
