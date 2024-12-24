import React, { useEffect, useState } from 'react'
import ApiService from '../../services/ApiService'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

const RoomSearch = ({handleSearchResult}) => {

    const [startDate , setStartDate] = useState(null)
    const [endDate , setEndDate] = useState(null)
    const [roomType , setRoomType] = useState('')
    const [roomTypes , setRoomTypes] = useState([])
    const [error , setError] = useState('')

    useEffect(() => {
        const fetchRoomTypes = async () => {
            const token = localStorage.getItem("token");
            console.log("Token: ", token);  // Log the token
    
            if (!token) {
                console.log("No token found, authentication required.");
                return;
            }
    
            try {
                const fetchedRoomTypes = await ApiService.getRoomTypes();
                console.log(fetchedRoomTypes); 
                setRoomTypes(fetchedRoomTypes);
            } catch (error) {
                console.log("Error while fetching the room types", error.message);
            }
        };
    
        fetchRoomTypes();
    }, []);
    

    const showError = (message,timeOut = 5000) => {
        setError(message);
        setTimeout(() => {
        setError('');
        },timeOut);
    };

    const handleInternalSearch = async () => {
        if(!startDate || !endDate || !roomType){
            showError("Please select all the feilds")
            return false
        }
    

        try{

            const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : null
            const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : null

            const response = await ApiService.getAvailableRoomsByDateAndType(formattedStartDate,formattedEndDate,roomType)

            if(response.statusCode === 200){
                if(response.roomList.length === 0){
                    showError("Room ot available for this date range on the selected room type ")
                }
                return
            }

            handleSearchResult(response.roomList);
            setError('')
            
        }catch(error){
            showError("Unknown error occured"+ error.response.data.message)
        }
    }

  return (
    <section>
        <div className='search-container'>
            <div className="search-field">
                <label>Check-in Date</label>
                <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select Check-in Date"
                 />
            </div>
            <div className="search-field">
                <label>Check-out Date</label>
                <DatePicker
                selected={endDate}
                onChange={(date) => {setEndDate(date)}}
                dateFormat="dd/MM/yyyy"
                placeholderText='Select Check-out Date'
                />
            </div>
            <div className="search-field">
                <label>Room Types</label>
                <select value={roomType} onChange={(e) => {setRoomType(e.target.value)}}>
                    <option disabled value="">
                        Select Room Type
                    </option>
                    {roomTypes.map((roomType) => (
                        <option key={roomType} value={roomType}>
                            {roomType}
                        </option>
                    ))}
                </select>
            </div>
            <button className='home-search-button' onClick={handleInternalSearch}>
                Search
            </button>
        </div>
        {error && <p className='error-message'>{error}</p>}
    </section>
  )
}

export default RoomSearch
