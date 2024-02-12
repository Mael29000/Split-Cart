import React from "react";

export default function Repartition() {
  return (
    <div>
      <h2 style={{ fontSize: "20px", textAlign: "center" }}>Répartition</h2>
      <div style={{ padding: "20px 50px" }}>
        {repartition.map((item) => (
          <RepartitionItem
            key={item.name}
            name={item.name}
            value={item.value}
          />
        ))}
      </div>
    </div>
  );
}

interface RepartitionItemProps {
  name: string;
  value: number;
}

const RepartitionItem = (props: RepartitionItemProps) => {
  const { name, value } = props;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        marginBottom: "20px",
      }}
    >
      <p>{name}</p>
      <p
        style={{
          textAlign: "end",
          fontWeight: "700",
          color: "rgba(0,0,0,0.66)",
          fontSize: "20px",
        }}
      >
        {value} €
      </p>
    </div>
  );
};

const repartition = [
  { name: "Mael", value: -10 },
  { name: "Ting", value: 20 },
  { name: "Jayce", value: 30 },
  { name: "Antonin", value: -40 },
];
