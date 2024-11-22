export const handleDownload = (fileUrl, fileName = "downloaded-file") => {
    if (!fileUrl) {
      console.error("File URL is required");
      return;
    }
  
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName; // Suggested file name for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return 
  };