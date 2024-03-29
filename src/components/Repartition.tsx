import React from "react";
import { Part } from "./types";
import { getRepartition } from "./mocks";
import { useRepartition } from "../contexts/RepartitionContext";

export default function Repartition() {
    const { repartition: repartitionContext } = useRepartition();

    const [repartition, setRepartition] =
        React.useState<Part[]>(repartitionContext);

    React.useEffect(() => {
        setRepartition(repartitionContext);
    }, [repartitionContext]);

    return (
        <div>
            <h2 style={{ fontSize: "20px", textAlign: "center" }}>
                Répartition
            </h2>
            <div style={{ padding: "0px 50px" }}>
                {repartition.map((item) => (
                    <RepartitionItem
                        key={item.user}
                        name={item.user}
                        value={item.total}
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
                alignItems: "center",
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
                {formatPrice(value)} €
            </p>
        </div>
    );
};

const formatPrice = (price: number) => {
    return price.toFixed(2).replace(".", ",");
};
