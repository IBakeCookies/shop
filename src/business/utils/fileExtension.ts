export function getFileExtensionFromMimeType(mimeType: string): string {
    return mimeType.split('/').at(1) ?? '';
}
