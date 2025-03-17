const Item = ({ item, onDelete }) => {
    return (
        <div style={{ border: "1px solid black", padding: "10px", margin: "5px" }}>
            <h3>{item.name}</h3>
            <p>Status: {item.status}</p>
            <button onClick={() => onDelete(item.id)}>Delete</button>
        </div>
    );
};

export default Item;
