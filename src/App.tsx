import "./App.css";
import { FilePond, registerPlugin, type FilePondProps } from "react-filepond";
import FilepondPluginFileEncode from "filepond-plugin-file-encode";
import FilepondPluginFileValidationType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.css";
import { useRef, useState } from "react";

registerPlugin(FilepondPluginFileEncode, FilepondPluginFileValidationType);

function App() {
  const acceptedFiles = [
    {
      mime: "application/pdf",
      label: "PDF",
    },
    {
      mime: "application/msword",
      label: "DOC",
    },
    {
      mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      label: "DOCX",
    },
    {
      mime: "application/vnd.ms-powerpoint",
      label: "PPT",
    },
    {
      mime: "application/application/vnd.openxmlformats-officedocument.presentationml.presentation",
      label: "PPTX",
    },
    {
      mime: "text/csv",
      label: "CSV",
    },
    {
      mime: "application/vnd.ms-excel",
      label: "XLS",
    },
    {
      mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      label: "XLSX",
    },
    {
      mime: "image/jpeg",
      label: "JPEG",
    },
    {
      mime: "image/png",
      label: "PNG",
    },
  ];

  const filesRef = useRef<any>(null);
  const [files, setFiles] = useState<FilePondProps[] | FilePond[] | any[]>([]);
  const [selected, setSelected] = useState<string>(acceptedFiles[0].mime);
  const [base64, setBase64] = useState<string>("");

  const downloadBase64Text = () => {
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

  const downloadBase64File = () => {
    if (base64.length > 0) {
      const source = `data:${selected};base64,${base64}`;
      const link = document.createElement("a");
      const filename = `file.${acceptedFiles
        .find((x) => x.mime == selected)
        ?.label.toLocaleLowerCase()}`;
      link.href = source;
      link.download = filename;
      link.click();
    }
  };

  return (
    <div className="flex min-h-screen w-screen justify-center items-center flex-col">
      <div className="flex flex-col w-[90%] lg:w-[50%] text-center gap-10">
        <h1 className="text-3xl mb-5 d-flex flex-row">
          <select
            id="countries"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {acceptedFiles.map((o, i) => {
              return (
                <option value={o.mime} key={i}>
                  {o.label}
                </option>
              );
            })}
          </select>
          <span> Converter</span>
        </h1>

        <div className="flex flex-col">
          <FilePond
            ref={filesRef}
            onupdatefiles={setFiles}
            allowMultiple={false}
            maxFiles={1}
            credits={false}
            acceptedFileTypes={acceptedFiles.map((x) => x.mime)}
          />
          <textarea
            value={base64}
            onChange={(e) => setBase64(e.target.value)}
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write Base64..."
          ></textarea>
        </div>
        <div className="flex flex-row justify-center gap-2">
          {files.length > 0 ? (
            <>
              <button
                onClick={() => {
                  setFiles([]);
                  filesRef.current?.removeFile(files[0]?.file);
                }}
                type="button"
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Clear
              </button>
              <button
                onClick={downloadBase64Text}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Convert Base64 Text
              </button>
            </>
          ) : (
            ""
          )}
          {base64.length > 0 ? (
            <>
              <button
                onClick={() => setBase64("")}
                type="button"
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Clear
              </button>
              <button
                onClick={downloadBase64File}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                <span>Convert to </span>
                {acceptedFiles.find((x) => x.mime == selected)?.label}
                <span> file</span>
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex flex-row justify-center items-center gap-1">
        <span className="capitalize text-center">
          &copy;{new Date().getFullYear()} - made with ❤️
        </span>
      </div>
    </div>
  );
}

export default App;
