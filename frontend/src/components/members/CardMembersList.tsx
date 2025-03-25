"use client"
import { Avatar } from "@mantine/core";

import React from 'react'

const CardMembersList = () => {
  return (
    <div>
      <Avatar.Group>
        <Avatar size="sm" />
        <Avatar size="sm" />
        <Avatar size="sm" />
        <Avatar size="sm">+5</Avatar>
      </Avatar.Group>
    </div>
  )
}

export default CardMembersList
