import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdClose } from 'react-icons/md'; 


const List = ({Token}) => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchList = async () => {
    setLoading(true);
    setError(null);
      const apiUrl = import.meta.env.VITE_BACKEND_URL;
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please login first");
            return;
        }
        
        const response = await axios.get(
            `${apiUrl}/api/products/list-products`,
            {
                headers: {
                    token: token
                }
            }
        );
        
        if (response.data.success) {
            setList(response.data.products);
        }
    } catch (err) {
        setError("An error occurred while fetching data.");
        console.error(err);
    } finally {
        setLoading(false);
    }
};
    const removeProduct = async (productId) => {
        try {
            const response = await axios.post("http://localhost:5000/api/products/remove-product", {
                id: productId
            }, {
                headers: { token: Token }
            });
            if (response.data.success) {
                alert("Product removed successfully.");
                await fetchList(); 
            } else {
                alert("Error removing product.");
            }
        } catch (err) {
            alert("An error occurred.");
            console.error(err);
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    if (loading) {
        return <div className="p-8 text-center">Loading products...</div>;
    }

    if (error) {
        return <div className="p-8 text-center text-red-500">{error}</div>;
    }

    return (
        <div className="p-4 sm:p-6 md:p-8">
            <h1 className="text-2xl font-semibold mb-4">All Products</h1>
            <div className="flex flex-col gap-4">
                <div className="hidden md:grid md:grid-cols-[0.5fr_2fr_1fr_1fr_1fr_0.5fr] items-center gap-4 py-3 px-4 bg-gray-100 rounded-md text-sm font-medium text-gray-600">
                    <p>Image</p>
                    <p>Name</p>
                    <p>Price</p>
                    <p>Category</p>
                    <p>Quantity</p>
                    <p className="text-center">Action</p>
                </div>

                {/* Product List */}
                {list.map((item) => (
                    <div
                        key={item._id}
                        className="p-4 border rounded-lg shadow-sm md:grid md:grid-cols-[0.5fr_2fr_1fr_1fr_1fr_0.5fr] md:p-0 md:border-0 md:shadow-none md:border-b md:rounded-none items-center gap-4"
                    >
                       
                        <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-md mb-4 md:w-full md:h-auto md:mb-0 md:p-2"
                        />

                       
                        <p className="font-semibold text-gray-800">
                           <b className="md:hidden">Name: </b> {item.name}
                        </p>
                        <p><b className="md:hidden">Price:</b> ${item.price}</p>
                        
                        <p><b className="md:hidden">Category:</b> {item.category}</p>
                        
                       
                        <p><b className="md:hidden">Quantity:</b> {item.quantity}</p>

                      
                        <div className="flex justify-end mt-4 md:justify-center md:mt-0">
                             <MdClose
                                onClick={() => removeProduct(item._id)}
                                className="cursor-pointer text-red-500 text-2xl hover:text-red-700 transition-colors"
                             />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default List;