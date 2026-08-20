import Header from "@/shared/components/AdminPanel/Header";
import Sidebar from "@/shared/components/AdminPanel/Sidebar";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Productheader from "@/shared/components/AdminPanel/Productscomponents/Productheader";
import ProductFilters from "@/shared/components/AdminPanel/Productscomponents/Productfilter";
import CategoriesList from "@/shared/components/AdminPanel/Productscomponents/CategoriesList";

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
    <div className="min-h-screen">
      <Sidebar />
      <Header />

      <main className="ml-[336px] pt-[80px] p-6">
        <h1 className="text-3xl font-bold text-black">Product</h1>
      </main>
    </div>
  );
}

export default Product