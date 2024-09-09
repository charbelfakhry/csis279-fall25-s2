

const Message = () => {
    
    const showMessage = (n1, n2) => {
        let total = n1 + n2;
        return `Your sum is ${total}`;
    }

    return(
        <>
            <h1 className="text-success">{showMessage(3, 5)}</h1>
        </>
    )
}

export default Message;