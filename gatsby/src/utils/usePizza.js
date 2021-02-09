import { useState } from 'react';

export default function usePizza({ pizzas, input }) {
  // 1. Create some state to hold our state
  const [order, setOrder] = useState([]);
  // 2. Make a function add thing to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // 3. Make a function remove things from order
  function removeFromOrder(index) {
    setOrder([
      // everything before the item we want to remove
      ...order.slice(0, index),
      // everything after the item we want to remove
      ...order.slice(index + 1),
    ]);
  }
  // 4. Send this data to a serverless function when they check out
  // TODO
  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
