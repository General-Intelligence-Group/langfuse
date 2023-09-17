export function formatFileSize(fileSizeInBytes: number, lang: Locale): string {
  if (fileSizeInBytes < 1024) {
    return `${fileSizeInBytes} B`;
  } else if (fileSizeInBytes < 1024 * 1024) {
    const fileSizeInKB = fileSizeInBytes / 1024;
    return `${new Intl.NumberFormat(lang, { maximumFractionDigits: 2 }).format(
      fileSizeInKB,
    )} KB`;
  } else if (fileSizeInBytes < 1024 * 1024 * 1024) {
    const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
    return `${new Intl.NumberFormat(lang, { maximumFractionDigits: 2 }).format(
      fileSizeInMB,
    )} MB`;
  } else {
    const fileSizeInGB = fileSizeInBytes / (1024 * 1024 * 1024);
    return `${new Intl.NumberFormat(lang, { maximumFractionDigits: 2 }).format(
      fileSizeInGB,
    )} GB`;
  }
}

export function formatNumberToInt(numberToFormat: number, lang: Locale): string {
  return new Intl.NumberFormat(lang, { maximumFractionDigits: 0 }).format(
    numberToFormat,
  );
}
