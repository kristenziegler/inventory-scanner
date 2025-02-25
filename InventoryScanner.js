import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function InventoryScanner() {
  const [barcode, setBarcode] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    if (!barcode) return;
    setLoading(true);
    try {
      const response = await fetch(`https://api.upcitemdb.com/prod/trial/lookup?upc=${barcode}`);
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        setProduct(data.items[0]);
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      setProduct(null);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Inventory Scanner</h1>
      <Input
        type="text"
        placeholder="Scan or enter barcode"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
      />
      <Button className="mt-2" onClick={fetchProduct} disabled={loading}>
        {loading ? "Searching..." : "Lookup Product"}
      </Button>
      {product && (
        <Card className="mt-4">
          <CardContent>
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <img src={product.images?.[0] || "https://via.placeholder.com/150"} alt={product.title} className="w-full h-auto mt-2" />
            <p className="mt-2 text-sm">{product.description || "No description available."}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
