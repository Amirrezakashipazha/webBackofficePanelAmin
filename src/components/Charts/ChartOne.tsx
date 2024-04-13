import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import useAxios from '../../hooks/useAxios';
import { useTranslation } from 'react-i18next';

const options: ApexOptions = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#3C50E0', '#80CAEE'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    height: 335,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: true,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: 'straight',
  },
  // labels: {
  //   show: false,
  //   position: "top",
  // },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: '#fff',
    strokeColors: ['#3056D3', '#80CAEE'],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: 'category',
    categories: [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
      '23',
      '24',
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
    min: 0,
    max: 100000,
  },
};

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartOne: React.FC = () => {
  const { t ,i18n} = useTranslation();

  const [state, setState] = useState<{ series: { name: string; data: number[] }[] }>({
    series: [{ name: 'Product One', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }],
  });
  const [chartOptions, setChartOptions] = useState<ApexOptions>(options);
  const [shouldFetch, setShouldFetch] = useState(true);

  const { get, response } = useAxios();

  useEffect(() => {
    get(`http://localhost:3000/api/request-count`);
  }, []);
  
  useEffect(() => {
    if (response && response.data ) {
      const hourCounts = response.data.map(item => item.count);
      const totalRequestsToday = response.data.reduce((sum, currentItem) => sum + currentItem.count, 0);
      // Update the series data
      setState(prevState => ({
        ...prevState,
        totalRequestsToday,
        series: [{ name: 'Requests per hour', data: hourCounts }],
      }));

      // Calculate the max count for dynamic y-axis adjustment
      const maxCount = Math.max(...hourCounts);

      // Update the chart options with the new max value
      setChartOptions(prevOptions => ({
        ...prevOptions,
        yaxis: { ...prevOptions.yaxis,max: Math.ceil(maxCount + (maxCount * 0.1)), }, // Add 10% for padding
      }));
    }
  }, [response]); 


  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className={`${i18n.language==="en"?"mr-2":"me-2"} mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary`}>
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">{t("Total Request")}</p>
              <p className="text-sm font-medium">{state?.totalRequestsToday}</p>
            </div>
          </div>

        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button className="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
              {t("Day")}
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              {t("Week")}
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              {t("Month")}
            </button>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5" >
          {state.series[0].data.length > 0 &&<ReactApexChart
            options={chartOptions}
            series={state.series}
            type="area"
            height={350}
          />}
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
