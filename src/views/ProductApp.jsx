import React, { useState, useEffect } from "react";

const ProductApp = () => {
  const [jumlahRow, setJumlahRow] = useState(1);
  const [productName, setProductName] = useState([])
  const [productPrice, setProductPrice] = useState([])
  const [qty, setQty] = useState(Array(jumlahRow).fill(1));
  const [total, setTotal] = useState([])
  const [grandTotal, setGrandTotal] = useState(0);

  const tambahRow = () => {
    setJumlahRow((prevJumlahRow) => prevJumlahRow + 1);
    setQty((prevQty) => [...prevQty, 1]);
  };


  const hapusRow = (index) => {
    const newProductName = [...productName];
    newProductName.splice(index, 1);
    setProductName(newProductName);

    const newProductPrice = [...productPrice];
    newProductPrice.splice(index, 1);
    setProductPrice(newProductPrice);

    const newQty = [...qty];
    newQty.splice(index, 1);
    setQty(newQty);

    const newTotal = [...total]
    newTotal.splice(index, 1);
    setTotal(newTotal);

    setJumlahRow((prevJumlahRow) => prevJumlahRow - 1);
  };

  const handleInputProductName = (event, index) => {
    const {value} = event.target;
    const newProductName = [...productName];
    newProductName[index] = value;
    setProductName(newProductName);
  }

  const handleInputProductPrice = (event, index) => {
    const {value} = event.target;
    const newProductPrice = [...productPrice];
    newProductPrice[index] = value;
    setProductPrice(newProductPrice);

    const price = parseFloat(value);
    const qtyValue = parseFloat(qty[index]);
    const newTotal = [...total];
    newTotal[index] = isNaN(price) || isNaN(qtyValue) ? '' : (price * qtyValue);
    setTotal(newTotal);
  }

  const handleInputQty = (event, index) => {
    const {value} = event.target;
    if (value < 1) {
        alert("Qty harus lebih dari atau sama dengan 1.");
        return;
      }
    const newQty = [...qty];
    newQty[index] = value;
    setQty(newQty);

    const priceValue = parseFloat(productPrice[index]);
  const qtyValue = parseFloat(value);
  const newTotal = [...total];
  newTotal[index] = isNaN(priceValue) || isNaN(qtyValue) ? '' : (priceValue * qtyValue);
  setTotal(newTotal);
  }

  const handleInputTotal = (event, index) => {
    const {value} = event.target;
    const newTotal = [...total];
    newTotal[index] = value;
    setTotal(newTotal);
  }

  useEffect(() => {
    // Menghitung Grand Total saat ada perubahan pada total atau jumlahRow
    const calculatedGrandTotal = total.reduce((acc, currentValue) => {
      const value = parseFloat(currentValue);
      return isNaN(value) ? acc : acc + value;
    }, 0);
    setGrandTotal(calculatedGrandTotal);
  }, [total, jumlahRow]);

  return (
    <div className="container mx-auto bg-gray-100 rounded-xl shadow border p-8 m-10">
      <h1 className="text-3xl text-center text-gray-700 font-bold mb-5">
        Products App
      </h1>
      <button
        onClick={tambahRow}
        className="bg-green-500 mb-10 p-3 text-white font-semibold rounded-lg"
      >
        New Product
      </button>
      {[...Array(jumlahRow)].map((_, index) => (
        <div key={index}>
          <div className="grid grid-cols-4 mb-5 gap-4">
            <div className="flex flex-col gap-3">
              <label className="text-gray-700 font-semibold">
                Product Name:
              </label>
              <input
                type="text"
                className="p-2 rounded ring-1 ring-gray-800 focus:outline-0"
                value={productName[index] || ''}
                onChange={(event) => handleInputProductName(event, index)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-gray-700 font-semibold">
                Product Price:
              </label>
              <input
                type="text"
                className="p-2 rounded ring-1 ring-gray-800 focus:outline-0"
                value={productPrice[index] || ''}
                onChange={(event) => handleInputProductPrice(event, index)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-gray-700 font-semibold">Qty:</label>
              <input
                type="number"
                className="p-2 rounded ring-1 ring-gray-800 focus:outline-0"
                value={qty[index]}
                onChange={(event) => handleInputQty(event, index)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-gray-700 font-semibold">Total:</label>
              <div className="flex gap-5">
              <input
                type="text"
                className="p-2 rounded ring-1 ring-gray-800 focus:outline-0"
                value={total[index] || ''}
                onChange={(event) => handleInputTotal(event, index)}
                readOnly
              />
               {index > 0 && (
            <button
              onClick={() => hapusRow(index)}
              className="bg-red-500 text-white font-semibold w-24 p-2 rounded-md"
            >
              Delete
            </button>
          )}
               </div>
            </div>
           
          </div>
        </div>
      ))}
      <div className="flex flex-col gap-3">
              <label className="text-gray-700 font-semibold">
                Grand Total:
              </label>
              <input
                type="text"
                className="p-2 rounded ring-1 bg-gray-500 text-white ring-gray-800 focus:outline-0"
                value={isNaN(grandTotal) ? "" : grandTotal}
          readOnly
              />
            </div>
    </div>
  );
};

export default ProductApp;
