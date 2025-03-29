import React, { useState, useEffect } from 'react';
import useFetchData from "../../hooks/useFetchData"; // Import axios for making the HTTP request
import './dashboard.css';
import URL_CONSTANTS from "../../constants/urlConstants";

const Dashboard = () => {
  const {data: userDetails,error,isLoading} = useFetchData(`${URL_CONSTANTS.GET_USER_DETAILS}`,[]).data;
  const [username, setUsername] = useState('');  // State to store username
  const [loading, setLoading] = useState(true);   // State to track loading status
  const [dashError, setDashError] = useState(null);       // State to track error, if any
  console.log(userDetails);
  // Fetch the username when the component mounts
  useEffect(() => {
    const fetchUsername =  () => {
      try {
        // Replace the URL with your actual API endpoint
         // Example URL
        console.log(`isLoading in dashboard is ${isLoading}`);
        if(isLoading && loading){
          setLoading(true);
        }
        else{
          if(userDetails)
            setUsername(userDetails.name);  // Set the username from the response
          setLoading(false);
        } 
        //setLoading(false);                // Set loading to false once data is fetched
      } catch (err) {
        console.log(err);
        setDashError('Failed to fetch username');  // Handle error
        
        setLoading(false);
      }
    };

    fetchUsername();
  }); // Empty array means this effect runs only once when the component mounts

  // Render loading state, error message, or the actual component
  if (loading) {
    return <div>Loading...</div>;
  }

  if (dashError) {
    return <div>{dashError}</div>;
  }

  return (
    <div className="dashboard">
      <div className="greeting-container">
        <h1 className="greeting">Hi, {username}!</h1>
        <p className="message">Welcome to your dashboard. Here's where you can manage your account and preferences.</p>
      </div>
    </div>
  );
};

export default Dashboard;
