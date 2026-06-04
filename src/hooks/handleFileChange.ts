import type { ChangeEvent } from 'react';
import convertFileToBase64 from './convertFileToBase64';

const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
  const { files } = event.target;
  if (files && files.length > 0) {
    try {
      await convertFileToBase64(files[0]);
    } catch (error) {
      console.error('Conversion failed:', error);
    }
  }
};

export default handleFileChange;
