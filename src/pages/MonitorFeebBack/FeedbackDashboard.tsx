import { Key } from "react";
import {
  DashboardFeedbackResponse,
  useFetchFeedbackDashboard,
} from "../../hooks/Feedback/useFechFeedbackDashboard";
import { LineChart, LineChartSeries } from "@mantine/charts";
import _ from "lodash";
import { format } from "date-fns";

export default function FeedbackDashboard() {
  const { data: feedbackDashboard, isLoading } = useFetchFeedbackDashboard();
  console.log(feedbackDashboard, "feedbackDashboard");

  const convertData = (data: DashboardFeedbackResponse[]) => {
    if (!data) return;
    const arr: Record<string, any>[] = [];

    for (let i = 0; i < data.length; i++) {
      const obj: looseObject = {
        month: format(
          new Date(parseInt(data[i].year), parseInt(data[i].month) - 1),
          "MMM yyyy",
        ),
      };
      if (arr.some((item: unknown) => item.month === obj.month)) continue;
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
        color: "blue",
      };
      arr.push(obj);
    }
    return arr;
  };

  console.log(convertLabels(feedbackDashboard || []), "labels");

  console.log(convertData(feedbackDashboard || []), "trans");

  type looseObject = {
    [key: string]: any;
  };
  const data = convertData(feedbackDashboard!) ?? [];
  const labels = convertLabels(feedbackDashboard!) ?? [];

  return (
    <LineChart
      withXAxis={true}
      withYAxis={true}
      h={300}
      data={data}
      dataKey="month"
      series={labels}
      curveType="linear"
    />
  );
}
