import { useState,useEffect } from "react";
import Layout from "./Layout/Layout";
import AddTask from "./Components/Left/AddTask";
import ShowTasks from "./Components/Right/ShowTasks";
import { TaskProvider } from "./Service/taskContext";
import'./App.css'
function App() {

  return (
    <>
      <TaskProvider>
        <Layout>
          <AddTask/>
          <ShowTasks/>
        </Layout>
      </TaskProvider>
    </>
  );
}

export default App