import { Navigate } from "react-router-dom";

export default function Home() {
  return (
    <Navigate to="/chat" replace={true}/>
  );
}
