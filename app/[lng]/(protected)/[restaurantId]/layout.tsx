import React from 'react';

interface RestaurantLayoutProps {
    children: React.ReactNode;
}

const RestaurantLayout = ({children}: RestaurantLayoutProps) => {
    return (
        <main className="container">
            <div className="flex flex-col space-y-4 my-6">
                {children}
            </div>
        </main>
    );
};

export default RestaurantLayout;