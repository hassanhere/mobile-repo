import { useState } from 'react';
import { ErrorMessage, tryCatch } from '~utils';

type UploadFile = {
  uri: string;
  name: string;
  type?: string;
  size?: number;
};

const useS3Upload = () => {
  const [progress, setProgress] = useState(0);

  const uploadFile = async (file: UploadFile): Promise<any | undefined> => {
    try {
      setProgress(0);

      if (!file?.uri || !file?.name) {
        return undefined;
      }

      const contentType = file.type || 'application/octet-stream';

      // 1. Ask backend for the signed URL
      const [response, err] = await tryCatch(
        apiFromBackend({
          name: file.name,
          type: contentType,
          size: file.size,
        })?.unwrap(),
      );

      if (err) {
        ErrorMessage(err.message || 'Error occurred while uploading file');
        return undefined;
      }

      const signedUrl = response?.signedUrl;

      if (!signedUrl) {
        return undefined;
      }

      // 2. Fetch the local file
      const fileResponse = await fetch(file.uri);

      if (!fileResponse.ok) {
        return undefined;
      }

      const blob = await fileResponse.blob();

      // 3. Upload directly to S3
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

      // 4. Return backend response only if S3 upload succeeded
      if (isUploaded) {
        return response;
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
