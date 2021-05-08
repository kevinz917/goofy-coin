import React, { useRef, useState } from 'react';
import './UploadArea.scss';

interface uploadAreaOwnProps {
  onChange: any;
  buffer: any;
}

type uploadAreaAllProps = uploadAreaOwnProps;

const UploadArea = (props: uploadAreaAllProps) => {
  const { onChange } = props;
  const [fileName, setFileName] = useState(null);
  const hiddenFileInput: any = useRef(null);

  const handleClick = (event: any) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event: any) => {
    const uploadedFileName = event.target.files[0].name;
    setFileName(uploadedFileName);

    onChange(event);
  };

  return (
    <>
      <button onClick={handleClick} className="input-container">
        <div>Upload a file</div>
        <div className="fileName">{fileName}</div>
      </button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    </>
  );
};

export default UploadArea;
