import React from 'react';
import {createRoot} from "react-dom/client";
import {TaskApplication} from "./app/TaskApplication";

const root = createRoot(document.getElementById("root"));

root.render(<TaskApplication/>)