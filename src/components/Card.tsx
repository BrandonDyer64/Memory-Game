import React from "react";
import { makeStyles } from "@material-ui/styles";
import CardBackImage from "../assets/cardback.png";

const suits = ["♦", "♣", "♥", "♠"];

export interface Props {
    value: number;
    isOpen: boolean;
    isEnabled: boolean;
    onClick: () => void;
}

export default (props: Props) => {
    const styles = useStyles({});
    const suit = suits[props.value % suits.length] || "♠";
    const onClick = () => {
        if (props.isEnabled) {
            props.onClick();
        }
    };
    return (
        <div
            className={`${styles.root} ${!props.isEnabled && styles.disabled}`}
            onClick={onClick}
        >
            <div
                className={`${styles.flipper} ${(props.isOpen ||
                    !props.isEnabled) &&
                    styles.flipped}`}
            >
                <div className={styles.back}>
                    <div className={styles.background} />
                </div>

                <div className={styles.front}>
                    <div className={styles.suit}>{suit}</div>
                    <div className={styles.value}>
                        {String.fromCharCode(65 + props.value)}
                    </div>
                    <div className={styles.suit}>{suit}</div>
                </div>
            </div>
        </div>
    );
};

export const useStyles = makeStyles({
    root: {
        width: "8vh",
        height: "12vh",
        userSelect: "none",
        perspective: 1000,
        transition:
            "perspective 0.5s cubic-bezier(.64,-0.57,.1,1), opacity 0.3s linear",
        transform: "rotateY(0deg)",
        "&:hover": {
            cursor: "pointer",
        },
        "& $back, & $front": {
            background: "#fff8",
            borderRadius: "1vh",
            backdropFilter: "blur(10px)",
            padding: "1vh",
            //backfaceVisibility: "hidden",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height: "100%",
        },
    },
    disabled: {
        opacity: "20%",
        cursor: "default",
    },
    flipper: {
        transform: "rotateY(0deg)",
        transition: "0.6s ease-out",
        transformStyle: "preserve-3d",
        position: "relative",
        width: "100%",
        height: "100%",
    },
    flipped: {
        transform: "rotateY(180deg)",
        cursor: "default",
        "& $back": {
            zIndex: 2,
        },
        "& $front": {
            zIndex: 0,
        },
    },
    back: {
        transform: "rotateY(0deg)",
        zIndex: 2,
    },
    background: {
        background: `url(${CardBackImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        width: "100%",
        height: "100%",
    },
    front: {
        display: "grid",
        gridTemplate: `
            "s1 .  . " auto
            ".  vl . " auto
            ".  .  s2" auto
            / auto auto auto`,
        justifyItems: "center",
        alignItems: "center",
        transform: "rotateY(180deg)",
    },
    suit: {
        color: "var(--accent)",
        fontSize: "2vh",
        "&:first-child": {
            gridArea: "s1",
        },
        "&:last-child": {
            gridArea: "s2",
        },
    },
    value: {
        gridArea: "vl",
        fontSize: "3vh",
    },
});
