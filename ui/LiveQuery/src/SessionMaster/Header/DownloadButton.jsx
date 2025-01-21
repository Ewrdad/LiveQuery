import { Button } from "@/components/ui/button";

/**
 * @alias DownloadButton
 * @description A React component that creates a downloadable JSON file from an object.
 * @param {Object} data The object data to be included in the file.
 * @param {string} filename The name of the downloaded file.
 * @returns {JSX.Element} A button element that triggers the download.
 */
export const DownloadButton = ({ data, filename }) => {
  /**
   * @alias downloadFile
   * @description Creates a temporary link element and triggers a click event to download the data.
   * @returns {void}
   */
  const downloadFile = () => {
    const jsonData = JSON.stringify(data, null, 2); // Convert data to JSON string with indentation
    const blob = new Blob([jsonData], { type: "application/json" }); // Create a Blob with JSON data
    const url = URL.createObjectURL(blob); // Create a temporary URL for the Blob

    const link = document.createElement("a"); // Create a link element
    link.href = url;
    link.download = filename; // Set the filename for download

    document.body.appendChild(link); // Append the link to the document
    link.click(); // Simulate a click on the link to trigger download
    document.body.removeChild(link); // Remove the link from the document
  };

  return (
    <Button className="m-1" onClick={downloadFile}>
      Download Data
    </Button>
  );
};
