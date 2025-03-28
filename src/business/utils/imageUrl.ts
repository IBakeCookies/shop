import type { ReadAllProductsSingleOutput } from '@data/repository/productRepository';
import { getFileExtensionFromMimeType } from '@business/utils/fileExtension';

export function getImageUrlFromProduct(
    image: ReadAllProductsSingleOutput['product_item'][number]['product_image'][number],
): string {
    const ext = getFileExtensionFromMimeType(image.mime_type);

    return `${image.bucket_id.base_url}/${image.bucket_id.name}/${image.path}/${image.filename}.${ext}`;
}
