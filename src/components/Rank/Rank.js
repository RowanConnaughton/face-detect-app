import React from 'react';



const Rank = ({ name, entries }) => {


    return (
        <div className="center" >
            <h4 className="white-text">
                {`${name} your current entry count is ...`}
            </h4>
            <h4 className=" white-text">
                #{entries}
            </h4>
        </div>

    );


}

export default Rank;