import React from 'react';
import Banner from '../banner/Banner';
import HomeLatestJob from '../homeLatestJob/HomeLatestJob';
import TopCategories from '../topCategories/TopCategories';
import About from '../about/About';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HomeLatestJob></HomeLatestJob>
            <TopCategories></TopCategories>
            <About></About>
        </div>
    );
};

export default Home;