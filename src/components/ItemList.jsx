import { useState, useEffect } from "react";
import Item from "./Item";

const API_URI = "http://localhost:8000/doors";


const ItemList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(API_URI)
            .then(res => res.json())
            .then(data => setItems(data))
            .catch(err => console.error(err));
    }, []);

    const handleDelete = (id) => {
        fetch(`${API_URI}/${id}`, { method: "DELETE" })
            .then(() => setItems(items.filter(item => item.id !== id)))
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h2>Doors List</h2>
            {items.map((item) => (
                <Item key={item.id} item={item} onDelete={handleDelete} />
            ))}
        </div>
    );
};

export default ItemList;
