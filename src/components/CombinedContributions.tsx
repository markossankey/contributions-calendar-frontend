import { useQuery } from "@tanstack/react-query";
import { Button, Col, Form, Input, Row, Tooltip, Typography } from "antd";
import { useContext } from "react";
import { ContributionApi } from "../api";
import { UserNames } from "../context/UserNameContext";

export const CombinedContributions = () => {
  const { userNames, setUserNames } = useContext(UserNames);

  const [form] = Form.useForm<typeof userNames>();

  const handleSubmit = (submitValues: typeof userNames) => {
    setUserNames(submitValues);
  };
  const contributionsQuery = useQuery(
    ["combinedContributions", userNames],
    () => ContributionApi.getCombinedContributions(userNames),
    { select: (res) => res.data }
  );
  return (
    <>
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
      {contributionsQuery.isSuccess ? (
        <>
          <Typography.Text strong>
            Total Contributions: {contributionsQuery.data?.totalContributions}
          </Typography.Text>
          <br />
          <br />
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
            {contributionsQuery.data?.combinedContributions.map(
              ({ date, count }) => (
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
              )
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
