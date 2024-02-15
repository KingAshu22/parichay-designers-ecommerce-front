import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "./Table";

const StyledOrder = styled.div`
  margin: 10px 0;
  margin-bottom: 30px;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  display: block;
  gap: 20px;
  align-items: center;
  time {
    font-size: 1rem;
    color: #555;
  }
`;
const ProductRow = styled.div`
  span {
    color: #aaa;
  }
`;
const Address = styled.div`
  font-size: 0.8rem;
  line-height: 1rem;
  margin-top: 5px;
  color: #888;
`;

const OrderTable = styled.table`
  thead {
    background-color: #eee;
  }
`;

const OrderTableRow = styled.tr`
  padding-bottom: 50px;
`;

const TotalDiv = styled.div`
  margin-top: 10px;
  margin-left: 50%;
  color: rebeccapurple;
  font-weight: bold;
`;

export default function SingleOrder({ line_items, createdAt, ...rest }) {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let sum = 0;
    line_items.forEach((item) => {
      sum += item.price_data.unit_amount / 100;
    });
    setTotalAmount(sum);
  }, [line_items]);
  return (
    <StyledOrder>
      <h3>Invoice ID: {rest._id}</h3>
      <div>
        <time>{new Date(createdAt).toLocaleString("en-IN")}</time>
        <Address>
          {rest.name}
          <br />
          {rest.email}
          <br />
          {rest.streetAddress}
          <br />
          {rest.postalCode} {rest.city}, {rest.country}
        </Address>
      </div>
      <div>
        {/* {line_items.map((item, index) => (
          <ProductRow key={index}>
            <span>{item.quantity} x </span>
            {item.price_data.product_data.name}
          </ProductRow>
        ))} */}
      </div>
      <OrderTable>
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {line_items.map((item, index) => (
            <OrderTableRow key={index}>
              <td>{item.price_data.product_data.name}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price_data.unit_amount / 100 / item.quantity}/-</td>
              <td>₹{item.price_data.unit_amount / 100}/-</td>
            </OrderTableRow>
          ))}
        </tbody>
      </OrderTable>
      <TotalDiv>Total Amount: ₹{totalAmount.toFixed(2)}/-</TotalDiv>
    </StyledOrder>
  );
}
