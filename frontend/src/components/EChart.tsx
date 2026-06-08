import ReactECharts from "echarts-for-react";

export default function EChart({ option, height = 300 }: { option: Record<string, unknown>; height?: number | string }) {
  return (
    <ReactECharts option={option as never} style={{ height, width: "100%" }} notMerge lazyUpdate opts={{ renderer: "canvas" }} />
  );
}
