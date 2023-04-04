import { Sequelize } from "sequelize";
export type PostAttributes = {
    title?: string;
    content?: string;
    userId?: number;
};
export type PostInstance = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    content: string;
    userId: number;
};
declare const _default: (sequelize: Sequelize, DataTypes: DataTypes) => import("sequelize").ModelCtor<import("sequelize").Model<any, any>>;
export default _default;
//# sourceMappingURL=post.d.ts.map