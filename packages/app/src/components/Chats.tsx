import React, { useState } from "react";
import { ChatPreview } from "../types";
import { useQuery } from "@apollo/client";
import { GET_CHATS } from "../graphql/queries";
import { IconButton, Popover } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import ChatList from "./ChatList";

interface ChatsData {
  chats: ChatPreview[];
}

export default function Chat() {
  const { data } = useQuery<ChatsData>(GET_CHATS, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "friend-requests" : undefined;

  return (
    <div>
      <IconButton
        aria-label="show chats"
        edge="end"
        color="inherit"
        onClick={handleClick}
      >
        <ChatIcon fontSize="large" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <ChatList chats={data?.chats || []} />
      </Popover>
    </div>
  );
}
