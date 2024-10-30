import React, { useEffect, useState } from "react";

import TypyiCodeService from "../services/TypyiCodeService";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import DataGrid from "../components/datagrid/DataGrid";
import axios from "axios";

const TypiDataGrid = () => {
  const [typi, setTypi] = useState([]);
  useEffect(() => {
    getTypis();
  }, []);

  const getTypis = async () => {
    try {
      const data = await axios.get('https://jsonplaceholder.typicode.com/todos')
      setTypi(data?.data);
    } catch (e) {
      toast.error("Failed to fetch typi");
    }
  };

  let columns = [];
  if (typi.length <= 0) {
    return;
  }
  let fields = Object.keys(typi["0"]);
  fields.forEach(f => columns.push({ label: f, field: f }));

  return (
    <div>
      <DataGrid columns={columns} rows={typi} />
    </div>
  );
};

export default TypiDataGrid;
