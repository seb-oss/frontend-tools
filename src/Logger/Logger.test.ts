import { Logger } from ".";
import { LogItem } from "./Logger";

describe("Logger", () => {
    describe("insert method", () => {
        it("Should insert", () => {
            const test: string = "test";
            const logger: Logger = new Logger();
            logger.insert(test);
            const log: Array<LogItem> = logger.getLog();
            expect(log.length).toBe(1);
            expect(log[0].context).toEqual(test);
        });
    });
});
