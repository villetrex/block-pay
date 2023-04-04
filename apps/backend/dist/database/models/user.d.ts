import { Sequelize } from "sequelize";
export type UserAttributes = {
    name?: string;
    email?: string;
};
export type UserInstance = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    email: string;
};
declare const _default: (sequelize: Sequelize, DataTypes: DataTypes) => import("sequelize").ModelCtor<import("sequelize").Model<any, any>>;
export default _default;
//# sourceMappingURL=user.d.ts.map