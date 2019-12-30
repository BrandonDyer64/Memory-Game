import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Board from "./components/Board";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import config from "./config.json";

export default () => {
    const styles = useStyles({});
    const [boardKey, setBoardKey] = useState(0);
    const [score, setScore] = useState(config.startingScore);
    const [isWin, setIsWin] = useState(false);
    const onReset = () => {
        setBoardKey(k => k + 1);
        setScore(config.startingScore);
        setIsWin(false);
    };
    return (
        <div className={styles.root}>
            <Navbar score={score} startOver={onReset} />
            <Board
                numCards={config.cards}
                key={boardKey}
                onFail={() => setScore(s => s + config.matchFailPoints)}
                onMatch={() => setScore(s => s + config.matchPoints)}
                onWin={() => setIsWin(true)}
            />
            {isWin && (
                <Modal>
                    <div className={styles.modalContent}>
                        <div className={styles.modalTitle}>You Win!</div>
                        <div className={styles.modalButton} onClick={onReset}>
                            Play Again
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export const useStyles = makeStyles({
    root: {
        backgroundColor: "#00897B",
        width: "100vw",
        height: "100vh",
    },
    modalContent: {
        padding: 10,
    },
    modalTitle: {
        fontSize: 72,
        marginBottom: 20,
    },
    modalButton: {
        color: "var(--accent)",
        cursor: "pointer",
        textAlign: "right",
    },
});
