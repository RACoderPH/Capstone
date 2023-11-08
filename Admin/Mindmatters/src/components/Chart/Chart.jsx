import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './chart.scss';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Bar, PieChart, Pie, Cell } from 'recharts';

const Chart = () => {
  const [averages, setAverages] = useState({});
  const [assessmentStatus, setAssessmentStatus] = useState({});
  const [assessmentStatus1, setAssessmentStatus1] = useState({});

  useEffect(() => {
    axios.get('https://mindmatters-ejmd.onrender.com/countAssessmentStatus')
      .then(response => {
        setAssessmentStatus1(response.data);
      })
      .catch(error => {
        console.error('Error fetching assessment status: ' + error);
      });
  }, []);

  

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
  

 // Check if assessmentStatus is an array before mapping over it
 const data1 = Array.isArray(assessmentStatus1) ? assessmentStatus1.map(status => ({
  name: status.mh_status || 'Not yet taken',
  users: status.count,
})) : [];
  
  // Calculate the counts of Normal, Stressed, Anxious, and Depressed from data1
  const normalCount = data1.find(item => item.name === 'Normal')?.users || 0;
  const stressedCount = data1.find(item => item.name === 'Stressed')?.users || 0;
  const anxiousCount = data1.find(item => item.name === 'Anxious')?.users || 0;
  const depressedCount = data1.find(item => item.name === 'Depressed')?.users || 0;

  // Define a color mapping for each category
  const categoryColors = {
    Normal: '#98D8AA',
    Stressed: '#ABC2E8',
    Anxious: '#F7D060',
    Depressed: '#FF6D60',
    'Not yet taken': '#FEBF63',
  };
  return (
    <ResponsiveContainer width="100%" aspect={3}>
      <div style={{ display: 'flex',justifyContent:'space-between',alignContent:'space-between',width:"100%"}}>
        <div style={{ flex: 1 }}>
          <BarChart
            width={800}
            height={500}
            data={[
              { name: 'Stress', Student: averages.avg_stress,fill: '#ABC2E8' },
              { name: 'Anxiety', Student: averages.avg_anxiety , fill: '#82ca9d'},
              { name: 'Depression', Student: averages.avg_depression, fill: '#ffc658' },
            ]}
            margin={{
              top: 5,
              right: 30,
              left: 80,
              bottom: 5,
            }}
            barSize={50}
          >
            <XAxis dataKey="name" scale="point" padding={{ left: 30, right: 10 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="Student" fill="#8884d8" />
          </BarChart>
          
        </div>

        <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <PieChart width={600} height={500}>
            <Pie
              dataKey="users" // Data key should match the property name in data1
              isAnimationActive={false}
              data={data1}
              cx={400}
              cy={200}
              outerRadius={170}
              label
            >
              {data1.map((entry, index) => (
              // Set custom colors for each Pie segment based on the category
              <Cell key={`cell-${index}`} fill={categoryColors[entry.name]} />
                ))}
                </Pie>
            <Tooltip />
          </PieChart>
          <div style={{ flex: 1 }}>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                <li>
                  <span style={{ color: 'black', background: '#98D8AA', fontSize: '16px' }}>Normal:</span> {normalCount}
                </li>
                <li>
                  <span style={{ color: 'black', background: '#F3E99F', fontSize: '16px' }}>Stressed:</span> {stressedCount}
                </li>
                <li>
                  <span style={{ color: 'black', background: '#F7D060', fontSize: '16px' }}>Anxious:</span> {anxiousCount}
                </li>
                <li>
                  <span style={{ color: 'black', background: '#FF6D60', fontSize: '16px' }}>Depressed:</span> {depressedCount}
                </li>
              </ul>
          </div>
        </div>
      </div>
      </div>
    </ResponsiveContainer>
  );
}

export default Chart;
