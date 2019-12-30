import React from "react";
import { makeStyles } from "@material-ui/styles";

export default (props: any) => {
    const styles = useStyles({});
    return (
        <span className={styles.root}>
            <a
                href="https://github.com/BrandonDyer64/Memory-Game"
                target="_blank"
                rel="noopener noreferrer"
            >
                Fork me
            </a>
        </span>
    );
};

export const useStyles = makeStyles({
    root: {
        "& a ": {
            background: "#fff",
            color: "var(--accent)",
            textDecoration: "none",
            fontFamily: "arial, sans-serif",
            textAlign: "center",
            fontWeight: "bold",
            padding: "5px 20px",
            fontSize: "1rem",
            lineHeight: "2rem",
            position: "relative",
            transition: "0.5s",
        },
        "& a:hover ": {
            background: "#eee",
        },
        "& a::before, & a::after ": {
            content: "",
            width: "100%",
            display: "block",
            position: "absolute",
            top: 1,
            left: 0,
            height: 1,
            background: "#fff",
        },
        "& a::after ": {
            bottom: 1,
            top: "auto",
        },
        "@media (min-width: 200px)": {
            position: "absolute",
            display: "block",
            top: 0,
            right: -10,
            width: 150,
            overflow: "hidden",
            height: 150,
            zIndex: 9999,
            "& a": {
                width: 200,
                position: "absolute",
                top: 20,
                right: -60,
                transform: "rotate(45deg)",
                boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
            },
        },
    },
});
