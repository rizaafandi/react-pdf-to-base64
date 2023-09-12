import "./App.css";
import { FilePond, registerPlugin, type FilePondProps } from "react-filepond";
import FilepondPluginFileEncode from "filepond-plugin-file-encode";
import FilepondPluginFileValidationType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.css";
import { useState } from "react";

registerPlugin(FilepondPluginFileEncode, FilepondPluginFileValidationType);

function App() {
  const [files, setFiles] = useState<FilePondProps[] | FilePond[] | any[]>([]);

  const download = () => {
    if (files.length > 0) {
      const el = document.createElement("a");
      el.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + files[0]?.getFileEncodeBase64String()
      );
      el.setAttribute("download", files[0]?.file?.name?.split(".")[0] + ".txt");
      el.style.display = "none";
      document.body.appendChild(el);
      el.click();
      document.body.removeChild(el);
    }
  };

  const copy = () => {
    if (files.length > 0) {
      let value = files[0]?.getFileEncodeBase64String();
      const el = document.createElement("textarea");
      el.style.display = "none";
      el.value = value;
      document.body.appendChild(el);

      el.select();
      el.setSelectionRange(0, value?.length);
      navigator.clipboard.writeText(el.value);

      alert("copied");
      document.body.removeChild(el);
    }
  };
  return (
    <div className="flex min-h-screen w-screen justify-center items-center">
      <div className="flex flex-col w-[90%] lg:w-[50%] text-center">
        <h1 className="text-3xl mb-5">PDF to Base64 Converter</h1>

        <div className="block">
          <FilePond
            onupdatefiles={setFiles}
            allowMultiple={false}
            maxFiles={1}
            credits={false}
            acceptedFileTypes={["application/pdf"]}
          />
        </div>
        <div className="flex flex-row justify-center gap-10">
          {files.length > 0 ? (
            <>
              <span className="cursor-pointer" onClick={download}>
                Download
              </span>
              <span className="cursor-pointer" onClick={copy}>
                Copy
              </span>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
