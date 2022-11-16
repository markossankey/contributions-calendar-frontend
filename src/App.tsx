import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "antd/dist/antd.css";
import "./App.css";

import { CombinedContributions } from "./components/CombinedContributions";
import { GithubContributions } from "./components/GithubContributions";
import { GitlabContributions } from "./components/GitlabContributions";
import { UserNameContext } from "./context/UserNameContext";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <UserNameContext>
          <CombinedContributions />
          <br />
          <GithubContributions />
          <br />
          <GitlabContributions />
        </UserNameContext>
      </QueryClientProvider>
    </div>
  );
}

export default App;
