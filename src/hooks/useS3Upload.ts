import { useState } from 'react';
import { ErrorMessage, tryCatch } from '~utils';

type UploadFile = {
  uri: string;
  name: string;
  type?: string;
  size?: number;
};

type SignedUrlResponse = {
  signedUrl?: string;
  [key: string]: unknown;
};

/**
 * Placeholder for backend signed-URL request.
 * Replace with your RTK Query mutation (e.g. authApi.getSignedUrl) before using uploads.
 */
const requestSignedUrl = async (_payload: {
  name: string;
  type: string;
  size?: number;
}): Promise<SignedUrlResponse> => {
  throw new Error(
    'S3 signed URL API is not configured. Wire your backend endpoint in useS3Upload.',
  );
};

const useS3Upload = () => {
  const [progress, setProgress] = useState(0);

  const uploadFile = async (
    file: UploadFile,
  ): Promise<SignedUrlResponse | undefined> => {
    try {
      setProgress(0);

      if (!file?.uri || !file?.name) {
        return undefined;
      }

      const contentType = file.type || 'application/octet-stream';

      const [response, err] = await tryCatch(
        requestSignedUrl({
          name: file.name,
          type: contentType,
          size: file.size,
        }),
      );

      if (err) {
        ErrorMessage(err.message || 'Error occurred while uploading file');
        return undefined;
      }

      const signedUrl = response?.signedUrl;

      if (!signedUrl) {
        return undefined;
      }

      const fileResponse = await fetch(file.uri);

      if (!fileResponse.ok) {
        return undefined;
      }

      const blob = await fileResponse.blob();

      const isUploaded = await new Promise<boolean>(resolve => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = event => {
          if (event.lengthComputable) {
            const percentage = Math.round((event.loaded / event.total) * 100);
            setProgress(percentage);
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            setProgress(100);
            resolve(true);
          } else {
            resolve(false);
          }
        };

        xhr.onerror = () => {
          resolve(false);
        };

        xhr.onabort = () => {
          resolve(false);
        };

        xhr.open('PUT', signedUrl);
        xhr.setRequestHeader('Content-Type', contentType);
        xhr.send(blob);
      });

      if (isUploaded) {
        return response ?? undefined;
      }

      return undefined;
    } catch (error) {
      console.error('S3 upload error:', error);
      return undefined;
    }
  };

  return {
    progress,
    uploadFile,
  };
};

export default useS3Upload;
