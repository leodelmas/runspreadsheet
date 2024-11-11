import React from 'react';

const Session = ({ day }) => {
  switch (day.type) {
    case 'EC':
      return (
        <div className="text-blue-400">
          <strong>EC</strong> <small>(Diff. {day.difficulty})</small><br/>
          {day.duration}
        </div>
      );
    case 'EC (T)':
      return (
        <div className="text-green-500">
          <strong>EC (T)</strong> <small>(Diff. {day.difficulty})</small><br />
          {day.duration}
        </div>
      );
    case 'WEC (T)':
        return (
          <div className="text-green-800">
            <strong>WEC (T)</strong> <small>(Diff. {day.difficulty})</small><br />
            {day.duration}
          </div>
        );
    case 'EPI':
      return (
        <div className="text-red-500">
          <strong>EPI</strong> <small>(Diff. {day.difficulty})</small><br />
          {day.duration}<br/>
          {day.interval}
        </div>
      );
    case 'Repos':
      return <div className="text-gray-500">Repos</div>;
    case 'Course':
      return (
        <div className="text-yellow-500">
          <strong>Course</strong>
        </div>
      );
    default:
      return <div>Cliquez pour ajouter</div>;
  }
};

export default Session;
