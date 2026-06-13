import imageCompression from 'browser-image-compression';
import { api } from './api';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export async function compressAndUploadImage(file: File): Promise<string> {
  try {
    // 1. Pre-flight Validation
    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error(`Unsupported file type: ${file.type}. Please upload JPEG, PNG, or WebP.`);
    }

    // 2. Compress Image
    const options = {
      maxSizeMB: 1, // Max file size in MB
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: file.type // Maintain original file type or compress to specific type if needed
    };
    const compressedFile = await imageCompression(file, options);

    // 3. Get Presigned URL
    const response = await api.get(`/api/upload/presigned-url?fileType=${encodeURIComponent(compressedFile.type)}`);
    const { signedUrl, fileName } = response.data.data;

    if (!signedUrl || !fileName) {
      throw new Error('Failed to retrieve secure upload URL from server.');
    }

    // 4. Upload to S3 directly with retry-safe behavior via fetch
    const uploadResponse = await fetch(signedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': compressedFile.type,
      },
      body: compressedFile,
    });

    if (!uploadResponse.ok) {
      throw new Error(`Direct upload failed with status ${uploadResponse.status}: ${uploadResponse.statusText}`);
    }

    return fileName;
  } catch (error: any) {
    console.error('Image processing/upload failed:', error);
    // Rethrow to allow component to show toast/alert
    throw error;
  }
}
