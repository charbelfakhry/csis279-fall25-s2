

const ListGroup = () => {

    const fillDummyData = () => {
        let dummyData = [];
        for (let i = 1; i < 11; i++) {
            dummyData.push({
                user_id: `id${i}`,
                user_name: `name${i}`,
            })
        }
        return dummyData;
    }


    return (
        <>
            <table className="table table-dark">
                <thead>
                    <th>USER ID</th>
                    <th>USER NAME</th>
                </thead>
                <tbody>
                    {
                        fillDummyData().map((dummy, index) => {
                            return (
                                <>
                                    <tr key={index}>
                                        <td>
                                            {dummy.user_id}
                                        </td>
                                        <td>
                                            {dummy.user_name}
                                        </td>
                                    </tr>
                                </>
                            );
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default ListGroup;