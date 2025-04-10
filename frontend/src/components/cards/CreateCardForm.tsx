"use client";

import { useCreateCard } from "@/lib/mutations/cards";
import { createCardSchema, T_CreateCardSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    ActionIcon,
    Button,
    Group,
    Paper,
    Stack,
    Textarea,
    TextInput,
} from "@mantine/core";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { IconCollection } from "../core/IconCollection";

interface CreateCardFormProps {
  listId: string;
  onClose: () => void;
}

interface CreateCardFormProps {
  listId: string;
  onClose: () => void;
}

const CreateCardForm = ({ listId, onClose }: CreateCardFormProps) => {
  const form = useForm<T_CreateCardSchema>({
    resolver: zodResolver(createCardSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { workSpacesSlug, boardsSlug } = useParams<{
    workSpacesSlug: string;
    boardsSlug: string;
  }>();

  const { mutate: createCard, isPending } = useCreateCard(
    workSpacesSlug,
    boardsSlug,
    listId,
    () => form.reset()
  );

  const handleOnSubmit = (values: T_CreateCardSchema) => {
    createCard(values);
  };

  return (
    <Paper withBorder p="xs" mt="md">
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
        <Stack gap="xs">
          <TextInput
            label="Card name"
            placeholder="Enter card name"
            error={form.formState.errors.name?.message}
            {...form.register("name")}
            disabled={isPending}
          />

          <Textarea
            label="Description"
            placeholder="Optional description..."
            autosize
            minRows={2}
            {...form.register("description")}
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

export default CreateCardForm;
