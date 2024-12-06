"use client";

import React from "react";

const hotelList = [
  [
    "Hotels in Leh",
    "Hotels in Ladakh",
    "Hotels in Shimla",
    "Hotels in Manali",
    "Hotels in Jaipur",
    "Hotels in Darjeeling",
    "Hotels in Jodhpur",
    "Hotels in Jaisalmer",
    "Hotels in Mount Abu",
    "Hotels in Bikaner",
    "Hotels in Rameswaram",
    "Hotels in Ooty",
    "Hotels in Kodaikanal",
  ],
  [
    "Hotels in Udaipur",
    "Hotels in Goa",
    "Hotels in Chandigarh",
    "Hotels in Amritsar",
    "Hotels in Ludhiana",
    "Hotels in Delhi",
    "Hotels in Gurgaon",
    "Hotels in Noida",
    "Hotels in Faridabad",
    "Hotels in Ghaziabad",
    "Hotels in Bangalore",
    "Hotels in Chennai",
    "Hotels in Karnataka",
  ],
  [
    "Hotels in Jalandhar",
    "Hotels in Patiala",
    "Hotels in Zirakpur",
    "Hotels in Mussoorie",
    "Hotels in Mcleodganj",
    "Hotels in Bhopal",
    "Hotels in Khajuraho",
    "Hotels in Gwalior",
    "Hotels in Ujjain",
    "Hotels in Indore",
    "Hotels in Hyderabad",
    "Hotels in Kolkata",
    "Hotels in Mathura",
  ],
  [
    "Hotels in Dharamshala",
    "Hotels in Kasol",
    "Hotels in Rishikesh",
    "Hotels in Haridwar",
    "Hotels in Auli",
    "Hotels in Jabalpur",
    "Hotels in Kanpur",
    "Hotels in Amarkantak",
    "Hotels in Rewa",
    "Hotels in Katni",
    "Hotels in Hyderabad",
    "Hotels in Varanasi",
    "Hotels in Vrindavan",
  ],
  [
    "Hotels in Dehradun",
    "Hotels in Ranikhet",
    "Hotels in Kedarnath",
    "Hotels in Mukteshwar",
    "Hotels in Dhanulti",
    "Hotels in Maihar",
    "Hotels in Satna",
    "Hotels in Nagpur",
    "Hotels in Pune",
    "Hotels in Munnar",
    "Hotels in Lucknow",
    "Hotels in Prayagraj",
    "Hotels in Chitrakoot",
  ],
  [
    "Hotels in Himtal",
    "Hotels in Lansdowne",
    "Hotels in Kathgodam",
    "Hotels in Nainital",
    "Hotels in Jimcorbet",
    "Hotels in Allepay",
    "Hotels in Thekkady",
    "Hotels in Kovalam",
    "Hotels in Kanyakumari",
    "Hotels in Coachi",
    "Hotels in Konark",
    "Hotels in Puri",
    "Hotels in Bhubneshwar",
  ],
];

const HotelFooter: React.FC = () => {
  const renderHotelList = () => {
    return hotelList.map((column, columnIndex) => (
      <div key={columnIndex} className="space-y-2">
        {column.map((hotel, hotelIndex) => (
          <p
            key={hotelIndex}
            className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
          >
            {hotel}
          </p>
        ))}
      </div>
    ));
  };

  return (
    <div className="">
      <h2 className="font-semibold text-neutral-700 dark:text-neutral-200  text-center mb-8 text-lg">
        Idbook Hotels
      </h2>
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {renderHotelList()}
      </div>
    </div>
  );
};

export default HotelFooter;
