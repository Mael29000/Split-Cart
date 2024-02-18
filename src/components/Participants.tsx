import { get } from "http";
import React from "react";
import { getUsers } from "../services";
import { User } from "./types";

export default function Participants() {
  const [participants, setParticipants] = React.useState<User[]>([]);

  React.useEffect(() => {
    getUsers().then((users) => {
      setParticipants(users.map((user: any) => user.username));
    });
  }, []);

  return (
    <div>
      <h2 style={{ fontSize: "20px", textAlign: "center" }}>Participants</h2>
      <div style={{ padding: "20px 50px" }}>
        {participants.map((participant) => (
          <ParticipantItem key={participant} name={participant} />
        ))}
      </div>
    </div>
  );
}

interface ParticipantItemProps {
  name: string;
}

const ParticipantItem = (props: ParticipantItemProps) => {
  const { name } = props;

  return (
    <p
      style={{
        marginBottom: "20px",
      }}
    >
      {name}
    </p>
  );
};
