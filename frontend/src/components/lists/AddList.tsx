import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import React from "react";

const AddList = () => {
    const icon = <IconPlus size={14} />
  return (
     <Button justify="center" variant="light" w={275} leftSection={icon} color="indigo">
     Add List
   </Button>
  );
};

export default AddList;
