import "antd/dist/antd.css";
import "./App.css";

import { CombinedContributions } from "./components/CombinedContributions";
import { GithubContributions } from "./components/GithubContributions";
import { GitlabContributions } from "./components/GitlabContributions";
import { UserNameContext } from "./context/UserNameContext";

function App() {
  return (
    <div className="App">
      <UserNameContext>
        <CombinedContributions />
        <br />
        <GithubContributions />
        <br />
        <GitlabContributions />
      </UserNameContext>
    </div>
  );
}

export default App;
