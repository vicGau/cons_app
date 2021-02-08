import { IUser } from "../../entities/IUser.interface";

export interface IUsersRepo {
    create(data: IUser): Promise<void>;
}