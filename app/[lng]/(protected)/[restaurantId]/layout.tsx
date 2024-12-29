import React from 'react';

interface RestaurantLayoutProps {
    children: React.ReactNode;
}

const RestaurantLayout = ({children}: RestaurantLayoutProps) => {
    return (
        <main className="container relative h-screen">
            {children}
        </main>
    );
};

export default RestaurantLayout;