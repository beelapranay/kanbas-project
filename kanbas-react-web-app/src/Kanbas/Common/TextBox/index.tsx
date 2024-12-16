import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { FaBold } from "react-icons/fa6";
import { GoItalic } from "react-icons/go";
import { FiUnderline } from "react-icons/fi";
import { MdFormatColorText } from "react-icons/md";
import { BiHighlight, BiParagraph } from "react-icons/bi";
import { RiSuperscript2 } from "react-icons/ri";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import { MdOutlineRotateRight } from "react-icons/md";
import { FaRegKeyboard } from "react-icons/fa";
import { HiMiniCodeBracket } from "react-icons/hi2";
import { PiArrowsOutSimple } from "react-icons/pi";
import { PiDotsSixVertical } from "react-icons/pi";
import { Link } from "react-router-dom";
import { KanbasState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { setText } from "./reducer";
import { text } from "stream/consumers";

interface TextEditorProps {
  textData: string; // Define a prop for the API endpoint
}


const TextEditor: React.FC <TextEditorProps> = ({ textData }) => {
  const [fontSize, setFontSize] = useState("16px");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [textColor, setTextColor] = useState("#000000");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [highlightColor, setHighlightColor] = useState("#FFFF00");
  const highlightColorPickerRef = useRef<HTMLInputElement>(null);
  const [isSuperscript, setIsSuperscript] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  

  const dispatch = useDispatch();
const textBox = useSelector((state: KanbasState) => state.textBoxReducer.textBox);


  //const dispatch = useDispatch();
  const toggleBold = () => {
    setIsBold(!isBold);
  };
  const toggleItalics = () => {
    setIsItalic(!isItalic);
  };
  const toggleUnderline = () => {
    setIsUnderline(!isUnderline);
  };

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleFontSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedFontSize = event.target.value;
    setFontSize(selectedFontSize);
    document.execCommand("fontSize", false, selectedFontSize);
  };

  const handleTextColorChange = (color: string) => {
    setTextColor(color);
    document.execCommand("foreColor", false, color);
  };

  const handleHighlightColorChange = (color: string) => {
    document.execCommand("hiliteColor", false, color);
  };
  const handleHighlightButtonClick = () => {
    if (highlightColorPickerRef.current) {
      highlightColorPickerRef.current.click();
    }
  };

  const toggleSuperscript = () => {
    document.execCommand("superscript");
    setIsSuperscript(!isSuperscript);
  };

  const updateWordCount = (textArea: HTMLTextAreaElement) => {
    const words = textArea.value.trim().split(/\s+/);
    setWordCount(words.length);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <span>
          <a href="#" style={{ textDecoration: "none", color: "black" }}>
            Edit
          </a>
        </span>
        <span>
          <a href="#" style={{ textDecoration: "none", color: "black" }}>
            View
          </a>
        </span>
        <span>
          <a href="#" style={{ textDecoration: "none", color: "black" }}>
            Insert
          </a>
        </span>
        <span>
          <a href="#" style={{ textDecoration: "none", color: "black" }}>
            Format
          </a>
        </span>
        <span>
          <a href="#" style={{ textDecoration: "none", color: "black" }}>
            Tools
          </a>
        </span>
        <span>
          <a href="#" style={{ textDecoration: "none", color: "black" }}>
            Table
          </a>
        </span>
        <span className="float-end">
          <MdOutlineRotateRight style={{ color: "green", fontSize: "30px" }} />{" "}
          100%
        </span>

        <div id="editor">
          <div id="formattingOptions">
            <select
              id="fontSizeSelect"
              onChange={handleFontSizeChange}
              value={fontSize}
            >
              <option value="12px">12px</option>
              <option value="14px">14px</option>
              <option value="16px">16px</option>
              <option value="18px">18px</option>
            </select>

            <select id="paraType" style={{ border: "none" }}>
              <option value="paragraph">Paragraph</option>
            </select>
            <div className="vertical-line"></div>
            <span>
              <FaBold onClick={toggleBold} className="icon" />
            </span>
            <span>
              <GoItalic onClick={toggleItalics} className="icon" />
            </span>
            <span>
              <FiUnderline onClick={toggleUnderline} className="icon" />
            </span>
            <span onClick={toggleColorPicker} className="colorPickerIcon">
              <MdFormatColorText />
            </span>
            {showColorPicker && (
              <input
                type="color"
                className="colorPicker"
                onChange={(e) => handleTextColorChange(e.target.value)}
                value={textColor}
              />
            )}

            <span onClick={toggleColorPicker} className="colorPickerIcon">
              <BiHighlight />
            </span>
            {showColorPicker && (
              <input
                type="color"
                className="colorPicker"
                onChange={(e) => handleHighlightColorChange(e.target.value)}
              />
            )}
            <span>
              <RiSuperscript2 onClick={toggleSuperscript} className="icon" />
            </span>
            <div className="vertical-line"></div>
            <span>
              <HiOutlineEllipsisVertical />
            </span>
          </div>
          <br />

          <textarea
            value={textBox.text}
            onChange={(e) => {
              dispatch(setText(e.target.value));
            }}
            id="textInput"
            placeholder="Enter your text here..."
            style={{
              color: textColor,
              fontSize,
              fontWeight: isBold ? "bold" : "normal",
              fontStyle: isItalic ? "italic" : "normal",
              textDecoration: isUnderline ? "underline" : "none",
              verticalAlign: isSuperscript ? "super" : "baseline",
            }}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginLeft: "auto", display: "flex" }}>
              <span>
                <FaRegKeyboard style={{ color: "red" }} />
              </span>
              <div className="vertical-line"></div>

              <span>
                <p style={{ color: "red", margin: 0 }}>0 words</p>
              </span>
              <div className="vertical-line"></div>
              <span>
                <HiMiniCodeBracket style={{ color: "red" }} />
              </span>
              <span>
                <PiArrowsOutSimple style={{ color: "red" }} />
              </span>

              <div
                style={{
                  border: "1px solid red",
                  padding: "0.5px",
                  borderRadius: "5px",
                  display: "inline-block",
                }}
              >
                <span>
                  <PiDotsSixVertical />
                </span>
              </div>
            </div>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default TextEditor;









// import React, { useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { FaBold, FaRegKeyboard } from "react-icons/fa";
// import { GoItalic } from "react-icons/go";
// import { FiUnderline } from "react-icons/fi";
// import { MdFormatColorText, MdOutlineRotateRight } from "react-icons/md";
// import { BiHighlight } from "react-icons/bi";
// import { RiSuperscript2 } from "react-icons/ri";
// import { HiOutlineEllipsisVertical, HiMiniCodeBracket } from "react-icons/hi2";
// import { PiArrowsOutSimple, PiDotsSixVertical } from "react-icons/pi";
// import { KanbasState } from "../../store"; // Adjust path if necessary
// import { setText } from "./reducer";
 
// interface TextEditorProps {
//   textData: string;
// }
 
// const TextEditor: React.FC<TextEditorProps> = ({ textData }) => {
//   const [fontSize, setFontSize] = useState("16px");
//   const [isBold, setIsBold] = useState(false);
//   const [isItalic, setIsItalic] = useState(false);
//   const [isUnderline, setIsUnderline] = useState(false);
//   const [textColor, setTextColor] = useState("#000000");
//   const [highlightColor, setHighlightColor] = useState("transparent"); // Default to transparent
//   const [isSuperscript, setIsSuperscript] = useState(false);
//   const [wordCount, setWordCount] = useState(0);
 
//   const highlightColorPickerRef = useRef<HTMLInputElement>(null);
//   const dispatch = useDispatch();
//   const textBox = useSelector((state: KanbasState) => state.textBoxReducer.textBox);
 
//   const toggleBold = () => setIsBold(!isBold);
//   const toggleItalics = () => setIsItalic(!isItalic);
//   const toggleUnderline = () => setIsUnderline(!isUnderline);
//   const toggleSuperscript = () => setIsSuperscript(!isSuperscript);
 
//   const handleFontSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setFontSize(event.target.value);
//   };
 
//   const handleHighlightButtonClick = () => {
//     if (highlightColorPickerRef.current) {
//       highlightColorPickerRef.current.click();
//     }
//   };
 
//   return (
//     <div style={{ padding: "10px", fontFamily: "Arial, sans-serif" }}>
//       {/* Toolbar */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "10px",
//         }}
//       >
//         {/* Left-side toolbar options */}
//         <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
//           <span style={{ cursor: "pointer" }}>Edit</span>
//           <span style={{ cursor: "pointer" }}>View</span>
//           <span style={{ cursor: "pointer" }}>Insert</span>
//           <span style={{ cursor: "pointer" }}>Format</span>
//           <span style={{ cursor: "pointer" }}>Tools</span>
//           <span style={{ cursor: "pointer" }}>Table</span>
//         </div>
 
//         {/* Right-side toolbar options */}
//         <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//           <MdOutlineRotateRight style={{ color: "green", fontSize: "20px" }} />
//           <span>100%</span>
//         </div>
//       </div>
 
//       {/* Formatting Options */}
//       <div
//         id="formattingOptions"
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: "15px",
//           borderBottom: "1px solid #ccc",
//           paddingBottom: "10px",
//           marginBottom: "10px",
//         }}
//       >
//         <select
//           id="fontSizeSelect"
//           onChange={handleFontSizeChange}
//           value={fontSize}
//           style={{
//             border: "none", // Remove border
//             outline: "none",
//             background: "none",
//             fontSize: "16px",
//             cursor: "pointer",
//           }}
//         >
//           <option value="12px">12px</option>
//           <option value="14px">14px</option>
//           <option value="16px">16px</option>
//           <option value="18px">18px</option>
//         </select>
 
//         <select
//           id="paraType"
//           style={{
//             border: "none", // Remove border
//             outline: "none",
//             background: "none",
//             fontSize: "16px",
//             cursor: "pointer",
//           }}
//         >
//           <option value="paragraph">Paragraph</option>
//         </select>
 
//         <FaBold onClick={toggleBold} style={{ cursor: "pointer" }} />
//         <GoItalic onClick={toggleItalics} style={{ cursor: "pointer" }} />
//         <FiUnderline onClick={toggleUnderline} style={{ cursor: "pointer" }} />
//         <MdFormatColorText
//           onClick={() => setTextColor("#0000FF")}
//           style={{ cursor: "pointer" }}
//         />
 
//         <BiHighlight onClick={handleHighlightButtonClick} style={{ cursor: "pointer" }} />
//         <input
//           ref={highlightColorPickerRef}
//           type="color"
//           onChange={(e) => setHighlightColor(e.target.value)}
//           style={{ display: "none" }}
//         />
 
//         <RiSuperscript2 onClick={toggleSuperscript} style={{ cursor: "pointer" }} />
//         <HiOutlineEllipsisVertical style={{ cursor: "pointer" }} />
//       </div>
 
//       {/* Textarea */}
//       <textarea
//         value={textBox.text}
//         onChange={(e) => {
//           dispatch(setText(e.target.value));
//           const words = e.target.value.trim().split(/\s+/);
//           setWordCount(e.target.value.trim() === "" ? 0 : words.length);
//         }}
//         id="textInput"
//         placeholder="Enter your text here..."
//         style={{
//           width: "100%",
//           height: "200px",
//           padding: "10px",
//           border: "1px solid #ccc",
//           borderRadius: "4px",
//           resize: "none",
//           color: textColor,
//           backgroundColor: highlightColor,
//           fontSize,
//           fontWeight: isBold ? "bold" : "normal",
//           fontStyle: isItalic ? "italic" : "normal",
//           textDecoration: isUnderline ? "underline" : "none",
//           verticalAlign: isSuperscript ? "super" : "baseline",
//         }}
//       />
 
//       {/* Word Count */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginTop: "10px",
//         }}
//       >
//         <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//           <FaRegKeyboard style={{ color: "red" }} />
//           <span style={{ color: "red" }}>{wordCount} words</span>
//         </div>
 
//         <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//           <HiMiniCodeBracket style={{ color: "red" }} />
//           <PiArrowsOutSimple style={{ color: "red" }} />
//           <div
//             style={{
//               border: "1px solid red",
//               borderRadius: "4px",
//               padding: "2px 4px",
//               display: "flex",
//               alignItems: "center",
//               cursor: "pointer",
//             }}
//           >
//             <PiDotsSixVertical />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
 
// export default TextEditor;
