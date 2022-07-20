import { downloadFile, FileType } from "./downloadFile";

describe("Util: downloadFile", () => {
    const DUMMY_BASE64_FILE_CONTENT: string = "ZHVtbXkgZmlsZQ==";

    it("should download base64 content successfully", () => {
        downloadFile(DUMMY_BASE64_FILE_CONTENT, "dummy.pdf", FileType.PDF);
    });

    it("should download binary content successfully", () => {
        downloadFile(new ArrayBuffer(20), "dummy.pdf", FileType.PDF);
    });

    for (const fileType in FileType) {
        it(`should download ${fileType} file successfully`, () => {
            downloadFile(
                DUMMY_BASE64_FILE_CONTENT,
                `dummy.${fileType.toLowerCase()}`,
                FileType[fileType]
            );
        });
    }

    it(`should download unknown file type successfully`, () => {
        downloadFile(
            DUMMY_BASE64_FILE_CONTENT,
            `dummy.txt`,
            undefined as unknown as FileType
        );
    });
});
