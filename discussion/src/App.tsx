import './App.css'
import { Route, Routes } from "react-router-dom";
import DiscussionPage from './DiscussionPage/DiscussionPage';
import FormPage from './FormPage/FormPage';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<DiscussionPage />}></Route>
        <Route path="/form" element={<FormPage />}></Route>
      </Routes>
    </>
  )
}

export default App
