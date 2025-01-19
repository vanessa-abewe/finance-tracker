import { useState, useEffect } from "react";

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await fetch("/api/categories");
    const data = await response.json();
    setCategories(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return alert("Category name is required");

    await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setName("");
    fetchCategories();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add Category</button>
      </form>

      <h3>Categories:</h3>
      {/* <ul>
        {categories.map((category) => (
           <li key={category.id}>{category.name}</li>
        ))}
      </ul> */}
    </div>
  );
}
