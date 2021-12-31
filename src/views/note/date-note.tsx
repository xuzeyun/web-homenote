import React from "react";
import { useEffect, useState } from "react";
// import "./money.scss"

interface Member {
  id?: String;
  year?: Number;
  monthNo?: Number;
  dayNo?: Number;
  date?: String;
}

export const DateNote = () => {
  const [list, setList] = useState([[{}]]);
  const [curYear, setCurYear] = useState<number>(2021);
  const [curWeek, setCurWeek] = useState<number>(1);

  useEffect(() => {
    // 获取 当年第一天的星期
    let week = new Date(`${curYear}-01-01`).getDay();
    // setCurWeek(week);

    // 12个月 每个月的天数
    let myList = [];
    for (let index = 0; index < 12; index += 1) {
      let monthDaysNum = new Date(curYear, index + 1, 0).getDate();
      let arr = [];
      for (let i = 0; i < monthDaysNum; i++) {
        let month = index + 1 < 10 ? `0${index + 1}` : index + 1;
        let day = i + 1 < 10 ? `0${i + 1}` : i + 1;
        let date = `${curYear}-${month}-${day}`;
        let monthNo = index + 1;
        let dayNo = i + 1;
        arr.push({
          id: "",
          year: curYear,
          monthNo,
          weekNo: week,
          dayNo,
          date,
        });
        week === 6 ? (week = 0) : (week += 1);
      }
      myList.push(arr);
    }
    setList(myList);

    // console.log(list, 'list')
    // console.log(myList, 'myList')
    // console.log(curYear, 'curYear')
    // console.log(curWeek, 'curWeek')
  }, []);

  return (
    <div>
      <div className="year-wrap">
        {list.map((item: any, indexOne) => {
          return (
            <div className="month-wrap" key={indexOne}>
              <h5>{indexOne + 1} 月</h5>
              <ul>
                <li className="li-week-title">日</li>
                <li className="li-week-title">一</li>
                <li className="li-week-title">二</li>
                <li className="li-week-title">三</li>
                <li className="li-week-title">四</li>
                <li className="li-week-title">五</li>
                <li className="li-week-title">六</li>
                {item.map((itemDay: any, indexTwo: number) => {
                  let arr: any = [];
                  if (indexTwo === 0 && itemDay.weekNo > 0) {
                    for (let i = 0; i < itemDay.weekNo; i++) {
                      arr.push(
                        <li key={indexTwo + "-" + i} className="null"></li>
                      );
                    }
                  }
                  arr.push(<li key={indexTwo}>{itemDay.dayNo}</li>);
                  return arr;
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};
