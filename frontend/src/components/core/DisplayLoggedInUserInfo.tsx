import {  Avatar, Text, Flex } from '@mantine/core'
import { useSession } from 'next-auth/react'
import React from 'react'

const DisplayLoggedInUserInfo = () => {
    const {data:session} = useSession()
  return (
    <Flex
    mih={50}
    gap="md"
    justify="flex-start"
    align="flex-start"
    direction="row"
    >
        <Avatar color="cyan" radius="xl">{session?.user.email.slice(0,1)}</Avatar>

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            My Name haha
          </Text>

          <Text c="dimmed" size="xs">
          {session?.user.email}
          </Text>
        </div>

        
      </Flex>
  )
}


export default DisplayLoggedInUserInfo
