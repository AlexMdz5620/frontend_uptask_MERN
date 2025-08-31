import type { Project, User } from "../types"

export const isManager = (manajerId: Project['manager'], userId: User['_id']) => {
    return manajerId === userId;
}