import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

interface IconProps {
  size?: number;
  stroke?: number;
  color?: string;
}

export const IconLibrary = {
  Delete: ({ size = 24, stroke = 1.5, color = "currentColor" }: IconProps) => (
    <IconTrash size={size} stroke={stroke} color={color} />
  ),
  Create: ({ size = 24, stroke = 1.5, color = "currentColor" }: IconProps) => (
    <IconPlus size={size} stroke={stroke} color={color} />
  ),
  Edit: ({ size = 24, stroke = 1.5, color = "currentColor" }: IconProps) => (
    <IconEdit size={size} stroke={stroke} color={color} />
  ),
};
