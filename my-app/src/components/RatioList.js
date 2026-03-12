import React from "react";

/**
 * Props:
 *   items: Array<{percent:number, firstTime:string, secondTime:string}>
 */
function RatioList({ items }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className='ratio-list'>
      <h2>Time splits</h2>
      <ul>
        {items.map((i) => (
          <li key={i.percent}>
            {i.percent}% : {100 - i.percent}% &rarr; {i.firstTime} &rarr; {i.secondTime}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RatioList;
