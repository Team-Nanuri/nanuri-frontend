import RQProvider from "@/global/components/RQProvider.tsx";
import Router from "@/global/pages/Router.tsx";
import "./App.css";
function App() {

  return (
    <RQProvider>
      <Router />
    </RQProvider>
  )
}

export default App