import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './chart.scss';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Bar, PieChart, Pie } from 'recharts';

const Chart = () => {
  const [averages, setAverages] = useState({});
  const [assessmentStatus, setAssessmentStatus] = useState({});

  useEffect(() => {
    axios.get('https://mindmatters-ejmd.onrender.com/count')
      .then(response => {
        setAssessmentStatus(response.data);
      })
      .catch(error => {
        console.error('Error fetching assessment status: ' + error);
      });

    axios.get('https://mindmatters-ejmd.onrender.com/student_result')
      .then(response => {
        setAverages(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ' + error);
      });
  }, []);
  

  const data1 = [
    { name: "Already Taken", users: parseInt(assessmentStatus.taken) || 0 },
    { name: "Not yet Taken", users: parseInt(assessmentStatus.notTaken) || 0 },
  ];
  
  

  return (
    <ResponsiveContainer width="100%" aspect={3}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <BarChart
            width={500}
            height={300}
            data={[
              { name: 'Stress', Student: averages.avg_stress },
              { name: 'Anxiety', Student: averages.avg_anxiety },
              { name: 'Depression', Student: averages.avg_depression },
            ]}
            margin={{
              top: 5,
              right: 30,
              left: 80,
              bottom: 5,
            }}
            barSize={30}
          >
            <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="Student" fill="#8884d8" background={{ fill: '#eee' }} />
          </BarChart>
        </div>

        <div style={{ flex: 1 }}>
          <PieChart width={400} height={400}>
            <Pie
              dataKey="users" // Data key should match the property name in data1
              isAnimationActive={false}
              data={data1}
              cx={200}
              cy={200}
              outerRadius={80}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </ResponsiveContainer>
  );
}

export default Chart;
