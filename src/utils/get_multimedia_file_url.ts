/**
 * Gets the full multimedia file URL based on the environment.
 * In development mode, prepends the backend base URL to relative paths.
 * In production, returns the file path as-is (assuming it's already a full URL).
 *
 * @param filePath - The file path (relative or absolute)
 * @param baseUrl - The base backend URL (defaults to zazitMestoJinakConfig.urlBaseBackend)
 * @returns The full file URL
 */
import { zazitMestoJinakConfig } from 'src/boot/global_vars';

export const getMultimediaUrl = (
  filePath: string | null | undefined,
  baseUrl?: string,
): string => {
  const isDevelopment = process.env.DEV;
  const backendBaseUrl = baseUrl || zazitMestoJinakConfig.urlBaseBackend;

  // In development, prepend base URL for relative paths
  if (isDevelopment) {
    // Check if the path is already absolute (starts with http:// or https://)
    if (/^https?:\/\//i.test(filePath)) {
      return filePath;
    }
    return backendBaseUrl + filePath;
  }

  // In production, return as-is (assuming it's already a full URL from the backend)
  return filePath;
};
