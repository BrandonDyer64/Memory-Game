export function range(start: number, end: number): number[] {
    return Array(end - start)
        .fill(0)
        .map((_, i) => start + i);
}

export const shuffleArray = <T>(array: T[]): T[] =>
    array.sort(() => 0.5 - Math.random());
