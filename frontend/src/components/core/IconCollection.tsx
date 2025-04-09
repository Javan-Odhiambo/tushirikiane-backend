import { IconEdit, IconPlus, IconSend, IconTrash } from "@tabler/icons-react";

interface IconProps {
  size?: number;
  stroke?: number;
  color?: string;
}

export const IconCollection = {
  Delete: ({ size = 24, stroke = 1.5, color = "currentColor" }: IconProps) => (
    <IconTrash size={size} stroke={stroke} color={color} />
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
};
