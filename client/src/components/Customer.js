import React from 'react';

// npm install @material-ui/core 안됨.
// npm install @mui/material @emotion/react @emotion/styled
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

class Customer extends React.Component {
    render() {
        return (
            // <div>
            //     <CustomerProfile image={this.props.image} name={this.props.name} id={this.props.id} />
            //     <CustomerInfo birthday={this.props.birthday} gender={this.props.gender} job={this.props.job} />
            // </div>
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell ><img src={this.props.image} alt="profile" width="64"/></TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.birthday}</TableCell>
                <TableCell>{this.props.gender}</TableCell>
                <TableCell>{this.props.job}</TableCell>
            </TableRow>
        )
    }
}

// class CustomerProfile extends React.Component {
//     render() {
//         return (
//             <div>
//                 <img src={this.props.image} alt="profile" />
//                 <h2>{this.props.name} ( {this.props.id} )</h2>
//             </div>
//         );
//     }
// }
// class CustomerInfo extends React.Component {
//     render() {
//         return (
//             <div>
//                 <h2>{this.props.birthday}</h2>
//                 <h2>{this.props.gender}</h2>
//                 <h2>{this.props.job}</h2>
//             </div>
//         );
//     }

// }
export default Customer;