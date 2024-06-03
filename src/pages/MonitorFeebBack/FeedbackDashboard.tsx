import { Key } from "react";
import {
  DashboardFeedbackResponse,
  useFetchFeedbackDashboard,
} from "../../hooks/Feedback/useFechFeedbackDashboard";
import { LineChart, LineChartSeries } from "@mantine/charts";
import _ from "lodash";
import { format } from "date-fns";
import { Container } from "@mantine/core";

export default function FeedbackDashboard() {
  const { data: feedbackDashboard, isLoading } = useFetchFeedbackDashboard();
  console.log(feedbackDashboard, "feedbackDashboard");

  const feedbackColors = [
    "red.6",
    "blue.6",
    "green.6",
    "yellow.6",
    "teal.6",
    "indigo.6",
    "cyan.6",
    "lime.6",
    "pink.6",
    "purple.6",
    "orange.6",
    "red.6",
    "blue.6",
    "green.6",
    "yellow.6",
    "teal.6",
    "indigo.6",
    "cyan.6",
    "lime.6",
    "pink.6",
    "purple.6",
    "orange.6",
  ];

  const randomColor = () => {
    const randomNumber = Math.floor(Math.random() * feedbackColors.length);
    const randomColor = feedbackColors[randomNumber];
    feedbackColors.splice(randomNumber, 1);
    console.log(randomColor, "feedbackColors");
    return randomColor;
  };

  const convertData = (data: DashboardFeedbackResponse[]) => {
    if (!data) return;
    const arr: Record<string, unknown>[] = [];

    for (let i = 0; i < data.length; i++) {
      const obj: looseObject = {
        month: format(
          new Date(parseInt(data[i].year), parseInt(data[i].month) - 1),
          "MMM yyyy",
        ),
      };
      if (arr.some((item: looseObject) => item.month === obj.month)) continue;
      for (let j = 0; j < data.length; j++) {
        if (data[j].month == data[i].month && data[i].year == data[j].year) {
          obj[data[j].student.first_name || data[j].student.email] =
            data[j].rating;
        }
      }
      arr.push(obj);
    }
    return arr;
  };

  const convertLabels = (data: DashboardFeedbackResponse[]) => {
    if (!data) return;
    const arr: LineChartSeries[] = [];
    for (let i = 0; i < data.length; i++) {
      const obj: LineChartSeries = {
        name: data[i].student.first_name || data[i].student.email,
        color: randomColor(),
      };
      if (arr.some((item: LineChartSeries) => item.name === obj.name)) continue;
      arr.push(obj);
    }
    return arr;
  };

  console.log(convertLabels(feedbackDashboard || []), "labels");

  console.log(convertData(feedbackDashboard || []), "trans");

  type looseObject = {
    [key: string]: unknown;
  };
  const data = convertData(feedbackDashboard!) ?? [];
  const labels = convertLabels(feedbackDashboard!) ?? [];

  return (
    <Container>
      <LineChart
        connectNulls
        withXAxis={true}
        withYAxis={true}
        h={300}
        data={data}
        dataKey="month"
        series={labels}
        curveType="linear"
      />
    </Container>
  );
}
