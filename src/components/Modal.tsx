import React from "react";
import { makeStyles } from "@material-ui/styles";

interface Props {
    children: any;
}

export default (props: Props) => {
    const styles = useStyles({});
    return (
        <div className={styles.root}>
            <div className={styles.content}>{props.children}</div>
        </div>
    );
};

export const useStyles = makeStyles({
    root: {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 9999,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        padding: "20px 40px",
        backgroundColor: "#fff6",
        backdropFilter: "blur(15px)",
        borderRadius: 10,
    },
});
