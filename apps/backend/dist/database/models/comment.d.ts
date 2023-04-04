import { Sequelize } from "sequelize";
export type CommentAttributes = {
    postId?: number;
    comment?: string;
    userId?: number;
};
export type CommentInstance = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    postId: number;
    comment: string;
    userId: number;
};
declare const _default: (sequelize: Sequelize, DataTypes: DataTypes) => import("sequelize").ModelCtor<import("sequelize").Model<any, any>>;
export default _default;
//# sourceMappingURL=comment.d.ts.map