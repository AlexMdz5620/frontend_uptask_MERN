import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { teamMembersSchema, type Project, type TeamMember, type TeamMemberForm } from '../types/index';

export async function getUserById({ projectId, formData }: { projectId: Project['_id'], formData: TeamMemberForm }) {
    try {
        const url = `/projects/${projectId}/teams/find`;
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function addUserToProject({ projectId, id }: { projectId: Project['_id'], id: TeamMember['_id'] }) {
    try {
        const url = `/projects/${projectId}/teams`;
        const { data } = await api.post<string>(url, { id });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getProjectTeam(projectId: Project['_id']) {
    try {
        const url = `/projects/${projectId}/teams`;
        const { data } = await api(url);
        const res = teamMembersSchema.safeParse(data);
        if (res.success) {
            return res.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function removeUserFromProject({ projectId, userId }: { projectId: Project['_id'], userId: TeamMember['_id'] }) {
    try {
        const url = `/projects/${projectId}/teams/${userId}`;
        const { data } = await api.delete<string>(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
