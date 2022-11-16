import { Tooltip, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { ContributionApi } from "../api";
import { UserNames } from "../context/UserNameContext";

export const GithubContributions = () => {
  const [contributions, setContributions] = useState<any[]>([]);
  const {
    userNames: { githubUsername },
  } = useContext(UserNames);

  useEffect(() => {
    ContributionApi.getGithubContributions(githubUsername).then((res) =>
      setContributions(res.data.contributions)
    );
  }, [githubUsername]);

  console.log(contributions);
  return (
    contributions && (
      <div>
        <Typography.Paragraph>
          /github/{githubUsername}/contributions
        </Typography.Paragraph>
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
