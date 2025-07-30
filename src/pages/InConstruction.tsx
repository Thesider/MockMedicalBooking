import React from 'react';
import { useNavigate } from 'react-router-dom';

const InConstruction: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div style={{ minHeight: '60vh' }} className="flex flex-col items-center justify-center text-center py-16">
            <h1 className="text-3xl font-bold mb-4">🚧 Page Under Construction</h1>
            <p className="text-lg text-gray-600 mb-6">This page is currently being built. Please check back soon!</p>
            <span className="text-5xl mb-8">🔧</span>
            <button
                onClick={() => navigate(-1)}
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
            >
                ← Return to previous page
            </button>
        </div>
    );
};

export default InConstruction;
