import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import './chart.scss';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Bar, PieChart, Pie, Cell } from 'recharts';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import pdfMake from 'pdfmake/build/pdfmake';
import ReactDOM from 'react-dom';


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

  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const [logoImage, setLogoImage] = useState(null);

  const convertImageToBase64 = (imageSrc, callback) => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // To enable cross-origin loading of images
    img.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      callback(canvas.toDataURL('image/png'));
    };
    img.src = imageSrc;
  };
  

  useEffect(() => {
    // Convert the logo image to base64
    convertImageToBase64('src/images/sdalogo.png', (logoImageDataUrl) => {
      setLogoImage(logoImageDataUrl);
    });
  }, []); // Use an empty dependency array to ensure it runs only once
  
  const [moFranciscaImage, setMoFranciscaImage] = useState(null);
  
  useEffect(() => {
    // Convert the moFrancisca image to base64
    convertImageToBase64('src/images/mofrancisca.png', (moFranciscaImageDataUrl) => {
      setMoFranciscaImage(moFranciscaImageDataUrl);
    });
  }, []);
  
  
  pdfMake.fonts = {
    Roboto: {
      normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
      bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
      italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
      bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
    },
    LogoImage: {
      normal: logoImage,
    },
    MoFranciscaImage: {
      normal: moFranciscaImage,
    },
  }; 

  const createPdf = () => {
    // Capture the BarChart as an image
  const barChartNode = ReactDOM.findDOMNode(barChartRef.current);

  html2canvas(barChartNode).then((barChartCanvas) => {
    const barChartImage = barChartCanvas.toDataURL('image/jpeg');
  
      const content = [
        {
          columns: [
            {
              image: logoImage,
              width: 70,
              alignment: 'left',
            },
            {
              stack: [
                {
                  text: 'St. Dominic Academy of Pulilan, Inc.',
                  style: 'header',
                  alignment: 'center',
                },
                {
                  text: '(PAASCU Accredited - Level II)\nNational Road, Poblacion, Pulilan, Bulacan',
                  style: 'italicHeader',
                  alignment: 'center',
                },
              ],
            },
            {
              image: moFranciscaImage,
              width: 80,
              alignment: 'right',
            },
          ],
        },
        {
          text: ' ', // Add a blank line for margin
        },
        {
          text: 'Average of Depression, Anxiety and Stress ', // Add a blank line for margin
          style: 'header',
          alignment: 'center',
        },
        // Add the BarChart image to the PDF
        {
          image: barChartImage,
          width: 400,
          alignment: 'center',
        },
        // Add a blank line for margin
        {
          text: ' ',
        },
        {
          text: [
            { text: `Average Stress: `, style: 'label' },
            { text: `${averages.avg_stress || 0}`, style: 'dataStress' },
          ],
          alignment: 'center',
        },
        {
          text: [
            { text: `Average Anxiety: `, style: 'label' },
            { text: `${averages.avg_anxiety || 0}`, style: 'dataAnxiety' },
          ],
          alignment: 'center',
        },
        {
          text: [
            { text: `Average Depression: `, style: 'label' },
            { text: `${averages.avg_depression || 0}`, style: 'dataDepression' },
          ],
          alignment: 'center',
        },
      ];
  
      const styles = {
        label: {
          fontSize: 16,
          bold: true,
          margin: [0, 5],
        },
        dataStress: {
          fontSize: 16,
          color: '#4CAF50', // Green color for stress
        },
        dataAnxiety: {
          fontSize: 16,
          color: '#2196F3', // Blue color for anxiety
        },
        dataDepression: {
          fontSize: 16,
          color: '#FFC107', // Yellow color for depression
        },
        header: {
          fontSize: 22,
          bold: true,
        },
        italicHeader: {
          italics: true,
          alignment: 'center',
        },
        data: {
          fontSize: 16,
          alignment: 'center',
        },
        dataList: {
          fontSize: 16,
          alignment: 'center',
        },
      };
      
      const docDefinition = {
        content,
        styles,
      };
  
      const pdfName = `Mind_Matters_Report.pdf`;
      // Create and download the PDF
    pdfMake.createPdf(docDefinition).download(pdfName);
  }).catch(error => {
    console.error('Error capturing BarChart:', error);
  });
  };

  const createPieChartPdf = () => {
    // Capture the PieChart as an image
    const pieChartNode = ReactDOM.findDOMNode(pieChartRef.current);
  
    html2canvas(pieChartNode).then((pieChartCanvas) => {
      const pieChartImage = pieChartCanvas.toDataURL('image/jpeg');
  
      const content = [
        // Similar structure as the BarChart PDF, you can customize this part
        {columns: [
          {
            image: logoImage,
            width: 70,
            alignment: 'left',
          },
          {
            stack: [
              {
                text: 'St. Dominic Academy of Pulilan, Inc.',
                style: 'header',
                alignment: 'center',
              },
              {
                text: '(PAASCU Accredited - Level II)\nNational Road, Poblacion, Pulilan, Bulacan',
                style: 'italicHeader',
                alignment: 'center',
              },
            ],
          },
          {
            image: moFranciscaImage,
            width: 80,
            alignment: 'right',
          },
        ],
      },
      {
        text: ' ',
      },
      {
        text: 'Student Mental Health Status ',
        style: 'header',
        alignment: 'center',
      },
      // Add the PieChart image to the PDF
      {
        image: pieChartImage,
        width: 400,
        alignment: 'center',
      },
      // Add a blank line for margin
      {
        text: ' ',
      },
      // Add the information about student mental health status
    {
      text: 'Student Mental Health Status:', // You can customize this label
      style: 'subheader',
      alignment: 'left',
    },
    {
      table: {
        widths: ['auto', '*'],
        body: [
          [
            {
              text: 'Normal:',
              fillColor: '#98D8AA',
              style: 'listItemLabel',
            },
            {
              text: `${normalCount}`,
              style: 'listItemValue',
            },
          ],
          [
            {
              text: 'Stressed:',
              fillColor: '#F3E99F',
              style: 'listItemLabel',
            },
            {
              text: `${stressedCount}`,
              style: 'listItemValue',
            },
          ],
          [
            {
              text: 'Anxious:',
              fillColor: '#F7D060',
              style: 'listItemLabel',
            },
            {
              text: `${anxiousCount}`,
              style: 'listItemValue',
            },
          ],
          [
            {
              text: 'Depressed:',
              fillColor: '#FF6D60',
              style: 'listItemLabel',
            },
            {
              text: `${depressedCount}`,
              style: 'listItemValue',
            },
          ],
        ],
      },
    },
  ];

    const styles = {
      header: {
        fontSize: 22,
        bold: true,
      },
      italicHeader: {
        italics: true,
        alignment: 'center',
      },
      data: {
        fontSize: 16,
        alignment: 'center',
      },
      dataList: {
        fontSize: 16,
        alignment: 'center',
      },
      listItemLabel: {
        fontSize: 16,
        bold: true,
        alignment: 'right',
        margin: [0, 5, 5, 5], // Top, Right, Bottom, Left
      },
      listItemValue: {
        fontSize: 16,
        alignment: 'left',
        margin: [0, 5, 0, 5], // Top, Right, Bottom, Left
      },
      normal: {
        fillColor: '#98D8AA',
      },
      stressed: {
        fillColor: '#F3E99F',
      },
      anxious: {
        fillColor: '#F7D060',
      },
      depressed: {
        fillColor: '#FF6D60',
      },
    };

    const docDefinition = {
      content,
      styles,
    };

    const pdfName = `PieChart_Report.pdf`;
    // Create and download the PDF
    pdfMake.createPdf(docDefinition).download(pdfName);
  }).catch(error => {
    console.error('Error capturing PieChart:', error);
  });
};


  return (
    <ResponsiveContainer width="100%" aspect={3}>
      <div style={{ display: 'flex',justifyContent:'space-between',alignContent:'space-between',width:"100%"}}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ textAlign: 'left' }}>
      <button onClick={createPdf} style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
          Download Bar Chart
        </button>
      </div>
        <p style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Average of Depression, Anxiety, Stress</p>
        <BarChart
  ref={barChartRef} 
  className="barChart" // Add this line to assign a class name
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
        <button onClick={createPieChartPdf} style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
  Download Pie Chart
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


    <PieChart ref={pieChartRef} width={600} height={500}>
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
