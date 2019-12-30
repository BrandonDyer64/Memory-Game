import React from "react";
import { makeStyles } from "@material-ui/styles";

interface Props {
    onClick: () => void;
    children: any;
}

export default (props: Props) => {
    const styles = useStyles({});
    return (
        <button className={styles.root} onClick={() => props.onClick()}>
            {props.children}
        </button>
    );
};

export const useStyles = makeStyles({
    root: {
        fontFamily: "Signika",
        fontWeight: "bold",
        backgroundColor: "white",
        border: "none",
        borderBottom: "3px solid #EEEEEE",
        borderRadius: 4,
        padding: "7px 12px",
        cursor: "pointer",
        transition: "background-color 0.1s linear",
        color: "var(--accent)",

        "&:hover": {
            backgroundColor: "#F5F5F5",
        },
    },
});
