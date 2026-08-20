import Header from "@/shared/components/AdminPanel/Header";
import CategoriesList from "@/shared/components/AdminPanel/Productscomponents/CategoriesList";
import ProductFilters from "@/shared/components/AdminPanel/Productscomponents/Productfilter";
import Productheader from "@/shared/components/AdminPanel/Productscomponents/Productheader";
import Sidebar from "@/shared/components/AdminPanel/Sidebar";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

function Product() {
  const loadProducts = () => {
    const savedProducts = sessionStorage.getItem("products");
    if (savedProducts) {
      return JSON.parse(savedProducts);
    }
    return [
      {
        id: 1,
        name: "Teddy Bear - Small",
        category: "Soft Toys",
        price: 350,
        originalPrice: 299,
        stock: 2,
        lowStock: true,
        status: "active",
        createdAt: "2024-01-15",
        description: "Soft and cuddly teddy bear perfect for all ages",
      },
      {
        id: 2,
        name: "Photo Frame - Wooden",
        category: "Home Decor",
        price: 450,
        originalPrice: null,
        stock: 25,
        lowStock: false,
        status: "active",
        createdAt: "2024-02-20",
        description: "Elegant wooden photo frame for memories",
      },
      {
        id: 3,
        name: "Greeting Card - Birthday",
        category: "Cards",
        price: 50,
        originalPrice: null,
        stock: 5,
        lowStock: true,
        status: "inactive",
        createdAt: "2024-03-10",
        description: "Beautiful birthday greeting card",
      },
      {
        id: 4,
        name: "Customized Mug",
        category: "Personalized",
        price: 300,
        originalPrice: 250,
        stock: 18,
        lowStock: false,
        status: "active",
        createdAt: "2024-04-05",
        description: "Personalized ceramic mug with custom design",
      },
    ];
  };
  const loadCategories = () => {
    const savedCategories = sessionStorage.getItem("categories");
    if (savedCategories) {
      return JSON.parse(savedCategories);
    }
    return [
      { id: 1, name: "Soft Toys", description: "Plush and soft toys", productCount: 1 },
      { id: 2, name: "Home Decor", description: "Decorative items for home", productCount: 1},
      { id: 3, name: "Cards", description: "Greeting and occasion cards", productCount: 1 },
      { id: 4, name: "Personalized", description: "Customized gifts", productCount: 1},
    ];
  };
  const [products, setProducts] = useState(loadProducts);
  const [categories, setCategories] = useState(loadCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showProductDetail, setShowProductDetail] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    sessionStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    sessionStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  // Product Validation Schema
  const productValidationSchema = Yup.object({
    name: Yup.string()
      .required("Product name is required")
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be less than 100 characters"),
    category: Yup.string()
      .required("Category is required")
      .min(2, "Category must be at least 2 characters"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive")
      .typeError("Price must be a valid number"),
    originalPrice: Yup.number()
      .nullable()
      .positive("Original price must be positive")
      .typeError("Original price must be a valid number")
      .test(
        "is-greater-than-price",
        "Original price must be greater than selling price",
        function (value) {
          const { price } = this.parent;
          if (value && price) {
            return value > price;
          }
          return true;
        }
      ),
    stock: Yup.number()
      .required("Stock is required")
      .integer("Stock must be a whole number")
      .min(0, "Stock cannot be negative")
      .typeError("Stock must be a valid number"),
    description: Yup.string()
      .max(500, "Description must be less than 500 characters"),
    status: Yup.string()
      .required("Status is required")
      .oneOf(["active", "inactive", "draft"], "Invalid status"),
  });

  // Category Validation Schema
  const categoryValidationSchema = Yup.object({
    name: Yup.string()
      .required("Category name is required")
      .min(2, "Category name must be at least 2 characters")
      .max(50, "Category name must be less than 50 characters"),
    description: Yup.string()
      .max(200, "Description must be less than 200 characters"),
  });

  // Product Formik
  const productFormik = useFormik({
    initialValues: {
      name: "",
      category: "",
      price: "",
      originalPrice: "",
      stock: "",
      description: "",
      status: "active",
    },
    validationSchema: productValidationSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (editingProduct) {
        setProducts(
          products.map((product) =>
            product.id === editingProduct.id
              ? {
                  ...product,
                  name: values.name,
                  category: values.category,
                  price: parseFloat(values.price),
                  originalPrice: values.originalPrice ? parseFloat(values.originalPrice) : null,
                  stock: parseInt(values.stock),
                  lowStock: parseInt(values.stock) < 5,
                  description: values.description,
                  status: values.status,
                }
              : product
          )
        );
        setEditingProduct(null);
      } else {
        const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
        setProducts([
          ...products,
          {
            id: newId,
            name: values.name,
            category: values.category,
            price: parseFloat(values.price),
            originalPrice: values.originalPrice ? parseFloat(values.originalPrice) : null,
            stock: parseInt(values.stock),
            lowStock: parseInt(values.stock) < 5,
            description: values.description,
            status: values.status,
            createdAt: new Date().toISOString().split('T')[0],
          },
        ]);
        // Update category product count
        setCategories(categories.map(cat => 
          cat.name === values.category 
            ? { ...cat, productCount: (cat.productCount || 0) + 1 }
            : cat
        ));
      }
      resetForm();
      setShowAddModal(false);
    },
  });

  // Category Formik
  const categoryFormik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: categoryValidationSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (editingCategory) {
        setCategories(
          categories.map((cat) =>
            cat.id === editingCategory.id
              ? {
                  ...cat,
                  name: values.name,
                  description: values.description,
                }
              : cat
          )
        );
        setEditingCategory(null);
      } else {
        const newId = categories.length > 0 ? Math.max(...categories.map((c) => c.id)) + 1 : 1;
        setCategories([
          ...categories,
          {
            id: newId,
            name: values.name,
            description: values.description,
            productCount: 0,
          },
        ]);
      }
      resetForm();
      setShowCategoryModal(false);
    },
  });

  // Filter and Sort Products
  const getFilteredAndSortedProducts = () => {
    let filtered = products;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Status filter
    if (selectedStatus) {
      filtered = filtered.filter((product) => product.status === selectedStatus);
    }

    // Sorting
    filtered = filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === "price" || sortBy === "stock") {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  };

  const filteredProducts = getFilteredAndSortedProducts();

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Product CRUD operations
  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      // Update category product count
      setCategories(categories.map(cat => 
        cat.name === productToDelete.category 
          ? { ...cat, productCount: Math.max(0, (cat.productCount || 1) - 1) }
          : cat
      ));
      setProducts(products.filter((product) => product.id !== productToDelete.id));
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    productFormik.setValues({
      name: product.name,
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice || "",
      stock: product.stock,
      description: product.description || "",
      status: product.status || "active",
    });
    setShowAddModal(true);
  };
  const handleAddProduct = () => {
    setEditingProduct(null);
    productFormik.resetForm();
    setShowAddModal(true);
  };
  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingProduct(null);
    productFormik.resetForm();
  };
  // Category CRUD operations
  const handleEditCategory = (category) => {
    setEditingCategory(category);
    categoryFormik.setValues({
      name: category.name,
      description: category.description || "",
    });
    setShowCategoryModal(true);
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    categoryFormik.resetForm();
    setShowCategoryModal(true);
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm(`Are you sure you want to delete this category?`)) {
      const category = categories.find(c => c.id === categoryId);
      if (category && category.productCount > 0) {
        alert(`Cannot delete category "${category.name}" as it has ${category.productCount} products.`);
        return;
      }
      setCategories(categories.filter((cat) => cat.id !== categoryId));
    }
  };

  const handleCloseCategoryModal = () => {
    setShowCategoryModal(false);
    setEditingCategory(null);
    categoryFormik.resetForm();
  };

  // Get unique categories for filter
  const uniqueCategories = [...new Set(products.map((p) => p.category))];

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      active: { color: "bg-green-100 text-green-800", label: "Active" },
      inactive: { color: "bg-red-100 text-red-800", label: "Inactive" },
      draft: { color: "bg-yellow-100 text-yellow-800", label: "Draft" },
    };
    const config = statusConfig[status] || statusConfig.draft;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />

      <main className="ml-60 pt-20 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <Productheader onAddCategory={handleAddCategory} onAddProduct={handleAddProduct}/>
          {/* Filters and Search */}
         <ProductFilters
    searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  selectedCategory={selectedCategory}
  setSelectedCategory={setSelectedCategory}
  selectedStatus={selectedStatus}
  setSelectedStatus={setSelectedStatus}
  sortBy={sortBy}
  setSortBy={setSortBy}
  sortOrder={sortOrder}
  toggleSortOrder={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
  categories={categories}
/>
         {/* Category List */}
         <CategoriesList
  categories={categories}
  onEditCategory={handleEditCategory}
  onDeleteCategory={handleDeleteCategory}
  onAddCategory={handleAddCategory}
/>
     {/* Product List */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              Products ({filteredProducts.length})
            </h2>
            <div className="space-y-4">
              {paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow flex items-center justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                      {product.lowStock && (
                        <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-0.5 rounded">
                          Low Stock
                        </span>
                      )}
                      <StatusBadge status={product.status} />
                    </div>
                    <p className="text-sm text-gray-500">{product.category}</p>
                    {product.description && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                    )}
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                      )}
                      <span className="text-sm text-gray-600">Stock: {product.stock}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4 flex-wrap">
                    <button
                      onClick={() => setShowProductDetail(product)}
                      className="px-3 py-2 bg-gray-50 text-gray-600 rounded hover:bg-gray-100 transition-colors text-sm"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(product)}
                      className="px-3 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(product)}
                      className="px-3 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <p className="text-gray-500">No products found</p>
              </div>
            )}
          </div>
        </div>
      </main>
      {/* Add/Edit Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>

            <form onSubmit={productFormik.handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={productFormik.values.name}
                    onChange={productFormik.handleChange}
                    onBlur={productFormik.handleBlur}
                    className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      productFormik.touched.name && productFormik.errors.name
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter product name"
                  />
                  {productFormik.touched.name && productFormik.errors.name && (
                    <p className="mt-1 text-sm text-red-600">{productFormik.errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={productFormik.values.category}
                    onChange={productFormik.handleChange}
                    onBlur={productFormik.handleBlur}
                    className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      productFormik.touched.category && productFormik.errors.category
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  {productFormik.touched.category && productFormik.errors.category && (
                    <p className="mt-1 text-sm text-red-600">{productFormik.errors.category}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={productFormik.values.price}
                    onChange={productFormik.handleChange}
                    onBlur={productFormik.handleBlur}
                    className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      productFormik.touched.price && productFormik.errors.price
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter price"
                    min="0"
                    step="0.01"
                  />
                  {productFormik.touched.price && productFormik.errors.price && (
                    <p className="mt-1 text-sm text-red-600">{productFormik.errors.price}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Original Price (₹) (Optional)
                  </label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={productFormik.values.originalPrice}
                    onChange={productFormik.handleChange}
                    onBlur={productFormik.handleBlur}
                    className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      productFormik.touched.originalPrice && productFormik.errors.originalPrice
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter original price"
                    min="0"
                    step="0.01"
                  />
                  {productFormik.touched.originalPrice && productFormik.errors.originalPrice && (
                    <p className="mt-1 text-sm text-red-600">{productFormik.errors.originalPrice}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={productFormik.values.stock}
                    onChange={productFormik.handleChange}
                    onBlur={productFormik.handleBlur}
                    className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      productFormik.touched.stock && productFormik.errors.stock
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter stock quantity"
                    min="0"
                    step="1"
                  />
                  {productFormik.touched.stock && productFormik.errors.stock && (
                    <p className="mt-1 text-sm text-red-600">{productFormik.errors.stock}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={productFormik.values.description}
                    onChange={productFormik.handleChange}
                    onBlur={productFormik.handleBlur}
                    rows="3"
                    className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      productFormik.touched.description && productFormik.errors.description
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter product description"
                  />
                  {productFormik.touched.description && productFormik.errors.description && (
                    <p className="mt-1 text-sm text-red-600">{productFormik.errors.description}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status *
                  </label>
                  <select
                    name="status"
                    value={productFormik.values.status}
                    onChange={productFormik.handleChange}
                    onBlur={productFormik.handleBlur}
                    className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      productFormik.touched.status && productFormik.errors.status
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="draft">Draft</option>
                  </select>
                  {productFormik.touched.status && productFormik.errors.status && (
                    <p className="mt-1 text-sm text-red-600">{productFormik.errors.status}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  {editingProduct ? "Update" : "Add"} Product
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add/Edit Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">
              {editingCategory ? "Edit Category" : "Add New Category"}
            </h2>

            <form onSubmit={categoryFormik.handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={categoryFormik.values.name}
                    onChange={categoryFormik.handleChange}
                    onBlur={categoryFormik.handleBlur}
                    className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      categoryFormik.touched.name && categoryFormik.errors.name
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter category name"
                  />
                  {categoryFormik.touched.name && categoryFormik.errors.name && (
                    <p className="mt-1 text-sm text-red-600">{categoryFormik.errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={categoryFormik.values.description}
                    onChange={categoryFormik.handleChange}
                    onBlur={categoryFormik.handleBlur}
                    rows="3"
                    className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      categoryFormik.touched.description && categoryFormik.errors.description
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter category description"
                  />
                  {categoryFormik.touched.description && categoryFormik.errors.description && (
                    <p className="mt-1 text-sm text-red-600">{categoryFormik.errors.description}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                >
                  {editingCategory ? "Update" : "Add"} Category
                </button>
                <button
                  type="button"
                  onClick={handleCloseCategoryModal}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {showProductDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{showProductDetail.name}</h2>
              <button
                onClick={() => setShowProductDetail(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <StatusBadge status={showProductDetail.status} />
                {showProductDetail.lowStock && (
                  <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-0.5 rounded">
                    Low Stock
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium">{showProductDetail.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-medium">₹{showProductDetail.price}</p>
                  {showProductDetail.originalPrice && (
                    <p className="text-sm text-gray-400 line-through">
                      ₹{showProductDetail.originalPrice}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Stock</p>
                  <p className="font-medium">{showProductDetail.stock} units</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Added Date</p>
                  <p className="font-medium">{showProductDetail.createdAt || "N/A"}</p>
                </div>
              </div>

              {showProductDetail.description && (
                <div>
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="mt-1">{showProductDetail.description}</p>
                </div>
              )}

              <div className="flex gap-3 mt-4 pt-4 border-t">
                <button
                  onClick={() => {
                    handleEdit(showProductDetail);
                    setShowProductDetail(null);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit Product
                </button>
                <button
                  onClick={() => setShowProductDetail(null)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && productToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-center text-gray-900 mb-2">
              Delete Product
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete <span className="font-semibold">"{productToDelete.name}"</span>?
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleConfirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={handleCancelDelete}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;