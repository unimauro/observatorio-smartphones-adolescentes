import type { EChartsOption } from "echarts";

export const AXIS = "rgba(148,163,184,0.35)";
export const TEXT = "#64748b";

export function baseOption(): EChartsOption {
  return {
    backgroundColor: "transparent",
    textStyle: { fontFamily: "Inter, sans-serif", color: TEXT },
    grid: { left: 48, right: 20, top: 36, bottom: 40, containLabel: true },
    tooltip: {
      trigger: "axis",
      backgroundColor: "#111929",
      borderColor: "#26324a",
      textStyle: { color: "#e2e8f0", fontFamily: "Inter, sans-serif" },
    },
    legend: { textStyle: { color: TEXT }, top: 0, icon: "roundRect" },
    xAxis: {
      type: "category",
      axisLine: { lineStyle: { color: AXIS } },
      axisLabel: { color: TEXT },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      splitLine: { lineStyle: { color: AXIS, type: "dashed" } },
      axisLabel: { color: TEXT },
    },
  };
}
