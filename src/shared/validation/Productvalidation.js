// validations/productValidation.js
import * as Yup from "yup";

export const productValidationSchema = Yup.object({
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

export const categoryValidationSchema = Yup.object({
  name: Yup.string()
    .required("Category name is required")
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name must be less than 50 characters"),
  description: Yup.string()
    .max(200, "Description must be less than 200 characters"),
});