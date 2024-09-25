import express from "express";
const router = express.Router();
import { deleteMe, getMe, signin, signout, signup, updateMe } from "./authController";
import { createProduct, deleteProduct, readProductById, readProducts, updateProduct } from "./productController";
import { deleteUser, readUserById, readUsers, updateUser } from "./userController";
import { createCategory, deleteCategory, readCategories, readCategoryById, updateCategory } from "./categoryController";
import { isAdmin, isLogin } from "./mw";
import { createTag, deleteTag, readTagById, readTags, updateTag } from "./tagController";

router.post("/signup", signup);
router.patch("/signin", signin);

router.route("/product").get(readProducts).post(createProduct);
router.route("/category").get(readCategories).post(createCategory);
router.route("/tag").get(readTags).post(createTag);

router.use(isLogin);
router.route("/me").get(getMe).patch(updateMe).delete(deleteMe);
router.patch("/signout", signout);

router.use(isAdmin);
router.route("/product/:id").get(readProductById).patch(updateProduct).delete(deleteProduct);
router.route("/category/:id").get(readCategoryById).patch(updateCategory).delete(deleteCategory);
router.route("/tag/:id").get(readTagById).patch(updateTag).delete(deleteTag);

router.route("/user").get(readUsers);
router.route("/user/:id").get(readUserById).patch(updateUser).delete(deleteUser);

export default router;
