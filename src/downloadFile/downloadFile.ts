export type FileContent = string | ArrayBuffer;

export enum FileType {
    JSON = "json",
    PDF = "pdf",
    SpreadSheet = "xlsx",
    XML = "xml",
}

export function downloadFile(
    content: FileContent,
    fileName: string,
    type: FileType
) {
    const blob: Blob = toBlob(content, type);
    save(blob, fileName);
}

function toBlob(content: FileContent, type: FileType): Blob {
    const byteArray: Array<ArrayBuffer | Uint8Array> =
        typeof content === "string" ? toByteArray(content) : [content];
    return new Blob(byteArray, { type: toContentType(type) });
}

function toByteArray(
    base64Data: string,
    sliceSize: number = 512
): Array<Uint8Array> {
    const byteCharacters: string = window.atob(base64Data);
    const byteArrays: Array<Uint8Array> = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice: string = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers: Array<number> = new Array(slice.length);

        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        byteArrays.push(new Uint8Array(byteNumbers));
    }

    return byteArrays;
}

function toContentType(type: FileType): string {
    switch (type) {
        case FileType.PDF:
            return "application/pdf";

        case FileType.SpreadSheet:
            return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

        case FileType.JSON:
            return "application/json";

        case FileType.XML:
            return "text/xml";

        default:
            return "text/plain";
    }
}

function save(blob: Blob, fileName: string): void {
    const url: string = window.URL.createObjectURL(blob);
    const downloadableLink: HTMLAnchorElement = document.createElement("a");
    downloadableLink.download = fileName;
    downloadableLink.href = url;
    downloadableLink.style.display = "none";
    document.body.appendChild(downloadableLink);
    downloadableLink.click();
    downloadableLink.remove();
    window.URL.revokeObjectURL(url);
}
