import { useState } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
  ResponsiveContainer,
} from 'recharts';
import { format, subDays, isAfter } from 'date-fns';
import { LinearGradient, gradientId } from './gradients';
import style from './Statistics.module.css';

const Statistics = ({ data }) => {
  const [daysRange, setDaysRange] = useState(7);
  const today = new Date();

  const filteredData = data.filter(el => {
    const dataDate = parseDate(el.date);
    return isAfter(dataDate, subDays(today, daysRange - 1));
  });

  const formattedChartData = formatDataForChart(filteredData);

  function formatDataForChart(data) {
    const formattedData = [];

    const possibleDates = [];
    for (let i = daysRange - 1; i >= 0; i--) {
      possibleDates.push(format(subDays(today, i), 'dd.MM.yyyy'));
    }

    possibleDates.forEach(date => {
      const foundData = data.find(el => el.date === date);
      if (foundData) {
        formattedData.push({
          Water: foundData.totalWater,
          date: format(parseDate(foundData.date), 'dd'),
        });
      } else {
        formattedData.push({
          Water: 0,
          date: date.split('.')[0],
        });
      }
    });

    return formattedData;
  }

  function parseDate(dateString) {
    const parts = dateString.split('.');
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    return new Date(`${year}-${month}-${day}`);
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={style.customTooltip}>
          <p className={style.water}>{`Water: ${payload[0].value}ml`}</p>
        </div>
      );
    }
    return null;
  };

  const formatYAxis = tickItem => {
    if (tickItem === 0) {
      return '0%';
    }
    const valueInLiters = tickItem / 1000;
    return `${valueInLiters}L`;
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(`7 days`);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = value => {
    setSelectedOption(`${value} days`);
    setDaysRange(value);
    setIsOpen(false);
  };

  return (
    <div className={style.statistics}>
      <div className={style.controls}>
        <label className={style.label} htmlFor="daysRange">
          Select Days Range:
        </label>
        <div className={style.customSelectWrapper}>
          <div className={style.customSelect} onClick={toggleDropdown}>
            <span>{selectedOption}</span>
            <div
              className={`${style.arrow} ${isOpen ? style.arrowOpen : ''}`}
            ></div>
          </div>
          {isOpen && (
            <div className={style.customOptions}>
              <div
                className={style.customOption}
                onClick={() => selectOption(7)}
              >
                7 days
              </div>
              <div
                className={style.customOption}
                onClick={() => selectOption(14)}
              >
                14 days
              </div>
              <div
                className={style.customOption}
                onClick={() => selectOption(30)}
              >
                30 days
              </div>
            </div>
          )}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={formattedChartData}>
          <LinearGradient />
          <CartesianGrid strokeDasharray="3" stroke="none" />
          <XAxis
            dataKey="date"
            padding={{ left: 20, right: 20 }}
            tickSize={false}
            tickLine={false}
            tick={{ fill: 'var(--main-text-color)' }}
          />
          <YAxis
            padding={{ top: 20, bottom: 20 }}
            tickSize={false}
            tickLine={false}
            tick={{ fill: 'var(--main-text-color)' }}
            tickFormatter={formatYAxis}
          />
          <Area
            dataKey="Water"
            dot={{
              stroke: '#87D28D',
              strokeWidth: 3,
              r: 9,
              fill: '#fff',
              fillOpacity: '1',
            }}
            stroke="#87D28D"
            strokeWidth={3}
            fill={`url(#${gradientId})`}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: '' }}
            position={{ y: 10 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Statistics;
