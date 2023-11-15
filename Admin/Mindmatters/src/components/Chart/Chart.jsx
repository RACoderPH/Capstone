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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ textAlign: 'left' }}>
       <button style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
        Print
      </button>
      </div>
        <p style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Average of Depression, Anxiety, Stress</p>
        <BarChart
          width={800}
          height={500}
          data={[
            { name: 'Stress', Student: averages.avg_stress, fill: '#4CAF50' },
            { name: 'Anxiety', Student: averages.avg_anxiety, fill: '#2196F3' },
            { name: 'Depression', Student: averages.avg_depression, fill: '#FFC107' },
          ]}
          margin={{ top: 20, right: 30, left: 50, bottom: 20 }}
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
    </div>

        <div style={{ flex: 1 }}>
          
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' ,marginLeft:10}}>
        <div style={{ textAlign: 'left' }}>
       <button style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
        Print
      </button>
      </div>

      <p style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Student Mental Health Status</p>

      <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'row',justifyContent:'space-evenly' }}>
      <li style={{ marginRight: '10px' }}>
        <span style={{ color: 'black', background: '#98D8AA', fontSize: '18px' }}>Normal:</span> {normalCount}
      </li>
      <li style={{ marginRight: '10px' }}>
        <span style={{ color: 'black', background: '#F3E99F', fontSize: '18px' }}>Stressed:</span> {stressedCount}
      </li>
      <li style={{ marginRight: '10px' }}>
        <span style={{ color: 'black', background: '#F7D060', fontSize: '18px' }}>Anxious:</span> {anxiousCount}
      </li>
      <li>
        <span style={{ color: 'black', background: '#FF6D60', fontSize: '18px' }}>Depressed:</span> {depressedCount}
      </li>
    </ul>


      <PieChart width={600} height={500}>
        <Pie
          dataKey="users"
          isAnimationActive={false}
          data={data1}
          cx={300}
          cy={250}
          outerRadius={150}
          label
        >
          {data1.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={categoryColors[entry.name]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
      
        </div>
      </div>
      </div>
    </ResponsiveContainer>
  );
}

export default Chart;
