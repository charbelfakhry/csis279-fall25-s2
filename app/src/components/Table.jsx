


const Table = () => {

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
                    <tr>
                        <th style={{ color: "red", font: 'menu' }}>USER ID</th>
                        <th>USER NAME</th>
                    </tr>
                </thead>
                <tbody className="table-body">
                    {
                        fillDummyData().map((dummy, index) => {
                            return (
                                <>
                                    <tr key={index}>
                                        <td key={dummy.user_id}>
                                            {dummy.user_id}
                                        </td>
                                        <td key={dummy.user_name}>
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

export default Table;