// // Invoice.js
// import React from 'react';
// import { useLocation } from 'react-router-dom';

// const Invoice = () => {
//   const location = useLocation();
//   const { orderDetails } = location.state || {}; // Safely retrieve orderDetails

//   if (!orderDetails) {
//     return <div>No order details available</div>;
//   }

//   return (
//     <div>
//       <h1>Invoice #{orderDetails.orderId}</h1>
//       <p>Date: {orderDetails.date}</p>
//       <ul>
//         {orderDetails.items.map((item, index) => (
//           <li key={index}>
//             {item.name} (x{item.quantity}) - ${item.price}
//           </li>
//         ))}
//       </ul>
//       <h3>Total: ${orderDetails.total}</h3>
//     </div>
//   );
// };

// export default Invoice;

// Array=[{
//     name: "John",
//     age: 30
// },
// {
//     name: "Mary",
//     age: 25
// },{
//     name: "Peter",
//     age: 35         
// },
// {name: "Jane",
//     age: 28
// }]
// const newArray=Array.map((item)=>(
//     {
//         ...item,
//         age:item.age+1
//     }
// ))
// console.log(newArray);

//  const newArray1=arrayOfArrays.flat().map((item)=>
//     (
//         {...item,age:item.age+5}
//     ))
//  const pairs = [
//     [1, 'a'],
//     [2, 'b'],
//     [3, 'c']
//   ];
