import React from 'react';
import Banner from '../banner/Banner';
import HomeLatestJob from '../homeLatestJob/HomeLatestJob';
import TopCategories from '../topCategories/TopCategories';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HomeLatestJob></HomeLatestJob>
            <TopCategories></TopCategories>
        </div>
    );
};

export default Home;