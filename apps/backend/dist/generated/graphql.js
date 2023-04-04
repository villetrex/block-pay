"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.UserPermissions = void 0;
var UserPermissions;
(function (UserPermissions) {
    UserPermissions["Read"] = "READ";
    UserPermissions["Write"] = "WRITE";
})(UserPermissions = exports.UserPermissions || (exports.UserPermissions = {}));
var UserRole;
(function (UserRole) {
    UserRole["Admin"] = "ADMIN";
    UserRole["BrandAdmin"] = "BRAND_ADMIN";
    UserRole["BrandCustomerSupport"] = "BRAND_CUSTOMER_SUPPORT";
    UserRole["Public"] = "PUBLIC";
    UserRole["ShopifySession"] = "SHOPIFY_SESSION";
    UserRole["User"] = "USER";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
