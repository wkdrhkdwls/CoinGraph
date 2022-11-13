import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
interface ChartProps {
  coinId: string;
}
function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data?.map((price) => {
                return [
                  Date.parse(price.time_close),
                  price.open,
                  price.high,
                  price.low,
                  price.close,
                ];
              }) as any,
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              type: "candlestick",
              height: 300,
              width: 500,
              background: "transparent",
            },
            title: {
              text: "CandleStick Chart",
              align: "left",
            },
            stroke: {
              curve: "smooth",
              width: 1,
            },
            yaxis: {
              show: false,
              tooltip: {
                enabled: true,
              },
            },
            xaxis: {
              type: "datetime",
              categories: data?.map((price) => price.time_close),
              labels: {
                style: {
                  colors: "blue",
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}
export default Chart;
