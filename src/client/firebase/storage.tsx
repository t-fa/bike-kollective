import { ourStorage } from '../../../server';

/**
 * Return image url from Storage, given the image's path
 * */
export const getBikeImageUrl = async (imagePath: string) => {
  const imageReference = ourStorage.ref(ourStorage.storage, imagePath);
  return await ourStorage.getDownloadURL(imageReference);
};
