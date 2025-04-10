import {
  IconDotsVertical,
  IconEdit,
  IconPlus,
  IconSend,
  IconTrash,
  IconX,
} from "@tabler/icons-react";

interface IconProps {
  size?: number;
  stroke?: number;
  color?: string;
}

export const IconCollection = {
  Delete: ({ size = 24, stroke = 1.5 }: IconProps) => (
    <IconTrash size={size} stroke={stroke} color={"red"} />
  ),
  Create: ({ size = 24, stroke = 1.5, color = "currentColor" }: IconProps) => (
    <IconPlus size={size} stroke={stroke} color={color} />
  ),
  Edit: ({ size = 24, stroke = 1.5, color = "currentColor" }: IconProps) => (
    <IconEdit size={size} stroke={stroke} color={color} />
  ),
  Invite: ({ size = 24, stroke = 1.5, color = "currentColor" }: IconProps) => (
    <IconSend size={size} stroke={stroke} color={color} />
  ),
  Close: ({ size = 24, stroke = 1.5, color = "red" }: IconProps) => (
    <IconX size={size} stroke={stroke} color={color} />
  ),
  Actions: ({ size = 24, stroke = 1.5, color = "currentColor" }: IconProps) => (
    <IconDotsVertical size={size} stroke={stroke} color={color} />
  ),
};
