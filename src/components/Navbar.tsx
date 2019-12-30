import React from "react";
import { makeStyles } from "@material-ui/styles";
import Button from "./Button";
import ForkMe from "./ForkMe";

interface Props {
    score: number;
    startOver: () => void;
}

export default (props: Props) => {
    const styles = useStyles({});
    return (
        <nav className={styles.root}>
            <Button onClick={() => props.startOver()}>Start Over</Button>
            <span>Score: {props.score}</span>
            <span className={styles.divider} />
            <ForkMe />
        </nav>
    );
};

export const useStyles = makeStyles({
    root: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        color: "white",
        padding: 10,
        "& > *": {
            marginRight: 10,
        },
    },
    divider: {
        flex: 1,
    },
});
