/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from "react";
import "./App.css";
import jspreadsheet from "jspreadsheet-ce";
import styled from "styled-components";

function App() {
  const tableRightRef = useRef(null);
  const options = {
    data: [[]],
    // minDimensions: [7, 8],
    columns: [
      { type: "text", title: "やああああ", width: 30 },
      { type: "text", title: "やああああ", width: 30 },
      { type: "text", title: "感謝やあ", width: 200 },
      { type: "text", title: "やあ", width: 200 },
      { type: "text", title: "感謝", width: 120 },
      { type: "text", title: "感謝", width: 80 },
      { type: "text", title: "感謝やあ", width: 100 },
      { type: "text", title: "感謝", width: 100 },
    ],
    nestedHeaders: [
      [{ title: "Supermarket information", colspan: "3" }],
      [
        { title: "Location", colspan: "2" },
        { title: " Other Information", colspan: "2" },
      ],
    ],
  };
  function mergeHeaderRows_JavaScript(selector, colIndex) {
    const thead = document.querySelector(`${selector} thead`);
  
    if (Number.isInteger(colIndex)) {
      const topTd = thead.querySelector(`td[data-column="${colIndex}"]`);
      const secondTd = thead.querySelector(`td[data-x="${colIndex}"]`);
  
      topTd.setAttribute('data-x', colIndex);
      topTd.setAttribute('rowspan', 2);
      topTd.setAttribute('title', secondTd.innerText);
      topTd.innerHTML = secondTd.innerText;
      secondTd.remove();
    } else {
      const topTd = thead.querySelector(`tr:first-child td:first-child`);
      const secondTd = thead.querySelector('tr:nth-child(2) td.jexcel_selectall');
  
      topTd.classList.add('jexcel_selectall');
      topTd.setAttribute('rowspan', 2);
      secondTd.remove();
    }
  }
  useEffect(() => {
    if (!tableRightRef.current.jspreadsheet) {
      jspreadsheet(tableRightRef.current, options);
    }
  }, [options]);
  const Wrapped = styled.div`
    display: flex;
    width: 100vw;
    max-width: 100vw;
    height: 100vh;
    max-height: 100vh;
    .tab-container {
      width: 60%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .table-top {
        height: 20%;
        background-color: #a9a9a94a;
        border: 3px solid #555;
        text-align: center;
      }
      .design {
        height: 80%;
        background-color: #f0f8ff70;
        border-bottom: 3px solid #333;
        border-left: 3px solid #333;
        text-align: center;
      }
    }
    .table-right {
      width: 40%;
      overflow: auto;
      border-bottom: 3px solid #333;
      border-right: 3px solid #333;
      border-left: 3px solid #333;
      border-top: 3px solid #333;
      table.jexcel {
        width: 100%;
        thead {
          font-weight: 600;
          tr {
            td {
              border: 1px solid #666;
              background-color: unset;
            }
          }
        }
        tbody {
          tr {
            td {
              border: 1px solid #666;
              background-color: unset;
            }
          }
        }
      }
    }
  `;
  return (
    <Wrapped>
      <div className="tab-container">
        <section className="table-top">Table Top</section>
        <section className="design">Phần hiển thị design</section>
      </div>

      <section ref={tableRightRef} className="table-right" />
    </Wrapped>
  );
}

export default App;
