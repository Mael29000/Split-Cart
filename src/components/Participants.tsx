import React from "react";

export default function Participants() {
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

const participants = ["Mael", "Ting", "Jayce", "Antonin"];
