import { Tooltip, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { ContributionApi } from "../api";
import { UserNames } from "../context/UserNameContext";

export const GitlabContributions = () => {
  const [contributions, setContributions] = useState<any>(null);
  const {
    userNames: { gitlabUsername },
  } = useContext(UserNames);

  useEffect(() => {
    ContributionApi.getGitlabContributions(gitlabUsername).then((res) =>
      setContributions(res.data.contributions)
    );
  }, []);

  console.log(contributions);
  return (
    contributions && (
      <div>
        <Typography.Title>
          /gitlab/{gitlabUsername}/contributions
        </Typography.Title>
        <div
          style={{
            display: "grid",
            gap: ".25rem",
            gridTemplateRows: "repeat(7, 1fr)",
            gridAutoFlow: "column",
            outline: "1px solid lightgray",
            padding: "1rem",
            borderRadius: "5px",
          }}
        >
          {contributions ? (
            //@ts-ignore
            contributions.map(({ date, count }) => (
              <Tooltip key={date} title={`${count} on ${date}`}>
                <div
                  style={{
                    height: "15px",
                    width: "15px",
                    backgroundColor: "green",

                    borderRadius: "5px",
                    opacity: count ? `${count * 0.2}` : 0.05,
                  }}
                ></div>
              </Tooltip>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    )
  );
};
