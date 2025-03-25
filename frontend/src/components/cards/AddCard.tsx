import { Button } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import React from 'react'

const AddCard = () => {
    const icon = <IconPlus size={14}/>
  return (
    <Button justify="center" fullWidth leftSection={icon} variant="default" mt="md">
    Add Card
  </Button>
  )
}

export default AddCard
