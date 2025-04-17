import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { I_CreateLabelInput } from "../interfaces/inputs";
import { I_GetLabelResponse as I_CreateLabelResponse } from "../interfaces/responses";
import { protectedApi } from "../kyInstance";
import { QUERY_KEYS } from "../queryKeys";
import { URLS } from "../urls";

export const useCreateLabel = (
  workSpaceId: string,
  boardId: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      values: I_CreateLabelInput
    ): Promise<I_CreateLabelResponse> => {
      return await protectedApi
        .post(URLS.apiLabels(workSpaceId, boardId), { json: values })
        .json();
    },
    onSuccess: (createdLabel) => {
      queryClient.setQueryData<I_CreateLabelResponse[]>(
        [QUERY_KEYS.labels(workSpaceId, boardId)],
        (oldLabels = []) => [...oldLabels, createdLabel]
      );
      toast.success("Label created successfully.");
      onSuccess?.();
    },
    onError: (error) => {
      console.error("Error creating list", error);
      toast.error("Failed to create list. Please try again");
      onError?.();
    },
  });
};
