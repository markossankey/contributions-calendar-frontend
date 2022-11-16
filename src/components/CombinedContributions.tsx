import { Button, Col, Form, Input, Row, Tooltip } from "antd";
import { useContext, useEffect, useState } from "react";
import { ContributionApi } from "../api";
import { UserNames } from "../context/UserNameContext";

export const CombinedContributions = () => {
  const [contributions, setContributions] = useState<any>(null);

  const { userNames, setUserNames } = useContext(UserNames);

  const [form] = Form.useForm<typeof userNames>();

  const handleSubmit = (submitValues: typeof userNames) => {
    setUserNames(submitValues);
  };

  useEffect(() => {
    ContributionApi.getCombinedContributions(userNames).then((res) =>
      setContributions(res.data.combinedContributions)
    );
  }, [userNames]);

  console.log(contributions);
  return (
    contributions && (
      <div>
        <Form form={form} onFinish={handleSubmit}>
          <Row>
            <Col span={11}>
              <Form.Item name="gitlabUsername">
                <Input addonBefore="/contributions?gitlabUsername="></Input>
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item name="githubUsername">
                <Input addonBefore="&githubUsername="></Input>
              </Form.Item>
            </Col>
            <Col span={2}>
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
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
