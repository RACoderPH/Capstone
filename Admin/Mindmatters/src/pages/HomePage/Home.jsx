import React, { useEffect, useState, useRef } from "react";
import './home.scss';
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Widget from "../../components/Widget/Widget";
import Chart from "../../components/Chart/Chart";
import User from "../UserPage/User";
import axios from "axios";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {
  PieChart,
  Pie,
  Tooltip,
} from "recharts";
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';


pdfMake.vfs = {
  // ... (other fonts)
  'Roboto-Medium.ttf': 'fonts/Roboto-Medium.ttf', // Specify the correct path
};


pdfMake.vfs = pdfFonts.pdfMake.vfs;



function Home() {
  const [userList, setUserList] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [Stress, setStress] = useState(null);
  const [Anxiety, setAnxiety] = useState(null);
  const [Depression, setDepression] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [stressData, setStressData] = useState(0);
  const [anxietyData, setAnxietyData] = useState(0);
  const [depressionData, setDepressionData] = useState(0);

  const [data, setData] = useState([
    { name: "Stress", value: Stress },
    { name: "Anxiety", value: Anxiety },
    { name: "Depression", value: Depression },
  ]);

  const handleViewClick = (userId) => {
    setSelectedUserId(userId);
    handleOpen();
  };

  useEffect(() => {
    fetch('https://mindmatters-ejmd.onrender.com/api/getuser')
      .then((response) => response.json())
      .then((data) => setUserList(data))
      .catch((error) => console.error('Failed to fetch data:', error));
  }, []);

  useEffect(() => {
    if (selectedUserId !== null) {
      axios
        .get(`https://mindmatters-ejmd.onrender.com/student_result/${selectedUserId}`)
        .then((response) => {
          const resultDataArray = response.data;
          console.log('Assessment Result Data (Raw):', resultDataArray);

          if (resultDataArray.length > 0) {
            const { stress, anxiety, depression } = resultDataArray[0];

            const dataForPieChart = [
              { name: "Stress", value: stress },
              { name: "Anxiety", value: anxiety },
              { name: "Depression", value: depression },
            ];

            setStressData(stress);
            setAnxietyData(anxiety);
            setDepressionData(depression);
            setData(dataForPieChart);
          }
        })
        .catch((error) => {
          console.error('Failed to fetch assessment result data:', error);
        });
    }
  }, [selectedUserId]);

  const componentRef = useRef();
  const printData = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Mind Matters User List",
    onAfterPrint: () => console.log('print success')
  });

  const chartRef = useRef();
  const [chartImage, setChartImage] = useState(null);
  const [isPieChartLoaded, setIsPieChartLoaded] = useState(false);
  const [isChartLoaded, setIsChartLoaded] = useState(false);

  const handleChartLoad = () => {
    setIsPieChartLoaded(true);
  };
  
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

  const [logoImage, setLogoImage] = useState(null);

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

const createPdf = () => {
  // Capture the PieChart as an image
  html2canvas(document.querySelector('.PieChart')).then((canvas) => {
    const chartImage = canvas.toDataURL('image/jpeg');
    
    if (selectedUserId !== null) {
      const selectedUser = userList.find((user) => user.id === selectedUserId);

      if (selectedUser) {
        const { Fullname, stud_no } = selectedUser;

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
            text: ' ', // Add a blank line for margin
          },
          {
            text: 'Mental Health Assessment Report',
            style: 'header',
            alignment: 'center',
          },
          {
            text: 'Mental Health Assessment Report',
            style: 'italicHeader',
            alignment: 'center',
          },
          {
            image: chartImage,
            width: 400,
            alignment: 'center',
          },
          {
            text: ' ', // Add a blank line for margin
          },
          {
            ul: [
              `Fullname: ${Fullname}`,
              `Student ID: ${stud_no}`,
              {
                text: `Stress: ${stressData} : ${getSeverity(stressData, 'stress')}`,
                style: { background: getBackgroundColor(stressData, 'stress') },
              },
              {
                text: `Anxiety: ${anxietyData} : ${getSeverity(anxietyData, 'anxiety')}`,
                style: { background: getBackgroundColor(anxietyData, 'anxiety') },
              },
              {
                text: `Depression: ${depressionData} : ${getSeverity(depressionData, 'depression')}`,
                style: { background: getBackgroundColor(depressionData, 'depression') },
              },
            ],
            style: 'dataList',
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
        };

        const docDefinition = {
          content,
          styles,
        };

        // Create and download the PDF
        pdfMake.createPdf(docDefinition).download('Mind_Matters_Report.pdf');
      }
    }
  });
};

  
  // Helper function to get the severity
  function getSeverity(value, type) {
    if (type === 'stress') {
      if (value >= 34) return "Extreme Severe";
      if (value >= 26) return "Severe";
      if (value >= 19) return "Moderate";
      if (value >= 15) return "Mild";
      if (value >= 0) return "Normal";
      return '';
    } else if (type === 'anxiety') {
      if (value >= 20) return "Extreme Severe";
      if (value >= 15) return "Severe";
      if (value >= 10) return "Moderate";
      if (value >= 8) return "Mild";
      if (value >= 0) return "Normal";
      return '';
    } else if (type === 'depression') {
      if (value >= 28) return "Extreme Severe";
      if (value >= 21) return "Severe";
      if (value >= 14) return "Moderate";
      if (value >= 10) return "Mild";
      if (value >= 0) return "Normal";
      return '';
    }
  }
  
  // Helper function to get the severity background color
function getBackgroundColor(value, type) {
  if (type === 'stress') {
    if (value >= 34) return '#F7A4A4';
    if (value >= 26) return '#F57328';
    if (value >= 19) return '#FFE9A0';
    if (value >= 15) return '#EFF669';
    if (value >= 0) return '#B6E2A1';
    return 'white';
  } else if (type === 'anxiety') {
    if (value >= 20) return '#F7A4A4';
    if (value >= 15) return '#F57328';
    if (value >= 10) return '#FFE9A0';
    if (value >= 8) return '#EFF669';
    if (value >= 0) return '#B6E2A1';
    return 'white';
  } else if (type === 'depression') {
    if (value >= 28) return '#F7A4A4';
    if (value >= 21) return '#F57328';
    if (value >= 14) return '#FFE9A0';
    if (value >= 10) return '#EFF669';
    if (value >= 0) return '#B6E2A1';
    return 'white';
  }
}
  
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="widgets">
          <Widget type="User" />
          <Widget type="Take" />
          <Widget type="Not" />
        </div>

        <div className="charts">
          <Chart />
        </div>

        <div className="listContainer">
          <table style={{ flex: 1 }}>
            <thead>
              <tr>
                <th>Fullname</th>
                <th>UserName</th>
                <th>Email</th>
                <th>Student ID</th>
                <th>Status</th>
                <th>Position</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user) => (
                <tr key={user.id}>
                  <td>{user.Fullname}</td>
                  <td>{user.user_name}</td>
                  <td>{user.Email}</td>
                  <td>{user.stud_no}</td>
                  <td>{user.status}</td>
                  <td>{user.position}</td>
                  <td className="btns">
                    <Button variant="outlined" onClick={() => handleViewClick(user.id)}>View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="box">
          <div ref={componentRef}>
            <span className="userUpdateTitle">Mental Health Assessment Results</span>
            <span className="txt">The information can be edited</span>
            <div className="chart" >
              <PieChart ref={chartRef} className="PieChart" width={400} height={320}>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={data}
                  cx={200}
                  cy={200}
                  outerRadius={80}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
              </PieChart>
            </div>
            <div className="result-placeholder">
              <h2>Results</h2>
              <ul>
                <li>Stress: {stressData} :
                  <span style={{
                    fontSize: 22,
                    borderRadius: 10,
                    padding: 4,
                    color: 'black',
                    backgroundColor: stressData >= 34 ? "#F7A4A4" :
                      stressData >= 26 ? "#F57328" :
                        stressData >= 19 ? "#FFE9A0" :
                          stressData >= 15 ? "#EFF669" :
                            stressData >= 0 ? "#B6E2A1" :
                              "white"
                  }}>
                    {stressData >= 34 ? "Extreme Severe" :
                      stressData >= 26 ? "Severe" :
                        stressData >= 19 ? "Moderate" :
                          stressData >= 15 ? "Mild" :
                            stressData >= 0 ? "Normal" :
                              ''}
                  </span>
                </li>
                <li>Anxiety: {anxietyData} :
                  <span style={{
                    fontSize: 22,
                    borderRadius: 10,
                    padding: 4,
                    color: 'black',
                    backgroundColor: anxietyData >= 20 ? "#F7A4A4" :
                      anxietyData >= 15 ? "#F57328" :
                        anxietyData >= 10 ? "#FFE9A0" :
                          anxietyData >= 8 ? "#EFF669" :
                            anxietyData >= 0 ? "#B6E2A1" :
                              "white"
                  }}>
                    {anxietyData >= 20 ? "Extreme Severe" :
                      anxietyData >= 15 ? "Severe" :
                        anxietyData >= 10 ? "Moderate" :
                          anxietyData >= 8 ? "Mild" :
                            anxietyData >= 0 ? "Normal" :
                              ''}
                  </span>
                </li>
                <li>Depression: {depressionData} :
                  <span style={{
                    fontSize: 22,
                    borderRadius: 10,
                    padding: 4,
                    color: 'black',
                    backgroundColor: depressionData >= 28 ? "#F7A4A4" :
                      depressionData >= 21 ? "#F57328" :
                        depressionData >= 14 ? "#FFE9A0" :
                          depressionData >= 10 ? "#EFF669" :
                            depressionData >= 0 ? "#B6E2A1" :
                              "white"
                  }}>
                    {depressionData >= 28 ? "Extreme Severe" :
                      depressionData >= 21 ? "Severe" :
                        depressionData >= 14 ? "Moderate" :
                          depressionData >= 10 ? "Mild" :
                            depressionData >= 0 ? "Normal" :
                              ''}
                  </span>
                </li>
              </ul>
              <div>
                <h4>Status: </h4>
              </div>
            </div>
          </div>
          <br />
          <button onClick={printData}>Generate Report</button>
          <button onClick={createPdf}>Download PDF</button>
        </Box>
      </Modal>
    </div>
  );
}

export default Home;
